import { useTheme } from '@mui/material/styles';
import { BrowserView, MobileView } from 'react-device-detect';

import { Box, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { MenuList } from './MenuList';
import { NavigationLogo } from './NavigationLogo';

export function DrawerContent() {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <NavigationLogo />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component='div'
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );
}
