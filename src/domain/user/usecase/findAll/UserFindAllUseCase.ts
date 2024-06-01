import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserFindAllOutputDto } from "./UserFindAllDto";

export default class UserFindAllUseCase {
  private repository: UserGatewayInterface;

  constructor(repository: UserGatewayInterface) {
    this.repository = repository;
  }

  public async execute(): Promise<UserFindAllOutputDto> {
    const users = await this.repository.findAll();

    return users.map((user) => ({
      id: user.getId,
      name: user.getName,
      email: user.getEmail,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
      updatedAt: user.getUpdatedAt,
    })) as unknown as UserFindAllOutputDto;
  }
}
