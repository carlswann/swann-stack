import { getTheme } from 'theme';
import { enUS as coreEnUS, frFR as coreFrFR, Localization } from '@mui/material/locale';
import { enUS as dataGridEnUS, frFR as dataGridFrFR } from '@mui/x-data-grid';
import { useTranslation } from './useTranslation';
import { useMemo } from 'react';

export const useCustomTheme = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const theme = useMemo(() => {
    const enLocalizations = [dataGridEnUS, coreEnUS] as Localization[];
    const frLocalizations = [dataGridFrFR, coreFrFR] as Localization[];

    const localizations = language === 'en-US' ? enLocalizations : frLocalizations;
    return getTheme(localizations);
  }, [language]);

  return theme;
};
