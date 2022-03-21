import { forwardRef, ComponentPropsWithRef, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

import { Card as MuiCard } from '@mui/material';

interface CardProps extends ComponentPropsWithRef<typeof MuiCard> {
  children?: ReactNode;
  boxShadow?: boolean;
  shadow?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, boxShadow, shadow, sx, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <MuiCard
      ref={ref}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiCard>
  );
});

export default Card;
