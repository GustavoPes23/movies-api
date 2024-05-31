import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserLoginInputDto, UserLoginOutputDto } from "./UserLoginDto";

export default class UserFindByIdUseCase {
  private repository: UserGatewayInterface;

  constructor(repository: UserGatewayInterface) {
    this.repository = repository;
  }

  public async execute(input: UserLoginInputDto): Promise<UserLoginOutputDto> {
    const user = await this.repository.login(input.login, input.password);

    return {
      id: user.getId,
      name: user.getName,
      token: user.getToken,
    };
  }
}
