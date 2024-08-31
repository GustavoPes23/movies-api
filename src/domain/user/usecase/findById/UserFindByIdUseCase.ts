import { getSecretKey } from "../../../../utils/config";
import TokenEntity from "../../../token/entity/TokenEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type {
  UserFindByIdInputDto,
  UserFindByIdOutputDto,
} from "./UserFindByIdDto";

export default class UserFindByIdUseCase {
  private repository: UserGatewayInterface;
  private tokenEntity: TokenEntity;

  constructor(repository: UserGatewayInterface, tokenEntity: TokenEntity) {
    this.repository = repository;
    this.tokenEntity = tokenEntity;
  }

  public async execute(
    input: UserFindByIdInputDto
  ): Promise<UserFindByIdOutputDto> {
    const user = await this.repository.findById(input.id);

    this.tokenEntity.verify(input.token);
    const dataToken = this.tokenEntity.decode(input.token)

    if (user.getId !== dataToken.id) {
      throw new Error("User not found");
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
