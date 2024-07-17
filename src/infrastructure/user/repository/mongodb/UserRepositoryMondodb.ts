import type UserGatewayInterface from "../../../../domain/user/gateway/UserGatewayInterface";
import UserEntity from "../../../../domain/user/entity/UserEntity";

import RepositoryMongoDb from "../../../mongodb/RepositoryMongodb";

import { Collections } from "../../../../utils/Collections";
import { WithId } from "mongodb";

interface DocumentUser extends WithId<Document> {
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly password: string;
  readonly saltRounds: string;
  readonly token: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}

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

    return users.map((user) => this.populateUser(user as DocumentUser));
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return this.populateUser(user as DocumentUser);
  }

  public async update(entity: UserEntity): Promise<void> {
    await this.repository.update<UserEntity>(entity, entity.getId);
  }

  public async login(login: string): Promise<UserEntity> {
    const user = await this.repository.findByLogin(login);

    if (!user) {
      throw new Error("User not found");
    }

    return this.populateUser(user as DocumentUser);
  }

  private populateUser(user: DocumentUser): UserEntity {
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
