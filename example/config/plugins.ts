import { resolve } from "node:path";

const discoveredDateFormatterInterceptor = {
  name: "discoveryDateFormatter",
  callback: (entry: Record<string, string>) => {
    const date = entry["discoveryDate"];
    if (date) {
      return {
        formattedDiscoveryDate: new Date(date).toLocaleString(),
      };
    }
  },
};

const pluginDir = __dirname.includes("dist")
  ? resolve(__dirname, "../../../")
  : resolve(__dirname, "../../");

export default ({ env }) => {
  return {
    // ...
    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: env("SMTP_HOST", "smtp.example.com"),
          port: env("SMTP_PORT", 587),
          auth: {
            user: env("SMTP_USERNAME"),
            pass: env("SMTP_PASSWORD"),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: "hello@example.com",
          defaultReplyTo: "hello@example.com",
        },
      },
    },
    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    "lifecycle-notifier": {
      enabled: true,
      resolve: pluginDir,
      config: {
        envRecipients: ["TEST_RECIPIENT_EMAIL"],
        defaultFrom: env("DEFAULT_MAIL_FROM"),
        subscriptions: [
          {
            collectionName: "api::planet.planet",
            eventType: "afterCreate",
            recipients: [
              {
                type: "FROM_THE_ENTRY_RELATION",
                value: "createdBy.email",
              },
            ],
            content:
              "The planet <%= name %> has been discovered on <%= formattedDiscoveryDate %>!",
            mediaFields: ["image"],
            createdAt: "2023-07-23T19:34:24.654Z",
            updatedAt: "2023-07-23T20:01:03.075Z",
            subject: "Testing subs in config",
          },
          {
            collectionName: "api::planet.planet",
            eventType: "afterUpdate",
            recipients: [
              {
                type: "FROM_THE_ENTRY_RELATION",
                value: "createdBy.email",
              },
            ],
            content:
              "The planet <%= name %> has been discovered on <%= formattedDiscoveryDate %>!",
            mediaFields: ["image"],
            createdAt: "2023-07-23T19:34:24.654Z",
            updatedAt: "2023-07-23T20:01:03.075Z",
            subject: "Testing subs in config",
          },
          {
            collectionName: "api::planet.planet",
            eventType: "afterDelete",
            recipients: [
              {
                type: "FROM_THE_ENTRY_RELATION",
                value: "createdBy.email",
              },
            ],
            content:
              "The planet <%= name %> has been discovered on <%= formattedDiscoveryDate %>!",
            mediaFields: ["image"],
            createdAt: "2023-07-23T19:34:24.654Z",
            updatedAt: "2023-07-23T20:01:03.075Z",
            subject: "Testing subs in config",
          },
        ],
        interceptors: [discoveredDateFormatterInterceptor],
      },
    },
  };
};
