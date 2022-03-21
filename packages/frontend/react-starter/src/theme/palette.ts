import { CustomThemeOptions } from 'theme';

export function getThemePalette(themeOptions: CustomThemeOptions) {
  return {
    // mode: theme.customization.navType,
    common: {
      black: themeOptions.colors.darkPaper,
    },
    primary: {
      light: themeOptions.colors.primaryLight,
      main: themeOptions.colors.primaryMain,
      dark: themeOptions.colors.primaryDark,
      200: themeOptions.colors.primary200,
      800: themeOptions.colors.primary800,
    },
    secondary: {
      light: themeOptions.colors.secondaryLight,
      main: themeOptions.colors.secondaryMain,
      dark: themeOptions.colors.secondaryDark,
      200: themeOptions.colors.secondary200,
      800: themeOptions.colors.secondary800,
    },
    error: {
      light: themeOptions.colors.errorLight,
      main: themeOptions.colors.errorMain,
      dark: themeOptions.colors.errorDark,
    },
    orange: {
      light: themeOptions.colors.orangeLight,
      main: themeOptions.colors.orangeMain,
      dark: themeOptions.colors.orangeDark,
    },
    warning: {
      light: themeOptions.colors.warningLight,
      main: themeOptions.colors.warningMain,
      dark: themeOptions.colors.warningDark,
    },
    success: {
      light: themeOptions.colors.successLight,
      200: themeOptions.colors.success200,
      main: themeOptions.colors.successMain,
      dark: themeOptions.colors.successDark,
    },
    grey: {
      50: themeOptions.colors.grey50,
      100: themeOptions.colors.grey100,
      500: themeOptions.darkTextSecondary,
      600: themeOptions.heading,
      700: themeOptions.darkTextPrimary,
      900: themeOptions.textDark,
    },
    dark: {
      light: themeOptions.colors.darkTextPrimary,
      main: themeOptions.colors.darkLevel1,
      dark: themeOptions.colors.darkLevel2,
      800: themeOptions.colors.darkBackground,
      900: themeOptions.colors.darkPaper,
    },
    text: {
      primary: themeOptions.darkTextPrimary,
      secondary: themeOptions.darkTextSecondary,
      dark: themeOptions.textDark,
      hint: themeOptions.colors.grey100,
    },
    background: {
      paper: themeOptions.paper,
      default: themeOptions.backgroundDefault,
    },
  };
}
