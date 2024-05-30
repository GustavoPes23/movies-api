import { config as dotenv } from "dotenv";

import jwt from "jsonwebtoken";

dotenv();

interface TokenPayload {
  [key: string]: string;
}

export default class TokenEntity {
  private secretKey: string;
  private expireTime = "1h";

  constructor() {
    this.secretKey = process.env.SECRET_KEY_JWT as string;
  }

  public generate<T>(payload: T): string {
    return jwt.sign(payload as unknown as TokenPayload, this.secretKey, { expiresIn: this.expireTime });
  }

  public verify<T>(token: string): T | null {
    try {
      return jwt.verify(token, this.secretKey) as T;
    } catch (error) {
      return error;
    }
  }
}
