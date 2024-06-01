import PasswordEntity from "./PasswordEntity";

describe("tests for PasswordEntity", () => {
  it("should generate a hash pass salt rounds", () => {
    const password = "password";
    const saltRounds = 10;
    const entity = new PasswordEntity(saltRounds);

    entity.changePassword(password);

    const hash = entity.genereateHash();

    expect(hash).toBeDefined();
  });

  it("should generate a hash without pass salt rounds", () => {
    const password = "password";
    const entity = new PasswordEntity();

    entity.changePassword(password);
    
    const hash = entity.genereateHash();

    expect(hash).toBeDefined();
  });

  it("should throw an error when generate a hash with an invalid password", () => {
    const entity = new PasswordEntity(10);

    expect(() => entity.changePassword("")).toThrow("password: Invalid password");
  });

  it("should throw an error when generate a hash with an password less than 5", () => {
    const entity = new PasswordEntity(10);

    expect(() => entity.changePassword("123")).toThrow("password: Password must be at least 5 characters");
  });

  it("should throw an error when generate a hash with an invalid salt rounds", () => {
    const entity = new PasswordEntity();

    expect(() => entity.changeSaltRounds("")).toThrow("password: Invalid salt rounds");
  });

  it("should compare a hash", () => {
    const password = "password";
    const saltRounds = 10;
    const entity = new PasswordEntity(saltRounds);
    entity.changePassword(password);
    const hash = entity.genereateHash();
    const result = entity.compare(hash);

    expect(result).toBeTruthy();
  });
});
