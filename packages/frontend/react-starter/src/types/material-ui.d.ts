import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions, Typography as MuiTypography } from '@mui/material/styles';

/**
 * Custom material UI theme fields
 */
declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    typography: Typography;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends MuiThemeOptions {}
  interface Typography extends MuiTypography {
    fontFamily: CSSProperties['fontFamily'];
    customInput: CSSProperties;
    mainContent: CSSProperties;
    menuCaption: CSSProperties;
    subMenuCaption: CSSProperties;
    commonAvatar: CSSProperties;
    smallAvatar: CSSProperties;
    mediumAvatar: CSSProperties;
    largeAvatar: CSSProperties;
  }
  export function createTheme(options?: ThemeOptions): Theme;
}
