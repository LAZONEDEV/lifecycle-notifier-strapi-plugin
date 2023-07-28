import { EventType, RecipientType } from "../../common/enums";
import { Validator } from "jsonschema";

export const subscriptionSchema = {
  type: "object",
  properties: {
    subject: {
      type: "string",
    },
    collectionName: {
      type: "string",
    },
    eventType: {
      type: "string",
      enum: Object.values(EventType),
    },
    recipients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: Object.keys(RecipientType),
          },
          value: {
            type: "string",
          },
        },
        required: ["type", "value"],
      },
    },
    content: {
      type: "string",
    },
    mediaFields: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["subject", "collectionName", "eventType", "recipients", "content"],
};

export const subscriptionsSchema = {
  type: "array",
  items: subscriptionSchema,
}

const envRecipientsSchema = {
  type: "array",
  items: {
    type: "string",
  },
}

const configSchema = {
  type: "object",
  properties: {
    subscriptions: subscriptionsSchema,
    envRecipients: envRecipientsSchema,
    defaultFrom: {
      type: "string"
    }
  },
  required: [],
};

export const validateConfig = (conf: any) => {
  const validator = new Validator();
  return validator.validate(conf, configSchema);
};
