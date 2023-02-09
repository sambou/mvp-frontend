const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig()();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      '\\.svg': '<rootDir>/__mocks__/svg.js',
      ...nextJestConfig.moduleNameMapper,
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
};

module.exports = jestConfig;
