import { CollectionSchema } from '../types';
import { filterApiCollection, loadCollectionsSchemas } from '../utils/loadCollections';
import { useEffect, useState } from 'react';

export const useCollections = (token: string) => {
  const [collections, setCollections] = useState<CollectionSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const [request, abort] = loadCollectionsSchemas(token);
    request.then((result) => {
      if (result) {
        const apiCollections = filterApiCollection(result.data);
        setCollections(apiCollections);
      }
      setLoading(false);
    });

    return () => {
      abort();
    };
  }, []);

  return { collections, loading };
};
