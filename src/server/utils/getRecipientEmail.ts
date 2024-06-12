import { RecipientType } from "../../common/enums";
import { RecipientOptionType } from "../../common/types";
import { getStrapi } from "../helpers/getStrapi";
import get from "lodash/get";

export const getRecipientEmail = async (
  value: RecipientOptionType,
  collectionEntry: object,
  collectionName: string
) => {
  if (value.type === RecipientType.FROM_THE_ENTRY_RELATION) {
    const strapi = getStrapi();
    const entry = await strapi.db.query(collectionName).findOne({
      where: { id: collectionEntry["id"] },
      populate: [value.value],
    });

    const recipientEmail = get(entry, value.value);
    return recipientEmail;
  }

  if (value.type === RecipientType.CUSTOM) {
    return value.value;
  }

  if (value.type === RecipientType.FROM_MODEL) {
    return collectionEntry[value.value];
  }

  return process.env[value.value];
};
