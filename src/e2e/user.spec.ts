import app from "../index";
import request from "supertest";
import UserModel from "../infrastructure/user/repository/sequelize/UserModel";
import { Sequelize } from "sequelize-typescript";

describe("E2E test for customer", () => {
  let sequelize: Sequelize;
  // const databaseService = new DatabaseServiceSequelize(CustomerModel);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([UserModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a user", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        name: "user 1",
        login: "user1",
        password: "password",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("user 1");
  });
});
