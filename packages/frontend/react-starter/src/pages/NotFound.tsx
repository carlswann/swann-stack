import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import { MAIN_ROUTE } from 'config/constants/routes';

import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';
import { Button } from 'components/ui/extended/Button';

import Logo from 'assets/images/logo.svg';
import HomeIcon from '@mui/icons-material/Home';

function NotFound() {
  const { t } = useTranslation();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SlideUpVisibleAnimation distance={100}>
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item sx={{ mb: 3 }}>
            <img src={Logo} alt='Logo' width='100' />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems='center' justifyContent='center'>
              <Grid item>
                <Stack alignItems='center' justifyContent='center' spacing={1}>
                  <Typography gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                    {t('pages.NotFound.title')}
                  </Typography>
                  <Typography variant='subtitle2' fontSize='16px' textAlign={matchDownSM ? 'center' : 'inherit'}>
                    {t('pages.NotFound.subtitle')}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction='column' alignItems='center' xs={12}>
              <Button startIcon={<HomeIcon />} variant='contained' href={MAIN_ROUTE}>
                {t('pages.NotFound.action')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </SlideUpVisibleAnimation>
  );
}

export default NotFound;
