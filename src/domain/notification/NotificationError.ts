import type { NotificationErrorData } from "./entity/NotificationEntity";

export default class NotificationError extends Error {
  constructor(public errors: NotificationErrorData[]) {
    super(errors.map((err) => `${err.context}: ${err.message}`).join(", "));
  }
}
