import { subscriptionCollectionUid } from "../../../common/constants";
import { SubscriptionEntry } from "../../../common/types";
import { listenedCollection } from "../../constants/listenedCollection";
import { getSubscriptionsForCollection } from "../../helpers/getSubsForCollection";
import type { SubscriberFn } from "@strapi/database/lib/lifecycles/subscribers";

/**
 * This handle update the `listenedCollection` constant when update
 * is done on subscription collection. It intend to keep `listenedCollection`
 * up to date.
 *
 * @param event Event
 * @returns void
 */
export const updateListenedCollectionOnChangeOnSubsCollection: SubscriberFn =
  async (event) => {
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
  };