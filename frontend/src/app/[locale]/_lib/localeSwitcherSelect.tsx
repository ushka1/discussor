'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { ReactNode, useTransition } from 'react';

type Props = {
  label: string;
  children: ReactNode;
};

export default function LocaleSwitcherSelect({ label, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  function changeLocale(event: SelectChangeEvent) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='locale-switcher-label'>{label}</InputLabel>
        <Select
          labelId='locale-switcher-label'
          id='locale-switcher-select'
          value={locale}
          label={label}
          onChange={changeLocale}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
