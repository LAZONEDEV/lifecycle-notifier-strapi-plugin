export const getCollectionNameFormUid = (uid: string) => {
  const collectionName = uid.split(".")[1];
  return collectionName;
};
