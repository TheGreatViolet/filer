import { createVolume, createFolder, createFile, clearDB, getVolume, getFolder, getFile } from "../../functions/data/data";

describe("Database functions", () => {
  it("Clears the database", () => {
    clearDB().then((value) => {
      expect(value).toBe("success");
    });
  });

  it("Creates a volume", () => {
    createVolume("test", 1024, "SSD").then((value) => {
      expect(value).toBe("success");
    });
  });

  it("Creates a folder in the volume", () => {
    createFolder("test", "/", 1024, 1).then((value) => {
      expect(value).toBe("success");
    });
  });

  it("Creates a file in the folder", () => {
    createFile("test", "txt", 1024, "/", 1).then((value) => {
      expect(value).toBe("success");
    });
  });

  it("Gets the volume", () => {
    getVolume("test").then((value) => {
      expect(value).not.toBeNull();

      if (value) {
        expect(value.name).toBe("test");
        expect(value.size).toBe(1024);
        expect(value.type).toBe("SSD");
      }
    });
  });

  it("Gets the folder", () => {
    getFolder("test").then((value) => {
      expect(value).not.toBeNull();

      if (value) {
        expect(value.name).toBe("test");
        expect(value.size).toBe(1024);
        expect(value.path).toBe("/");
      }
    });
  });

  it("Gets the file", () => {
    getFile("test").then((value) => {
      expect(value).not.toBeNull();

      if (value) {
        expect(value.name).toBe("test");
        expect(value.extension).toBe("txt");
        expect(value.size).toBe(1024);
        expect(value.path).toBe("/");
      }
    });
  });

  it("Clears the database again", () => {
    clearDB().then((value) => {
      expect(value).toBe("success");
    });
  });
})
