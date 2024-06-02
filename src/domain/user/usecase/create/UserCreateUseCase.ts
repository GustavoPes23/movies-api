import PasswordEntity from "../../../password/entity/PasswordEntity";
import TokenEntity from "../../../token/entity/TokenEntity";
import UserEntity from "../../entity/UserEntity";
import type UserGatewayInterface from "../../gateway/UserGatewayInterface";
import type { UserCreateInputDto, UserCreateOutputDto } from "./UserCreateDto";

export default class UserCreateUsecase {
  private repository: UserGatewayInterface;
  private tokenEntity: TokenEntity;
  private passwordEntity: PasswordEntity;

  constructor(
    repository: UserGatewayInterface,
    tokenEntity: TokenEntity,
    passwordEntity: PasswordEntity
  ) {
    this.repository = repository;
    this.tokenEntity = tokenEntity;
    this.passwordEntity = passwordEntity;
  }

  public async execute(
    input: UserCreateInputDto
  ): Promise<UserCreateOutputDto> {
    const token = this.tokenEntity.generate(input);
    this.passwordEntity.changePassword(input.password);
    const password = this.passwordEntity.generateHash();
    const saltRounds = this.passwordEntity.getSaltRounds;
    const user = new UserEntity(
      input.name,
      input.email,
      input.login,
      password,
      saltRounds,
      token,
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
