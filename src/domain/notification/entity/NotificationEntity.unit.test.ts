import NotificationEntity from "./NotificationEntity";

describe("tests for NotificationEntity", () => {
  it("should add an error", () => {
    const entity = new NotificationEntity();

    entity.addError({ message: "Invalid password", context: "password" });

    expect(entity.hasErrors("password")).toBe(true);
  });

  it("should get errors", () => {
    const entity = new NotificationEntity();
    entity.addError({ message: "Invalid password", context: "password" });
    entity.addError({ message: "Invalid password2", context: "password" });

    expect(entity.getErrors("password")[0].message).toBe("Invalid password");
    expect(entity.getErrors("password")[1].message).toBe("Invalid password2");
  });

  it("should get messages", () => {
    const entity = new NotificationEntity();
    entity.addError({ message: "Invalid password", context: "password" });

    expect(entity.messages("password")).toBe("Invalid password");
  });

  it("should not have errors", () => {
    const entity = new NotificationEntity();
    expect(entity.hasErrors()).toBe(false);
  });

  it("should have errors with context", () => {
    const entity = new NotificationEntity();
    entity.addError({ message: "Invalid password", context: "password" });
    expect(entity.hasErrors("password")).toBe(true);
  });
});
