import { config as dotenv } from "dotenv";

import bcrypt from "bcrypt";

dotenv();

export default class PasswordEntity {
  private saltRounds: string;
  private password: string;

  constructor(saltRounds?: number) {
    this.saltRounds = this.generateSaltRounds(saltRounds);
  }

  public changePassword(password: string): PasswordEntity {
    this.password = password;
    this.validatePassword();

    return this;
  }

  private validatePassword(): void {
    if (!this.password) {
      throw new Error("Invalid password");
    }

    if (this.password.length < 5) {
      throw new Error("Invalid password");
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
    return bcrypt.genSaltSync(salt).replace('$2b$', '$2a$');
  }

  public genereateHash(): string {
    return bcrypt.hashSync(this.password, this.saltRounds);
  }

  public compare(hash: string): boolean {
    return bcrypt.compareSync(this.password, hash);
  }

  private validateSaltRounds(): void {
    if (!this.saltRounds) {
      throw new Error("Invalid salt rounds");
    }
  }
}
