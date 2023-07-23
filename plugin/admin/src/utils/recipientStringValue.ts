import { RecipientType } from "../../../common/enums";
import { RecipientOptionType } from "../../../common/types";

/**
 * these utilities is created because strapi Select component
 * does not support value that is not string type.
 * These helpers make some transformation to provide string 
 * to Strapi select component and keep object in formik context
 */

export const getRecipientStringValue = (recipient: RecipientOptionType) => {
  return `${recipient.type}.${recipient.value}`;
};

export const getRecipientTypeFromString = (
  value: string
): RecipientOptionType => {
  const separationIndex = value.indexOf(".");
  return {
    type: value.substring(0, separationIndex) as RecipientType,
    value: value.substring(separationIndex + 1),
  };
};
