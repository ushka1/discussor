import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { localePrefix, locales, pathnames } from './config';

const localizedPathnamesNavigation = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

export const {
  Link,
  getPathname,
  permanentRedirect,
  redirect,
  usePathname,
  useRouter,
} = localizedPathnamesNavigation;
