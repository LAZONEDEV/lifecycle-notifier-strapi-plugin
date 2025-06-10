import { get } from "lodash";
import { RecipientType } from "../../common/enums";
import { FieldMapping, RecipientOptionType } from "../../common/types";
import { getStrapi } from "../helpers/getStrapi";

export const getRecipientEmail = async (
  value: RecipientOptionType,
  collectionEntry: object,
  collectionName: string
) => {
  switch (value.type) {
    case RecipientType.FROM_THE_ENTRY_RELATION:
      const strapi = getStrapi();
      const entry = await strapi.db.query(collectionName).findOne({
        where: { id: collectionEntry["id"] },
        populate: [value.value],
      });

      const recipientEmail = get(entry, value.value as string);
      return recipientEmail;

    case RecipientType.CUSTOM:
      return value.value;

    case RecipientType.FROM_MODEL:
      return collectionEntry[value.value as string];

    case RecipientType.FROM_ENTRY_FIELD_MAPPING:
      try {
        const rules = value.value as FieldMapping;

        const fieldToUse = rules.field;

        if (!fieldToUse) {
          console.error(
            "No field specified for FROM_ENTRY_FIELD_MAPPING recipient"
          );
          return null;
        }

        const strapiInstance = getStrapi();
        const entry = await strapiInstance.db.query(collectionName).findOne({
          where: { id: collectionEntry["id"] },
          populate: [fieldToUse],
        });

        // Get the value of the field
        const fieldValue = get(entry, fieldToUse);

        // Find the matching mapping
        const mapping = rules.targets.find(
          (m) => m.value.toLowerCase() === fieldValue.toLowerCase()
        );

        if (mapping && mapping.email) {
          return mapping.email;
        }

        // Return default email if specified and no mapping found
        if (rules.defaultEmail) {
          return rules.defaultEmail;
        }

        return null;
      } catch (error) {
        console.error(
          "Error processing FROM_ENTRY_FIELD_MAPPING recipient:",
          error
        );
        return null;
      }

    default:
      return process.env[value.value as string];
  }
};
