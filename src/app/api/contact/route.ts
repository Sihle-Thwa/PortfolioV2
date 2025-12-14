import { NextRequest, NextResponse } from 'next/server';
import { contactSchema} from '../../lib/validations';
import {
  sendContactEmail,
  sendAutoReplyEmail,
  checkEmailRateLimit,
} from '../../lib/email';

// Runtime configuration
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Type definitions for API responses
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
  status: 'operational' | 'error';
  service: string;
  timestamp: string;
  message?: string;
}


function validateEnvironment() {
  const required = ['SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_EMAIL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cfConnecting = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (real) {
    return real;
  }

  if (cfConnecting) {
    return cfConnecting;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    validateEnvironment();

    const clientIp = getClientIp(request);

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const validatedData = contactSchema.parse(body);

    const withinRateLimit = checkEmailRateLimit(clientIp, 3, 60 * 60 * 1000);
    if (!withinRateLimit) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      
      const rateLimitResponse: ApiErrorResponse = {
        error: 'Rate limit exceeded',
        message: 'Too many requests from your IP. Please wait an hour before sending another message.',
        success: false,
        timestamp: new Date().toISOString(),
        details: {
          retryAfter: '1 hour',
          limit: '3 requests per hour',
        },
      };
      
      return NextResponse.json(rateLimitResponse, { 
        status: 429,
        headers: {
          'Retry-After': '3600', // 1 hour in seconds
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
        },
      });
    }

    const emailRateLimit = checkEmailRateLimit(
      validatedData.email,
      25,
      24 * 60 * 60 * 1000 
    );
    if (!emailRateLimit) {
      console.warn(`Email rate limit exceeded for: ${validatedData.email}`);
      
      const emailRateLimitResponse: ApiErrorResponse = {
        error: 'Daily limit reached',
        message: 'You have reached the maximum number of messages for today. Please try again tomorrow.',
        success: false,
        timestamp: new Date().toISOString(),
        details: {
          retryAfter: '24 hours',
          limit: '25 messages per day',
        },
      };
      
      return NextResponse.json(emailRateLimitResponse, { 
        status: 429,
        headers: {
          'Retry-After': '86400', // 24 hours in seconds
          'X-RateLimit-Limit': '25',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 86400),
        },
      });
    }

    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    });

    // Send the contact email
    const emailResult = await sendContactEmail(validatedData);

    // Send auto-reply to user (optional - don't fail if this errors)
    try {
      await sendAutoReplyEmail(validatedData.email, validatedData.name);
    } catch (autoReplyError) {
      console.error('Auto-reply failed (non-critical):', autoReplyError);
      // Continue - auto-reply failure shouldn't fail the whole request
    }

    // Success response
    const successResponse: ApiSuccessResponse = {
      message: 'Message sent successfully! Thank you for reaching out.',
      success: true,
      messageId: emailResult.messageId,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(successResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {



    if (error instanceof Error) {
      console.error('Contact form error:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      if (error.message.includes('SMTP') || error.message.includes('email')) {
        return NextResponse.json(
          {
            error: 'Email service error',
            message:
              'Unable to send your message at this time. Please try again later or contact me directly.',
          },
          { status: 503 }
        );
      }
    }

    console.error('Unexpected error in contact route:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          'An unexpected error occurred. Please try again later or contact me directly.',
      },
      { status: 500 }
    );
  }
}


export async function GET(): Promise<NextResponse<ApiStatusResponse>> {
  try {
    validateEnvironment();

    const response: ApiStatusResponse = {
      status: 'operational',
      service: 'contact-api',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const errorResponse: ApiStatusResponse = {
      status: 'error',
      service: 'contact-api',
      message: error instanceof Error ? error.message : 'Configuration error',
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(errorResponse, { status: 503 });
  }
}