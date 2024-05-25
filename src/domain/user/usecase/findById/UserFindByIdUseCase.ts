import type UserRepositoryInterface from "../../repository/UserRepositoryInterface";
import type { UserFindByIdInputDto, UserFindByIdOutputDto } from "./UserFindByIdDto";

export default class UserFindByIdUseCase {
  private repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.repository = repository;
  }

  public async execute(input: UserFindByIdInputDto): Promise<UserFindByIdOutputDto> {
    const user = await this.repository.findById(input.id);
    
    return {
        id: user.getId,
        name: user.getName,
        login: user.getLogin,
        createdAt: user.getCreatedAt,
        updatedAt: user.getUpdatedAt,
    }
  }
}
