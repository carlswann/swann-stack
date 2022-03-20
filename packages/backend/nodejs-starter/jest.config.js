const { defaults: tsjPreset } = require('ts-jest/presets');
const baseConfig = require('../../../jest.config.base');
const packageName = require('./package.json').name.split('@swann-stack/').pop();

module.exports = {
  ...baseConfig,
  name: packageName,
  displayName: packageName,

  rootDir: '../../..',
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '\\.[jt]s$': ['babel-jest', { root: __dirname, cwd: __dirname }],
  },
  transform: tsjPreset.transform,
  testPathIgnorePatterns: [`<rootDir>/packages/backend/${packageName}/config`],
  modulePathIgnorePatterns: [`<rootDir>/packages/backend/${packageName}/dist`],
  testMatch: [`<rootDir>/packages/backend/${packageName}/test/**/*.test.ts`],
  setupFilesAfterEnv: [
    `<rootDir>/packages/backend/${packageName}/test/jest-setup.ts`,
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
};
