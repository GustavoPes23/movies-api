import UserEntity from "../../entity/UserEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserUpdateInputDto, UserUpdateOutputDto } from "./UserUpdateDto";

export default class UserUpdateUsecase {
  private repository: UserGatewayInterface;

  constructor(repository: UserGatewayInterface) {
    this.repository = repository;
  }

  public async execute(
    input: UserUpdateInputDto
  ): Promise<UserUpdateOutputDto> {
    const user = await this.repository.findById(input.id);

    if (!user) {
      throw new Error("User not found");
    }

    const userEntity = UserEntity.populate({
      id: input.id,
      name: input.name || user.getName,
      login: input.login || user.getLogin,
      password: input.password || user.getPassword,
      saltRounds: user.getSaltRounds,
      token: user.getToken,
      createdAt: new Date(user.getCreatedAt),
      updatedAt: new Date(),
    });

    await this.repository.update(userEntity);

    return {
      id: userEntity.getId,
      name: userEntity.getName,
      login: userEntity.getLogin,
      createdAt: userEntity.getCreatedAt,
      updatedAt: userEntity.getUpdatedAt,
    };
  }
}
