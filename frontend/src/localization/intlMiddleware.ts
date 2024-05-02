import createIntlMiddleware from 'next-intl/middleware';
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from './localeConfig';

export const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});
