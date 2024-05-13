/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest/setup.ts"],
  setupFiles: ["./jest/jest.pollyfills.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
