const nextJest = require('next/jest');

const nextJestConfig = nextJest({ dir: './' });

const jestConfig = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    'api-lib(.*)': '<rootDir>/src/api-lib/$1',
    'components(.*)': '<rootDir>/src/components/$1',
    'hooks(.*)': '<rootDir>/src/hooks/$1',
    'pages(.*)': '<rootDir>/src/pages/$1',
  },
};

module.exports = nextJestConfig(jestConfig);
