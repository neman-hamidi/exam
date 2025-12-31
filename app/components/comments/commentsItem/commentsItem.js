"use client";
import React from "react";
import Image from "next/image";
import { FormatQuote } from "@mui/icons-material";

export default function CommentsItem({ name, userClass, suggest, text }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl mx-auto px-4 py-10">
      {/* بخش تصویر و هویت - عرض ثابت برای جلوگیری از جابجایی */}
      <div className="flex flex-col items-center shrink-0 w-40 md:w-48">
        <div className="relative p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[30px] shadow-lg">
          <div className="bg-white p-1 rounded-[26px]">
            <Image
              src="/images/123.png"
              width={150}
              height={150}
              alt={name}
              className="rounded-[22px] object-cover shadow-inner"
              unoptimized
            />
          </div>
          {/* نشان تایید سبز */}
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-4 border-white">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mt-4 space-y-1">
          <h5 className="font-black text-slate-800 text-lg">{name}</h5>
          <p className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1 rounded-full">
            {userClass}
          </p>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            {suggest}
          </p>
        </div>
      </div>

      {/* بخش حباب متن - با فلش اشاره‌گر */}
      <div className="relative flex-1 w-full">
        {/* آیکون نقل قول تزئینی */}
        <div className="absolute -top-4 right-6 bg-white shadow-md rounded-full p-1.5 z-10 text-blue-500">
          <FormatQuote className="rotate-180" />
        </div>

        <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[40px] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] relative min-h-[180px] flex items-center">
          <p className="text-slate-600 leading-8 md:leading-9 text-justify text-sm md:text-xl font-medium">
            {text}
          </p>

          {/* فلش حباب (فقط در دسکتاپ) */}
          <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border-r border-t border-slate-100 rotate-45 rounded-sm shadow-[5px_-5px_10px_-5px_rgba(0,0,0,0.02)]"></div>
        </div>
      </div>
    </div>
  );
}
