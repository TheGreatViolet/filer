import { PrismaClient } from "../database/client";

export async function createFile(name: string, extension: string,
  size: number, path: string, parentFolderID: number): Promise<String> {

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

  return 'success';
}

export async function createFolder(name: string, path: string, size: number,
  volumeID: number, fileIDs: number[] = []): Promise<String> {

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

  return 'success';
}

export async function createVolume(name: string, size: number, type: string): Promise<String> {
  const client = new PrismaClient();

  client.volume.create({
    data: {
      name,
      size,
      type
    }
  });

  await client.$disconnect();

  return 'success';
}

export async function clearDB() {
  const client = new PrismaClient();

  await client.file.deleteMany({});
  await client.folder.deleteMany({});
  await client.volume.deleteMany({});

  await client.$disconnect();

  return 'success';
}
