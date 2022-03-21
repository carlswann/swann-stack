import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { Divider, List, Typography } from '@mui/material';

import { Route } from 'routes';

import { MenuCollapse } from './MenuCollapse';
import { MenuItem } from './MenuItem';

type MenuGroupProps = {
  item: Route;
};

export function MenuGroup({ item }: MenuGroupProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  // menu list collapse & items
  const items = useMemo(
    () =>
      Object.values(item.children || {})
        .filter((item) => !item.hide)
        .map((menu) => {
          switch (menu.type) {
            case 'collapse':
              return <MenuCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
              return <MenuItem key={menu.id} item={menu} level={1} />;
            default:
              return (
                <Typography key={menu.id} variant='h6' color='error' align='center'>
                  {t('generic.routes.error')}
                </Typography>
              );
          }
        }),
    [item.children, t]
  );

  return (
    <>
      <List
        subheader={
          item.translationKey && (
            <Typography variant='caption' sx={{ ...theme.typography.menuCaption }} display='block' gutterBottom>
              {t(item.translationKey)}
              {item.captionTranslationKey && (
                <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                  {t(item.captionTranslationKey)}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
}
