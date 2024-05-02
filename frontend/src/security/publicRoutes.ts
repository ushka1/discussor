import { locales } from '@/localization/localeConfig';

const publicRoutes = ['/', '/login', '/register'];

/**
 * Regex description:
 * - route must start with `/`
 * - `locales` do not start with `/` so add it
 * - `locales` may be optional (`localePrefix: 'as-needed'`)
 * - `publicRoutes` start with `/`
 * -  include empty route `''` using `flatMap`
 */
const publicRoutesRegex = RegExp(
  `^(/(${locales.join('|')}))?(${publicRoutes
    .flatMap((p) => (p === '/' ? ['', '/'] : p))
    .join('|')})/?$`,
  'i',
);

export function isPublicRoute(path: string) {
  return publicRoutesRegex.test(path);
}
