'use server';

import { locales } from '@/i18n/i18nConfig';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register'];

/**
 * - regex must start with `/`
 * - `locales` do not start with `/` so add it
 * - `locales` are optional (eg. when `as-needed` is set)
 * - `publicRoutes` start with `/` so no need to add it
 * - do `flatMap` to include empty route `''`
 */
const publicRoutesRegex = RegExp(
  `^(/(${locales.join('|')}))?(${publicRoutes
    .flatMap((p) => (p === '/' ? ['', '/'] : p))
    .join('|')})/?$`,
  'i',
);

function isPublicRoute(path: string) {
  return publicRoutesRegex.test(path);
}

export async function authMiddleware(
  req: NextRequest,
  success: (req: NextRequest) => any,
  failure: (req: NextRequest) => any,
) {
  const path = req.nextUrl.pathname;

  const isPublic = isPublicRoute(path);
  if (isPublic) {
    return success(req);
  }

  try {
    const cookie = cookies().get('session')?.value;
    const session = jwtDecode<{ userId?: string }>(cookie || '');
    const isAuth = !!session.userId;

    if (isAuth) {
      return success(req);
    } else {
      return failure(req);
    }
  } catch (err) {
    return failure(req);
  }
}
