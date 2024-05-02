import { RecipientType } from "../../../common/enums";
import { RecipientOptionType } from "../../../common/types";
import {
  getRecipientStringValue,
  getRecipientTypeFromString,
} from "../recipientStringValue";

describe("test suite for getRecipientStringValue utility", () => {
  it("should return the concatenated string of recipient type and value", () => {
    const recipient = {
      type: RecipientType.CUSTOM,
      value: "example@example.com",
    } as RecipientOptionType;

    const result = getRecipientStringValue(recipient);
    expect(result).toBe(`${recipient.type}.${recipient.value}`);
  });
});

describe("test suite for getRecipientTypeFromString utility", () => {
  it("should return the recipient option type object from the concatenated string", () => {
    const value = "email.example@example.com";
    const result = getRecipientTypeFromString(value);
    expect(result).toEqual({ type: "email", value: "example@example.com" });
  });

  it("should handle values without separator", () => {
    const value = "invalidvalue";
    const result = getRecipientTypeFromString(value);
    expect(result).toEqual({ type: "", value: "invalidvalue" });
  });
});
