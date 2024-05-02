/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest/setup.ts"],
  globals: {
    Request,
    Response,
    fetch,
    TextEncoder,
    structuredClone,
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
