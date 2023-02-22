export default {
  setupFilesAfterEnv: ['<rootDir>/jest-preload-env.js'],
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testTimeout: 20000,
  moduleNameMapper: {
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
};