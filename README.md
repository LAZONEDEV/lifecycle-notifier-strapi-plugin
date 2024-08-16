# Strapi Plugin - Lifecycle Notifier

The **Lifecycle Notifier** plugin for Strapi enhances your application with robust lifecycle event notifications. It enables you to track and get notified about significant events, such as entity creation, updates, and deletions, through customizable email notifications.

## Features

- **Email Notifications:** Receive notifications for entity creation, updates, and deletions.
- **Customizable Templates:** Personalize email content with dynamic placeholders.
- **Intuitive Configuration:** Easy setup and management via the Strapi admin interface.

## Installation

Follow these steps to install and configure the Lifecycle Notifier plugin:

1. **Install the Plugin:**
   Make sure you have Strapi installed and running. Then, install the Lifecycle Notifier plugin by running:

   ```bash
   npm install lifecycle-notifier --save
   ```

2. **Restart Strapi Server:**
   After installation, restart your Strapi server to apply the changes.

3. **Access Plugin Configuration:**
   Log in to your Strapi administration interface. Navigate to the "Lifecycle Notifier" section in the sidebar.
   ![Plugin item in the sidebar menu](assets/plugin_item_in_side_bar.png)

## Adding and Managing Subscriptions

### Adding Subscriptions

1. **Create a New Subscription:**
   In the "Lifecycle Notifier" section, click on the "Add Subscription" button. Fill out the form in the modal that appears.

2. **Form Fields Description:**

   | Field                | Description                                                                                               |
   | -------------------- | --------------------------------------------------------------------------------------------------------- |
   | `Subject`            | Subject line for the notification email.                                                                  |
   | `Related collection` | Name of the collection for which the subscription is created.                                             |
   | `Event to listen`    | Type of event to trigger the notification (e.g., 'create', 'update', 'delete').                           |
   | `Recipient`          | Information about recipients who will receive notifications.                                              |
   | `Template`           | Email content in plain text or HTML format with placeholders for dynamic data (e.g., `<%= fieldName %>`). |
   | `File to join`       | Information about media fields to include in the notification email.                                      |

### Template Customization

Customize your email templates to include dynamic content from the collection. Use placeholders like `<%= fieldName %>` which will be replaced with actual data when the notification is triggered.

**Example Template:**

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

When a new product is added, placeholders like `<%= productName %>` will be replaced with actual product details.

### Managing Subscriptions

From the plugin’s home page, you can manage (update, delete) existing subscriptions.

## Recipient Types

- **ENV (Environment Variable):** Use environment variables for dynamic recipient email addresses. Define recipients in the plugin configuration using the `envRecipients` field.

  **Example Configuration:**

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

- **MODEL (Collection Field):** Reference email addresses from fields within the collection that triggered the event.

- **CUSTOM:** Specify custom email addresses directly in the subscription configuration.

## Adding Subscriptions via Configuration

You can also configure subscriptions directly in the plugin configuration file to maintain them in your base code.

**Example Configuration:**

```json
{
  "lifecycle-notifier": {
    "enabled": true,
    "resolve": "../plugin",
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
          "content": "Just send the name: <%= name %>",
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

## Plugin Configurations

Customize the plugin behavior with the following configuration options:

**Example Configuration:**

```json
{
  "envRecipients": ["TEST_RECIPIENT_EMAIL"],
  "defaultFrom": "env('DEFAULT_MAIL_FROM')",
  "subscriptions": []
}
```

- **`envRecipients`:** List of environment variables for recipient emails.
- **`defaultFrom`:** Default sender email address.
- **`subscriptions`:** List of configured subscriptions.

## Contributions

Contributions are welcome! To contribute:

1. Fork the repository and clone it to your machine.
2. Install dependencies with `npm install`.
3. Make your changes and test them with Strapi.
4. Submit a pull request with a detailed description of your changes.

## License

This plugin is distributed under the MIT license. See the LICENSE file for more information.
