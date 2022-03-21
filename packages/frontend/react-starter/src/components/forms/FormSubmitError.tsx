import React from 'react';
import { useFormikContext } from 'formik';
import { Box, FormHelperText } from '@mui/material';

export const FormSubmitError: React.FC = () => {
  const {
    errors: { submit: submitError },
  } = useFormikContext();

  if (!submitError) {
    return null;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <FormHelperText error>{submitError}</FormHelperText>
    </Box>
  );
};
