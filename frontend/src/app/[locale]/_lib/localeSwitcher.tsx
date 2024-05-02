import { locales } from '@/i18n/i18nConfig';
import { MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './localeSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');

  return (
    <LocaleSwitcherSelect label={t('label')}>
      {locales.map((l) => (
        <MenuItem key={l} value={l}>
          {t('locale', { locale: l })}
        </MenuItem>
      ))}
    </LocaleSwitcherSelect>
  );
}
