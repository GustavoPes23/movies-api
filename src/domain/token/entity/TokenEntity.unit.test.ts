import TokenEntity from "./TokenEntity";

describe("tests for TokenEntity", () => {
  it("should generate a token", () => {
    const entity = new TokenEntity("123");
    const token = entity.generate({
      id: "12345",
      name: "John Doe",
      login: "johndoe",
    });

    expect(token).toBeDefined();
  });

  it("should verify a token", () => {
    const entity = new TokenEntity("123");
    const token = entity.generate({
      id: "12345",
      name: "John Doe",
      login: "johndoe",
    });

    const result = entity.verify(token);

    expect(result).toBeDefined();
  });

  it("should decode a token", () => {
    const entity = new TokenEntity("123");
    const token = entity.generate({
      id: "12345",
      name: "John Doe",
      login: "johndoe",
    });

    const result = entity.decode(token);

    expect(result).toBeDefined();
    expect(result.id).toEqual("12345");
    expect(result.name).toEqual("John Doe");
    expect(result.login).toEqual("johndoe");
  });
});
