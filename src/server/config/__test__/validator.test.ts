import { describe, expect, it, jest } from "@jest/globals";
import { validateConfig } from "../../utils/configValidator";
import Validator from "../index";

jest.mock("../../utils/configValidator", () => ({
  validateConfig: jest.fn(),
}));

describe("validator function", () => {
  it("should throw an error if validateConfig returns errors", () => {
    // Arrange
    const mockError = { stack: "Error stack trace" };
    (validateConfig as jest.Mock).mockReturnValue({ errors: [mockError] });

    // Act and Assert
    expect(() => Validator.validator({})).toThrowErrorMatchingSnapshot();
  });
});

