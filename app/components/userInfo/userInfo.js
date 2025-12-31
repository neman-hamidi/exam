"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ShoppingCartOutlined,
  StarsOutlined,
  ArrowBackIosNew,
} from "@mui/icons-material";

// اصلاح ساختار داده‌ها برای دسترسی آسان‌تر
const avatars = ["24", "25", "26", "27"];

export default function UserInfo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const triggerHeight = window.innerWidth >= 768 ? 1200 : 2100;
      setIsVisible(scrollTop >= triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 overflow-hidden font-[vazir] dir-rtl bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* بخش تصویر با افکت شناور */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-[1500ms] ease-in-out ${
              isVisible
                ? "opacity-100 translate-x-0 rotate-0"
                : "opacity-0 translate-x-20 rotate-6"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-100/40 rounded-[40px] blur-2xl group-hover:bg-blue-200/50 transition-colors"></div>

              <div className="relative bg-white p-4 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-50">
                <Image
                  src="/images/7.png"
                  width={600}
                  height={600}
                  alt="مخاطبان بانک سوال"
                  className="rounded-[32px] object-cover animate-float"
                  unoptimized
                />
              </div>

              {/* کارت وضعیت هوشمند */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden md:flex items-center gap-3 animate-bounce duration-[3000ms]">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">
                    دسترسی مستقیم
                  </span>
                  <span className="text-xs font-black text-slate-800">
                    ۱۰۰٪ رایگان
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* بخش متن و محتوا */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-[1500ms] delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">
                <StarsOutlined fontSize="small" />
                <span>مخصوص دانش‌آموزان کوشا</span>
              </div>

              <h4 className="text-3xl md:text-5xl font-[900] text-slate-900 lineMe">
                کاربران و مخاطبان <br />
                <span className="text-blue-600">نرم‌افزار هوشمند</span>
              </h4>

              <p className="text-slate-500 text-base md:text-lg leading-8 md:leading-10 text-justify font-medium">
                بانک سوال برای
                <span className="text-slate-800 font-bold underline decoration-yellow-400 underline-offset-8 mx-1">
                  داوطلبان کنکور سراسری
                </span>
                ، دانش‌آموزان پایه‌های دهم، یازدهم و دوره اول متوسطه طراحی شده
                است. شما می‌توانید با ثبت‌نام در آزمون‌های گزینه دو، متناسب با
                امتیاز خود، بسته‌های دسترسی را به‌صورت
                <span className="text-emerald-600 font-bold mx-1">رایگان</span>
                فعال نموده و از خدمات بی‌نظیر آن بهره‌مند شوید.
              </p>

              {/* دکمه‌ها */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 group">
                  <ShoppingCartOutlined fontSize="small" />
                  مارکت گزینه دو
                </button>

                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold transition-all group">
                  راهنمای دریافت امتیاز
                  <ArrowBackIosNew className="text-xs group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

              {/* آواتار کاربران */}
              <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                <div className="flex -space-x-3 space-x-reverse">
                  {avatars.map((imgName, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm relative"
                    >
                      <Image
                        src={`/images/${imgName}.png`}
                        fill
                        alt="user"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400 font-medium">
                  بیش از
                  <span className="text-slate-800 font-bold px-1">
                    ۵۰,۰۰۰ نفر
                  </span>
                  ماه گذشته عضو شدند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
