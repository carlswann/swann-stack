import { styled } from '@mui/material/styles';

/**
 * General app wrapper to include everywhere
 */
export const AppWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
}));
