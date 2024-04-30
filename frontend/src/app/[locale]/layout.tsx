import theme from '@/config/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussor',
  description: 'Bringing people together to discuss and share ideas!',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
