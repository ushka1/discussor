'use client';

import { usePathname, useRouter } from '@/localization/localizedNavigation';
import { Translate } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { MouseEvent, useState, useTransition } from 'react';

type Props = {
  label: string;
  options: { value: string; label: string }[];
};

export default function LocaleSwitcherMenu({
  label,
  options,
}: Readonly<Props>) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = !!anchor;

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Box>
      <Tooltip title={label} arrow enterDelay={500} enterNextDelay={500}>
        <IconButton onClick={handleOpen} color='primary'>
          <Translate />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === locale}
            onClick={() => changeLocale(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
