import { getMediaFileEntityManager } from './getEntityManager';
import { StrapiMedia } from '../types';

export const getMediasFromIds = (ids: number[]): Promise<StrapiMedia[]> => {
  const fileEntityManager = getMediaFileEntityManager();

  return fileEntityManager.findMany({
    filters: {
      id: {
        $in: ids,
      },
    },
  });
};
