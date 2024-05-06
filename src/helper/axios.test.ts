import axios from "axios";
import { jest } from "@jest/globals";
import { getRequest } from "./axios";

describe("getRequest", () => {
  const getSpy = jest.spyOn(axios, "get");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the requested URL and return the response", async () => {
    const requestURl = "http://dummyurl.com";

    const apiResponse = {
      data: {
        id: 2,
        user: "dummy",
      },
    };

    getSpy.mockResolvedValue(apiResponse);
    const response = await getRequest(requestURl);

    expect(response).toStrictEqual(apiResponse);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(requestURl);
  });

  it("should call the requested URL and throw the error in case of error", async () => {
    const requestURl = "http://dummyurl.com";

    const apiResponse = {
      status: 400,
      data: {
        errorCode: "11",
        errorMessage: "Internal server error",
      },
    };

    getSpy.mockRejectedValue(apiResponse);
    let response, error;
    try {
      response = await getRequest(requestURl);
    } catch (err) {
      error = err;
    }

    expect(response).toBeUndefined();
    expect(error).toStrictEqual(apiResponse);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(requestURl);
  });
});
