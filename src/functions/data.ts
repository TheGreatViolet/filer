import { PrismaClient } from "database/client";

export async function createFile(name: string, extension: string,
  size: number, path: string, parentFolderID: number): Promise<void> {

  const client = new PrismaClient();

  client.file.create({
    data: {
      name,
      extension,
      size,
      path,
      ParentFolder: {
        connect: {
          id: parentFolderID
        }
      }
    }
  });

  await client.$disconnect();
}

export async function createFolder(name: string, path: string, size: number,
  volumeID: number, fileIDs: number[] = []): Promise<void> {

  const client = new PrismaClient();

  client.folder.create({
    data: {
      name,
      path,
      size,
      Volume: {
        connect: {
          id: volumeID
        }
      },
      files: {
        connect: fileIDs.map(id => ({ id }))
      }
    }
  });

  await client.$disconnect();
}
