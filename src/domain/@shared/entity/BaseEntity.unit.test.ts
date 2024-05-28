import BaseEntity from "./BaseEntity";

describe("tests for BaseEntity", () => {
    it("should create a new instance of BaseEntity with a generated id", () => {
        const entity = new BaseEntity();

        expect(entity.getId).toBeDefined();
        expect(entity.getId).not.toBeNull();
        expect(entity.getId).not.toBe("");
    });

    it("should create a new instance of BaseEntity with a provided id", () => {
        const id = "12345";
        const entity = new BaseEntity(id);

        expect(entity.getId).toBeDefined();
        expect(entity.getId).not.toBeNull();
        expect(entity.getId).toBe(id);
    });

    it("should change the id of BaseEntity", () => {
        const entity = new BaseEntity();
        const newId = "12345";

        entity.changeId(newId);

        expect(entity.getId).toBe(newId);
    });

    it("should change the createdAt of BaseEntity", () => {
        const entity = new BaseEntity();
        const newDate = new Date();

        entity.changeCreatedAt(newDate);

        expect(entity.getCreatedAt).toBe(newDate.toString());
    });

    it("should change the updatedAt of BaseEntity", () => {
        const entity = new BaseEntity();
        const newDate = new Date();

        entity.changeUpdatedAt(newDate);

        expect(entity.getUpdatedAt).toBe(newDate.toString());
    });
});