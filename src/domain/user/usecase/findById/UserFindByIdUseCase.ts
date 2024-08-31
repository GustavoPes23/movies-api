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
    try {
      const user = await this.repository.findById(input.id);
      const token = input.token.replace("Bearer ", "");
      const dataToken = this.tokenEntity.verify(token);

      if (!dataToken || user.getId !== dataToken.id) {
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
    } catch (error) {
      throw new Error("User not found");
    }
  }
}
