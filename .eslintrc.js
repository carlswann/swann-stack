module.exports = {
  ignorePatterns: ['node_modules', '**/dist/**/*', '**/build/**/*', '**/.serverless/**/*', '**/cdk.out/**/*', '**/ui/**/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:react/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-undef': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    semi: ['error', 'always'],
    'require-atomic-updates': ['off', 'never'],
    'jsx-quotes': ['error', 'prefer-single'],
    'comma-dangle': 'off',
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-string-refs': 'off',
    // 'no-console': 'error',
    // 'quotes': ['error', 'single'],
    // 'spaced-comment': ['error', 'always']
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
};
