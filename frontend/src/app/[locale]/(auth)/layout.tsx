import { verifySession } from '@/security/sessions';
import { redirect } from '@discussor/navigation';
import { Box, Paper } from '@mui/material';
import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const verified = verifySession();
  if (verified) {
    // @ts-ignore
    redirect('/profile');
  }

  const messages = useMessages();
  return (
    <Box
      component='main'
      sx={{
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper
        variant='outlined'
        sx={{
          width: 500,
          px: 6,
          py: 4,
        }}
      >
        <NextIntlClientProvider messages={pick(messages, 'Auth')}>
          {children}
        </NextIntlClientProvider>
      </Paper>
    </Box>
  );
}
