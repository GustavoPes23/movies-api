import dotenv from "dotenv";

import { MongoClient, ObjectId, WithId } from "mongodb";

import type UserRepositoryInterface from "../../../../domain/user/repository/UserRepositoryInterface";
import UserEntity from "../../../../domain/user/entity/UserEntity";

dotenv.config();

export default class UserRepositoryMongoDb implements UserRepositoryInterface {
  private async connect() {
    const client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    const connection = client.db(process.env.MONGO_DATABASE);

    return connection;
  }

  private getIdToDb(id: string): ObjectId {
    return new ObjectId(id);
  }

  public async create(entity: UserEntity): Promise<void> {
    const db = await this.connect();
    await db.collection("users").insertOne(entity);
  }

  public async findAll() {
    const db = await this.connect();
    const users = await db.collection("users").find().toArray();

    return users.map(({ _id, name, login, password, createdAt, updatedAt }) => {
        const user = new UserEntity(name, login, password);
        user.changeId(_id.toString());
        user.changeCreatedAt(createdAt);
        user.changeUpdatedAt(updatedAt);

        return user;
    });
  }

  public async findById(id: string): Promise<UserEntity> {
    const db = await this.connect();
    const user = await db
      .collection("users")
      .findOne({ _id: this.getIdToDb(id) });

    if (!user) {
        throw new Error("User not found");
    }

    return new UserEntity(user.name, user.login, user.password);
  }

  update(entity: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
