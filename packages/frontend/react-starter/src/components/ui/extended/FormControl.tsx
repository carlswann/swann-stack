import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

import { FormControl as MuiFormControl } from '@mui/material';

import InputErrorAnimation from 'components/ui/animations/InputErrorAnimation';

interface FormControlProps extends ComponentPropsWithoutRef<typeof MuiFormControl> {
  children?: ReactNode;
}

function FormControl({ children, ...rest }: FormControlProps) {
  const theme = useTheme();

  return (
    <InputErrorAnimation hasErrors={Boolean(rest.error)}>
      <MuiFormControl sx={{ ...theme.typography.customInput }} {...rest}>
        {children}
      </MuiFormControl>
    </InputErrorAnimation>
  );
}

export default FormControl;
