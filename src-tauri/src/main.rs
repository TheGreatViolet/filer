#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_favorite_folders, index_folder])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

mod client;

use client::PrismaClient;
use client::{file, folder};

use prisma_client_rust::NewClientError;

#[tauri::command]
async fn get_favorite_folders() -> Vec<String> {
  let prisma_client: Result<PrismaClient, NewClientError> = client::new_client().await;

  if let Ok(client) = prisma_client {
    let folders = client
      .folder()
      .find_many(vec![folder::favorite::equals(true)])
      .exec()
      .await;

    if let Ok(folders) = folders {
      if folders.len() == 0 {
        return [].to_vec();
      }

      let mut result = vec![];

      for folder in folders {
        result.push(folder.name.clone());
      }

      return result;
    } else {
      return [].to_vec();
    }
  } else {
    return [].to_vec();
  }
}

#[tauri::command]
async fn index_folder(folder_name: String, fav: bool) -> () {
  let prisma_client: Result<PrismaClient, NewClientError> = client::new_client().await;

  if let Ok(client) = prisma_client {
    let _folder = client
      .folder()
      .create(
        folder::name::set(folder_name),
        folder::favorite::set(fav),
        vec![],
      )
      .exec()
      .await;
  }
}
