import { subscriptionCollectionUid } from "../../../common/constants";
import { SubscriptionEntry } from "../../../common/types";

const checkExistingSubs = async (subs: SubscriptionEntry) => {
  try {
    // Check if subscription already exists
    const alreadyExists = await strapi.db
      .query(subscriptionCollectionUid)
      .findOne({
        where: {
          collectionName: subs.collectionName,
          subject: subs.subject,
        },
      });
    if (!alreadyExists) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export default checkExistingSubs;
