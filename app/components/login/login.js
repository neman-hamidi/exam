"use client";
import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { UserContext } from "@/app/userProvider/userProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

// MUI Icons
import {
  LockOutlined,
  PersonOutline,
  VisibilityOff,
  Visibility,
  LoginOutlined,
  Fingerprint,
} from "@mui/icons-material";

export default function Login() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      swal({
        title: "لطفاً تمامی فیلدها را پر کنید",
        icon: "warning",
        button: "متوجه شدم",
      });
      return;
    }

    setIsLoading(true);
    let newUser = { username, password };

    try {
      const res = await fetch("http://localhost:3010/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (data.status === 200) {
        userContext.login(data.token, newUser.username);
        swal({
          title: "خوش آمدید! 👋",
          text: "ورود موفقیت‌آمیز بود. در حال انتقال...",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        swal({
          title: "خطا در ورود",
          text: "نام کاربری یا رمز عبور اشتباه است",
          icon: "error",
          button: "تلاش مجدد",
        });
      }
    } catch (err) {
      swal({ title: "خطای شبکه", icon: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-[vazir] dir-rtl relative overflow-hidden">
      {/* دایره‌های تزئینی پس‌زمینه */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="bg-white/80 backdrop-blur-xl w-full max-w-[900px] rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row border border-white z-10 animate-in fade-in duration-700">
        {/* بخش فرم ورود */}
        <div className="w-full md:w-1/2 p-8 md:p-14 bg-white">
          <div className="mb-10 text-center md:text-right">
            <div className="inline-flex md:hidden mb-4 p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Fingerprint fontSize="large" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">
              خوش برگشتی!
            </h1>
            <p className="text-slate-400 text-sm italic font-medium">
              لطفاً اطلاعات حساب خود را وارد کنید
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* ورودی نام کاربری */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xs font-bold text-slate-500 mr-1">
                نام کاربری
              </label>
              <div className="flex items-center bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5">
                <PersonOutline className="text-slate-400" fontSize="small" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full p-4 bg-transparent outline-none text-sm text-slate-700 ltr text-right"
                />
              </div>
            </div>

            {/* ورودی رمز عبور */}
            <div className="space-y-2 flex flex-col relative">
              <label className="text-xs font-bold text-slate-500 mr-1">
                رمز عبور
              </label>
              <div className="flex items-center bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5">
                <LockOutlined className="text-slate-400" fontSize="small" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 bg-transparent outline-none text-sm text-slate-700 ltr text-right"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute left-4 top-[33px] text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPass ? (
                  <VisibilityOff sx={{ fontSize: 20 }} />
                ) : (
                  <Visibility sx={{ fontSize: 20 }} />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center text-xs px-1">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="accent-blue-600" /> مرا به
                خاطر بسپار
              </label>
              <a href="#" className="text-blue-600 font-bold hover:underline">
                فراموشی رمز؟
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                "در حال بررسی..."
              ) : (
                <>
                  <span>ورود به پنل کاربری</span>
                  <LoginOutlined fontSize="small" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              هنوز ثبت‌نام نکرده‌ای؟{" "}
              <Link
                href="/register"
                className="text-blue-600 font-black hover:underline underline-offset-4 decoration-2"
              >
                ایجاد حساب جدید
              </Link>
            </p>
          </div>
        </div>

        {/* بخش راست: تصویر و متن گرافیکی (مخصوص دسکتاپ) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-12 text-white flex-col justify-center items-center relative text-center">
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-2xl animate-bounce duration-[3000ms]">
              <Fingerprint sx={{ fontSize: 45 }} className="text-white" />
            </div>
            <h2 className="text-3xl font-black italic">امنیت و سرعت</h2>
            <p className="text-blue-100/70 text-sm leading-relaxed max-w-[280px] mx-auto">
              با ورود به حساب کاربری خود، تمام سوابق آزمون‌ها و پیشرفت تحصیلی
              شما به صورت هوشمند تحلیل می‌شود.
            </p>
          </div>

          {/* تزئینات پس‌زمینه سمت راست */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-[20%] left-[10%] w-32 h-32 bg-indigo-400 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
