import { verifySession } from '@/security/sessions';
import { jaro } from '@/theme/fonts';
import { AppBar, Box, Button, Link, Toolbar } from '@mui/material';
import { useTranslations } from 'next-intl';
import { logout } from '../(auth)/_lib/actions';
import LocaleSwitcher from './localeSwitcher';

export default function MainAppBar() {
  const isAuth = verifySession();
  const t = useTranslations('AppBar');

  return (
    <AppBar
      variant='outlined'
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Toolbar>
        <Link
          href='/'
          variant='h4'
          underline='none'
          sx={{
            flexGrow: 1,
            fontFamily: jaro.style.fontFamily,
          }}
        >
          Discussor
        </Link>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <LocaleSwitcher />
          {isAuth ? (
            <>
              <Button href='/profile'>{t('profile')}</Button>
              <form action={logout}>
                <Button variant='outlined' type='submit'>
                  {t('logout')}
                </Button>
              </form>
            </>
          ) : (
            <Button href='/login' variant='outlined'>
              {t('login')}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
