import { subscriptionCollectionUid } from "../../common/constants";

export const getSubscriptionEntityManager = () => {
  return strapi.db.query(subscriptionCollectionUid);
};
