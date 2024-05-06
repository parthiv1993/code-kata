class MockCommand {
  name() {
    return this;
  }

  desciption() {
    return this;
  }

  parse() {
    return this;
  }

  action() {
    return this;
  }
}

jest.mock("commander", () => ({}));

console.log("mocking");
