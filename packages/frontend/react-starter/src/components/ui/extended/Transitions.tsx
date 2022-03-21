import { ReactNode } from 'react';

import { Collapse, Fade, Box, Grow, Slide, Zoom } from '@mui/material';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';

type TransitionDirection = 'up' | 'down' | 'left' | 'right';

interface TransitionProps extends MuiTransitionProps {
  children?: ReactNode;
  transitionType?: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
  transitionPosition?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
  transitionDirection?: TransitionDirection;
}

export const Transitions = ({ children, transitionPosition = 'top-left', transitionType = 'grow', transitionDirection = 'up', ...rest }: TransitionProps) => {
  let positionSX = {
    transformOrigin: '0 0 0',
  };

  switch (transitionPosition) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right',
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top',
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left',
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right',
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom',
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0',
      };
      break;
  }

  return (
    <Box>
      {transitionType === 'grow' && (
        <Grow {...rest}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {transitionType === 'collapse' && (
        <Collapse {...rest} sx={positionSX}>
          {children}
        </Collapse>
      )}
      {transitionType === 'fade' && (
        <Fade
          {...rest}
          timeout={{
            appear: 500,
            enter: 600,
            exit: 400,
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
      {transitionType === 'slide' && (
        <Slide
          {...rest}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200,
          }}
          direction={transitionDirection as TransitionDirection}
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}
      {transitionType === 'zoom' && (
        <Zoom {...rest}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
};
