import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.ts');
export default withNextIntl(nextConfig);
