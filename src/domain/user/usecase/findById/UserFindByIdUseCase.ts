import { getSecretKey } from "../../../../utils/config";
import TokenEntity from "../../../token/entity/TokenEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type {
  UserFindByIdInputDto,
  UserFindByIdOutputDto,
} from "./UserFindByIdDto";

export default class UserFindByIdUseCase {
  private repository: UserGatewayInterface;

  constructor(repository: UserGatewayInterface) {
    this.repository = repository;
  }

  public async execute(
    input: UserFindByIdInputDto
  ): Promise<UserFindByIdOutputDto> {
    const user = await this.repository.findById(input.id);

    const tokenEntity = new TokenEntity(getSecretKey());
    tokenEntity.verify(input.token);

    if (user.getToken !== input.token) {
      throw new Error("Token invalid");
    }

    return {
      id: user.getId,
      name: user.getName,
      email: user.getEmail,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
      updatedAt: user.getUpdatedAt,
    };
  }
}
