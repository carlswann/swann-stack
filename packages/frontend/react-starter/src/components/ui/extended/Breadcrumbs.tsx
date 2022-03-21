import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { Routes, Route } from 'routes';
import SvgIcon from '@mui/material/SvgIcon';

import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center',
};

type BreadcrumbsProps = {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation: Routes;
  rightAlign?: boolean;
  separator?: typeof SvgIcon;
  title?: boolean;
  titleBottom?: boolean;
};

export const Breadcrumbs = ({ card, divider, icon, icons, maxItems, navigation, rightAlign, separator, title, titleBottom, ...rest }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const iconStyle = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  const [main, setMain] = useState<Route>();
  const [item, setItem] = useState<Route>();

  // set active item state
  const getCollapse = (menu: Route) => {
    if (menu.children) {
      Object.values(menu.children).filter((collapse) => {
        if (collapse?.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (document.location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    Object.values(navigation).map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  // item separator
  const SeparatorIcon = separator;
  const separatorIcon = SeparatorIcon ? <SeparatorIcon /> : <ChevronRightIcon />;

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (main && main.type === 'collapse') {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography variant='subtitle1' sx={linkSX}>
        {icons && <CollapseIcon style={iconStyle} />}
        {t(main.translationKey)}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = t(item.translationKey) as string;

    ItemIcon = item.icon ? item.icon : AccountTreeTwoToneIcon;
    itemContent = (
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          textDecoration: 'none',
          alignContent: 'center',
          alignItems: 'center',
          color: 'grey.500',
        }}
      >
        {icons && <ItemIcon style={iconStyle} />}
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <Card
          sx={{
            marginBottom: card === false ? 0 : theme.spacing(3),
            border: card === false ? 'none' : '1px solid',
            borderColor: theme.palette.primary.light,
            background: card === false ? 'transparent' : theme.palette.background.default,
          }}
          {...rest}
        >
          <Box sx={{ p: 2, pl: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? 'row' : 'column'}
              justifyContent={rightAlign ? 'space-between' : 'flex-start'}
              alignItems={rightAlign ? 'center' : 'flex-start'}
              spacing={1}
            >
              {title && !titleBottom && (
                <Grid item>
                  <Typography variant='h3' sx={{ fontWeight: 500 }}>
                    {t(item.translationKey)}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <MuiBreadcrumbs
                  sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
                  aria-label='breadcrumb'
                  maxItems={maxItems || 8}
                  separator={separatorIcon}
                >
                  <Typography color='inherit' variant='subtitle1' sx={linkSX}>
                    {icons && <HomeTwoToneIcon sx={iconStyle} />}
                    {icon && <HomeIcon sx={{ ...iconStyle, mr: 0 }} />}
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && titleBottom && (
                <Grid item>
                  <Typography variant='h3' sx={{ fontWeight: 500 }}>
                    {t(item.translationKey)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && <Divider sx={{ borderColor: theme.palette.primary.main, mb: 3 }} />}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};
