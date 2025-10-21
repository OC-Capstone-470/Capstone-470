module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Optional: Exclude node_modules except for specific packages if needed
  transformIgnorePatterns: ['/node_modules/(?!(@testing-library|axios-mock-adapter)/)'],
};
