import { invoke } from "@tauri-apps/api/tauri";

export const getFavFolders = async (): Promise<string[]> => {
  return invoke("get_favorite_folders");
}

export async function indexFolder(name: string, path: string, fav: boolean = false): Promise<void> {
  return invoke("index_folder", { folderName: name, fav: fav, path: path });
}

export async function updateFav(name: string, path: string, fav: boolean): Promise<void> {
  return invoke("set_folder_fav", { folderName: name, fav: fav, path: path });
}
