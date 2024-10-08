import { strapiGetTokenInterceptor } from "../strapiGetTokenInterceptor";
import { auth } from "@strapi/helper-plugin";

jest.mock("@strapi/helper-plugin", () => ({
  auth: {
    getToken: jest.fn(),
  },
}));

describe("test suite for strapiGetTokenInterceptor", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add Authorization header with token to options", () => {
    const dummyToken = "dummyToken";
    auth.getToken.mockReturnValueOnce(dummyToken);

    const options = { headers: {} };
    const updatedOptions = strapiGetTokenInterceptor(options);

    expect(updatedOptions.headers).toHaveProperty(
      "Authorization",
      `Bearer ${dummyToken}`
    );
  });

  it("should create headers object if it does not exist in options", () => {
    const options = {};
    const updatedOptions = strapiGetTokenInterceptor(options);

    expect(updatedOptions.headers).toBeDefined();
    expect(updatedOptions.headers).toHaveProperty("Authorization");
  });

  it("should handle options with no headers", () => {
    const options = {};
    const updatedOptions = strapiGetTokenInterceptor(options);

    expect(updatedOptions.headers).toHaveProperty("Authorization");
  });
});
