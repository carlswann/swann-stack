import React from 'react';
import { useFormikContext } from 'formik';
import { Box } from '@mui/material';
import { Button, ButtonProps } from 'components/ui/extended/Button';

type ButtonPropsToOmit = 'disabled' | 'type' | 'onClick' | 'children';
export type FormSubmitButtonProps = Omit<ButtonProps, ButtonPropsToOmit> & {
  label: string;
};

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ label, ...buttonProps }) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Box sx={{ mt: 2 }}>
      <Button disableElevation disabled={isSubmitting} fullWidth size='large' type='submit' variant='contained' {...buttonProps}>
        {label}
      </Button>
    </Box>
  );
};
