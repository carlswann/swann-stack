import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { Route } from 'routes';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MenuItem } from './MenuItem';

type MenuCollapseProps = {
  menu: Route;
  level: number;
};

export function MenuCollapse({ menu, level }: MenuCollapseProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === menu.id);

    if (currentIndex > -1) {
      setIsOpen(true);
      setSelected(menu.id);
    } else {
      setIsOpen(false);
      setSelected(null);
    }
  }, [menu.id]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setSelected(!selected ? menu.id : null);
  };

  const menus = useMemo(
    () =>
      Object.values(menu.children || {}).map((item) => {
        switch (item.type) {
          case 'collapse':
            return <MenuCollapse key={item.id} menu={item} level={level + 1} />;
          case 'item':
            return <MenuItem key={item.id} item={item} level={level + 1} />;
          default:
            return (
              <Typography key={item.id} variant='h6' color='error' align='center'>
                {t('generic.routes.error')}
              </Typography>
            );
        }
      }),
    [level, menu.children, t]
  );

  const Icon = menu.icon;
  const menuIcon = Icon ? (
    <Icon style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: '8px',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? 'h5' : 'body1'} color='inherit' sx={{ my: 'auto' }}>
              {t(menu.translationKey)}
            </Typography>
          }
          secondary={
            menu.captionTranslationKey && (
              <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                {t(menu.captionTranslationKey)}
              </Typography>
            )
          }
        />
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <List
          component='div'
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
}
