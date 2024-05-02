import { describe, jest, it, expect } from "@jest/globals";
import { getSubscriptionsForCollection } from "../../../helpers/getSubsForCollection";
import { listenedCollection } from "../../../constants/listenedCollection";
import { Event } from "@strapi/database/lib/lifecycles/index";
import { subscriptionCollectionUid } from "../../../../common/constants";
import { updateListenedCollectionOnChangeOnSubsCollection } from "../updateListenedCollectionSet";
import { beforeEach } from "node:test";
import { SubscriptionEntry } from "../../../../common/types";

jest.mock("../../../helpers/getSubsForCollection", () => ({
  getSubscriptionsForCollection: jest.fn(),
}));

jest.mock("../../../constants/listenedCollection", () => ({
  listenedCollection: {
    add: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Unit test for listenedCollectionUpdater", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const commonEventInfo = {
    model: {
      uid: subscriptionCollectionUid,
    },
    params: {
      data: {
        collectionName: "testCollection",
      },
    },
  };

  it("should register a new listened collection", async () => {
    const event = {
      ...commonEventInfo,
      action: "beforeCreate",
    } as Event;

    await updateListenedCollectionOnChangeOnSubsCollection(event);

    expect(listenedCollection.add).toHaveBeenCalledWith(
      event.params.data.collectionName
    );
  });

  it("should remove a collection item from listened collection", async () => {
    const event = {
      ...commonEventInfo,
      action: "afterDelete",
    } as Event;

    (
      getSubscriptionsForCollection as jest.Mock<
        () => Promise<SubscriptionEntry[]>
      >
    ).mockResolvedValue([]);

    await updateListenedCollectionOnChangeOnSubsCollection(event);

    expect(getSubscriptionsForCollection).toHaveBeenCalledWith(
      event.params.data.collectionName
    );
    expect(listenedCollection.delete).toHaveBeenCalledWith(
      event.params.data.collectionName
    );

    jest.clearAllMocks();
  });

  it("should not update listened collection because the event is not related to subscription", async () => {
    const event = {
      ...commonEventInfo,
      action: "afterDelete",
      model: {
        uid: "nothing",
      },
    } as Event;

    await updateListenedCollectionOnChangeOnSubsCollection(event);

    expect(getSubscriptionsForCollection).not.toHaveBeenCalled();
    expect(listenedCollection.delete).not.toHaveBeenCalled();
    expect(listenedCollection.add).not.toHaveBeenCalled();
  });

  it("should not update listened collection because of event type", async () => {
    const event = {
      ...commonEventInfo,
      action: "beforeCount",
      model: {
        uid: "nothing",
      },
    } as Event;

    await updateListenedCollectionOnChangeOnSubsCollection(event);

    expect(getSubscriptionsForCollection).not.toHaveBeenCalled();
    expect(listenedCollection.delete).not.toHaveBeenCalled();
    expect(listenedCollection.add).not.toHaveBeenCalled();
  });

  it("should handle the case where collectionName is not defined", async () => {
    const event = {
      ...commonEventInfo,
      action: "beforeCreate",
      params: {},
    } as Event;

    await updateListenedCollectionOnChangeOnSubsCollection(event);

    expect(getSubscriptionsForCollection).not.toHaveBeenCalled();
    expect(listenedCollection.delete).not.toHaveBeenCalled();
    expect(listenedCollection.add).not.toHaveBeenCalled();
  });
});
