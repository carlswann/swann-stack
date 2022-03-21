import { ThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { store } from './state/store';
import GlobalStyle from 'theme/GlobalStyle';

import Router from './Router';

function App() {
  const theme = useCustomTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <GlobalStyle />
          <CssBaseline />
          <Router />
        </ReduxProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
