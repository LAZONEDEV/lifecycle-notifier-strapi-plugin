import {
  loadCollectionsSchemas,
  filterApiCollection,
} from "../loadCollections";
import fetchInstance from "../fetchInstance";
import { CollectionSchema } from "../../types";

// Mock fetchInstance
jest.mock("../fetchInstance", () => ({
  get: jest.fn(),
}));

describe("test suite for loadCollectionsSchemas utility", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchInstance.get to fetch data", () => {
    const mockResult = Promise.resolve("mockResult");
    (fetchInstance.get as jest.Mock).mockReturnValueOnce(mockResult);

    const [result, abort] = loadCollectionsSchemas();

    expect(fetchInstance.get).toHaveBeenCalled();
    expect(result).resolves.toEqual("mockResult");
    expect(typeof abort).toBe("function");
  });
});

describe("test suite for filterApiCollection utility", () => {
  it('should filter the list to contain only items with uid starting with "api::"', () => {
    const list = [
      { uid: "api::user" },
      { uid: "page" },
      { uid: "api::post" },
      { uid: "api::comment" },
    ] as CollectionSchema[];

    const filteredList = filterApiCollection(list);

    expect(filteredList).toHaveLength(3);
    expect(filteredList.every((item) => item.uid.startsWith("api::"))).toBe(
      true
    );
  });
});
