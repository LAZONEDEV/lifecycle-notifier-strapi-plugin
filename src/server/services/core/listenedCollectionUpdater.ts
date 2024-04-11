import { subscriptionCollectionUid } from "../../../common/constants";
import { listenedCollection } from "../../constants/listenedCollection";
import { SubscriptionEntry } from "../../../common/types";
import { EventType } from "../../../common/enums";
import type { SubscriberFn } from "@strapi/database/lib/lifecycles/subscribers";
import { notify } from "../../helpers/notify";
import { getSubscriptionsForCollection } from "../../helpers/getSubsForCollection";
import { getEntryWithRelation } from "../../helpers/getEntryWithRelation";
import { CollectionEntry } from "../../types";
import { updateListenedCollectionOnChangeOnSubsCollection } from "./updateListenedCollectionSet";


export const listenSubscriptionCollectionUpdate = async () => {
  strapi.db.lifecycles.subscribe(
    updateListenedCollectionOnChangeOnSubsCollection
  );
};

export const loadExistingSubscriptions = async () => {
  const subscriptionRecords: SubscriptionEntry[] = await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({});

  subscriptionRecords.forEach((record) => {
    listenedCollection.add(record.collectionName);
  });
};

export const handleEventSubscription: SubscriberFn = async (event) => {
  const willSendNotification = !!(
    listenedCollection.has(event.model.uid) && new Set(Object.values(EventType))
  );

  if (!willSendNotification) {
    return;
  }

  const collectionUid = event.model.uid;
  const createdEntry = event.result || event.params.data;

  const relatedSubscriptions = await getSubscriptionsForCollection(
    collectionUid
  );

  for (const relatedSubscription of relatedSubscriptions) {
    notifyForSubscription(relatedSubscription, createdEntry as CollectionEntry);
  }
};

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
      ? await getEntryWithRelation(
          subscription.collectionName,
          entry,
          relationsToPopulate
        )
      : entry;
    if (!entryWithRelations) {
      return;
    }
    subscription.recipients?.forEach?.((recipient) => {
      notify(subscription, recipient, entryWithRelations).catch((error) => {
        console.error(
          `This error occurred will sending a notification for ${subscription.subject}`,
          error
        );
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const listenChangeOnCollection = async () => {
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    async afterCreate(event) {
      handleEventSubscription(event);
    },
  });
};
