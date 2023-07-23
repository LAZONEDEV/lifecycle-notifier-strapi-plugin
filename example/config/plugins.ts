export default ({ env }) => ({
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
    resolve: "../plugin",
    config: {
      envRecipients: ["TEST_RECIPIENT_EMAIL"],
      defaultFrom: env("DEFAULT_MAIL_FROM"),
      subscriptions: [
        {
          collectionName: "api::planet.planet",
          eventType: "afterCreate",
          recipients: [
            {
              type: "CUSTOM",
              value: "custom@gmail.com",
            },
          ],
          content: "Just send the name: <%= name =>",
          mediaFields: ["image"],
          createdAt: "2023-07-23T19:34:24.654Z",
          updatedAt: "2023-07-23T20:01:03.075Z",
          subject: "Testing subs in config",
        },
      ],
    },
  },
});
