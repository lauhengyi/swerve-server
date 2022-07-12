/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/*global module*/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },

  globalSetup: './src/testUtils/globalSetup.ts',
  globalTeardown: './src/testUtils/globalTeardown.ts'
};
