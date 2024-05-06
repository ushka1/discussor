import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const jaro = localFont({
  src: './Jaro.ttf',
  variable: '--font-jaro',
  display: 'swap',
});
