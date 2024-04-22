/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
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
