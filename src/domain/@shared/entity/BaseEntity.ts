import { v4 as uuid } from "uuid";

import NotificationEntity from "../../notification/entity/NotificationEntity";

export default class BaseEntity {
  private id: string;
  private notification: NotificationEntity
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id?: string) {
    this.id = id || uuid();
    this.notification = new NotificationEntity();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public get getId(): string {
    return this.id;
  }

  public changeId(id: string): BaseEntity {
    this.id = id;

    return this;
  }

  public get getCreatedAt(): string {
    return this.createdAt.toString();
  }

  public changeCreatedAt(date: Date): BaseEntity {
    this.createdAt = date;

    return this;
  }

  public get getUpdatedAt(): string {
    return this.updatedAt.toString();
  }

  public changeUpdatedAt(date: Date): BaseEntity {
    this.updatedAt = date;

    return this;
  }

  public get getNotification(): NotificationEntity {
    return this.notification;
  }
}
