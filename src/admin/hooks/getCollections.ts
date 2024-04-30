import { useState, useEffect } from "react";
import { CollectionSchema } from "../types";
import { loadCollectionsSchemas, filterApiCollection } from "../utils/loadCollections";

export const useCollections = () => {
  const [collections, setCollections] = useState<CollectionSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const [request, abort] = loadCollectionsSchemas();
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

  return {collections, loading}
}
