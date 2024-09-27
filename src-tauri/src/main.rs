// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
use commands::greet::greet;
use commands::files::{save_file, load_file,};
use commands::authentication::{login, register};

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![greet, save_file, load_file, login, register])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
