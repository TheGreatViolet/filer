import { PrismaClient, File, Folder, Volume } from "../../database/client";

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
