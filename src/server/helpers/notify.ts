import { RecipientOptionType, SubscriptionEntry } from "../../common/types";
import { ConfigKeys, MailOptions, StrapiMedia } from "../types";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { isMediaEntry } from "../utils/isMediaEntry";
import { applyInterceptors } from "./applyInterceptor";
import { getAttachments } from "./getAttachments";
import { getMediasFromIds } from "./getMediasFormIds";
import { getPluginConfig } from "./getPluginConfig";
import { sendEmail } from "./sendEmail";

export const notify = async (
  subscription: SubscriptionEntry,
  recipient: RecipientOptionType,
  entry: Record<string, any>
) => {
  const mailTo = getRecipientEmail(recipient, entry);
  if (mailTo) {
    const mailOptions: MailOptions = {
      to: mailTo,
    };

    const defaultFrom = getPluginConfig(ConfigKeys.DEFAULT_MAIL_FROM);

    if (defaultFrom) {
      mailOptions.from = defaultFrom as string;
    }

    const templateData = {
      html: subscription.content,
      text: subscription.content,
      subject: subscription.subject,
    };

    if (subscription.mediaFields?.length) {
      const medias: StrapiMedia[] = [];
      const mediasToLoadIds: number[] = [];

      for (const field of subscription.mediaFields) {
        const mediaValue = entry[field];
        if (!mediaValue) {
          continue;
        }

        if (Array.isArray(mediaValue)) {
          // the value of the field on the entry is an array
          // of media file
          medias.push(...mediaValue);
          continue;
        }

        if (typeof mediaValue === "number") {
          // the value of the field on the entry is an id
          // of a media file
          mediasToLoadIds.push(mediaValue);
          continue;
        }

        if (isMediaEntry(mediaValue)) {
          medias.push(mediaValue);
          continue;
        }

        console.error(
          `Unexpected value type: ${typeof mediaValue} value: ${JSON.stringify(
            mediaValue
          )} for field: ${field}. The expected type is array or number.`
        );
      }

      // load the media file from db
      if (mediasToLoadIds.length) {
        try {
          const restFiles = await getMediasFromIds(mediasToLoadIds);
          medias.push(...restFiles);
        } catch (error) {
          console.error(
            "The error below occurred while loading the media files from the database"
          );
          console.error(error);
        }
      }

      const attachments = await getAttachments(medias);
      mailOptions.attachments = attachments;
    }

    const finalData = subscription.interceptors?.length
      ? await applyInterceptors(entry, subscription.interceptors)
      : entry;

    sendEmail(mailOptions, templateData, finalData).catch(console.error);

    return;
  }

  console.error("Unable to send e-mail because recipient cannot be found");
};
