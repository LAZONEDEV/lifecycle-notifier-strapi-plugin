export const getCollectionNameFormUid = (uid: string) => {
  const [_,collectionName] = uid.split(".")
  return collectionName
}
