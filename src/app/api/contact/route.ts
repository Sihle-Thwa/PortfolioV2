import { NextResponse } from 'next/server';

// Runtime configuration
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================================
// Type Definitions
// ============================================================================

interface ApiStatusResponse {
  status: 'operational' | 'degraded' | 'error';
  service: string;
  timestamp: string;
  message?: string;
}


// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validate required environment variables
 */
function validateEnvironment(): void {
  const required = ['SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_EMAIL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}



export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
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
      status: 'operational',
      service: 'contact-api',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    const errorResponse: ApiStatusResponse = {
      status: 'error',
      service: 'contact-api',
      message: error instanceof Error ? error.message : 'Configuration error',
      timestamp: new Date().toISOString(),
    };

    console.error('❌ Health check failed:', errorResponse);

    return NextResponse.json(errorResponse, {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }
}