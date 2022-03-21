import { useMemo, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useApp } from 'hooks/useApp';
import { useTheme } from '@mui/material/styles';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { LOGIN_ROUTE } from 'config/constants/routes';
import { routes } from 'routes';

import { appSlice } from 'state/appSlice';
import { authenticationSlice } from 'modules/authentication/state/authenticationSlice';

import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';

import { AppNavWrapper } from '../components/layout/AppNavWrapper';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Breadcrumbs } from 'components/ui/extended/Breadcrumbs';

export function AuthenticatedLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, authToken } = useAuthentication();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const { isNavigationDrawerOpen } = useApp();

  const jwtExpirationMilliseconds = useMemo(() => {
    if (!authToken) {
      return null;
    }

    const decodedJwt = jwtDecode<JwtPayload>(authToken);
    return decodedJwt.exp! * 1000;
  }, [authToken]);

  const isJwtExpired = jwtExpirationMilliseconds! < Date.now();

  // dispatch the logout action if the token is expired
  useEffect(() => {
    if (isJwtExpired) {
      dispatch(authenticationSlice.actions.logout());
    }
  }, [isJwtExpired, dispatch]);

  useEffect(() => {
    dispatch(appSlice.actions.setNavigationDrawerState(!matchDownMd));
  }, [matchDownMd, dispatch]);

  if (!isAuthenticated || isJwtExpired) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
  }

  function handleNavigationDrawerToggle() {
    dispatch(appSlice.actions.setNavigationDrawerState(!isNavigationDrawerOpen));
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        enableColorOnDark
        position='fixed'
        color='inherit'
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: isNavigationDrawerOpen ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar>
          <Header onToggleNavigationDrawer={handleNavigationDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar isSidebarOpen={isNavigationDrawerOpen} onToggleSidebar={handleNavigationDrawerToggle} />
      <AppNavWrapper theme={theme} isNavigationDrawerOpen={isNavigationDrawerOpen}>
        <Breadcrumbs navigation={routes} icon title rightAlign />
        <Outlet />
      </AppNavWrapper>
    </Box>
  );
}
