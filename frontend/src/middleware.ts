import { NextRequest } from 'next/server';
import { intlMiddleware } from './i18n/middleware';

export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match only internationalized pathnames.
    '/',
    '/(en|pl)/:path*',
  ],
};
