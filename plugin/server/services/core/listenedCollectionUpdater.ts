import { subscriptionCollectionUid } from "../../../common/constants";
import { listenedCollection } from "../../constants/listenedCollection";
import { SubscriptionEntry } from "../../../common/types";
import { EventType } from "../../../common/enums";
import type { SubscriberFn } from "@strapi/database/lib/lifecycles/subscribers";
import { notify } from "../../helpers/notify";
import { getSubscriptionsForCollection } from "../../helpers/getSubsForCollection";

export const listenCollectionUpdate = async () => {
  strapi.db.lifecycles.subscribe(async (event) => {
    const isModifyingEvent = ["beforeCreate", "afterDelete"].includes(
      event.action
    );
    if (!isModifyingEvent) {
      return;
    }

    const isSubscriptionCollection =
      event.model.uid === subscriptionCollectionUid;
    if (!isSubscriptionCollection) {
      return;
    }

    const collectionName = (event?.params?.data as unknown as SubscriptionEntry)
      ?.collectionName;

    if (!collectionName) return;

    if (event.action === "afterDelete") {
      const existing = await getSubscriptionsForCollection(collectionName);
      if (!existing.length) {
        listenedCollection.delete(collectionName);
      }
    } else {
      listenedCollection.add(collectionName);
    }
  });
};

export const loadExistingSubscriptions = async () => {
  const subscriptionRecords: SubscriptionEntry[] = await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({});

  subscriptionRecords.forEach((record) => {
    listenedCollection.add(record.collectionName);
  });
};

const handleEventSubscription: SubscriberFn = async (event) => {
  const willSendNotification = !!(
    listenedCollection.has(event.model.uid) && new Set(Object.values(EventType))
  );

  if (!willSendNotification) {
    return;
  }

  const collectionUid = event.model.uid;
  const createdEntry = event.params.data;

  const relatedSubscriptions = await getSubscriptionsForCollection(
    collectionUid
  );

  for (const relatedSubscription of relatedSubscriptions) {
    relatedSubscription.recipients.forEach((recipient) => {
      notify(relatedSubscription, recipient, createdEntry)
    });
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
