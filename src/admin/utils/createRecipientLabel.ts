import { RecipientType } from "../../common/enums";
import { RecipientOptionType } from "../../common/types";

export const createRecipientLabel = (
  recipient: RecipientOptionType,
  collectionName: string
) => {
  if (recipient.type === RecipientType.CUSTOM) {
    return recipient.value;
  } else if (recipient.type === RecipientType.ENV) {
    return `ENV.${recipient.value}`;
  }
  return `${collectionName}.${recipient.value}`;
};
