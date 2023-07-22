import { EventType, RecipientType } from "../../common/enums";
import { Validator } from "jsonschema";

const subscriptionSchema = {
  type: "object",
  properties: {
    uuid: {
      type: "string",
    },
    title: {
      type: "string",
    },
    collectionName: {
      type: "string",
    },
    eventType: {
      type: "string",
      enum: [Object.values(EventType)],
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
  required: ["title", "collectionName", "eventType", "recipients", "content"],
};

const configSchema = {
  type: "object",
  properties: {
    subscriptions: {
      type: "array",
      items: subscriptionSchema,
    },
  },
  required: [],
};

export const validate = (conf: any) => {
  const validator = new Validator();
  return validator.validate(conf, configSchema);
};
