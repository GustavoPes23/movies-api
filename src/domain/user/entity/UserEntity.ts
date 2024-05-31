import BaseEntity from "../../@shared/entity/BaseEntity";

interface PopulateData {
  id: string;
  name: string;
  login: string;
  password: string;
  saltRounds: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UserEntity extends BaseEntity {
  private name: string;
  private login: string;
  private password: string;
  private saltRounds: string;
  private token: string;

  constructor(
    name: string, 
    login: string, 
    password: string, 
    saltRounds: string,
    token: string
  ) {
    super();
    this.name = name;
    this.login = login;
    this.password = password;
    this.saltRounds = saltRounds;
    this.token = token;

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

  public get getToken(): string {
    return this.token;
  }

  public changeToken(token: string): UserEntity {
    this.token = token;
    this.validateToken();

    return this;
  }

  public get getSaltRounds(): string {
    return this.saltRounds;
  }

  public changeSaltRounds(saltRounds: string): UserEntity {
    this.saltRounds = saltRounds;
    this.validateSaltRounds();

    return this;
  }

  private validate(): void {
    this.validateName();
    this.validateLogin();
    this.validatePassword();
    this.validateSaltRounds();
    this.validateToken();
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

  private validateToken(): void {
    if (!this.token) {
      throw new Error("Invalid user token");
    }
  }

  private validateSaltRounds(): void {
    if (!this.saltRounds) {
      throw new Error("Invalid user salt rounds");
    }
  }


  public static populate(data : PopulateData): UserEntity {
    const entity = new UserEntity(
      data.name, 
      data.login, 
      data.password,
      data.saltRounds,
      data.token
    );

    entity.changeId(data.id);
    entity.changeCreatedAt(data.createdAt);
    entity.changeUpdatedAt(data.updatedAt);

    return entity;
  }
}
