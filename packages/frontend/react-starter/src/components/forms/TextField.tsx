import React from 'react';
import { useFormikContext, getIn } from 'formik';
import useFormErrors from 'hooks/useFormErrors';
import { TranslationKey } from 'locales';
import FormControl from 'components/ui/extended/FormControl';
import { FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

export type TextFieldProps = OutlinedInputProps & {
  name: string;
  errorTranslationKey: TranslationKey;
};

export const TextField: React.FC<TextFieldProps> = ({ errorTranslationKey, ...outlinedInputProps }) => {
  const { name, label } = outlinedInputProps;

  const { displayError } = useFormErrors();
  const { values, touched: touchedFields, errors, handleBlur, handleChange, isSubmitting } = useFormikContext<any>();

  const touched = getIn(touchedFields, name);
  const error = getIn(errors, name);

  const inputId = `${name}-input`;
  const isError = touched && !!error;

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel htmlFor={inputId}>{label}</InputLabel>

      <OutlinedInput
        id={inputId}
        value={getIn(values, name)}
        onBlur={handleBlur}
        onChange={handleChange}
        label={label}
        inputProps={{}}
        disabled={isSubmitting}
        {...outlinedInputProps}
      />

      {isError && (
        <FormHelperText error id={`${inputId}-helper-text`}>
          {displayError(error, errorTranslationKey)}
        </FormHelperText>
      )}
    </FormControl>
  );
};
