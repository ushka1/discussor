import { Pathnames } from 'next-intl/navigation';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'pl'] as const;
export const localePrefix = 'as-needed';
export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    pl: '/o-nas',
  },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
