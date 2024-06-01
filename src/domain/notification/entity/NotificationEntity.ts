export interface NotificationErrorData {
  readonly message: string;
  context: string;
}

export default class NotificationEntity {
  private errors: NotificationErrorData[] = [];

  public addError(error: NotificationErrorData): void {
    this.errors.push(error);
  }

  public messages(context?: string): string {
    return this.errors
      .filter((error) => !context || error.context === context)
      .map((error) => error.message)
      .join(", ");
  }

  public hasErrors(context?: string): boolean {
    return this.errors.some((error) => !context || error.context === context);
  }

  public getErrors(context?: string): NotificationErrorData[] {
    return this.errors.filter((error) => !context || error.context === context);
  }
}
