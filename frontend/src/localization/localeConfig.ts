import { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'en';
export const locales = ['en', 'pl'] as const;
// export const localePrefix = 'always';
export const localePrefix = 'as-needed';

/**
 * Optionally you can localize pathnames. Remember that in this case
 * you will also have to update auth isPublicRoute regex.
 */
export const pathnames = {
  // '/': '/',
  // '/login': {
  //   en: '/login',
  //   pl: '/logowanie',
  // },
  // '/register': {
  //   en: '/register',
  //   pl: '/rejestracja',
  // },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
