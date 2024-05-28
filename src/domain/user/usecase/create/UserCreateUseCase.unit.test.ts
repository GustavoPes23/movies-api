import UserCreateUsecase from "./UserCreateUseCase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };
};

describe("tests for UserCreateUsecase", () => {
  it("should create a new user", async () => {
    const repository = MockRepository();
    const usecase = new UserCreateUsecase(repository);

    const input = {
      name: "John Doe",
      login: "johndoe",
      password: "password",
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("John Doe");
    expect(output.login).toBe("johndoe");
    expect(output.createdAt).toBeDefined();
  });
});
