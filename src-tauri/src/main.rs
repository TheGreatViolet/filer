#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      get_favorite_folders,
      index_folder,
      set_folder_fav,
      open_file
    ])
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
async fn index_folder(folder_name: String, fav: bool, path: String) -> () {
  let prisma_client: Result<PrismaClient, NewClientError> = client::new_client().await;

  if let Ok(client) = prisma_client {
    let _folder = client
      .folder()
      .create(
        folder::name::set(folder_name),
        folder::path::set(path),
        folder::favorite::set(fav),
        vec![],
      )
      .exec()
      .await;
  }
}

#[tauri::command]
async fn set_folder_fav(folder_name: String, path: String, fav: bool) -> () {
  let prisma_client: Result<PrismaClient, NewClientError> = client::new_client().await;

  if let Ok(client) = prisma_client {
    let folder_found = client
      .folder()
      .find_first(vec![
        folder::name::equals(folder_name),
        folder::path::equals(path),
      ])
      .exec()
      .await;

    if let Ok(folder_found) = folder_found {
      let _folder = client
        .folder()
        .find_unique(folder::id::equals(folder_found.unwrap().id))
        .update(vec![folder::favorite::set(fav)])
        .exec()
        .await;
    }
  }
}

use opener::open;

#[tauri::command]
async fn open_file(file_path: String) {
  open(file_path).expect("Failed to open file");
}
