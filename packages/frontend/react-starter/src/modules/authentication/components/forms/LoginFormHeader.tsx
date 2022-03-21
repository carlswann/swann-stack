import React from 'react';
import { useTranslation } from 'hooks/useTranslation';

import { Button } from 'components/ui/extended/Button';
import { authenticationSlice } from '../../state/authenticationSlice';
import { appApi } from 'apis/app/api';

import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

import Google from 'assets/images/icons/social-google.svg';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useFirebase } from '../../hooks/useFirebase';

const { useReadDemoQuery } = appApi;

export const LoginFormHeader: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('modules.authentication.components.LoginForm');
  const firebase = useFirebase();
  const dispatch = useAppDispatch();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  // const [readCurrentUser] = useReadDemoQuery();

  const loginWithGoogle = async () => {
    // const { user } = await firebase.loginWithGoogle();
    // const authToken = await user.getIdToken();
    // const currentUser = await readCurrentUser({ authToken }).unwrap();
    // dispatch(authenticationSlice.actions.login({ authToken, currentUser }));
  };

  return (
    <Grid container direction='column' justifyContent='center' spacing={2}>
      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          onClick={loginWithGoogle}
          size='large'
          variant='outlined'
          sx={{
            color: 'grey.700',
            backgroundColor: theme.palette.grey[50],
            borderColor: theme.palette.grey[100],
          }}
        >
          <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
            <img src={Google} alt='google' width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
          </Box>
          {t('googleSignInAction')}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />

          <Button
            variant='outlined'
            sx={{
              cursor: 'unset',
              m: 2,
              py: 0.5,
              px: 7,
              borderColor: `${theme.palette.grey[100]} !important`,
              color: `${theme.palette.grey[900]} !important`,
              fontWeight: 500,
            }}
            disableRipple
            disabled
          >
            {t('or')}
          </Button>

          <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
        </Box>
      </Grid>
      <Grid item xs={12} container alignItems='center' justifyContent='center'>
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle1'>{t('emailSignInTitle')}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
