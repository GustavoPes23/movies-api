import type UserRepositoryInterface from "../../repository/UserRepositoryInterface";
import type { UserFindAllOutputDto } from "./UserFindAllDto";

export default class UserFindAllUseCase {
  private repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository;
  }

  public async execute(): Promise<UserFindAllOutputDto> {
    const users = await this.repository.findAll();
    
    return users.map(user => ({
        id: user.getId,
        name: user.getName,
        login: user.getLogin,
        createdAt: user.getCreatedAt,
        updatedAt: user.getUpdatedAt,
    })) as unknown as UserFindAllOutputDto;
  }
}
