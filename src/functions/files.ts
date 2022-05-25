import { fs, invoke } from '@tauri-apps/api';
import { FileEntry,  } from '@tauri-apps/api/fs';
import { toAbsolutePath } from './data';

export async function getItemsInFolder(path: string): Promise<FileEntry[]> {
  const absolutePath = await toAbsolutePath(path);

  const items = await fs.readDir(absolutePath);
  return items;
}

export async function openFile(path: string): Promise<void> {
  const absolutePath = await toAbsolutePath(path);

  invoke('open_file', {filePath: absolutePath});
}

export async function isDir(path: string): Promise<boolean> {
  const absolutePath = await toAbsolutePath(path);

  const paths = await fs.readDir(absolutePath).catch((e) => {
    return false;
  });

  if (paths === false) {
    return false;
  }

  return true;
}