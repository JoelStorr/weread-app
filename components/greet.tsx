'use client'

import { useEffect, useState, useRef, FormEvent } from "react";
import { invoke } from '@tauri-apps/api';
import { Store } from 'tauri-plugin-store-api';
import Link from "next/link";


// TODO : Store user input 

export default function Greet() {

    const store = new Store(".settings.dat");


    const formInput = useRef<HTMLInputElement>(null);

    const [greeting, setGreeting] = useState("")

    useEffect(()=>{

        // Loads stored user name on component load
        let loader = async ()=>{
            let name = await store.get<{value: string}>('user-name');
            if(name === null) return;
            console.log(name.value);
            invoke<string>('greet', {name: name.value})
                .then(result=> setGreeting(result))
                .catch(console.error)
        }

        loader();
        



    }, [])


    async function onNameSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let name = formInput.current!.value;

        await store.set('user-name', {value: name})

        await store.save();

        invoke<string>('greet', {name})
            .then(result => setGreeting(result))
            .catch(console.error)

    }


  return (
    <div>

        <h2>{greeting}</h2>
        <form onSubmit={onNameSubmit}>
            <label>
                Name <br/>
                <input type='text' ref={formInput}/>
            </label>
            <br/>
            <button type='submit'>Save Name</button>
        </form>

        <Link href={"/settings"}>Settings</Link>
    </div>
  )
}
