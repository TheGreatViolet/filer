import { PrismaClient, File, Folder, Volume } from "../../database/client";

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

export async function getFile(name: string): Promise<File | null> {
  const client = new PrismaClient();

  const file = await client.file.findFirst({
    where: {
      name: name
    }
  });

  await client.$disconnect();

  return file;
}

export async function getFolder(name: string): Promise<Folder | null> {
  const client = new PrismaClient();

  const folder = await client.folder.findFirst({
    where: {
      name: name
    }
  });

  await client.$disconnect();

  return folder;
}

export async function getVolume(name: string): Promise<Volume | null> {
  const client = new PrismaClient();

  const volume = await client.volume.findFirst({
    where: {
      name: name
    }
  });

  await client.$disconnect();

  return volume;
}

export async function clearDB() {
  const client = new PrismaClient();

  await client.file.deleteMany({});
  await client.folder.deleteMany({});
  await client.volume.deleteMany({});

  await client.$disconnect();

  return 'success';
}
