#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      get_favorite_folders,
      add_folder,
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
        result.push(folder.path.clone());
      }

      return result;
    } else {
      println!("{}", folders.err().unwrap());
      return [].to_vec();
    }
  } else {
    return [].to_vec();
  }
}

#[tauri::command]
async fn add_folder(folder_name: String, fav: bool, path: String) -> () {
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

use opener::open;

#[tauri::command]
async fn open_file(file_path: String) {
  open(file_path).expect("Failed to open file");
}
