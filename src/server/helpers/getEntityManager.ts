import { subscriptionCollectionUid } from "../../common/constants";

export const getCollectionEntityManager = (collectionUid: string) => {
  return strapi.db.query(collectionUid); 
}

export const getSubscriptionEntityManager = () => {
  return getCollectionEntityManager(subscriptionCollectionUid);
};

export const getMediaFileEntityManager = () => {
  return getCollectionEntityManager("plugin::upload.file");
}