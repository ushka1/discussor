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

export function verifySession() {
  const token = cookies().get('session');
  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token.value);
    if (exp && exp * 1000 < Date.now()) {
      deleteSession();
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);

    deleteSession();
    return false;
  }
}

export function deleteSession() {
  cookies().delete('session');
}
