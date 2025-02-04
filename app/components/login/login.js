"use client";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { UserContext } from "@/app/userProvider/userProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./login.css"
export default function login() {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    let newUser = {
      username,
      password,
    };
    console.log(newUser);
    
    fetch("http://localhost:3010/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          userContext.login(data.token,newUser.username);
          swal({
            title: "خوش آمدید",
            icon: "success",
            button: "ورود به سایت",
          }).then((value) => {
            redirect("/");
          });
        }
        if (data.status === 401) {
          swal({
            title: "نام کاربری یا پسورد اشتباه است",
            icon: "error",
            button: "باشه",
          });
        } else if (data.status === 402) {
          swal({
            title: "نام کاربری یا پسورد اشتباه است",
            icon: "error",
            button: "تلاش دوباره",
          })
        }
      });
  };
  return (
    <form
      className="h-screen items-center flex w-1/2 mx-auto justify-center"
      onSubmit={submitHandler}
    >
      <div className="border-dashed border-4 border-green-400 flex flex-col items-center gap-4 p-10">
        <div className="flex gap-2 flex-col">
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-lg max-w-80 p-2"
            placeholder="نام کاربری ..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <label htmlFor="password">پسورد</label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg max-w-80 p-2"
            placeholder="پسورد"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-row items-center  w-full">
          
            <button type="submit"
            className="border border-gray-300 p-1 rounded-lg">ورود</button>
          <Link
            href="/register"
            className="border border-gray-300 p-1 rounded-lg"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </form>
  );
}
