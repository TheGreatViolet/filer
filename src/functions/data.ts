import { invoke } from "@tauri-apps/api/tauri";

export const getFavFolders = async (): Promise<string[]> => {
  return invoke("get_favorite_folders");
}
