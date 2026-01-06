"use server";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "../../lib/validations";
import {
  sendContactEmail,
  sendAutoReplyEmail,
  checkEmailRateLimit,
} from "../../lib/email";
import { ZodError } from "zod";
// Runtime configuration
// Runtime configuration moved out of server directive scope

interface ApiSuccessResponse {
  message: string;
  success: true;
  messageId?: string;
  timestamp: string;
}

interface ApiErrorResponse {
  error: string;
  message: string;
  success: false;
  timestamp: string;
  details?: Record<string, unknown>;
}

interface ApiStatusResponse {
  status: "operational" | "degraded" | "error";
  service: string;
  timestamp: string;
  message?: string;
}

interface ValidationErrorResponse extends ApiErrorResponse {
  issues: Array<{
    field: string;
    message: string;
  }>;
}

function validateEnvironment(): void {
  const required = ["SMTP_USER", "SMTP_PASSWORD", "CONTACT_EMAIL"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

function getClientIp(request: NextRequest): string {
  // Check various headers in order of preference
  const headers = [
    "cf-connecting-ip", // Cloudflare
    "x-real-ip", // Nginx
    "x-forwarded-for", // Standard
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can be a comma-separated list
      return value.split(",")[0].trim();
    }
  }

  return "unknown";
}

function createErrorResponse(
  error: string,
  message: string,
  status: number,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    error,
    message,
    success: false,
    timestamp: new Date().toISOString(),
    ...(details && { details }),
  };

  return NextResponse.json(response, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function createRateLimitResponse(
  message: string,
  retryAfterSeconds: number,
  limit: string
): NextResponse<ApiErrorResponse> {
  const resetTimestamp = Math.floor(Date.now() / 1000) + retryAfterSeconds;

  return NextResponse.json(
    {
      error: "Rate limit exceeded",
      message,
      success: false,
      timestamp: new Date().toISOString(),
      details: {
        retryAfter: retryAfterSeconds > 3600 ? "24 hours" : "1 hour",
        limit,
      },
    },
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": limit.split(" ")[0],
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(resetTimestamp),
      },
    }
  );
}

export async function POST(
  request: NextRequest
): Promise<
  NextResponse<ApiSuccessResponse | ApiErrorResponse | ValidationErrorResponse>
> {
  try {
    validateEnvironment();

    let body;
    try {
      body = await request.json();
    } catch {
      return createErrorResponse(
        "Invalid request",
        "Request body must be valid JSON",
        400
      );
    }

    const validatedData = contactSchema.parse(body);

    const clientIp = getClientIp(request);

    const withinIpRateLimit = checkEmailRateLimit(clientIp, 3);
    if (!withinIpRateLimit) {
      console.warn(`IP rate limit exceeded: ${clientIp}`);
      return createRateLimitResponse(
        "Too many requests from your IP address. Please wait before sending another message.",
        3600, // 1 hour
        "3 requests per hour"
      );
    }

    const withinEmailRateLimit = checkEmailRateLimit(validatedData.email, 36);
    if (!withinEmailRateLimit) {
      console.warn("Email rate limit exceeded for a user email address");
      return createRateLimitResponse(
        "You have reached the maximum number of messages for today. Please try again tomorrow.",
        86400, // 24 hours
        "36 requests per day"
      );
    }

    const emailResult = await sendContactEmail(validatedData);

    sendAutoReplyEmail(validatedData.email, validatedData.name).catch(
      (error) => {
        console.error("⚠️ Auto-reply failed (non-critical):", error);
      }
    );

    const successResponse: ApiSuccessResponse = {
      message: "Message sent successfully! Thank you for reaching out.",
      success: true,
      messageId: emailResult.messageId,
      timestamp: new Date().toISOString(),
    };

    console.log("✅ Contact form submission successful");

    return NextResponse.json(successResponse, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const issues = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      console.warn("❌ Validation error:", issues);

      const validationResponse: ValidationErrorResponse = {
        error: "Validation failed",
        message: "Please check your input and try again.",
        success: false,
        timestamp: new Date().toISOString(),
        issues,
      };

      return NextResponse.json(validationResponse, { status: 400 });
    }

    // Handle email service errors
    if (error instanceof Error) {
      console.error("❌ Contact form error:", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      // Specific handling for email service errors
      if (
        error.message.includes("SMTP") ||
        error.message.includes("email") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ETIMEDOUT")
      ) {
        return createErrorResponse(
          "Email service unavailable",
          "Unable to send your message at this time. Please try again later or contact me directly via email.",
          503
        );
      }

      // Specific handling for authentication errors
      if (
        error.message.includes("auth") ||
        error.message.includes("authentication")
      ) {
        console.error(
          "🔐 Email authentication failed - check SMTP credentials"
        );
        return createErrorResponse(
          "Email service configuration error",
          "There is a configuration issue with the email service. Please contact the site administrator.",
          503
        );
      }
    }

    // Generic error handling
    console.error("❌ Unexpected error in contact route:", error);

    return createErrorResponse(
      "Internal server error",
      "An unexpected error occurred. Please try again later.",
      500
    );
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  });
}

/**
 * GET /api/contact
 * Health check endpoint for monitoring
 */
export async function GET(): Promise<NextResponse<ApiStatusResponse>> {
  try {
    // Check if environment is properly configured
    validateEnvironment();

    const response: ApiStatusResponse = {
      status: "operational",
      service: "contact-api",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    const errorResponse: ApiStatusResponse = {
      status: "error",
      service: "contact-api",
      message: error instanceof Error ? error.message : "Configuration error",
      timestamp: new Date().toISOString(),
    };

    console.error("❌ Health check failed:", errorResponse);

    return NextResponse.json(errorResponse, {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
