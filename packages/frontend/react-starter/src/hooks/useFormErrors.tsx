import { useTranslation } from 'hooks/useTranslation';
import { ValidationTranslationKey, TranslationKey } from 'locales';

type YupTranslatedError = {
  key: ValidationTranslationKey;
  values?: object;
};

/**
 * Yup validation and i18n work but need a little bit of help. This is a useful
 * hook to be able to display translated form error messages correctly.
 */
function useFormErrors() {
  const { t } = useTranslation('generic.formValidation');

  return {
    displayError: (yupError: string | YupTranslatedError, fieldNameKeyPath?: TranslationKey) => {
      if (typeof yupError === 'string') {
        return t(yupError as ValidationTranslationKey, {
          path: fieldNameKeyPath || 'generic.formValidation.field',
        });
      }

      if (typeof yupError === 'object' && yupError.key) {
        const values = {
          ...(yupError.values || {}),
          path: fieldNameKeyPath || 'generic.formValidation.field',
        };
        return t(yupError.key, values);
      }

      console.error('useFormErrors: Invalid error value type provided. Cannot translate.', yupError);
      return '';
    },
  };
}

export default useFormErrors;
