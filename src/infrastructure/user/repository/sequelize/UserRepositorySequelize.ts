import { Sequelize } from "sequelize-typescript";
import UserEntity from "../../../../domain/user/entity/UserEntity";

import type UserGatewayInterface from "../../../../domain/user/gateway/UserGatewayInterface";

import UserModel from "./UserModel";

export default class UserRepositorySequelize
  implements UserGatewayInterface
{
  private async connect(): Promise<void> {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([UserModel]);
    await sequelize.sync();
  }

  public async create(entity: UserEntity): Promise<void> {
    await this.connect();
    
    await UserModel.create({
      id: entity.getId,
      name: entity.getName,
      login: entity.getLogin,
      password: entity.getPassword,
      createdAt: entity.getCreatedAt,
      updateAt: entity.getUpdatedAt,
    });
  }

  findAll(): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  update(entity: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
