"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { invoke } from "@tauri-apps/api";
import { Store } from "tauri-plugin-store-api";
import { open, save } from "@tauri-apps/api/dialog";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { dirname } from "path";
import Link from "next/link";

// TODO : Store user input

export default function Greet() {
  const store = new Store(".settings.dat");

  const formInput = useRef<HTMLInputElement>(null);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Loads stored user name on component load
    let loader = async () => {
      let name = await store.get<{ value: string }>("user-name");
      if (name === null) return;
      console.log(name.value);
      invoke<string>("greet", { name: name.value })
        .then((result) => setGreeting(result))
        .catch(console.error);
    };

    loader();
  }, []);

  async function onNameSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let name = formInput.current!.value;

    await store.set("user-name", { value: name });

    await store.save();

    invoke<string>("greet", { name })
      .then((result) => setGreeting(result))
      .catch(console.error);
  }

  async function exportName() {
    try {
      const filepath = await save({
        filters: [
          {
            name: "user",
            extensions: ["txt"],
          },
        ],
      });

      if (!filepath) return;

      console.log(filepath);

      let name = await store.get<{ value: string }>("user-name");
      if (name === null) return;

      await invoke<void>("save_file", { path: filepath, contents: name.value });
    } catch (error) {
      console.error(error);
    }

    // returns a path where to write the file to
  }


  async function loadNameFromFile(){

    try{

        const filepath = await open({
          multiple: false,
        });


        let data = await invoke<string>("load_file", {
          path: filepath,
        })

        let greet = await invoke<string>("greet", {name: data});


        setGreeting(greet);
        await store.set("user-name", { value: data });
        await store.save();


    }catch(error){
        console.error(error);
    }

  }

  return (
    <div>
      <h2>{greeting}</h2>
      <form onSubmit={onNameSubmit}>
        <label>
          Name <br />
          <input type="text" ref={formInput} />
        </label>
        <br />
        <button type="submit">Save Name</button>
      </form>

      <button onClick={exportName}>Export Name</button>
      <button onClick={loadNameFromFile}>Load your Name</button> 

        <br/>
      <Link href={"/settings"}>Settings</Link>
        <br/>
      <Link href={"/jsfiles"}>JS Files</Link>
    </div>
  );
}
