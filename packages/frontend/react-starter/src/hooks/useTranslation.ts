import { useTranslation as BaseUseTranslation, UseTranslationOptions, KeyPrefix, DefaultNamespace } from 'react-i18next';

export type TranslationNamespace = DefaultNamespace<'en-US'>;
export type TranslationKeyPrefix = KeyPrefix<TranslationNamespace>;

export const useTranslation = (keyPrefix?: TranslationKeyPrefix, options?: UseTranslationOptions) => {
  return BaseUseTranslation(undefined, {
    keyPrefix,
    ...options,
  });
};
