import { useTheme } from '@mui/material/styles';

import { Avatar, Box, ButtonBase, Chip } from '@mui/material';
import { HeaderProfile } from './HeaderProfile';
import { NavigationLogo } from './Menu/NavigationLogo';

import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
  onToggleNavigationDrawer: () => void;
};

export function Header({ onToggleNavigationDrawer }: HeaderProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box component='span' sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <NavigationLogo />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant='rounded'
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={onToggleNavigationDrawer}
            color='inherit'
          >
            <MenuIcon />
          </Avatar>
        </ButtonBase>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {process.env.NODE_ENV !== 'production' && (
        <Box mr={1}>
          <Chip label={process.env.NODE_ENV} color='warning' />
        </Box>
      )}
      <HeaderProfile />
    </>
  );
}
