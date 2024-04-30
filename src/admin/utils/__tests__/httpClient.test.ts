import { Interceptor } from "../../types";
import HTTPClient from "../httpClient";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("/hello", () => {
    return HttpResponse.json({ greeting: "hello there" });
  }),
];

export const server = setupServer(...handlers);
describe("HTTPClient test suite", () => {
  let client: HTTPClient;
  const apiResponse = { greeting: "hello there" };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    client = new HTTPClient("");
  });

  it("should fetch data from the API", async () => {
    const data = await client["request"]("/hello", { method: "GET" });
    expect(data).toEqual(apiResponse);
  });

  it("should send POST request to the API", async () => {
    const response = { method: "POST" };

    server.use(
      http.post("/test", () => {
        return HttpResponse.json(response);
      })
    );

    const data = await client.post("/test", { data: {} });
    expect(data).toEqual(response);
  });

  it("should send PUT request to the API", async () => {
    const response = { method: "PUT" };
    server.use(
      http.put("/test", () => {
        return HttpResponse.json(response);
      })
    );

    const data = await client.put("/test", { data: {} });
    expect(data).toEqual(response);
  });

  it("should send DELETE request to the API", async () => {
    const response = { method: "DELETE" };
    server.use(
      http.delete("/test", () => {
        return HttpResponse.json(response);
      })
    );

    const data = await client.delete("/test");
    expect(data).toEqual(response);
  });

  it("should add an interceptor to the requestInterceptors array", () => {
    const interceptor: Interceptor = (options) => {
      // Modify options here if needed
      return options;
    };
    client.addRequestInterceptor(interceptor);
    expect(client["requestInterceptors"]).toContain(interceptor);
  });

  it("should call interceptor", async () => {
    const interceptor = jest.fn((options: RequestInit) => options);
    client.addRequestInterceptor(interceptor);

    await client.get("/hello");
    expect(interceptor).toHaveBeenCalled();
  });

  it("should handle 204 status response", async () => {
    server.use(
      http.get("/no-content", () => {
        return new HttpResponse(null, { status: 204 });
      })
    );

    const response = await client.get("/no-content");
    expect(response).not.toBeDefined();
  });

  it("should handle failures status response", async () => {
    server.use(
      http.get("/not-ok", () => {
        return HttpResponse.json({ message: "Not ok" }, { status: 500 });
      })
    );
    const request = client.get("/not-ok");
    await expect(request).rejects.toThrow("Not ok");
  });
});
