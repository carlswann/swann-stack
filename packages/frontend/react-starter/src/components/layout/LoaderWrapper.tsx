import { styled } from '@mui/material/styles';

/**
 * Sets the entire page as "loading"
 */
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  width: '100%',
});

export default LoaderWrapper;
