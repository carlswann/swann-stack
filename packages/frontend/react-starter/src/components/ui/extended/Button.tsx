import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Button as MuiButton } from '@mui/material';

import ButtonAnimation from 'components/ui/animations/ButtonAnimation';

export interface ButtonProps extends ComponentPropsWithoutRef<typeof MuiButton> {
  children?: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ButtonAnimation>
      <MuiButton {...rest}>{children}</MuiButton>
    </ButtonAnimation>
  );
}
