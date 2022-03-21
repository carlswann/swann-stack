import { useTranslation } from 'hooks/useTranslation';

import { Link, Button, Typography, Stack } from '@mui/material';

export function Footer() {
  const { i18n } = useTranslation();

  function handleLanguageToggle() {
    if (i18n.language === 'en-US') {
      i18n.changeLanguage('fr-CA');
    } else {
      i18n.changeLanguage('en-US');
    }
  }

  return (
    <Stack direction='row' justifyContent='space-between'>
      <Typography variant='subtitle2' component={Link} href='https://renorun.ca' target='_blank' underline='hover'>
        renorun.ca
      </Typography>
      <Button onClick={handleLanguageToggle}>{i18n.language === 'en-US' ? 'FR' : 'EN'}</Button>
    </Stack>
  );
}
