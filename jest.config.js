module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__tests__'],
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};