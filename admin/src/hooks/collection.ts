import { useMemo } from 'react';
import { CollectionSchema } from '../types';

interface UseCollectionFieldTypeParams {
  collections: CollectionSchema[];
  fieldType: string;
  collectionId: string;
}

export const useCollectionFieldType = ({
  collectionId,
  collections,
  fieldType,
}: UseCollectionFieldTypeParams) => {
  const fields = useMemo(() => {
    const collection = collections.find((item) => item.uid === collectionId);
    if (!collection) return [];
    const colNames = Object.keys(collection.attributes);
    const mediaCols = colNames.filter(
      (colName) => collection.attributes[colName].type === fieldType
    );
    return mediaCols;
  }, [collectionId, collections, fieldType]);

  return fields;
};
