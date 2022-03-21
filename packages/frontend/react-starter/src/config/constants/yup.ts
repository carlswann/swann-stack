export const YUP_ERROR_KEYS = {
  MIXED: {
    DEFAULT: 'mixed.default',
    REQUIRED: 'mixed.required',
    ONEOF: 'mixed.oneOf',
    NOTONEOF: 'mixed.notOneOf',
    NOTTYPE: 'mixed.notType',
    DEFINED: 'mixed.defined',
  },
  STRING: {
    LENGTH: 'string.length',
    MIN: 'string.min',
    MAX: 'string.max',
    MATCHES: 'string.matches',
    EMAIL: 'string.email',
    URL: 'string.url',
    UUID: 'string.uuid',
    TRIM: 'string.trim',
    LOWERCASE: 'string.lowercase',
    UPPERCASE: 'string.uppercase',
  },
  NUMBER: {
    MIN: 'number.min',
    MAX: 'number.max',
    LESSTHAN: 'number.lessThan',
    MORETHAN: 'number.moreThan',
    POSITIVE: 'number.positive',
    NEGATIVE: 'number.negative',
    INTEGER: 'number.integer',
  },
  DATE: {
    MIN: 'date.min',
    MAX: 'date.max',
  },
  BOOLEAN: {
    ISVALUE: 'boolean.isValue',
  },
  OBJECT: {
    NOUNKNOWN: 'object.noUnknown',
  },
  ARRAY: {
    MIN: 'array.min',
    MAX: 'array.max',
    LENGTH: 'array.length',
  },
};
