import UserEntity from "./UserEntity";

describe("tests for UserEntity", () => {
    it("should create a new instance of UserEntity", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        expect(user).toBeDefined();
        expect(user).not.toBeNull();
        expect(user.getName).toBe("John Doe");
        expect(user.getLogin).toBe("johndoe");
        expect(user.getPassword).toBe("password");
    });

    it("should throw an error when creating a new instance of UserEntity with an invalid name", () => {
        expect(() => new UserEntity("", "johndoe", "password")).toThrow("Invalid user name");
    });

    it("should throw an error when creating a new instance of UserEntity with an invalid login", () => {
        expect(() => new UserEntity("John Doe", "", "password")).toThrow("Invalid user login");
    });

    it("should throw an error when creating a new instance of UserEntity with an invalid password", () => {
        expect(() => new UserEntity("John Doe", "johndoe", "")).toThrow("Invalid user password");
    });

    it("should change the name of UserEntity", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        user.changeName("Jane Doe");

        expect(user.getName).toBe("Jane Doe");
    });

    it("should throw an error when update the name of UserEntity with an invalid name", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        expect(() => user.changeName("")).toThrow("Invalid user name");
    });

    it("should change the login of UserEntity", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        user.changeLogin("janedoe");

        expect(user.getLogin).toBe("janedoe");
    });

    it("should throw an error when update the login of UserEntity with an invalid login", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        expect(() => user.changeLogin("")).toThrow("Invalid user login");
    });

    it("should change the password of UserEntity", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        user.changePassword("newpassword");

        expect(user.getPassword).toBe("newpassword");
    });

    it("should throw an error when update the password of UserEntity with an invalid password", () => {
        const user = new UserEntity("John Doe", "johndoe", "password");

        expect(() => user.changePassword("")).toThrow("Invalid user password");
    });
});