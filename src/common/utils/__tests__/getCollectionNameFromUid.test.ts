import { getCollectionNameFormUid } from "../getCollectionNameFormUid";

describe("getCollectionNameFormUid", () => {
  it("should return the collection name from a UID string", () => {
    const uid = "api::planet.planet";
    const expectedCollectionName = "planet";

    const expected = getCollectionNameFormUid(uid);

    expect(expected).toBe(expectedCollectionName);
  });

  it("should return undefined string if the UID is malformed", () => {
    const malformedUid = "malformedUid";

    const expected = getCollectionNameFormUid(malformedUid);

    expect(expected).toBe(undefined);
  });
});
