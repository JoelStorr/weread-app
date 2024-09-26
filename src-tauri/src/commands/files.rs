use std::fs;

    
    #[tauri::command]
    pub fn save_file(path: String, contents:String){
    
    
        fs::write(path, contents).unwrap();
        
    }
    
    
    #[tauri::command]
    pub fn load_file(path: String) -> String{
    
        let data = fs::read_to_string(path);

        
        match data {
            Ok(name) => {
                return String::from(name);
            },
            Err(..) => {
                println!("Could not load the file")
            }
            
        }
        
        println!("{:#?}", data);
        
        return String::from("");
    }

