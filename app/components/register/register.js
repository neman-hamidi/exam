"use client";
import React, { useContext, useState, useEffect } from "react";
import swal from "sweetalert";
import { UserContext } from "@/app/userProvider/userProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

// MUI Icons
import {
  PersonOutline,
  MailOutline,
  LockOutlined,
  BadgeOutlined,
  VisibilityOff,
  Visibility,
  CheckCircle,
  RocketLaunch,
} from "@mui/icons-material";

export default function Register() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    user: "",
    password: "",
    email: "",
  });
  const [error, SetError] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error[name]) SetError({ ...error, [name]: "" });
  };

  const validate = () => {
    let tempError = {};
    if (!formData.username)
      tempError.username = "نام و نام‌خانوادگی الزامی است";
    if (!formData.user) tempError.user = "نام مستعار برای ورود الزامی است";
    if (formData.password.length < 6)
      tempError.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    SetError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch("http://localhost:3010/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.status == 409) {
          swal({
            title: "خطا!",
            text: "این نام کاربری قبلاً انتخاب شده است",
            icon: "error",
            button: "اصلاح اطلاعات",
          });
        } else {
          userContext.login(data.token, formData.username);

          // نمایش پیام موفقیت
          swal({
            title: "خوش آمدید! 🎉",
            text: "ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه اصلی...",
            icon: "success",
            buttons: false, // حذف دکمه برای زیبایی بیشتر در حالت اتوماتیک
            timer: 2000, // بستن خودکار پیام بعد از ۲ ثانیه
          });

          // هدایت خودکار بعد از ۲ ثانیه
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      } catch (err) {
        swal({ title: "خطا در سیستم", icon: "error" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-[vazir] dir-rtl overflow-hidden relative">
      {/* المان‌های دکوراتیو پس‌زمینه */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-yellow-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="bg-white/80 backdrop-blur-xl w-full max-w-[950px] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row border border-white z-10 animate-in fade-in zoom-in duration-700">
        {/* بخش محتوای متنی */}
        <div className="hidden md:flex md:w-[40%] bg-[#1e293b] p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-8 rotate-12 shadow-lg shadow-blue-500/50">
              <RocketLaunch className="text-white" />
            </div>
            <h2 className="text-3xl font-black mb-6 leading-tight">
              سفر علمی خود را <br /> از اینجا شروع کن!
            </h2>
            <ul className="space-y-4">
              {[
                "دسترسی به ۲۰ هزار سوال",
                "آزمون‌های شبیه‌ساز کنکور",
                "تحلیل هوشمند سطح علمی",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle
                    className="text-emerald-400"
                    sx={{ fontSize: 18 }}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-slate-400 text-xs z-10">
            Smart Question Bank v2.0
          </p>

          {/* پترن گرافیکی پشت متن */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        {/* بخش فرم */}
        <div className="w-full md:w-[60%] p-8 md:p-12 bg-white">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-black text-slate-800">
              ثبت‌نام دانش‌آموز
            </h1>
            <Link
              href="/login"
              className="text-blue-600 text-sm font-bold hover:underline"
            >
              ورود به حساب
            </Link>
          </div>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* نام کاربری */}
            <div className="md:col-span-2">
              <CustomInput
                label="نام و نام‌خانوادگی"
                name="username"
                icon={<PersonOutline />}
                placeholder="مثلا: علی محمدی"
                onChange={handleChange}
                error={error.username}
              />
            </div>

            {/* آیدی کاربری */}
            <CustomInput
              label="نام مستعار (ID)"
              name="user"
              icon={<BadgeOutlined />}
              placeholder="ali_82"
              onChange={handleChange}
              error={error.user}
              ltr
            />

            {/* ایمیل */}
            <CustomInput
              label="ایمیل"
              name="email"
              icon={<MailOutline />}
              placeholder="mail@site.com"
              onChange={handleChange}
              ltr
            />

            {/* پسورد */}
            <div className="md:col-span-2 relative">
              <CustomInput
                label="رمز عبور"
                name="password"
                type={showPass ? "text" : "password"}
                icon={<LockOutlined />}
                placeholder="حداقل ۶ کاراکتر"
                onChange={handleChange}
                error={error.password}
                ltr
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute left-4 top-[38px] text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPass ? (
                  <VisibilityOff sx={{ fontSize: 20 }} />
                ) : (
                  <Visibility sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.01] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2"
            >
              ساخت حساب کاربری و شروع آزمون
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// کامپوننت داخلی برای ورودی‌ها جهت جلوگیری از تکرار کد
const CustomInput = ({
  label,
  name,
  icon,
  placeholder,
  onChange,
  error,
  ltr,
  type = "text",
}) => (
  <div className="space-y-1.5 flex flex-col">
    <label className="text-xs font-bold text-slate-500 mr-1">{label}</label>
    <div
      className={`flex items-center bg-slate-50 border-2 rounded-2xl px-4 transition-all duration-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 ${
        error
          ? "border-red-200"
          : "border-slate-100 focus-within:border-blue-500"
      }`}
    >
      <span className="text-slate-400">{icon}</span>
      <input
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3.5 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 ${
          ltr ? "ltr text-right" : ""
        }`}
      />
    </div>
    {error && (
      <span className="text-[10px] text-red-500 font-bold mr-1">{error}</span>
    )}
  </div>
);
