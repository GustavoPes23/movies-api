import UserEntity from "./UserEntity";

describe("tests for UserEntity", () => {
  it("should create a new instance of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(user).toBeDefined();
    expect(user).not.toBeNull();
    expect(user.getName).toBe("John Doe");
    expect(user.getEmail).toBe("email@email");
    expect(user.getLogin).toBe("johndoe");
    expect(user.getPassword).toBe("password");
    expect(user.getSaltRounds).toBe("salt");
    expect(user.getToken).toBe("token");
  });

  it("should throw an error when creating a new instance of UserEntity with an invalid name", () => {
    expect(
      () => new UserEntity("", "email@email", "johndoe", "password", "salt", "token")
    ).toThrow("user: Invalid user name");
  });

  it("should throw an error when creating a new instance of UserEntity with an invalid login", () => {
    expect(
      () => new UserEntity("John Doe", "email@email", "", "password", "salt", "token")
    ).toThrow("user: Invalid user login");
  });

  it("should throw an error when creating a new instance of UserEntity with an invalid email", () => {
    expect(
      () => new UserEntity("John Doe", "", "johndoe", "password", "salt", "token")
    ).toThrow("user: Invalid user email");
  });
  
  it("should throw an error when creating a new instance of UserEntity with a email without @", () => {
    expect(
      () => new UserEntity("John Doe", "email", "johndoe", "password", "salt", "token")
    ).toThrow("user: Invalid user email");
  });

  it("should throw an error when creating a new instance of UserEntity with an login less than 5 characters", () => {
    expect(
      () => new UserEntity("John", "email@email", "john", "password", "salt", "token")
    ).toThrow("user: Minimum user login length is 5 characters");
  });

  it("should throw an error when creating a new instance of UserEntity with an invalid password", () => {
    expect(
      () => new UserEntity("John Doe", "email@email", "johndoe", "", "salt", "token")
    ).toThrow("user: Invalid user password");
  });

  it("should throw an error when creating a new instance of UserEntity with an password less than 5 characters", () => {
    expect(
      () => new UserEntity("John", "email@email", "johndoe", "pass", "salt", "token")
    ).toThrow("user: Minimum user password length is 5 characters");
  });  

  it("should throw an error when creating a new instance of UserEntity with an invalid salt rounds", () => {
    expect(
      () => new UserEntity("John Doe", "email@email", "johndoe", "password", "", "token")
    ).toThrow("user: Invalid user salt rounds");
  });

  it("should throw an error when creating a new instance of UserEntity with an invalid token", () => {
    expect(
      () => new UserEntity("John Doe", "email@email", "johndoe", "password", "salt", "")
    ).toThrow("user: Invalid user token");
  });

  it("should change the name of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    user.changeName("Jane Doe");

    expect(user.getName).toBe("Jane Doe");
  });

  it("should throw an error when update the name of UserEntity with an invalid name", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(() => user.changeName("")).toThrow("user: Invalid user name");
  });

  it("should change the login of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    user.changeLogin("janedoe");

    expect(user.getLogin).toBe("janedoe");
  });

  it("should throw an error when update the login of UserEntity with an invalid login", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(() => user.changeLogin("")).toThrow("user: Invalid user login");
  });

  it("should change the password of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    user.changePassword("newpassword");

    expect(user.getPassword).toBe("newpassword");
  });

  it("should throw an error when update the password of UserEntity with an invalid password", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(() => user.changePassword("")).toThrow("user: Invalid user password");
  });

  it("should change the salt rounds of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    user.changeSaltRounds("newsalt");

    expect(user.getSaltRounds).toBe("newsalt");
  });

  it("should throw an error when update the salt rounds of UserEntity with an invalid salt rounds", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(() => user.changeSaltRounds("")).toThrow("user: Invalid user salt rounds");
  });

  it("should change the token of UserEntity", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    user.changeToken("newtoken");

    expect(user.getToken).toBe("newtoken");
  });

  it("should throw an error when update the token of UserEntity with an invalid token", () => {
    const user = new UserEntity(
      "John Doe",
      "email@email",
      "johndoe",
      "password",
      "salt",
      "token"
    );

    expect(() => user.changeToken("")).toThrow("user: Invalid user token");
  });
});
