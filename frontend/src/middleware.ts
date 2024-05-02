import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './config/auth';
import { intlMiddleware } from './i18n/i18nMiddleware';

export default function middleware(req: NextRequest) {
  return authMiddleware(
    req,
    () => intlMiddleware(req),
    () => NextResponse.redirect(new URL('/login', req.nextUrl)),
  );
}

export const config = {
  // Match only internationalized pathnames.
  // matcher: ['/', '/(en|pl)/:path*'],

  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - .png, .jpg, .svg (image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
