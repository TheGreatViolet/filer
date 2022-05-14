import { createVolume, createFolder, createFile, clearDB } from "../functions/data";

describe("Database functions", () => {
  it("Creates a volume", async () => {
    const value = await createVolume("test", 1024, "SSD");
    expect(value).toBe("success");
  })

  it("Creates a folder in the volume", async () => {
    const value = await createFolder("test", "/", 1024, 1);
    expect(value).toBe("success");
  })

  it("Creates a file in the folder", async () => {
    const value = await createFile("test", "txt", 1024, "/", 1);
    expect(value).toBe("success");
  })

  it("Clears the database", async () => {
    const value = await clearDB();
    expect(value).toBe("success");
  })
})
