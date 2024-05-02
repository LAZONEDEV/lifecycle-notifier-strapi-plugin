import { listenedCollection } from "../../../constants/listenedCollection";
import { loadExistingSubscriptions } from "../loadExistingSubscriptions";


jest.mock("../../../constants/listenedCollection", () => ({
  listenedCollection: {
    add: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock("../../../helpers/getStrapi", () => ({
  getStrapi: jest.fn().mockReturnValue({
    db: {
      query: jest.fn().mockReturnValue({
        findMany: jest.fn().mockReturnValue([
          {
            collectionName: "test",
          },
        ]),
      }),
    },
  }),
}));

describe("Unit test for loadExistingSubscriptions", () => {
  it("should load existing subscriptions", async () => {
    await loadExistingSubscriptions();

    expect(listenedCollection.add).toHaveBeenCalledWith("test");
  });
});
