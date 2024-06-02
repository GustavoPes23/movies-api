import TokenEntity from "../../../token/entity/TokenEntity";
import UserEntity from "../../entity/UserEntity";
import UserUpdateUsecase from "./UserUpdateUseCase";

const user = new UserEntity(
  "John Doe",
  "email@email",
  "johndoe",
  "password",
  "salt",
  "token"
);

const tokenEntity = new TokenEntity();
const token = tokenEntity.generate({ login: user.getLogin });
user.changeToken(token);

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
      email: "email@email2",
      login: "johndoe2",
      password: "password2",
      token: user.getToken,
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("John Doe2");
    expect(output.email).toBe("email@email2");
    expect(output.login).toBe("johndoe2");
    expect(output.createdAt).toBeDefined();
  });

  it("should throw an error when user not found", async () => {
    const repository = MockRepository();
    repository.findById.mockReturnValue(Promise.resolve(null));
    const usecase = new UserUpdateUsecase(repository);

    const input = {
      id: user.getId,
      name: "John Doe2",
      email: "email@email2",
      login: "johndoe2",
      password: "password2",
      token: user.getToken,
    };

    await expect(usecase.execute(input)).rejects.toThrow("User not found");
  });

  it("should throw an error when token is invalid", async () => {
    const repository = MockRepository();
    const usecase = new UserUpdateUsecase(repository);

    const input = {
      id: user.getId,
      name: "John Doe2",
      email: "email@email2",
      login: "johndoe2",
      password: "password2",
      token: "invalid",
    };

    await expect(usecase.execute(input)).rejects.toThrow("Token invalid");
  });
});
