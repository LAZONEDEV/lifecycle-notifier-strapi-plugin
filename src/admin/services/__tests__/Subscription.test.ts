import { SubscriptionService } from "../Subscription";
import instance from "../../utils/fetchInstance";
import { SubscriptionEntry } from "../../../common/types";

jest.mock("../../utils/fetchInstance", () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

describe("suite test for Subscription service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSubscriptionEntry = {
    id: "1",
  } as SubscriptionEntry;

  it("should get subscriptions with API call", async () => {
    const mockResult = { results: [mockSubscriptionEntry] };
    (instance.get as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await SubscriptionService.get();

    expect(instance.get).toHaveBeenCalledWith(SubscriptionService.baseUrl);
    expect(result).toEqual([mockSubscriptionEntry]);
  });

  it("should create a subscription with API call", async () => {
    (instance.post as jest.Mock).mockResolvedValueOnce(mockSubscriptionEntry);

    const result = await SubscriptionService.create(mockSubscriptionEntry);

    expect(instance.post).toHaveBeenCalledWith(
      SubscriptionService.baseUrl,
      mockSubscriptionEntry
    );
    expect(result).toEqual(mockSubscriptionEntry);
  });

  it("should delete a subscription with API call", async () => {
    const id = "1";
    const mockDeleteResult = { data: "deleted" };
    (instance.delete as jest.Mock).mockResolvedValueOnce(mockDeleteResult);

    const result = await SubscriptionService.delete(id);

    expect(instance.delete).toHaveBeenCalledWith(
      `${SubscriptionService.baseUrl}/${id}`
    );
    expect(result).toEqual("deleted");
  });

  it("should update a subscription with API call", async () => {
    const id = "1";
    const mockUpdateData = {} as Omit<SubscriptionEntry, "id">;
    const mockUpdateResult = { data: "updated" };
    (instance.put as jest.Mock).mockResolvedValueOnce(mockUpdateResult);

    const result = await SubscriptionService.update(id, mockUpdateData);

    expect(instance.put).toHaveBeenCalledWith(
      `${SubscriptionService.baseUrl}/${id}`,
      mockUpdateData
    );
    expect(result).toEqual("updated");
  });
});
