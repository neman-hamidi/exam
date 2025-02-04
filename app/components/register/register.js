"use client";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { UserContext } from "@/app/userProvider/userProvider";
import { redirect } from "next/navigation";
import Link from "next/link";
import "./rgister.css";
export default function register() {
  const userContext = useContext(UserContext);
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const recaptcha = (value) => {
    setRecaptchaValue(true);
  };

  const [formData, setFormData] = useState({
    username: "",
    user: "",
    password: "",
    email: "",
  });
  const [error, SetError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempError = {};
    if (!formData.username) tempError.username = "لطفا نام خود را وارد کنید...";
    if (!formData.user) tempError.user = "لطفا نام مستعار خود را وارد کنید...";
    if (!formData.password)
      tempError.password = "لطفا پسورد خود را وارد کنید...";
    // if (!/\S+@\S+\.\S+/.test(formData.email))
    //   tempError.email = "ایمیل را صحیح وارد کنید";
    SetError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("register Success Fully", formData);
      fetch("http://localhost:3010/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 409) {
            swal({
              title: "این نام قبلا انتخاب شده.",
              icon: "error",
              button: "باشه",
            });
          } else {
            userContext.login(data.token, formData.username);
            swal({
              title: "با موفقیت ثبت نام شدید",
              icon: "success",
              button: "ورود به سایت",
            }).then((value) => {
              redirect("/");
            });
          }
        });
    } else {
      console.log("no");
    }
  };
  return (
    <form
      className="flex flex-col gap-y-8 py-5 px-8 border-double border-4 border-green-600 w-1/4 mx-auto"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-y-2">
        <label htmlFor="username">اسم خود را بنویسید.:*</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border py-1 px-3 max-w-96 rounded-lg"
          onChange={handleChange}
        />
      </div>
      {error.username && (
        <label
          className="p-1.5 text-red-600 shadow-md rounded-md"
          htmlFor="username"
        >
          اسم خود را وارد کنید
        </label>
      )}
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name-mx">اسم مستعار را بنویسید.:*</label>
        <input
          type="text"
          name="user"
          id="name-mx"
          className="border py-1 px-3 max-w-96 rounded-lg"
          onChange={handleChange}
        />
      </div>
      {error.user && (
        <label
          className="p-1.5 text-red-600 shadow-md rounded-md"
          htmlFor="name-mx"
        >
          اسم مستعار خود را وارد کنید
        </label>
      )}
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">ایمیل خود را وارد کنید:</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border py-1 px-3 max-w-96 rounded-lg"
          onChange={handleChange}
        />
      </div>
      {/* {error.email && (
            <label className="p-1.5 text-red-600 shadow-md rounded-md" htmlFor="email">ایمیل خود را وارد کنید</label>
          )} */}
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">پسورد خود را وارد کنید:*</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border py-1 px-3 max-w-96 rounded-lg"
          onChange={handleChange}
        />
      </div>
      {error.password && (
        <label
          className="p-1.5 text-red-600 shadow-md rounded-md"
          htmlFor="password"
        >
          پسورد خود را وارد کنید
        </label>
      )}
      <div className="flex flex-col gap-y-2">
        <button
          type="submit"
          className="w-full py-2 border border-blue-400 rounded-md"
        >
          ثبت نام
        </button>
      </div>
      <div className="flex flex-col gap-y-2">
        <Link
          className="w-full py-2 border border-blue-400 rounded-md text-center"
          href="/login"
        >
          ورود
        </Link>
      </div>
    </form>
  );
}
