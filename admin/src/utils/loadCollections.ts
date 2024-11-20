import { apiRoutes } from '../constants/apiRoutes';
import { CollectionSchema, CollectionSchemaResult } from '../types';
import fetchInstance from './fetchInstance';

export const loadCollectionsSchemas = () => {
  const controller = new AbortController();

  const result = fetchInstance.get<CollectionSchemaResult>(apiRoutes.contentTypes, {
    signal: controller.signal,
  });

  return [result, () => controller.abort()] as const;
};

export const filterApiCollection = (list: CollectionSchema[]) => {
  return list.filter((item) => item.uid.startsWith('api::'));
};
