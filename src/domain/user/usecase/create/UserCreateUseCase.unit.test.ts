import PasswordEntity from "../../../password/entity/PasswordEntity";
import UserCreateUsecase from "./UserCreateUseCase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    login: jest.fn(),
  };
};

describe("tests for UserCreateUsecase", () => {
  it("should create a new user", async () => {
    const repository = MockRepository();
    const passwordEntity = new PasswordEntity();
    const usecase = new UserCreateUsecase(repository, passwordEntity);

    const input = {
      name: "John Doe",
      email: "email@email",
      login: "johndoe",
      password: "password",
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("John Doe");
    expect(output.email).toBe("email@email");
    expect(output.login).toBe("johndoe");
    expect(output.createdAt).toBeDefined();
  });
});
