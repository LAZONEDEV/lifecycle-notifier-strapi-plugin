import { isMediaEntry } from "../isMediaEntry";

describe("isMediaEntry", () => {
  it("should return true for valid media entry", () => {
    const validMediaEntry = { url: "https://example.com/image.jpg" };
    expect(isMediaEntry(validMediaEntry)).toBe(true);
  });

  it("should return false for invalid media entry", () => {
    const invalidMediaEntries = [
      null,
      undefined,
      "not an object",
      { url: undefined },
      { url: null },
      { url: "" },
      { otherKey: "value" },
    ];
    invalidMediaEntries.forEach((entry) => {
      expect(isMediaEntry(entry)).toBe(false);
    });
  });
});
