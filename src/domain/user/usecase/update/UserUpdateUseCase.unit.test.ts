import UserEntity from "../../entity/UserEntity";
import UserUpdateUsecase from "./UserUpdateUseCase";

const user = new UserEntity("John Doe", "johndoe", "password", "salt", "token");

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(user)),
    update: jest.fn(),
    login: jest.fn(),
  };
};

describe("tests for UserUpdateUseCase", () => {
  it("should update a user", async () => {
    const repository = MockRepository();
    const usecase = new UserUpdateUsecase(repository);

    const input = {
      id: user.getId,
      name: "John Doe2",
      login: "johndoe2",
      password: "password2",
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("John Doe2");
    expect(output.login).toBe("johndoe2");
    expect(output.createdAt).toBeDefined();
  });
});
