import { Event } from "@strapi/database/lib/lifecycles";
import { SubscriptionEntry } from "../../../../common/types";
import { getSubscriptionsForCollection } from "../../../helpers/getSubsForCollection";
import { listenedCollection } from "../../../constants/listenedCollection";
import { notifyForSubscription } from "../notifyForSubscription";
import { handleEventSubscription } from "../handleEventSubscription";

jest.mock("../../../helpers/getSubsForCollection", () => ({
  getSubscriptionsForCollection: jest.fn(),
}));

jest.mock("../../../services/core/notifyForSubscription.ts", () => ({
  notifyForSubscription: jest.fn(),
}));

jest.mock("../../../constants/listenedCollection", () => ({
  listenedCollection: {
    has: jest.fn(),
  },
}));

describe("test suite for handleEventSubscription", () => {
  const event = {
    model: {
      uid: "testModelUid",
    },
    params: {
      data: {},
    },
    result: {},
  } as Event;

  const subscription = {
    id: "testSubscription",
  } as SubscriptionEntry;

  it("should trigger the sending of a notification", async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([
      subscription,
    ]);
    (listenedCollection.has as jest.Mock).mockReturnValue(true);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription(event);

    expect(listenedCollection.has).toHaveBeenCalledWith(event.model.uid);
    expect(getSubscriptionsForCollection).toHaveBeenCalledWith(event.model.uid);
    expect(notifyForSubscription).toHaveBeenCalledWith(
      subscription,
      event.result
    );

    jest.clearAllMocks();
  });

  it("should use params.data when result is not defined", async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([
      subscription,
    ]);
    (listenedCollection.has as jest.Mock).mockReturnValue(true);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription({
      ...event,
      result: undefined,
    });

    expect(listenedCollection.has).toHaveBeenCalledWith(event.model.uid);
    expect(getSubscriptionsForCollection).toHaveBeenCalledWith(event.model.uid);
    expect(notifyForSubscription).toHaveBeenCalledWith(
      subscription,
      event.result
    );

    jest.clearAllMocks();
  });

  it("should not trigger the sending of a notification", async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([]);
    (listenedCollection.has as jest.Mock).mockReturnValue(false);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription(event);

    expect(getSubscriptionsForCollection).not.toHaveBeenCalled();
    expect(notifyForSubscription).not.toHaveBeenCalled();
  });
});
