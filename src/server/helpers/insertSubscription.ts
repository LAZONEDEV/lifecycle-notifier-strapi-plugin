import { SubscriptionEntry } from "../../common/types";
import { getSubscriptionEntityManager } from "./getEntityManager";

export const insertSubscription = (subscription: SubscriptionEntry) => {
  const em = getSubscriptionEntityManager();
  return em.create({ data: subscription });
};
