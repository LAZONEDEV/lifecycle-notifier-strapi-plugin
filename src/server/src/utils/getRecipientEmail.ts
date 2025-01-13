import get from 'lodash/get';
import { RecipientType } from '../../../common/enums';
import { RecipientOptionType } from '../../../common/types';
import { getStrapi } from '../helpers/getStrapi';

export const getRecipientEmail = async (
  value: RecipientOptionType,
  collectionEntry: object,
  collectionName: string
) => {
  switch (value.type) {
    case RecipientType.FROM_THE_ENTRY_RELATION:
      const strapi = getStrapi();
      const entry = await strapi.db.query(collectionName).findOne({
        where: { id: collectionEntry['id'] },
        populate: [value.value],
      });

      const recipientEmail = get(entry, value.value);
      return recipientEmail;

    case RecipientType.CUSTOM:
      return value.value;

    case RecipientType.FROM_MODEL:
      return collectionEntry[value.value];

    default:
      return process.env[value.value];
  }
};
