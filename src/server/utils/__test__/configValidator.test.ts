import { EventType, RecipientType } from "../../../common/enums";
import { validateConfig } from "../configValidator";

describe("validateConfig", () => {
  it("should validate a correct configuration object", () => {
    const validConfig = {
      subscriptions: [
        {
          subject: "Example Subject",
          collectionName: "Example Collection",
          eventType: EventType.AfterCreate,
          recipients: [
            {
              type: RecipientType.CUSTOM,
              value: "example@example.com",
            },
          ],
          content: "Example Content",
        },
      ],
      envRecipients: ["example1@example.com", "example2@example.com"],
      defaultFrom: "default@example.com",
      interceptors: [
        {
          name: "Example Interceptor",
          callback: () => console.log("Interceptor callback"),
        },
      ],
    };

    expect(() => validateConfig(validConfig)).not.toThrow();
  });

  it("should throw error for invalid configuration object", () => {
    const invalidConfig = {
      subscriptions: [
        {
          subject: "Example Subject",
          collectionName: "Example Collection",
          eventType: "INVALID_EVENT_TYPE",
          recipients: [
            {
              type: "INVALID_RECIPIENT_TYPE",
              value: "example@example.com",
            },
          ],
          content: "Example Content",
        },
      ],
      envRecipients: ["example1@example.com", "example2@example.com"],
      defaultFrom: "default@example.com",
      interceptors: [
        {
          name: "Example Interceptor",
          callback: "invalid callback",
        },
      ],
    };

    expect(() => validateConfig(invalidConfig)).toThrow();
  });
});
