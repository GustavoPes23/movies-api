import UserEntity from "../../entity/UserEntity";
import UserFindByIdUseCase from "./UserFindByIdUseCase";

const user = new UserEntity("John Doe", "johndoe", "password");
const userId = user.getId;

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

    const output = await usecase.execute({ id: userId });

    expect(output).toBeDefined();
    expect(output.id).toBe(user.getId);
    expect(output.name).toBe(user.getName);
    expect(output.login).toBe(user.getLogin);
    expect(output.createdAt).toBe(user.getCreatedAt);
  });
});
