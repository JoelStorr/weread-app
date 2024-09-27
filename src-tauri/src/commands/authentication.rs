// TODO: Login Function

#[tauri::command]
pub fn login(name: &str)->String{
    format!("Hello, {}!", name)
}




// TODO: Register Function