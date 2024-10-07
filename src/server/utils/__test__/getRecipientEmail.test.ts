import { RecipientType } from "../../../common/enums";
import { RecipientOptionType } from "../../../common/types";
import { getRecipientEmail } from "../getRecipientEmail";

describe("test suite for getRecipientEmail", () => {
  it("should return recipient email for custom recipient type", async () => {
    const recipient: RecipientOptionType = {
      type: RecipientType.CUSTOM,
      value: "test@te.st",
    };

    const returnValue = await getRecipientEmail(recipient, {}, "");
    expect(returnValue).toBe("test@te.st");
  });

  it("should return recipient email for from model recipient type", async () => {
    const recipient: RecipientOptionType = {
      type: RecipientType.FROM_MODEL,
      value: "email",
    };
    const email = "email@test.st";

    const returnValue = await getRecipientEmail(recipient, { email }, "");
    expect(returnValue).toBe(email);
  });

  it("should return recipient email for env recipient type", async () => {
    const recipient: RecipientOptionType = {
      type: RecipientType.ENV,
      value: "EMAIL",
    };

    const email = "env@test.st";
    process.env["EMAIL"] = email;
    const returnValue = await getRecipientEmail(recipient, {}, "");

    expect(returnValue).toBe(email);

    process.env["EMAIL"] = undefined;
  });
});
