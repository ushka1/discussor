'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { register } from '../_lib/actions';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const [state, action] = useFormState(register, undefined);

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
        {t('registerTitle')}
      </Typography>
      <TextField
        name='username'
        required
        label={t('username')}
        sx={{ mt: 4 }}
        error={!!state?.errors?.username}
        helperText={state?.errors?.username}
      />
      <TextField
        name='email'
        type='email'
        required
        label={t('email')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.email}
        helperText={state?.errors?.email}
      />
      <TextField
        name='password'
        type='password'
        required
        label={t('password')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.password}
        helperText={state?.errors?.password?.[0]}
      />
      <TextField
        name='repeatPassword'
        type='password'
        required
        label={t('repeatPassword')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.repeatPassword}
        helperText={state?.errors?.repeatPassword}
      />
      <Button type='submit' variant='contained' sx={{ mt: 4 }}>
        {t('registerButton')}
      </Button>
      <Button href='/login' fullWidth sx={{ mt: 2 }}>
        {t('registerSwitch')}
      </Button>
    </Box>
  );
}
