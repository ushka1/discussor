import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales, pathnames } from './i18nConfig';

export const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});
