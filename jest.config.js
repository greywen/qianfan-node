const { defaults } = require('jest-config');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 60000,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts', 'd.ts'],
};
