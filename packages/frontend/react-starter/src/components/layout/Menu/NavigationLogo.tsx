import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from 'config/constants/routes';

import { ButtonBase } from '@mui/material';

import LogoFull from 'assets/images/logo_full.png';

export function NavigationLogo() {
  return (
    <ButtonBase disableRipple component={Link} to={MAIN_ROUTE}>
      <img src={LogoFull} alt='Logo' height='32' />
    </ButtonBase>
  );
}
