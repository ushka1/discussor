'use client';

import { Link as LocalizedNextLink } from '@discussor/navigation';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { forwardRef } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const LinkBehavior = forwardRef(function LinkBehaviour(props: any, ref: any) {
  return <LocalizedNextLink ref={ref} {...props} />;
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
