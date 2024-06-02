import PasswordEntity from "../../../password/entity/PasswordEntity";
import UserEntity from "../../entity/UserEntity";
import UserLoginUseCase from "./UserLoginUseCase";

const passwordEntity = new PasswordEntity();
passwordEntity.changePassword("password");

const user = new UserEntity(
  "John Doe",
  "email@email",
  "johndoe",
  passwordEntity.generateHash(),
  passwordEntity.getSaltRounds,
  "token"
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    login: jest.fn().mockReturnValue(Promise.resolve(user)),
  };
};

describe("tests for UserLoginUseCase", () => {
  it("should return user token", async () => {
    const repository = MockRepository();
    const usecase = new UserLoginUseCase(repository);

    const output = await usecase.execute({
      login: "johndoe",
      password: "password",
    });

    expect(output).toBeDefined();
    expect(output.id).toBe(user.getId);
    expect(output.name).toBe(user.getName);
    expect(output.token).toBe(user.getToken);
  });

  it("should throw an error when user not found", async () => {
    const repository = MockRepository();
    repository.login.mockReturnValue(Promise.resolve(null));
    const usecase = new UserLoginUseCase(repository);

    await expect(
      usecase.execute({
        login: "johndoe2",
        password: "password",
      })
    ).rejects.toThrow("User not found");
  });

  it("should throw an error when password invalid", async () => {
    const repository = MockRepository();
    const usecase = new UserLoginUseCase(repository);

    await expect(
      usecase.execute({
        login: "johndoe",
        password: "password2",
      })
    ).rejects.toThrow("Password invalid");
  });
});
