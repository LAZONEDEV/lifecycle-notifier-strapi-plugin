# Strapi Plugin - Lifecycle Notifier

The Lifecycle Notifier Strapi plugin is designed to add a lifecycle notification feature to your Strapi application. Get notified via email about entity creation, updates, and deletions, with customizable email templates and intuitive configuration.

## Key Features

- [x] **Instant Email Alerts**: Receive email notifications immediately when a new entry is added to any collection.
- [x] **Update Notifications**: Coming soon! Get notified when existing entries are modified.
- [x] **Deletion Alerts**: Coming soon! Be alerted whenever an entry is removed.
- [x] **Customizable Email Templates**: Personalize your notification emails with flexible template options.
- [x] **User-Friendly Configuration**: Easily set up and manage notifications through Strapi’s intuitive admin interface.

## Installation

Follow these simple steps to install the **Lifecycle Notifier** plugin:

1. **Ensure Strapi is setup**: Confirm that your project already has Strapi set up and running.
2. **Install the Plugin**: Run the following command to add the Lifecycle Notifier plugin to your project:

   ```bash
   npm install lifecycle-notifier --save
   ```

3. **Add the plugin in your configuration** open your project plugin settings file and add these lines

   ```js
   {
    // other on configs...
     "lifecycle-notifier": {
        enabled: true,
        config: {},
     }
   }
   ```

4. **Restart Your Server**: Once the installation is complete, restart your Strapi server to apply the plugin changes.
5. **Access the Plugin**: Log in to the Strapi administration panel, then navigate to the "Lifecycle Notifier" section in the sidebar.

![The plugin link in the sidebar](https://github.com/user-attachments/assets/c23557ea-e260-4a71-b52c-a4f5b49acaed)

## Start adding subscriptions

To add a subscription form in the admin interface, follow these steps:

1. Click the **"Add new Subscription"** button.
2. Fill in the form in the modal that appears.

### Subscription Form Fields

| **Field**              | **Description**                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Subject`              | The subject of the subscription, used as the subject line in the notification emails.                                                      |
| `Related collection`   | The name of the collection associated with the subscription.                                                                               |
| `Event to listen`      | The event type that triggers the subscription (e.g., `create`, `update`, `delete`).                                                        |
| `Recipient`            | Specifies the recipient who will receive the notification emails.                                                                          |
| `Template`             | The content of the notification, which can be in plain text or HTML. You can dynamically include collection data using `<%= fieldName %>`. |
| `File to join`         | Allows you to attach media files from the collection to the notification email.                                                            |
| `Relation to populate` | Defines the relationship field to populate within the entry, enabling you to display related values in the email notification.             |
| `Interceptors`         | This allows you to use javascript to transform the data before sending the notification                                                    |

## Template Customization

The `Template` field lets you define the content of your subscription notification. You can use plain text or HTML, and include dynamic placeholders that are automatically replaced with actual data from the associated entry when the notification is triggered.

Example:
Suppose you have a subscription set up for the 'Product' collection, and you want to receive notifications when new products are added. Your template might look like this:

```html
<h2>New Product Created!</h2>
<p>Hello <%= clientName %>,</p>
<p>
  We are excited to inform you that a new product has been added to our
  collection.
</p>
<p>Product Details:</p>
<ul>
  <li><strong>Name:</strong> <%= productName %></li>
  <li><strong>Price:</strong> $<%= productPrice %></li>
  <li><strong>Category:</strong> <%= productCategory %></li>
</ul>
<p>Thank you for using our service!</p>
```

In this template, placeholders like <%= clientName %>, <%= productName %>, <%= productPrice %>, and <%= productCategory %> are used. When the notification is triggered, these placeholders will be replaced with real data from the new product. For example, if a new product called "Super Widget" with a price of "$19.99" is created, the email might look like this:

```html
<h2>New Product Created!</h2>
<p>Hello John,</p>
<p>
  We are excited to inform you that a new product has been added to our
  collection.
</p>
<p>Product Details:</p>
<ul>
  <li><strong>Name:</strong> Super Widget</li>
  <li><strong>Price:</strong> $19.99</li>
  <li><strong>Category:</strong>Electronics</li>
</ul>
<p>Thank you for using our service!</p>
```

Once you’ve created the subscription, the plugin will automatically send the notification email whenever the specified event (e.g., product creation) occurs.

Additionally, you can manage subscriptions—update or delete them—directly from the plugin's home page.

## Recipient Types

The Recipient field can have three types value: `ENV`, `MODEL`, and `CUSTOM`.

- `ENV` (Environment Variable) Recipient:
  Recipients of type ENV are defined in the plugin configurations and must reference an environment variable that contains the email address. This allows you to dynamically set the recipient email based on the value of the specified environment variable. You can add it using the `envRecipients` config field. See example below

```json
{
  "lifecycle-notifier": {
    "enabled": true,
    "resolve": "../plugin",
    "config": {
      "envRecipients": ["TEST_RECIPIENT_EMAIL"]
    }
  }
}
```

- `MODEL` Recipient:
  Recipients of type MODEL reference the email field on the collection being listened to. This means that the email address for the recipient will be fetched from the email fields of the respective collection entry that triggered the notification. You can specify these fields within `Recipient` field in the subscription creation form.

- `CUSTOM` Recipient:
  You can use this type when you add subscriptions in the plugins configurations. Learn more about how to add subscriptions in the plugins configurations below.

## Interceptors

An Interceptor is a JavaScript function defined in your plugin configuration that allows you to modify or compute new values for the entry being processed. These new values can then be used within the notification template.

Here is the TypeScript type for an interceptor:

```ts
export interface Interceptor {
  name: string;
  callback: (
    entry: Record<string, any>
  ) => Promise<Record<string, any>> | undefined;
}
```

- `name` : The name of the interceptor, displayed in the admin modal. This allows you to select which interceptors to apply when creating a subscription. Ensure that each interceptor has a unique name, as duplicate names will result in the last defined interceptor replacing the previous ones.

- `callback` : A function that takes the current entry data as input and returns a modified version of the entry or undefined. This function processes the entry data and can either return a new object with additional or modified fields, or undefined if no modifications are needed. The returned object will be merged with the original entry data, with any overlapping keys having their values replaced by the returned ones.

Example: Consider the following interceptor that formats a date field

```ts
const discoveredDateFormatterInterceptor = {
  name: "discoveryDateFormatter",
  callback: (entry: Record<string, string>) => {
    const date = entry["discoveryDate"];

    return {
      formattedDiscoveryDate: new Date(date).toLocaleString(),
    };
  },
};
```

In this example, the interceptor adds a new key, `formattedDiscoveryDate`, to the entry. This key can then be used in the notification template to display the formatted date.

> [!NOTE] The callback function must return an object and this object will append to the original entry. Then if you return an object that have a key which also exist on the original entry then the value on the entry will be replace with the new value you returned.

## Adding subscriptions from plugin configurations

You can also add subscriptions from the plugin configuration. This allows you to keep subscription in you base code make independents on your database.

```json
{
  "lifecycle-notifier": {
    "enabled": true,
    "config": {
      "subscriptions": [
        {
          "collectionName": "api::planet.planet",
          "eventType": "afterCreate",
          "recipients": [
            {
              "type": "CUSTOM",
              "value": "custom@gmail.com"
            }
          ],
          "content": "Just send the name: <%= name =>",
          "mediaFields": ["image"],
          "createdAt": "2023-07-23T19:34:24.654Z",
          "updatedAt": "2023-07-23T20:01:03.075Z",
          "subject": "Testing subs in config"
        }
      ]
    }
  }
}
```

> [!NOTE] Be aware of a limitation with the current implementation: the plugin loads your subscriptions only once, at the initial startup when it first discovers the subscriptions in your configuration. Consequently, any changes such as updates, deletions, or removals of subscriptions ( in the plugins config ) will not be reflected even you restart.

## Plugin configurations

Example configuration

```js
{
  // Define environment variable recipients for the plugin. The plugin will fetch the email address from the environment variable "TEST_RECIPIENT_EMAIL".
  envRecipients: ["TEST_RECIPIENT_EMAIL"],

  // Set the default sender email address for the notifications using the value from the environment variable "DEFAULT_MAIL_FROM".
  defaultFrom: env("DEFAULT_MAIL_FROM"),

  // Define the list of subscriptions.
  subscriptions: []

  interceptors: []
}
```

## How are e-mails sent ?

The plugin use your email provider that your setup to send notifications.
[Check how to setup email provider in Strapi](https://docs.strapi.io/cloud/advanced/email)

## Contributing

Read [more](./CONTRIBUTING.md)

## Contributions

[@BOCOVO](https://github.com/BOCOVO) [@Valentino-Houessou](https://github.com/Valentino-Houessou) [@LewisYann](https://github.com/LewisYann) [@vladnacht](https://github.com/vladnacht) [@cliffordten](https://github.com/cliffordten)

## License

This plugin is distributed under the MIT license. See the LICENSE file for more information.
