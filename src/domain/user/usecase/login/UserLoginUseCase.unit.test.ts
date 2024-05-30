import UserEntity from "../../entity/UserEntity";
import UserLoginUseCase from "./UserLoginUseCase";

const user = new UserEntity("John Doe", "johndoe", "password", "token");
const userToken = user.getToken;

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    login: jest.fn().mockReturnValue(Promise.resolve(userToken)),
  };
};

describe("tests for UserLoginUseCase", () => {
  it("should return user token", async () => {
    const repository = MockRepository();
    const usecase = new UserLoginUseCase(repository);

    const output = await usecase.execute({ login: "johndoe", password: "password" });

    expect(output).toBeDefined();
    expect(output.token).toBe(userToken);
  });
});