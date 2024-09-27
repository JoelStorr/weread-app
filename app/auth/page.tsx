"use client";
import { invoke } from "@tauri-apps/api";
import React, { FormEvent, useRef } from "react";

// TODO: Allow basic version of user login and registration

export default function page() {
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);

  const signupUsernameRef = useRef<HTMLInputElement>(null);
  const signupEmailRef = useRef<HTMLInputElement>(null);
  const signupPasswordRef = useRef<HTMLInputElement>(null);
  const signupPasswordConfirmRef = useRef<HTMLInputElement>(null);

  async function onLoginHandler(e: FormEvent) {
    e.preventDefault();

    let response = await invoke<string>("login", {
      email: loginEmailRef.current?.value,
      password: loginPassword.current?.value,
    });

    console.log(response);
  }

  async function onSignUpHandler(e: FormEvent) {
    e.preventDefault();

    let response = await invoke<string>("register", {
      email: signupEmailRef.current?.value,
      password: signupEmailRef.current?.value,
      username: signupUsernameRef.current?.value,
    });

    console.log(response);
  }

  return (
    <>
      <div>
        <h3>Sign In</h3>
        <form onSubmit={onLoginHandler}>
          <label>
            Email <br />
            <input
              type="email"
              placeholder="example@example.com"
              ref={loginEmailRef}
            />
          </label>
          <br />
          <label>
            Password <br />
            <input type="password" ref={loginPassword} />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <br />
      <br />
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={onSignUpHandler}>
          <label>
            Username <br />
            <input
              type="text"
              placeholder="Your Username"
              ref={signupUsernameRef}
            />
          </label>
          <br />
          <label>
            Email <br />
            <input
              type="email"
              placeholder="example@example.com"
              ref={signupEmailRef}
            />
          </label>
          <br />
          <label>
            Password <br />
            <input type="password" ref={signupPasswordRef} />
          </label>
          <br />
          <label>
            Confirm Password <br />
            <input type="password" ref={signupPasswordConfirmRef} />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
