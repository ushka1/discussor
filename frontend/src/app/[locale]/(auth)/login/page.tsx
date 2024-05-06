'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { login } from '../_lib/actions';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const [state, action] = useFormState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((value) => !value);
  }

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
        error={!!state?.errors?.email}
        helperText={state?.errors?.email}
      />
      <TextField
        name='password'
        type={showPassword ? 'text' : 'password'}
        required
        label={t('password')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.password}
        helperText={state?.errors?.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={togglePasswordVisibility}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
