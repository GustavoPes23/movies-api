import BaseEntity from "../../@shared/entity/BaseEntity";

interface PopulateData {
  id: string;
  name: string;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UserEntity extends BaseEntity {
  private name: string;
  private login: string;
  private password: string;

  constructor(name: string, login: string, password: string) {
    super();
    this.name = name;
    this.login = login;
    this.password = password;

    this.validate();
  }

  public get getName(): string {
    return this.name;
  }

  public changeName(name: string): UserEntity {
    this.name = name;
    this.validateName();

    return this;
  }

  public get getLogin(): string {
    return this.login;
  }

  public changeLogin(login: string): UserEntity {
    this.login = login;
    this.validateLogin();

    return this;
  }

  public get getPassword(): string {
    return this.password;
  }

  public changePassword(password: string): UserEntity {
    this.password = password;
    this.validatePassword();

    return this;
  }

  private validate(): void {
    this.validateName();
    this.validateLogin();
    this.validatePassword();
  }

  private validateName(): void {
    if (!this.name) {
      throw new Error("Invalid user name");
    }
  }

  private validateLogin(): void {
    if (!this.login) {
      throw new Error("Invalid user login");
    }
  }

  private validatePassword(): void {
    if (!this.password) {
      throw new Error("Invalid user password");
    }
  }

  public static populate(data : PopulateData): UserEntity {
    const entity = new UserEntity(data.name, data.login, data.password);

    entity.changeId(data.id);
    entity.changeCreatedAt(data.createdAt);
    entity.changeUpdatedAt(data.updatedAt);

    return entity;
  }
}
