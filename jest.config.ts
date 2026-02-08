/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '\\.js$': ['babel-jest', { configFile: './Configuration/babel.config.testing.js' }]
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

export default config;
