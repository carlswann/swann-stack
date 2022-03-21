import { styled, Theme } from '@mui/material/styles';

import { MENU_DRAWER_WIDTH } from 'config/constants/layout';

export const AppNavWrapper = styled('main', { shouldForwardProp: (prop) => prop !== 'isNavigationDrawerOpen' })<{
  theme: Theme;
  isNavigationDrawerOpen?: boolean;
}>(({ theme, isNavigationDrawerOpen }) => ({
  ...theme.typography.mainContent,
  ...(!isNavigationDrawerOpen && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(MENU_DRAWER_WIDTH - 20),
      width: `calc(100% - ${MENU_DRAWER_WIDTH}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${MENU_DRAWER_WIDTH}px)`,
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${MENU_DRAWER_WIDTH}px)`,
      padding: '16px',
      marginRight: '10px',
    },
  }),
  ...(isNavigationDrawerOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${MENU_DRAWER_WIDTH}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  }),
}));
