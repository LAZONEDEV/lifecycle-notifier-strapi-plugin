import { describe, it, expect, jest, afterEach } from "@jest/globals";

import { getEntryWithRelation } from "../getEntryWithRelation";
import { getCollectionEntityManager } from "../getEntityManager";
import { CollectionEntry } from "../../types";

jest.mock("../getEntityManager", () => ({
  getCollectionEntityManager: jest.fn(),
}));

describe("getEntryWithRelation", () => {
  const mockCollectionUid = "testCollectionUid";
  const mockEntry: CollectionEntry = { id: "1" };
  const mockRelationsToPopulate = ["relation1", "relation2"];
  const mockResult = { id: "1", relation1: {}, relation2: {} };
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return entry with relations successfully", async () => {
    const mockEntityManager = {
      findOne: jest
        .fn<() => Promise<CollectionEntry>>()
        .mockResolvedValue(mockResult),
    };
    (getCollectionEntityManager as jest.Mock).mockReturnValue(
      mockEntityManager
    );

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toEqual(mockResult);
    expect(getCollectionEntityManager).toHaveBeenCalledWith(mockCollectionUid);
    expect(mockEntityManager.findOne).toHaveBeenCalledWith({
      where: { id: mockEntry.id },
      populate: mockRelationsToPopulate,
    });
  });

  it("should log error and return undefined if entity manager is not found", async () => {
    (getCollectionEntityManager as jest.Mock).mockReturnValue(undefined);

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to get entity manager for collection ${mockCollectionUid}`
    );
  });

  it("should log error and return undefined if the entry is not found", async () => {
    const mockEntityManager = {
      findOne: jest.fn<() => Promise<undefined>>().mockResolvedValue(undefined),
    };
    (getCollectionEntityManager as jest.Mock).mockReturnValue(
      mockEntityManager
    );

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to find entry with id ${mockEntry.id} in collection ${mockCollectionUid}`
    );
  });

  it("should log error if an exception occurs", async () => {
    const mockError = new Error("Test error");
    const mockEntityManager = {
      findOne: jest.fn<() => Promise<Error>>().mockRejectedValue(mockError),
    };
    (getCollectionEntityManager as jest.Mock).mockReturnValue(
      mockEntityManager
    );

    await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "The error occurred while retrieving entry with its relation"
    );
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Test error"));
  });
});
