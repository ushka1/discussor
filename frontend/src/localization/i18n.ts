import deepmerge from 'deepmerge';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './localeConfig';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid.
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load the matched locale messages and the fallback locale messages.
  // They will be merged together with the matched taking precedence.
  const matched = (await import(`../../messages/${locale}.json`)).default;
  const fallback = (await import(`../../messages/en.json`)).default;

  return {
    messages: deepmerge(fallback, matched),
  };
});
