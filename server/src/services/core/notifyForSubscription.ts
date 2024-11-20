import { SubscriptionEntry } from '../../common/types';
import { getEntryWithRelation } from '../../helpers/getEntryWithRelation';
import { notify } from '../../helpers/notify';
import { CollectionEntry } from '../../types';

export const notifyForSubscription = async (
  subscription: SubscriptionEntry,
  entry: CollectionEntry
) => {
  try {
    const relationsToPopulate = [
      ...(subscription.relations ? subscription.relations : []),
      ...(subscription.mediaFields ? subscription.mediaFields : []),
    ];

    const entryWithRelations = relationsToPopulate.length
      ? await getEntryWithRelation(subscription.collectionName, entry, relationsToPopulate)
      : entry;

    if (!entryWithRelations) {
      return;
    }

    subscription.recipients?.forEach?.((recipient) => {
      notify(subscription, recipient, entryWithRelations).catch((error) => {
        console.error(
          `This error occurred while sending a notification for ${subscription.subject}`,
          error
        );
      });
    });
  } catch (error) {
    console.error(error);
  }
};
