import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import 'server-only';

export function createSession(token: string) {
  const { exp } = jwtDecode(token);

  cookies().set('session', token, {
    httpOnly: true,
    secure: true,
    expires: exp && exp * 1000,
    sameSite: 'lax',
    path: '/',
  });
}

export function deleteSession() {
  cookies().delete('session');
}
