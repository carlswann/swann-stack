import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { routes, Route } from 'routes';

import { MenuGroup } from './MenuGroup';

export function MenuList() {
  const { t } = useTranslation();

  const menuList = useMemo(
    () =>
      Object.values(routes)
        .filter((route) => !route.hide)
        .map((item: Route) => {
          switch (item.type) {
            case 'group':
              return <MenuGroup key={item.id} item={item} />;
            default:
              return (
                <Typography key={item.id} variant='h6' color='error' align='center'>
                  {t('generic.routes.error')}
                </Typography>
              );
          }
        }),
    [t]
  );

  return <>{menuList}</>;
}
