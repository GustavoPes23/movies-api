import PasswordEntity from "../../../password/entity/PasswordEntity";
import TokenEntity from "../../../token/entity/TokenEntity";
import UserEntity from "../../entity/UserEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserCreateInputDto, UserCreateOutputDto } from "./UserCreateDto";

export default class UserCreateUsecase {
  private repository: UserGatewayInterface;
  private passwordEntity: PasswordEntity;

  constructor(
    repository: UserGatewayInterface,
    passwordEntity: PasswordEntity
  ) {
    this.repository = repository;
    this.passwordEntity = passwordEntity;
  }

  public async execute(
    input: UserCreateInputDto
  ): Promise<UserCreateOutputDto> {
    this.passwordEntity.changePassword(input.password);
    const password = this.passwordEntity.generateHash();
    const saltRounds = this.passwordEntity.getSaltRounds;
    const user = new UserEntity(
      input.name,
      input.email,
      input.login,
      password,
      saltRounds,
    );

    await this.repository.create(user);

    return {
      id: user.getId,
      name: user.getName,
      email: user.getEmail,
      login: user.getLogin,
      createdAt: user.getCreatedAt,
    };
  }
}
