import UserFactory from "../../factory/UserFactory";

import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserLoginInputDto, UserLoginOutputDto } from "./UserLoginDto";

export default class UserFindByIdUseCase {
  private repository: UserGatewayInterface;

  constructor(repository: UserGatewayInterface) {
    this.repository = repository;
  }

  public async execute(input: UserLoginInputDto): Promise<UserLoginOutputDto> {
    const user = await this.repository.login(input.login);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordEntity = UserFactory.getPasswordEntity(input.password, user.getSaltRounds);
    const hash = passwordEntity.generateHash();

    if (!passwordEntity.compare(hash)) {
      throw new Error("Password invalid");
    }

    if (user.getPassword !== hash) {
      throw new Error("Password invalid");
    }

    return {
      id: user.getId,
      name: user.getName,
      email: user.getEmail,
      token: user.getToken,
    };
  }
}
