import TokenEntity from "../../../token/entity/TokenEntity";
import UserEntity from "../../entity/UserEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserCreateInputDto, UserCreateOutputDto } from "./UserCreateDto";

export default class UserCreateUsecase {
  private repository: UserGatewayInterface;
  private tokenEntity: TokenEntity;

  constructor(repository: UserGatewayInterface, tokenEntity: TokenEntity) {
    this.repository = repository;
    this.tokenEntity = tokenEntity;
  }

  public async execute(
    input: UserCreateInputDto
  ): Promise<UserCreateOutputDto> {
    const token = this.tokenEntity.generate(input);
    const user = new UserEntity(input.name, input.login, input.password, token);

    await this.repository.create(user);

    return {
      id: user.getId,
      name: user.getName,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
    };
  }
}
