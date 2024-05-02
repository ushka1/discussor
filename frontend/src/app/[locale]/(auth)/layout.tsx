import { Box, Paper } from '@mui/material';
import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();

  return (
    <Box component={'main'}>
      <Paper
        sx={{
          maxWidth: 500,
          mt: 8,
          mx: 'auto',
          p: 4,
        }}
      >
        <NextIntlClientProvider messages={pick(messages, 'Auth')}>
          {children}
        </NextIntlClientProvider>
      </Paper>
    </Box>
  );
}