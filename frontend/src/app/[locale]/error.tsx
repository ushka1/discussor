'use client';

import { Box, Button, Typography } from '@mui/material';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
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
      <Typography variant='h3'>Oops, something went wrong!</Typography>
      <Typography sx={{ mt: 2 }}>Error message: {error.message}</Typography>
      <Button href='/' variant='outlined' sx={{ mt: 6 }} size='large'>
        Go to home
      </Button>
    </Box>
  );
}
