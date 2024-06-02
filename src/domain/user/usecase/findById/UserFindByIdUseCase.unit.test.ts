import TokenEntity from "../../../token/entity/TokenEntity";
import UserEntity from "../../entity/UserEntity";
import UserFindByIdUseCase from "./UserFindByIdUseCase";

jest.mock("../../../../utils/config", () => {
  return {
    getSecretKey: jest.fn().mockReturnValue("123"),
  };
});

const user = new UserEntity(
  "John Doe",
  "email@email",
  "johndoe",
  "password",
  "salt",
  "token"
);

const tokenEntity = new TokenEntity("123");
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

describe("tests for UserFindByIdUseCase", () => {
  it("should return user", async () => {
    const repository = MockRepository();
    const usecase = new UserFindByIdUseCase(repository);

    const output = await usecase.execute({ id: user.getId, token: user.getToken });

    expect(output).toBeDefined();
    expect(output.id).toBe(user.getId);
    expect(output.name).toBe(user.getName);
    expect(output.email).toBe(user.getEmail);
    expect(output.login).toBe(user.getLogin);
    expect(output.createdAt).toBe(user.getCreatedAt);
  });

  it("should throw an error when token is invalid", async () => {
    const repository = MockRepository();
    const usecase = new UserFindByIdUseCase(repository);

    await expect(
      usecase.execute({ id: user.getId, token: "invalid" })
    ).rejects.toThrow("Token invalid");
  })
});
