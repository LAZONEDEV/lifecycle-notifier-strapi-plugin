import { getStrapi } from '../../../helpers/getStrapi';
import {
  listenChangeOnCollection,
  listenSubscriptionCollectionUpdate,
} from '../listenedCollectionUpdater';
import { updateListenedCollectionOnChangeOnSubsCollection } from '../updateListenedCollectionSet';

jest.mock('../updateListenedCollectionSet', () => {
  return {
    updateListenedCollectionOnChangeOnSubsCollection: jest.fn(),
  };
});

jest.mock('../../../helpers/getStrapi', () => ({
  getStrapi: jest.fn().mockReturnValue({
    db: {
      lifecycles: {
        subscribe: jest.fn(),
      },
    },
  }),
}));

jest.mock('../handleEventSubscription', () => ({
  handleEventSubscription: jest.fn(),
}));

describe('tests suite for strapi db lifecycle subscribers', () => {
  it('should subscribe listener for subscription update event', async () => {
    const strapi = getStrapi();

    await listenSubscriptionCollectionUpdate();

    expect(strapi.db.lifecycles.subscribe).toHaveBeenCalledWith(
      updateListenedCollectionOnChangeOnSubsCollection
    );
  });

  it('should subscribe listener for global event', async () => {
    const strapi = getStrapi();

    await listenChangeOnCollection();

    expect(strapi.db.lifecycles.subscribe).toHaveBeenCalled();
  });
});
