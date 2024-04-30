import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales, pathnames } from './config';

export const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});
