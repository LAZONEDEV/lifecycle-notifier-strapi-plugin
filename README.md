# Strapi Plugin - Lifecycle Notifier

The Lifecycle Notifier Strapi plugin is designed to add a lifecycle notification feature to your Strapi application. It allows you to track and receive notifications about important events happening in your application.

## Features

- Email notification when a new entity is created.
- Email notification when an entity is updated.
- Email notification when an entity is deleted.
- Customization of email templates for notifications.
- Easy and intuitive configuration via the Strapi administration interface.

## Installation

To install the Lifecycle Notifier plugin, follow the steps below:

Make sure you have Strapi installed in your project.

Run the following command to install the plugin:

```bash
npm install lifecycle-notifier --save
```

Restart your Strapi server to apply the changes.

Log in to the Strapi administration interface, go to the "Lifecycle Notifier" section.
![Plugin item in the sidebar menu](assets/plugin_item_in_side_bar.png)

## Start adding subscriptions

To add a subscription form the admin interface, click on the "Add Subscription" button. Add fill the form in the modal.

| Field                | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Subject`            | The subject of the subscription. It is used as Subject while sending the notification mail.                    |
| `Related collection` | The name of the collection for which the subscription is created.                                              |
| `Event to listen`    | The type of event for which the subscription will trigger (e.g., 'create', 'update', 'delete').                |
| `Recipient`          | Contains recipient information to receive the subscription notifications.                                    |
| `Template`           | The content of the subscription notification. It can be in plain text or HTML template format. You can include the listened collection data using this syntax: `<%= fieldName %>` |
| `File to join`       | Contains information about media fields (fields of the listened collection) to include in the subscription. |

### Template customization

The `Template` field allows you to define the content of the subscription notification. You can provide either plain text or an HTML template. The template can include dynamic placeholders that will be replaced with actual data from the listened collection when the notification is triggered.

Example:
Let's say you have a subscription for the 'Product' collection to receive notifications when new products are created. Your template could look like this:

```html
<h2>New Product Created!</h2>
<p>Hello <%= clientName %>,</p>
<p>We are excited to inform you that a new product has been added to our collection.</p>
<p>Product Details:</p>
<ul>
  <li><strong>Name:</strong> <%= productName %></li>
  <li><strong>Price:</strong> $<%= productPrice %></li>
  <li><strong>Category:</strong> <%= productCategory %></li>
</ul>
<p>Thank you for using our service!</p>
```

In this example, we have used placeholders like <%= clientName %>, <%= productName %>, <%= productPrice %>, and <%= productCategory %> in the HTML template. When the notification is triggered, these placeholders will be dynamically replaced with the actual data from the new product that triggered the event. For instance, if a new product with the name "Super Widget" and the price "$19.99" is added, the notification email will look like:

```html
<h2>New Product Created!</h2>
<p>Hello John,</p>
<p>We are excited to inform you that a new product has been added to our collection.</p>
<p>Product Details:</p>
<ul>
  <li><strong>Name:</strong> Super Widget</li>
  <li><strong>Price:</strong> $19.99</li>
  <li><strong>Category:</strong> Electronics</li>
</ul>
<p>Thank you for using our service!</p>
```

Once the subscription is created, the plugin will automatically send the notification email when the event is triggered.

You cant also manage ( update, delete) subscriptions form the plugin home page.

Contribution
Contributions are welcome! If you want to improve the Lifecycle Notifier plugin, please follow the steps below:

Fork this repository and clone it to your machine.

Install dependencies using npm install.

Make your modifications and improvements.

Test the changes with Strapi.

Submit a pull request with a detailed description of the changes made.

## Recipient Types

The Recipient field can have three types: `ENV`, `MODEL`, and `CUSTOM`.

- `ENV` (Environment Variable) Recipient:
Recipients of type ENV are defined in the plugin configurations and must reference an environment variable that contains the email address. This allows you to dynamically set the recipient email based on the value of the specified environment variable. You can add it using the `envRecipients` config field. See example below

```json
{
  // ...
  "lifecycle-notifier": {
    enabled: true,
    resolve: "../plugin",
    config: {
      envRecipients: ["TEST_RECIPIENT_EMAIL"],
    },
  },
  // ...
}
```

- `MODEL` Recipient:
Recipients of type MODEL reference the email field on the collection being listened to. This means that the email address for the recipient will be fetched from the email fields of the respective collection entry that triggered the notification. You can specify these fields within `Recipient` field in the subscription creation form.


- `CUSTOM` Recipient:
You can use this type when you add subscriptions in the plugins configurations. Learn more about how to add subscriptions in the plugins configurations below.

## Adding subscriptions from plugin configurations

You can also add subscriptions from the plugin configuration. This allows you to keep subscription in you base code make independents on your database.

```json
{
  // ...
  "lifecycle-notifier": {
    enabled: true,
    resolve: "../plugin",
    config: {
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
  }
  // ...
}
```

## Plugin configurations

Example configuration

```json
// ...
{
  // Define environment variable recipients for the plugin. The plugin will fetch the email address from the environment variable "TEST_RECIPIENT_EMAIL".
  envRecipients: ["TEST_RECIPIENT_EMAIL"],

  // Set the default sender email address for the notifications using the value from the environment variable "DEFAULT_MAIL_FROM".
  defaultFrom: env("DEFAULT_MAIL_FROM"),

  // Define the list of subscriptions.
  subscriptions: [] 
}
// ...
```

## Contributions



## License
This plugin is distributed under the MIT license. See the LICENSE file for more information.

