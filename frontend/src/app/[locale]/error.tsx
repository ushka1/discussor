'use client';

import { Box, Link, Typography } from '@mui/material';

export default function ErrorPage() {
  return (
    <Box component='main'>
      <Typography variant='h3'>Something went wrong!</Typography>
      <Link href='/'>Home</Link>
    </Box>
  );
}
