import { Outlet } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { AppWrapper } from '../components/layout/AppWrapper';
import { Footer } from '../components/layout/Footer';

export function GuestLayout() {
  return (
    <AppWrapper>
      <Grid container direction='column' justifyContent='flex-end' sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <Footer />
        </Grid>
      </Grid>
    </AppWrapper>
  );
}
