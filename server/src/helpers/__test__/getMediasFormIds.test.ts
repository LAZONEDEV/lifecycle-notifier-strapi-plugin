import { describe, expect, it, jest, afterEach } from '@jest/globals';
import { getMediasFromIds } from '../getMediasFormIds';
import { getMediaFileEntityManager } from '../getEntityManager';
import { StrapiMedia } from '../../types';

// Mocking the external dependency
jest.mock('../getEntityManager', () => ({
  getMediaFileEntityManager: jest.fn(),
}));

describe('Unit Test for getMediasFromIds Function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return media files successfully', async () => {
    const mockIds = [1, 2, 3];
    const mockMedias = [
      { id: 1, name: 'Media 1' },
      { id: 2, name: 'Media 2' },
      { id: 3, name: 'Media 3' },
    ];

    (getMediaFileEntityManager as jest.Mock).mockReturnValue({
      findMany: jest.fn<() => Promise<Partial<StrapiMedia>[]>>().mockResolvedValue(mockMedias),
    });

    const result = await getMediasFromIds(mockIds);

    expect(result).toEqual(mockMedias);
    expect(getMediaFileEntityManager).toHaveBeenCalled();
  });

  it('should handle errors when retrieving media files', async () => {
    const mockIds = [1, 2, 3];
    const mockError = new Error('Test error');

    (getMediaFileEntityManager as jest.Mock).mockReturnValue({
      findMany: jest.fn<() => Promise<Error>>().mockRejectedValue(mockError),
    });

    try {
      await getMediasFromIds(mockIds);
    } catch (error) {
      expect(error).toEqual(mockError);
    }

    expect(getMediaFileEntityManager).toHaveBeenCalled();
  });
});
