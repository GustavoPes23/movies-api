import UserEntity from "../../entity/UserEntity";
import { UserFindAllOutputDto } from "./UserFindAllDto";
import UserFindAllUseCase from "./UserFindAllUseCase";

const user = new UserEntity("John Doe", "johndoe", "password", "token");
const user2 = new UserEntity("Jane Doe", "janedoe", "password", "token");

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([user, user2])),
    findById: jest.fn(),
    update: jest.fn(),
    login: jest.fn(),
  };
};

describe("tests for UserFindAllUsecase", () => {
  it("should return all users", async () => {
    const repository = MockRepository();
    const usecase = new UserFindAllUseCase(repository);

    const output = await usecase.execute() as unknown as Array<UserFindAllOutputDto>;

    expect(output).toBeDefined();
    expect(output).toHaveLength(2);
    expect(output[0].id).toBe(user.getId);
    expect(output[0].name).toBe(user.getName);
    expect(output[0].login).toBe(user.getLogin);
    expect(output[0].createdAt).toBe(user.getCreatedAt);
    expect(output[1].id).toBe(user2.getId);
    expect(output[1].name).toBe(user2.getName);
    expect(output[1].login).toBe(user2.getLogin);
    expect(output[1].createdAt).toBe(user2.getCreatedAt);
  });
});
