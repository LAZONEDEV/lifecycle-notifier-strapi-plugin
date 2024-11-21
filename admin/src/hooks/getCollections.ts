import { useState, useEffect } from 'react';
import { CollectionSchema } from '../types';
import { loadCollectionsSchemas, filterApiCollection } from '../utils/loadCollections';

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
