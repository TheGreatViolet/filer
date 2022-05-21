import { invoke } from "@tauri-apps/api/tauri";

export const getFavFolders = async (): Promise<string[]> => {
  return invoke("get_favorite_folders");
}

export async function indexFolder(name: string, fav: boolean = false): Promise<void> {
  return invoke("index_folder", { folderName: name, fav: fav });
}