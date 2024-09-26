"use client";
import { invoke } from "@tauri-apps/api";
import { save } from "@tauri-apps/api/dialog";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";

export default function JSFiles() {
  const textareRef = useRef<HTMLTextAreaElement>(null);

  async function saveCode(e: FormEvent) {
    e.preventDefault();

    console.log("Ran save");

    try {
      const filepath = await save({
        filters: [
          {
            name: "user",
            extensions: ["js"],
          },
        ],
      });

      if (!filepath) return;

      const replace = textareRef.current?.value.replace(`„`, `"`);

      await invoke<void>("save_file", { path: filepath, contents: replace });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3>Your JS Code goes here</h3>

      <form onSubmit={saveCode}>
        <textarea ref={textareRef} lang="en" />
        <br />
        <button type="submit">Save</button>
      </form>
      <br />
      <button onClick={() => {}}>Load Code</button>
      <br />

      <Link href={"/"}>Home</Link>
    </div>
  );
}
