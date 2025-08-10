import type { VercelRequest } from '@vercel/node';
import { createHash, timingSafeEqual } from 'crypto';

interface ValidationResult {
  success: boolean;
  error?: string;
}

export function validateRequest(req: VercelRequest): ValidationResult {
  // Validate origin
  const origin = req.headers.origin;
  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '').split(',');
  
  if (origin && !allowedOrigins.includes(origin)) {
    return {
      success: false,
      error: 'Invalid origin'
    };
  }

  // Validate Content-Type
  if (req.method === 'POST' && !req.headers['content-type']?.includes('application/json')) {
    return {
      success: false,
      error: 'Invalid content type'
    };
  }

  return { success: true };
}

// CSRF Protection
export function generateCSRFToken(): string {
  return createHash('sha256')
    .update(Math.random().toString())
    .digest('hex');
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  try {
    return timingSafeEqual(
      Buffer.from(token),
      Buffer.from(storedToken)
    );
  } catch {
    return false;
  }
}

// XSS Protection Headers
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' https://checkout.razorpay.com https://cdn.tailwindcss.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.razorpay.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
