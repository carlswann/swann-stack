import { createTheme } from '@mui/material/styles';
import { Localization } from '@mui/material/locale';

import { colors } from 'theme/variables';
import { getThemePalette } from 'theme/palette';
import { getThemeTypography } from 'theme/typography';
import { getComponentStylesOverrides } from 'theme/overrides';

type ThemeCustomization = {
  fontFamily: string;
  borderRadius: number;
  isMenuOpen: boolean;
};

export type CustomTheme = {};
export type CustomThemeOptions = {
  colors: { [key: string]: string };
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  customization: ThemeCustomization;
};

export function getTheme(
  localizations: Localization[] = [],
  customization: ThemeCustomization = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    isMenuOpen: false,
  }
) {
  const themeOption: CustomThemeOptions = {
    colors,
    heading: colors.grey900,
    paper: colors.paper,
    backgroundDefault: colors.paper,
    background: colors.primaryLight,
    darkTextPrimary: colors.grey700,
    darkTextSecondary: colors.grey500,
    textDark: colors.grey900,
    menuSelected: colors.primaryDark,
    menuSelectedBack: colors.primaryLight,
    divider: colors.grey200,
    customization,
  };

  const customThemeValues: CustomTheme = {
    direction: 'ltr',
    palette: getThemePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: getThemeTypography(themeOption),
  };

  const customTheme = createTheme(customThemeValues, ...localizations);
  const componentStyleOverrides = getComponentStylesOverrides(themeOption);

  customTheme.components = {
    ...customTheme.components,
    ...componentStyleOverrides,
  };

  return customTheme;
}
