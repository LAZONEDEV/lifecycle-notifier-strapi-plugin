import { CollectionEntry } from '../types';
import { getCollectionEntityManager } from './getEntityManager';

export const getEntryWithRelation = async (
  collectionUid: string,
  entry: CollectionEntry,
  relationsToPopulate: string[]
) => {
  try {
    const collectionEM = getCollectionEntityManager(collectionUid);
    if (!collectionEM) {
      console.error(`Failed to get entity manager for collection ${collectionUid}`);
      return;
    }

    const entryWithRelation = await collectionEM.findOne({
      where: { id: entry.id },
      populate: relationsToPopulate,
    });

    if (!entryWithRelation) {
      console.error(`Failed to find entry with id ${entry.id} in collection ${collectionUid}`);
    }

    return entryWithRelation;
  } catch (error) {
    console.error('The error occurred while retrieving entry with its relation');
    console.error(error);
  }
};
