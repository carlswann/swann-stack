import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setLocale } from 'yup';

import LanguageDetector from 'i18next-browser-languagedetector';

import { i18nextTranslations } from 'locales';
import { YUP_ERROR_KEYS } from 'config/constants/yup';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: i18nextTranslations,
    defaultNS: 'translations',
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV !== 'production',
  });

/**
 * Yup doesn't handle localization very well. Aside from having to provide
 * an actual object with your translations, once your schema was created,
 * changing the locale has no effect. As such, the best approach is to change
 * the error messages to i18n keys that we can then display in the language
 * we want.
 *
 * The value of each key is the path to where the translation exists.
 *
 * These fields are defined as part of the current version installed v0.32.11
 * https://github.com/jquense/yup/blob/d072af33b84acef4f2bd355ff5637048edb95bae/src/locale.ts
 */
setLocale({
  mixed: {
    default: YUP_ERROR_KEYS.MIXED.DEFAULT,
    required: YUP_ERROR_KEYS.MIXED.REQUIRED,
    oneOf: ({ values }) => ({ key: YUP_ERROR_KEYS.MIXED.ONEOF, values: { values } }),
    notOneOf: ({ values }) => ({ key: YUP_ERROR_KEYS.MIXED.NOTONEOF, values: { values } }),
    notType: ({ type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value;

      return {
        key: YUP_ERROR_KEYS.MIXED.NOTTYPE,
        values: {
          type,
          value,
          originalValue: isCast ? originalValue : undefined,
        },
      };
    },
    defined: YUP_ERROR_KEYS.MIXED.DEFINED,
  },
  string: {
    length: ({ length }) => ({ key: YUP_ERROR_KEYS.STRING.LENGTH, values: { length } }),
    min: ({ min }) => ({ key: YUP_ERROR_KEYS.STRING.MIN, values: { min } }),
    max: ({ max }) => ({ key: YUP_ERROR_KEYS.STRING.MAX, values: { max } }),
    matches: ({ regex }) => ({ key: YUP_ERROR_KEYS.STRING.MATCHES, values: { regex } }),
    email: YUP_ERROR_KEYS.STRING.EMAIL,
    url: YUP_ERROR_KEYS.STRING.URL,
    uuid: YUP_ERROR_KEYS.STRING.UUID,
    trim: YUP_ERROR_KEYS.STRING.TRIM,
    lowercase: YUP_ERROR_KEYS.STRING.LOWERCASE,
    uppercase: YUP_ERROR_KEYS.STRING.UPPERCASE,
  },
  number: {
    min: ({ min }) => ({ key: YUP_ERROR_KEYS.NUMBER.MIN, values: { min } }),
    max: ({ max }) => ({ key: YUP_ERROR_KEYS.NUMBER.MAX, values: { max } }),
    lessThan: ({ less }) => ({ key: YUP_ERROR_KEYS.NUMBER.LESSTHAN, values: { less } }),
    moreThan: ({ more }) => ({ key: YUP_ERROR_KEYS.NUMBER.MORETHAN, values: { more } }),
    positive: YUP_ERROR_KEYS.NUMBER.POSITIVE,
    negative: YUP_ERROR_KEYS.NUMBER.NEGATIVE,
    integer: YUP_ERROR_KEYS.NUMBER.INTEGER,
  },
  date: {
    min: ({ min }) => ({ key: YUP_ERROR_KEYS.DATE.MIN, values: { min } }),
    max: ({ max }) => ({ key: YUP_ERROR_KEYS.DATE.MAX, values: { max } }),
  },
  boolean: {
    isValue: ({ value }) => ({ key: YUP_ERROR_KEYS.BOOLEAN.ISVALUE, values: { value } }),
  },
  object: {
    // For some reason it complains that unknown doesn't exist, but it does.
    // @ts-ignore-next-line
    noUnknown: ({ unknown }) => ({ key: YUP_ERROR_KEYS.OBJECT.NOUNKNOWN, values: { unknown } }),
  },
  array: {
    min: ({ min }) => ({ key: YUP_ERROR_KEYS.ARRAY.MIN, values: { min } }),
    max: ({ max }) => ({ key: YUP_ERROR_KEYS.ARRAY.MAX, values: { max } }),
    length: ({ length }) => ({ key: YUP_ERROR_KEYS.ARRAY.LENGTH, values: { length } }),
  },
});

export default i18n;
