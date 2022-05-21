import { fs } from '@tauri-apps/api';
import { FileEntry } from '@tauri-apps/api/fs';
import { toAbsolutePath } from './data';

export async function getItemsInFolder(path: string): Promise<FileEntry[]> {
  const absolutePath = await toAbsolutePath(path);

  const items = await fs.readDir(absolutePath);
  return items;
}