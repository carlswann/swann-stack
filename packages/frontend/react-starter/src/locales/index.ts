import enUsTranslations from 'locales/en-US';

export const i18nextTranslations = {
  'en-US': {
    translations: enUsTranslations,
  },
};

export type TranslationKey = Paths<typeof enUsTranslations>;
export type ValidationTranslationKey = Paths<typeof enUsTranslations.generic.formValidation>;
