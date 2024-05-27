import dotenv from "dotenv";

import type UserRepositoryInterface from "../../../../domain/user/repository/UserRepositoryInterface";
import UserEntity from "../../../../domain/user/entity/UserEntity";

import RepositoryMongoDb from "../../../mongodb/RepositoryMongodb";

dotenv.config();

export default class UserRepositoryMongoDb implements UserRepositoryInterface {
  private repository: RepositoryMongoDb;
  constructor() {
    this.repository = new RepositoryMongoDb("users");
  }

  public async create(entity: UserEntity): Promise<void> {
    this.repository.create<UserEntity>(entity);
  }

  public async findAll() {
    const users = await this.repository.findAll();

    return users.map(({ _id, name, login, password, createdAt, updatedAt }) => {
        const user = new UserEntity(name, login, password);
        user.changeId(_id.toString());
        user.changeCreatedAt(createdAt);
        user.changeUpdatedAt(updatedAt);

        return user;
    });
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return new UserEntity(user.name, user.login, user.password);
  }

  public async update(entity: UserEntity): Promise<void> {
    await this.repository.update<UserEntity>(entity, entity.getId);
  }
}
