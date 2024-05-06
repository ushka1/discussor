import { locales } from '@/localization/localeConfig';
import { useTranslations } from 'next-intl';
import LocaleSwitcherMenu from './localeSwitcherMenu';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const options = locales.map((l) => ({
    value: l,
    label: t('locale', { locale: l }),
  }));

  return <LocaleSwitcherMenu label={t('label')} options={options} />;
}
