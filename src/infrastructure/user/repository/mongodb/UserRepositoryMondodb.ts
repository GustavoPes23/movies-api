import type UserGatewayInterface from "../../../../domain/user/gateway/UserGatewayInterface";
import UserEntity from "../../../../domain/user/entity/UserEntity";
import PasswordEntity from "../../../../domain/password/entity/PasswordEntity";

import RepositoryMongoDb from "../../../mongodb/RepositoryMongodb";

import { Collections } from "../../utils/Collections";

export default class UserRepositoryMongoDb implements UserGatewayInterface {
  private repository: RepositoryMongoDb;
  constructor() {
    this.repository = new RepositoryMongoDb(Collections.USERS);
  }

  public async create(entity: UserEntity): Promise<void> {
    this.repository.create<UserEntity>(entity);
  }

  public async findAll() {
    const users = await this.repository.findAll();

    if (!users) {
      throw new Error("Users not found");
    }

    return users.map(
      ({
        _id,
        name,
        email,
        login,
        password,
        saltRounds,
        token,
        createdAt,
        updatedAt,
      }) =>
        UserEntity.populate({
          id: _id.toString(),
          name,
          email,
          login,
          password,
          saltRounds,
          token,
          createdAt,
          updatedAt,
        })
    );
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return UserEntity.populate({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      login: user.login,
      password: user.password,
      saltRounds: user.saltRounds,
      token: user.token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async update(entity: UserEntity): Promise<void> {
    await this.repository.update<UserEntity>(entity, entity.getId);
  }

  public async login(login: string): Promise<UserEntity> {
    const user = await this.repository.findByLogin(login);

    return UserEntity.populate({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      login: user.login,
      password: user.password,
      saltRounds: user.saltRounds,
      token: user.token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
