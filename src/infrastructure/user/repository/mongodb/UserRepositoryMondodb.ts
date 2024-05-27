import type UserRepositoryInterface from "../../../../domain/user/repository/UserRepositoryInterface";
import UserEntity from "../../../../domain/user/entity/UserEntity";

import RepositoryMongoDb from "../../../mongodb/RepositoryMongodb";

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

    if (!users) {
      throw new Error("Users not found");
    }

    return users.map(({ _id, name, login, password, createdAt, updatedAt }) =>
      UserEntity.populate({ 
        id: _id.toString(), 
        name, 
        login, 
        password, 
        createdAt, 
        updatedAt 
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
      login: user.login, 
      password: user.password, 
      createdAt: user.createdAt, 
      updatedAt: user.updatedAt 
    });
  }

  public async update(entity: UserEntity): Promise<void> {
    await this.repository.update<UserEntity>(entity, entity.getId);
  }
}
