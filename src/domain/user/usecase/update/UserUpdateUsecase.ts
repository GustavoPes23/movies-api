import UserEntity from "../../entity/UserEntity";
import type UserRepositoryInterface from "../../repository/UserRepositoryInterface";
import type { UserUpdateInputDto, UserUpdateOutputDto } from "./UserUpdateDto";

export default class UserUpdateUsecase {
  private repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository;
  }

  public async execute(
    input: UserUpdateInputDto
  ): Promise<UserUpdateOutputDto> {
    const user = new UserEntity(input.name, input.login, input.password);
    user.changeId(input.id);

    await this.repository.update(user);

    return {
      id: user.getId,
      name: user.getName,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
      updatedAt: user.getUpdatedAt,
    };
  }
}
