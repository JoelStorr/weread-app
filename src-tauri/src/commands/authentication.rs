use std::collections::HashMap;
use reqwest;

// TODO: Login Function
#[tauri::command]
pub async fn login(email: String, password: String)->String{
    
    let mut map = HashMap::new();
    map.insert("email", email);
    map.insert("password", password);



    let client = reqwest::Client::new();
    let resp = match client.post("http://localhost:8080/auth/signinemail")
        .json(&map)
        .send().await {
            Ok(response) => {
                // TODO: Handle Token Globally in app
                
                return response.text().await.unwrap()
            },
            Err(err) => panic!("Error {}", err)
        };
    
    return String::from("default return");

}




// TODO: Register Function
