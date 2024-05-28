import UserEntity from "../../entity/UserEntity";
import type UserRepositoryInterface from "../../repository/UserRepositoryInterface";
import type { UserCreateInputDto, UserCreateOutputDto } from "./UserCreateDto";

export default class UserCreateUsecase {
  private repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository;
  }

  public async execute(
    input: UserCreateInputDto
  ): Promise<UserCreateOutputDto> {
    const user = new UserEntity(input.name, input.login, input.password);

    await this.repository.create(user);

    return {
      id: user.getId,
      name: user.getName,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
    };
  }
}
