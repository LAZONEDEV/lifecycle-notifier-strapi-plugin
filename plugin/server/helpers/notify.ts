import { RecipientOptionType, SubscriptionEntry } from "../../common/types";
import { ConfigKeys, MailOptions, StrapiMedia } from "../types";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { getAttachments } from "./getAttachments";
import { getPluginConfig } from "./getPluginConfig";
import { sendEmail } from "./sendEmail";

export const notify = async (subscription: SubscriptionEntry, recipient: RecipientOptionType, entry: Record<string, any>) => {
  const mailTo = getRecipientEmail(recipient, entry);
  if (mailTo) {
    const mailOptions: MailOptions = {
      to: mailTo,
    }

    const defaultFrom = getPluginConfig(ConfigKeys.DEFAULT_MAIL_FROM);

    if(defaultFrom){
      mailOptions.from = defaultFrom as string;
    }

    const templateData = {
      html: subscription.content,
      text: subscription.content,
      subject: subscription.subject,
    };

    if(subscription.mediaFields?.length){
      const medias = subscription.mediaFields.reduce( (acc, field) => {
        if(entry[field]){
          return [...acc, ...entry[field]]
        }
        return acc;
      },[] as StrapiMedia[])

      const attachments = await getAttachments(medias)
      mailOptions.attachments =attachments
    }

    sendEmail(mailOptions, templateData, entry).catch(console.error);
  }
}