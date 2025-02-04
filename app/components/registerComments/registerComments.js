import React, { useState } from "react";
import Image from "next/image";
import swal from "sweetalert";
import "./reg.css";
export default function registerComments() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [error, SetError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    suggest: "",
    userClass: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempError = {};
    if (!formData.name) tempError.name = ".";
    if (!formData.text) tempError.text = ".";

    SetError(tempError);
    return Object.keys(tempError).length === 0;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsChecked1(true);
      fetch("http://localhost:3010/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: "",
            text: "",
            suggest: "",
            userClass: "",
          });
          setTimeout(() => {
            swal({
              title: "نظر شما پس از بازبینی در سایت قرار خواهد گرفت.",
              icon: "success",
              button: "باشه",
            });
          }, 4300);
        });
    } else {
      console.log("no");
    }
  };
  return (
    <form
      className="w-9/10 mx-auto flex flex-col md:flex-row gap-y-7 justify-around items-center"
      onSubmit={submitHandler}
    >
      <div>
        <p className="flex gap-1 mb-5">
          نظر خود را برای ما ارسال کنید.
          <svg className="w-6 h-6 text-green-600">
            <use href="#face-smile"></use>
          </svg>
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 max-w-[700px]">
            <label htmlFor="name" className="inline text-xs md:text-base">
              اسم خود را بنویسید:*
            </label>
            <input
              type="text"
              placeholder="متن مورد نظر..."
              name="name"
              id="name"
              className={`border border-slate-300 outline-none text-sm focus:border-blue-700 p-2 rounded-lg md:min-w-[600px] ${
                error.name ? "bg-red-500" : ""
              }`}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[700px]">
            <label htmlFor="userClass" className="inline text-xs md:text-base">
              پایه خود را بنویسید:
            </label>
            <input
              type="text"
              placeholder="متن مورد نظر..."
              name="userClass"
              id="userClass"
              className="border border-slate-300 outline-none text-sm focus:border-blue-700 p-2 rounded-lg md:min-w-[600px]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[700px]">
            <label htmlFor="suggest" className="inline text-xs md:text-base">
              موضوع:
            </label>
            <input
              type="text"
              placeholder="متن مورد نظر..."
              name="suggest"
              id="suggest"
              className="border border-slate-300 outline-none text-sm focus:border-blue-700 p-2 rounded-lg md:min-w-[600px]"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 max-w-[700px]">
            <label htmlFor="text" className="inline text-xs md:text-base">
              متن خود را بنویسید:*
            </label>
            <textarea
              name="text"
              placeholder="متن مورد نظر..."
              id="text"
              rows={3}
              className={`border border-slate-300 outline-none focus:border-blue-700 p-2 rounded-lg md:min-w-[600px] max-h-40 ${
                error.text ? "bg-red-500" : ""
              }`}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="relative">
            <button
              type="submit"
              className={`absolute top-0 right-0 w-1/4 h-full z-50 disabled`}
            ></button>
            <label className="label">
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={() => setIsChecked1(!isChecked1)}
                className="input"
              />
              <span className="circle">
                <svg
                  className="icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
                <div className="square" />
              </span>
              <p className="title">ارسال</p>
              <p className="title">ارسال شد</p>
            </label>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/comments.svg"
          width={400}
          height={400}
          alt="image-comments"
          className="w-44 h-44 ml-12 md:ml-0 md:w-96 md:h-96"
        />
      </div>
    </form>
  );
}
