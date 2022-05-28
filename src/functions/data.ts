import { homeDir, join } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri';

export async function toAbsolutePath(path: string) {
  if (path.startsWith('~/')) {
    const split = path.split(/~(?=\/)/);
    return await join(await homeDir(), split[1]);
  } else {
    return path;
  }
}

export const getFavFolders = async (): Promise<string[]> => {
  return invoke("get_favorite_folders");
}

export async function indexFolder(name: string, path: string, fav: boolean = false): Promise<void> {
  return invoke("index_folder", { folderName: name, fav: fav, path: await toAbsolutePath(path) });
}

export async function updateFav(name: string, path: string, fav: boolean): Promise<void> {
  return invoke("set_folder_fav", { folderName: name, fav: fav, path: await toAbsolutePath(path) });
}
