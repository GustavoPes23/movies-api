import BaseEntity from "../../@shared/entity/BaseEntity";
import NotificationError from "../../notification/NotificationError";

interface PopulateData {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly password: string;
  readonly saltRounds: string;
  readonly token: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export default class UserEntity extends BaseEntity {
  private name: string;
  private email: string;
  private login: string;
  private password: string;
  private saltRounds: string;
  private token: string;

  constructor(
    name: string,
    email: string,
    login: string,
    password: string,
    saltRounds: string,
    token: string
  ) {
    super();
    this.name = name;
    this.email = email;
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

  public get getEmail(): string {
    return this.email;
  }

  public changeEmail(email: string): UserEntity {
    this.email = email;
    this.validateEmail();

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
    this.validateEmail();
    this.validateLogin();
    this.validatePassword();
    this.validateSaltRounds();
    this.validateToken();
  }

  private validateName(): void {
    if (!this.name) {
      this.getNotification.addError({
        message: "Invalid user name",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  private validateEmail(): void {
    if (!this.email) {
      this.getNotification.addError({
        message: "Invalid user email",
        context: "user",
      });
    }

    if (!this.email.includes("@")) {
      this.getNotification.addError({
        message: "Invalid user email",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  private validateLogin(): void {
    if (!this.login) {
      this.getNotification.addError({
        message: "Invalid user login",
        context: "user",
      });
    }

    if (this.login.length < 5) {
      this.getNotification.addError({
        message: "Minimum user login length is 5 characters",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  private validatePassword(): void {
    if (!this.password) {
      this.getNotification.addError({
        message: "Invalid user password",
        context: "user",
      });
    }

    if (this.password.length < 5) {
      this.getNotification.addError({
        message: "Minimum user password length is 5 characters",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  private validateToken(): void {
    if (!this.token) {
      this.getNotification.addError({
        message: "Invalid user token",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  private validateSaltRounds(): void {
    if (!this.saltRounds) {
      this.getNotification.addError({
        message: "Invalid user salt rounds",
        context: "user",
      });
    }

    if (this.getNotification.hasErrors("user")) {
      throw new NotificationError(this.getNotification.getErrors("user"));
    }
  }

  public static populate(data: PopulateData): UserEntity {
    const entity = new UserEntity(
      data.name,
      data.email,
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
