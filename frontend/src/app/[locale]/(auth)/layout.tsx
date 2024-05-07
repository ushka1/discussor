import { Box, Paper } from '@mui/material';
import bg from '@public/background.jpg';
import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 500,
          px: 6,
          py: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <NextIntlClientProvider messages={pick(messages, 'Auth')}>
          {children}
        </NextIntlClientProvider>
      </Paper>
    </Box>
  );
}
