import { forwardRef, ComponentPropsWithRef, ForwardRefExoticComponent, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useApp } from 'hooks/useApp';

import { appSlice } from 'state/appSlice';

import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

import { Route } from 'routes';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface LinkProps extends ComponentPropsWithRef<typeof Link> {}

type ListItemProps =
  | {
      component: ForwardRefExoticComponent<Pick<LinkProps & React.RefAttributes<HTMLAnchorElement>, 'key' | keyof LinkProps> & React.RefAttributes<HTMLAnchorElement>>;
    }
  | {
      component: string;
      href?: string;
      target?: string;
    };

type MenuItemProps = {
  item: Route;
  level: number;
};

export function MenuItem({ item, level }: MenuItemProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const { openNavigationMenuItem } = useApp();

  const isActive = useMemo(() => openNavigationMenuItem === item?.id, [item?.id, openNavigationMenuItem]);

  const Icon = item.icon;
  const itemIcon = Icon ? (
    <Icon />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isActive ? 8 : 6,
        height: isActive ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  const itemTarget = item.target ? '_blank' : '_self';

  let listItemProps: ListItemProps = !item?.external
    ? {
        component: forwardRef<HTMLAnchorElement, ComponentPropsWithRef<typeof Link>>((props, ref) => <Link ref={ref} {...props} to={item.url || ''} target={itemTarget} />),
      }
    : { component: 'a', href: item.url, target: itemTarget };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = location.pathname
      .toString()
      .split('/')
      .findIndex((id: string) => id === item.id);

    if (currentIndex > -1) {
      dispatch(appSlice.actions.setNavigationMenuItemOpen(item.id));
    }
  }, [dispatch, item.id, location.pathname]);

  const handleMenuItemClick = (id: string) => () => {
    dispatch(appSlice.actions.setNavigationMenuItemOpen(id));

    if (matchesSM) {
      dispatch(appSlice.actions.setNavigationDrawerState(false));
    }
  };

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: '8px',
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={isActive}
      onClick={handleMenuItemClick(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={isActive ? 'h5' : 'body1'} color='inherit'>
            {t(item.translationKey)}
          </Typography>
        }
        secondary={
          item.captionTranslationKey && (
            <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
              {t(item.captionTranslationKey)}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
}
