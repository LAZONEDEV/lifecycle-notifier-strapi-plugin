import { fetchLocalMedia } from "../fetchLocalMedia";
import { readFileSync } from "node:fs";
import { getStrapi } from "../../helpers/getStrapi";

jest.mock("node:fs");
jest.mock("../../helpers/getStrapi", () => ({
  getStrapi: jest.fn(),
}));

describe("fetchLocalMedia", () => {
  it("should read file synchronously using the correct path", () => {
    const patch = "/example.jpg";
    const publicDir = "/public";

    const mockStrapi = {
      dirs: {
        static: {
          public: publicDir,
        },
      },
    };

    (getStrapi as jest.Mock).mockReturnValue(mockStrapi);

    const expectedPath = `${publicDir}${patch}`;
    const mockFileContent = "mock file content";

    (readFileSync as jest.Mock).mockReturnValueOnce(mockFileContent);

    const result = fetchLocalMedia(patch);

    expect(getStrapi).toHaveBeenCalled();
    expect(readFileSync).toHaveBeenCalledWith(expectedPath);
    expect(result).toBe(mockFileContent);
  });
});
