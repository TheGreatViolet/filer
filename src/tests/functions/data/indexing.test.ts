import { PrismaClient } from "../../../database/client";
import { indexFolder } from "../../../functions/data/indexing";
import { clearDB } from "../../../functions/data/getting";
import path from "path";

describe("Indexing functions", () => {
  (async () => {
    await clearDB();
  });

  it("Indexes a folder", async () => {
    const client = new PrismaClient();

    const mainpath = path.join(__dirname, "../../../main");

    const fakeVolume = await client.volume.create({
      data: {
        name: "Test Volume",
        size: 100,
        type: "HDD"
      }
    });

    expect(indexFolder(mainpath, fakeVolume.id)).toBeTruthy();
  });

  (async () => {
    await clearDB();
  });
});
