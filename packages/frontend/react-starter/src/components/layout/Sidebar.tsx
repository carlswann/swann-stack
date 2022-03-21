import { useTheme } from '@mui/material/styles';

import { MENU_DRAWER_WIDTH } from 'config/constants/layout';

import { Box, Drawer, useMediaQuery } from '@mui/material';

import { DrawerContent } from './Menu/DrawerContent';

type SidebarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function Sidebar({ isSidebarOpen, onToggleSidebar }: SidebarProps) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box component='nav' sx={{ flexShrink: { md: 0 }, width: matchUpMd ? MENU_DRAWER_WIDTH : 'auto' }}>
      <Drawer
        container={window.document.body}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor='left'
        open={isSidebarOpen}
        onClose={onToggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: MENU_DRAWER_WIDTH,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color='inherit'
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
