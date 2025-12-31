import React from "react";
import Image from "next/image";
import {
  PeopleOutline,
  QuizOutlined,
  LibraryBooksOutlined,
  ArrowBackIosNew,
} from "@mui/icons-material";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-[#f8fafc] py-16 md:py-24 font-[vazir] dir-rtl">
      {/* المان‌های تزئینی پس‌زمینه */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 blur-[120px] rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-yellow-100/50 blur-[100px] rounded-full -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* بخش متن و محتوا */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-right">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-[900] text-slate-900 leading-tight">
                بانک سوال{" "}
                <span className="text-blue-600 relative">
                  هوشمند
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400/60"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg mx-auto md:mx-0">
                با دسترسی به بزرگ‌ترین مجموعه‌ی سوالات طبقه‌بندی شده، مسیر
                موفقیت تحصیلی‌تان را هوشمندانه هموار کنید.
              </p>
            </div>

            {/* کارت آماری مدرن */}
            <div className="bg-white/70 backdrop-blur-md border border-white rounded-[32px] p-6 shadow-xl shadow-blue-900/5 space-y-4 max-w-md mx-auto md:mx-0">
              <StatRow
                icon={<PeopleOutline className="text-blue-500" />}
                label="کاربران فعال"
                value="۳۲۰ هزار نفر"
              />
              <div className="h-px bg-slate-100 w-full"></div>
              <StatRow
                icon={<QuizOutlined className="text-orange-500" />}
                label="آزمون‌های برگزار شده"
                value="۳۲۰ هزار"
              />
              <div className="h-px bg-slate-100 w-full"></div>
              <StatRow
                icon={<LibraryBooksOutlined className="text-emerald-500" />}
                label="مجموع سوالات"
                value="۴۷۰ هزار سوال"
              />
            </div>

            {/* دکمه‌های فراخوان (CTA) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group">
                شروع آزمون رایگان
                <ArrowBackIosNew className="text-sm group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                مشاهده دروس
              </button>
            </div>
          </div>

          {/* بخش تصویر */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* پترن هندسی پشت تصویر */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-3xl transform scale-75"></div>

            <div className="relative animate-float">
              <Image
                src="/images/math-header.png"
                width={500}
                height={500}
                alt="هوشمند سازی آموزش"
                className="drop-shadow-2xl"
                unoptimized
              />

              {/* نشان‌گرهای شناور (اختیاری) */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce duration-[4000ms]">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce duration-[5000ms]">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}

// کامپوننت داخلی برای سطر آمار
const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
        {icon}
      </div>
      <span className="font-bold text-slate-600 text-sm md:text-base">
        {label}
      </span>
    </div>
    <span className="text-blue-700 font-black text-sm md:text-lg">{value}</span>
  </div>
);
