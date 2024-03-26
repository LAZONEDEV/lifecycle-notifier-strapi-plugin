import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { getEntryWithRelation } from "../getEntryWithRelation";
import { getCollectionEntityManager } from "../getEntityManager";

jest.mock("../getEntityManager", () => ({
  getCollectionEntityManager: jest.fn(),
}));

describe("Unit Tests of getEnryWithRelation Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return entry with relations successfully", async () => {
    const mockCollectionUid = "testCollectionUid";
    const mockEntry = { id: "1" };
    const mockRelationsToPopulate = ["relation1", "relation2"];
    const mockEntryWithRelation = { id: "1", relations: {} };

    (getCollectionEntityManager as jest.Mock).mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockEntryWithRelation as never),
    });

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toEqual(mockEntryWithRelation);
    expect(getCollectionEntityManager).toHaveBeenCalledWith(mockCollectionUid);
  });

  it("should log error and return undefined if entity manager is not found", async () => {
    const mockCollectionUid = "testCollectionUid";
    const mockEntry = { id: "1" };
    const mockRelationsToPopulate = ["relation1", "relation2"];

    (getCollectionEntityManager as jest.Mock).mockReturnValue(undefined);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to get entity manager for collection ${mockCollectionUid}`
    );

    consoleSpy.mockRestore();
  });

  it("should log error and return undefined if entry with relations is not found", async () => {
    const mockCollectionUid = "testCollectionUid";
    const mockEntry = { id: "1" };
    const mockRelationsToPopulate = ["relation1", "relation2"];

    (getCollectionEntityManager as jest.Mock).mockReturnValue({
      findOne: jest.fn().mockResolvedValue(undefined as never),
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to find entry with id ${mockEntry.id} in collection ${mockCollectionUid}`
    );

    consoleSpy.mockRestore();
  });

  it("should log error if an exception occurs", async () => {
    const mockCollectionUid = "testCollectionUid";
    const mockEntry = { id: "1" };
    const mockRelationsToPopulate = ["relation1", "relation2"];

    (getCollectionEntityManager as jest.Mock).mockReturnValue({
      findOne: jest.fn().mockRejectedValue(new Error("Test error") as never),
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await getEntryWithRelation(
      mockCollectionUid,
      mockEntry,
      mockRelationsToPopulate
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "The error occurred while retrieving entry with its relation"
    );
    expect(consoleSpy).toHaveBeenCalledWith(new Error("Test error"));

    consoleSpy.mockRestore();
  });
});

