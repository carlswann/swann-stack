import { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'hooks/useTranslation';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAppDispatch } from 'hooks/useAppDispatch';

import { authenticationSlice } from 'modules/authentication/state/authenticationSlice';

import { Avatar, Box, Chip, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from '@mui/material';

import Card from 'components/ui/extended/Card';
import { Transitions } from 'components/ui/extended/Transitions';

import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';

export function HeaderProfile() {
  const { t, i18n } = useTranslation('layouts.components.HeaderProfile');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthentication();

  const [isOpen, setIsOpen] = useState(false);

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);

  function handleToggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function handleClose(event: MouseEvent | TouchEvent) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsOpen(false);
  }

  function handleLanguageToggle() {
    if (i18n.language === 'en-US') {
      i18n.changeLanguage('fr-CA');
    } else {
      i18n.changeLanguage('en-US');
    }
  }

  function handleLogout() {
    dispatch(authenticationSlice.actions.logout());
  }

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.secondary.light,
          backgroundColor: theme.palette.secondary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.secondary.main,
            background: `${theme.palette.secondary.main} !important`,
            color: theme.palette.secondary.light,
            '& svg': {
              stroke: theme.palette.secondary.light,
            },
          },
        }}
        icon={
          <Avatar
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
              backgroundColor: theme.palette.secondary.main,
            }}
            ref={anchorRef}
            aria-controls={isOpen ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            color='inherit'
          >
            <SettingsIcon sx={{ color: theme.palette.secondary.contrastText }} />
          </Avatar>
        }
        label={currentUser && currentUser.firstName}
        variant='outlined'
        ref={anchorRef}
        aria-controls={isOpen ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggleIsOpen}
        color='secondary'
      />
      <Popper
        placement='bottom-end'
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={isOpen} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={16} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction='row' spacing={0.5} alignItems='center'>
                        <Typography variant='h4'>{t('greeting')},</Typography>
                        <Typography component='span' variant='h4' sx={{ fontWeight: 400 }}>
                          {currentUser && currentUser.firstName}
                        </Typography>
                      </Stack>
                      <Typography variant='subtitle2'>{currentUser && currentUser.email}</Typography>
                    </Stack>
                    <Divider />
                    <List
                      component='nav'
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        paddingBottom: 0,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%',
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton onClick={handleLanguageToggle} sx={{ borderRadius: '8px' }}>
                        <ListItemIcon>
                          <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText secondary={<Typography variant='body2'>{i18n.language === 'en-US' ? 'FR' : 'EN'}</Typography>} />
                      </ListItemButton>

                      <ListItemButton onClick={handleLogout} sx={{ borderRadius: '8px' }} color='secondary'>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText secondary={<Typography variant='body2'>{t('logout')}</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
}
