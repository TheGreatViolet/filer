import fs from 'fs';
import path from 'path';
import os from 'os';
import { PrismaClient } from '../../database/client';

export async function indexFolder(folderPath: string, volumeID: number ): Promise<boolean> {
  const client = new PrismaClient();

  const nullIfIndexed = client.folder.findFirst({
    where: {
      path: folderPath
    }
  });

  if (nullIfIndexed === null) {
    return true;
  }

  if (folderPath.match(/^~/)) {
    folderPath = path.join(os.homedir(), folderPath.split('~')[1]);
  }

  const data = fs.existsSync(folderPath) ? fs.readdirSync(folderPath) : [];

  if (data.length === 0) {
    throw new Error('Folder does not exist');
  }

  const folderSize = fs.statSync(folderPath).size;

  await client.folder.create({
    data: {
      path: folderPath,
      name: path.basename(folderPath),
      size: folderSize,
      Volume: {
        connect: {
          id: volumeID
        }
      }
    }
  });

  await client.$disconnect();

  return true;
}
