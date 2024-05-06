import apiURls from "./apiURLs";

describe("API URLS", () => {
  it("should have all correct api URLS", () => {
    expect(apiURls).toStrictEqual({
      TODO_BASE_URL: "https://jsonplaceholder.typicode.com/todos",
    });
  });
});
