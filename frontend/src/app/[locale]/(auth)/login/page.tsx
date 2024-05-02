'use client';

import '@/config/auth';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { login } from '../actions';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const [state, action] = useFormState(login, undefined);

  return (
    <Box
      component='form'
      action={action}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4' sx={{ textAlign: 'center' }}>
        {t('loginTitle')}
      </Typography>
      <TextField
        name='email'
        type='email'
        required
        label={t('email')}
        sx={{ mt: 4 }}
      />
      <TextField
        name='password'
        type='password'
        required
        label={t('password')}
        sx={{ mt: 2 }}
      />
      <Button type='submit' variant='contained' sx={{ mt: 4 }}>
        {t('loginButton')}
      </Button>
      <Button href='/register' fullWidth sx={{ mt: 2 }}>
        {t('loginSwitch')}
      </Button>
    </Box>
  );
}
