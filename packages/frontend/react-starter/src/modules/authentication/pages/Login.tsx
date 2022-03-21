import { useEffect } from 'react';
import { useTranslation } from 'hooks/useTranslation';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_ROUTE, MAIN_ROUTE } from 'config/constants/routes';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import Card from 'components/ui/extended/Card';
import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';
import { LoginForm } from '../components/forms/LoginForm';
import { useAuthentication } from 'hooks/useAuthentication';

import Logo from 'assets/images/logo.svg';

type LocationState = {
  from: Location;
};

function Login() {
  const { t } = useTranslation('modules.authentication.pages.Login');
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthentication();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  // Redirect the user away from this page if they're already logged in
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const locationState = location.state as LocationState;
    const url = locationState?.from?.pathname !== BASE_ROUTE ? locationState?.from?.pathname : null;
    const redirectUrl = url || MAIN_ROUTE;
    navigate(redirectUrl, { replace: true });
  }, [isAuthenticated, navigate, location.state]);

  return (
    <SlideUpVisibleAnimation distance={100}>
      <Card
        sx={{
          maxWidth: { xs: 400, lg: 475 },
          margin: { xs: 2.5, md: 3 },
          '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item sx={{ mb: 3 }}>
              <img src={Logo} alt='Logo' width='50' />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems='center' justifyContent='center'>
                <Grid item>
                  <Stack alignItems='center' justifyContent='center' spacing={1}>
                    <Typography gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                      {t('loginFormTitle')}
                    </Typography>
                    <Typography variant='caption' fontSize='16px' textAlign={matchDownSM ? 'center' : 'inherit'}>
                      {t('loginFormSubtitle')}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </SlideUpVisibleAnimation>
  );
}

export default Login;
