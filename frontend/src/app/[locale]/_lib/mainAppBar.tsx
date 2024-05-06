import { jaro } from '@/theme/fonts';
import { AppBar, Link, Toolbar } from '@mui/material';
import LocaleSwitcher from './localeSwitcher';

export default function MainAppBar() {
  return (
    <AppBar variant='outlined' color='transparent'>
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
        <LocaleSwitcher />
      </Toolbar>
    </AppBar>
  );
}
