import { jest } from "@jest/globals";
import todoService from "./todoService";
import axiosHelpers from "../helper/axios";

describe("todoService", () => {
  const getRequestSpy = jest.spyOn(axiosHelpers, "getRequest");
  beforeEach(() => {
    jest.clearAllMocks();

    getRequestSpy.mockResolvedValue({});
  });

  describe("fetchTodo", () => {
    it("should fetch the todo item and return the same", async () => {
      getRequestSpy.mockResolvedValue({
        data: {
          userId: 2,
          id: 2,
          title: "dummy title",
          completed: false,
        },
      });

      const response = await todoService.fetchTodo(3);

      expect(response).toStrictEqual({
        userId: 2,
        id: 2,
        title: "dummy title",
        completed: false,
      });
      expect(getRequestSpy).toHaveBeenCalledTimes(1);
      expect(getRequestSpy).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/3"
      );
    });

    it("should fetch the todo item and throw error", async () => {
      getRequestSpy.mockRejectedValue({
        status: 404,
        data: {
          errorMessage: "NOT_FOUND",
        },
      });

      let response, error;
      try {
        response = await todoService.fetchTodo(3);
      } catch (err) {
        error = err;
      }

      expect(response).toBeUndefined();
      expect(error).toStrictEqual(new Error("Error while fetching Todo Item"));
    });
  });

  describe("fetchMultipleTodo", () => {
    const mockGetRequestImplementation = (url: string) => {
      const id = url.slice(-1);
      return Promise.resolve({
        data: {
          userId: Number(id),
          id: Number(id),
          title: "dummy title",
          completed: false,
        },
      });
    };

    beforeEach(() => {
      getRequestSpy.mockImplementation(mockGetRequestImplementation);
    });
    it("should fetch the todo item and return the same", async () => {
      const response = await todoService.fetchMultipleTodo([3, 4]);

      expect(getRequestSpy).toHaveBeenCalledTimes(2);
      expect(getRequestSpy).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/3"
      );
      expect(getRequestSpy).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos/4"
      );
      expect(response).toStrictEqual([
        {
          userId: 3,
          id: 3,
          title: "dummy title",
          completed: false,
        },
        {
          userId: 4,
          id: 4,
          title: "dummy title",
          completed: false,
        },
      ]);
    });

    it("should fetch the todo item and throw error in case all fails", async () => {
      getRequestSpy.mockRejectedValue({
        status: 404,
        data: {
          errorMessage: "NOT_FOUND",
        },
      });

      let response, error;
      try {
        response = await todoService.fetchMultipleTodo([3, 4]);
      } catch (err) {
        error = err;
      }

      expect(response).toBeUndefined();
      expect(error).toStrictEqual(new Error("Error while fetching Todo Item"));
    });

    it("should fetch the todo item and throw error in case even one all fails", async () => {
      getRequestSpy.mockImplementationOnce(mockGetRequestImplementation);

      getRequestSpy.mockRejectedValue({
        status: 404,
        data: {
          errorMessage: "NOT_FOUND",
        },
      });

      let response, error;
      try {
        response = await todoService.fetchMultipleTodo([3, 4]);
      } catch (err) {
        error = err;
      }

      expect(response).toBeUndefined();
      expect(error).toStrictEqual(new Error("Error while fetching Todo Item"));
    });
  });

  describe("fetchFirst20EvenTodo", () => {
    const mockGetRequestImplementation = (url: string) => {
      const id = url.split("/").pop();
      return Promise.resolve({
        data: {
          userId: Number(id),
          id: Number(id),
          title: "dummy title",
          completed: false,
        },
      });
    };

    beforeEach(() => {
      getRequestSpy.mockImplementation(mockGetRequestImplementation);
    });

    it("should return the response after calling with complete array", async () => {
      const response = await todoService.fetchFirst20EvenTodo();

      const expectedResponse = [
        2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
        40,
      ].map((num) => ({
        userId: num,
        id: num,
        title: "dummy title",
        completed: false,
      }));
      expect(response).toStrictEqual(expectedResponse);
    });

    it("should throw error in case of error thrown", async () => {
      getRequestSpy.mockRejectedValue({
        status: 404,
        data: {
          errorCode: "INTERNAL_SERVER_ERROR",
        },
      });

      let error, response;

      try {
        response = await todoService.fetchFirst20EvenTodo();
      } catch (err) {
        error = err;
      }

      expect(response).toBeUndefined();
      expect(error).toStrictEqual(new Error("Error while fetching Todo Item"));
    });
  });
});
