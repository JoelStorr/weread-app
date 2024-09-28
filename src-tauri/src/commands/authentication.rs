use std::collections::HashMap;
use reqwest;

// Login existing user
#[tauri::command]
pub async fn login(app_handle: tauri::AppHandle, email: String, password: String) -> String {
    let binding = app_handle.path_resolver().app_data_dir().unwrap();
    let app_data_dir = binding.to_str().unwrap();

    println!("{}", app_data_dir.to_string());

    let mut map = HashMap::new();
    map.insert("email", email);
    map.insert("password", password);

    let client = reqwest::Client::new();
    match client.post("http://localhost:8080/auth/signinemail").json(&map).send().await {
        Ok(response) => {
            // TODO: Handle Token Globally in app

            return response.text().await.unwrap();
        }
        Err(err) => panic!("Error {}", err),
    };
}

// Register new user
#[tauri::command]
pub async fn register(email: String, password: String, username: String) -> String {
    let mut map = HashMap::new();
    map.insert("username", username);
    map.insert("email", email);
    map.insert("password", password);

    let client = reqwest::Client::new();
    match client.post("http://localhost:8080/auth/register").json(&map).send().await {
        Ok(response) => {
            // TODO: Handle Token Globally in app

            return response.text().await.unwrap();
        }
        Err(err) => panic!("Error {}", err),
    };
}

// TODO: Handle Token on the backend and allow refresh
