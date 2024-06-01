import { config as dotenv } from "dotenv";

import bcrypt from "bcrypt";

import BaseEntity from "../../@shared/entity/BaseEntity";
import NotificationError from "../../notification/NotificationError";

dotenv();

export default class PasswordEntity extends BaseEntity {
  private saltRounds: string;
  private password: string;

  constructor(saltRounds?: number) {
    super();
    this.saltRounds = this.generateSaltRounds(saltRounds);
  }

  public get getPassword(): string {
    return this.password;
  }

  public changePassword(password: string): PasswordEntity {
    this.password = password;
    this.validatePassword();

    return this;
  }

  private validatePassword(): void {
    if (!this.password) {
      this.getNotification.addError({
        message: "Invalid password",
        context: "password",
      });
    }

    if (this.password.length < 5) {
      this.getNotification.addError({
        message: "Password must be at least 5 characters",
        context: "password",
      });
    }

    if (this.getNotification.hasErrors("password")) {
      throw new NotificationError(this.getNotification.getErrors("password"));
    }
  }

  public get getSaltRounds(): string {
    return this.saltRounds;
  }

  public changeSaltRounds(saltRounds: string): PasswordEntity {
    this.saltRounds = saltRounds;
    this.validateSaltRounds();

    return this;
  }

  private generateSaltRounds(saltRounds?: number): string {
    const salt = saltRounds || Math.random();
    return bcrypt.genSaltSync(salt).replace("$2b$", "$2a$");
  }

  public genereateHash(): string {
    return bcrypt.hashSync(this.password, this.saltRounds);
  }

  public compare(hash: string): boolean {
    return bcrypt.compareSync(this.password, hash);
  }

  private validateSaltRounds(): void {
    if (!this.saltRounds) {
      this.getNotification.addError({
        message: "Invalid salt rounds",
        context: "password",
      });
    }

    if (this.getNotification.hasErrors("password")) {
      throw new NotificationError(this.getNotification.getErrors("password"));
    }
  }
}
