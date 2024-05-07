'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { isPublicRoute } from './publicRoutes';

export async function authMiddleware(
  req: NextRequest,
  onSuccess: (req: NextRequest) => any,
  onFailure: (req: NextRequest) => any,
) {
  const path = req.nextUrl.pathname;
  const isPublic = isPublicRoute(path);
  if (isPublic) {
    return onSuccess(req);
  }

  try {
    const cookie = cookies().get('session')?.value;
    const session = jwtDecode<{ userId?: string }>(cookie ?? '');
    const isAuth = !!session.userId;

    if (isAuth) {
      return onSuccess(req);
    } else {
      return onFailure(req);
    }
  } catch (err) {
    console.log(err);
    return onFailure(req);
  }
}
