import { useCallback } from 'react';
import { Formik, FormikConfig, FormikValues, Form as FormikForm } from 'formik';
import { FormSubmitButton } from './FormSubmitButton';
import { FormSubmitError } from './FormSubmitError';
import { useTranslation } from 'hooks/useTranslation';

type OnSubmitFn = FormikConfig<any>['onSubmit'];
export type FormProps<V extends FormikValues> = FormikConfig<V> & {
  submitButtonLabel?: string;
};

export const Form = <V extends FormikValues>({ children, onSubmit: handleOnSubmit, submitButtonLabel, ...formikProps }: FormProps<V>) => {
  const { t } = useTranslation('components.forms.Form');

  const onSubmit = useCallback<OnSubmitFn>(
    async (...args) => {
      const [, { setErrors }] = args;
      try {
        await handleOnSubmit(...args);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrors({ submit: error.message });
        }
      }
    },
    [handleOnSubmit]
  );

  return (
    <Formik<V> onSubmit={onSubmit} {...formikProps}>
      <FormikForm>
        {children}

        <FormSubmitError />
        <FormSubmitButton label={submitButtonLabel || t('save')} />
      </FormikForm>
    </Formik>
  );
};
