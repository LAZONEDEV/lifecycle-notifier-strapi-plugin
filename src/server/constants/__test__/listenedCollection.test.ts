import { listenedCollection } from "../listenedCollection";
import { describe, expect, it } from "@jest/globals";

describe("listenedCollection", () => {
  it("should be initially empty", () => {
    expect(listenedCollection.size).toBe(0);
  });

  it("should add items correctly", () => {
    listenedCollection.add("item1");
    listenedCollection.add("item2");
    expect(listenedCollection.size).toBe(2);
    expect(listenedCollection.has("item1")).toBe(true);
    expect(listenedCollection.has("item2")).toBe(true);
  });

  it("should not add duplicate items", () => {
    listenedCollection.add("item1");
    listenedCollection.add("item1");
    expect(listenedCollection.size).toBe(2);
  });

  it("should remove items correctly", () => {
    listenedCollection.add("item1");
    listenedCollection.add("item2");
    listenedCollection.delete("item1");
    expect(listenedCollection.size).toBe(1);
    expect(listenedCollection.has("item1")).toBe(false);
  });
});

