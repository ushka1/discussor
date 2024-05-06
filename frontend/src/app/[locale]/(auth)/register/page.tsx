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
import { register } from '../_lib/actions';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const [state, action] = useFormState(register, undefined);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((value) => !value);
  }

  function toggleRepeatPasswordVisibility() {
    setShowRepeatPassword((value) => !value);
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
        type={showPassword ? 'text' : 'password'}
        required
        label={t('password')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.password}
        helperText={state?.errors?.password?.[0]}
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
      <TextField
        name='repeatPassword'
        type={showRepeatPassword ? 'text' : 'password'}
        required
        label={t('repeatPassword')}
        sx={{ mt: 2 }}
        error={!!state?.errors?.repeatPassword}
        helperText={state?.errors?.repeatPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={toggleRepeatPasswordVisibility}
                edge='end'
              >
                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type='submit' variant='contained' disableElevation sx={{ mt: 4 }}>
        {t('registerButton')}
      </Button>
      <Button href='/login' fullWidth sx={{ mt: 2 }}>
        {t('registerSwitch')}
      </Button>
    </Box>
  );
}
