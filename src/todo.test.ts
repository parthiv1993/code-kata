import { jest } from "@jest/globals";
import { ExecException, exec } from "child_process";
import path from "path";

jest.mock("./service/todoService", () => ({
  fetchFirst20EvenTodo: jest.fn(),
}));

interface Result {
  code: number;
  error: ExecException | null;
  stdout: string | Buffer | null;
  stderr: string | Buffer | null;
}

describe("todo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a command with correct name and description", async () => {
    const result: Result = await new Promise((resolve) => {
      exec(
        `yarn ts-node ${path.resolve("src/todo.ts")}`,
        null,
        (error, stdout, stderr) => {
          resolve({
            code: error && error.code ? error.code : 0,
            error,
            stdout,
            stderr,
          });
        }
      );
    });
    expect(result.code).toStrictEqual(0);
  });
});
