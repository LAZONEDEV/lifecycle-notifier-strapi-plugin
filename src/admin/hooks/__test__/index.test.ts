import { describe, expect, it } from "@jest/globals";
import { useCollectionFieldType } from "../collection";
import { CollectionSchema } from "../../types";
import { renderHook } from "@testing-library/react";

describe("Unit Test for useCollectionFieldType Hook", () => {
  it("should return empty array", () => {
    const collections: CollectionSchema[] = [];
    const collectionId = "1";
    const fieldType = "type1";
    const { result } = renderHook(useCollectionFieldType, {
      initialProps: {
        collectionId: collectionId,
        collections: collections,
        fieldType: fieldType,
      },
    });
    expect(result.current).toEqual([]);
  });

  it("should return first element of array", () => {
    const collections: CollectionSchema[] = [
      {
        uid: "1",
        isDisplayed: true,
        apiID: "api_id_1",
        kind: "kind_1",
        info: {
          name: "Collection 1",
          description: "Description for Collection 1",
          singularName: "Item",
          pluralName: "Items",
          displayName: "Collection One",
        },
        attributes: {
          field1: { type: "type1" },
          field2: { type: "type2" },
          field3: { type: "type1" },
        },
      },
    ];
    const collectionId = "1";
    const fieldType = "type1";
    const { result } = renderHook(useCollectionFieldType, {
      initialProps: {
        collectionId: collectionId,
        collections: collections,
        fieldType: fieldType,
      },
    });
    const expectedResult = ["field1", "field3"];
    expect(result.current).toEqual(expectedResult);
  });
});

