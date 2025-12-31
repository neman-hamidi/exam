"use client";
import React, { useEffect, useState } from "react";
import InfoItems from "./infoItems/infoItems";
import Image from "next/image";

export default function InfoQuestions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // بهینه سازی اعداد بر اساس تجربه کاربری مدرن
      const triggerHeight = window.innerWidth >= 768 ? 800 : 1600;

      if (scrollTop >= triggerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 bg-slate-50/50 font-[vazir] dir-rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* عنوان بخش (اختیاری اما توصیه می شود) */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800">
            امکانات و ویژگی‌ها
          </h2>
          <p className="text-slate-500">
            هر آنچه برای موفقیت در آزمون‌ها نیاز دارید، یکجا در اختیار شماست
          </p>
        </div>

        {/* گرید کارت‌ها - در دسکتاپ ۳ تایی، تبلت ۲ تایی و موبایل تک ستون */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <InfoItems
            title="حل تمرین"
            desc="سوالات هر مبحث درسی را پس از تدریس دبیر جواب بده و آنقدر تمرین کن تا مسلط شوی. با ویژگی حل تمرین، نیازی به کتاب‌های تستی حجیم نداری!"
          >
            <Image
              src="/images/1.png"
              width={180}
              height={180}
              alt="حل تمرین"
              className="object-contain"
              unoptimized
            />
          </InfoItems>

          <InfoItems
            title="حل آزمون"
            desc="به راحتی آزمون‌های زمان‌دار بساز و خودت را به چالش بکش. بلافاصله پس از اتمام، تحلیل دقیق و مشاوره هوشمند دریافت کن."
          >
            <Image
              src="/images/2.png"
              width={180}
              height={180}
              alt="حل آزمون"
              className="object-contain"
              unoptimized
            />
          </InfoItems>

          <InfoItems
            title="آزمون‌های من"
            desc="دسترسی به تمام آزمون‌هایی که خودت ساختی یا دبیرت ارسال کرده است. آرشیو کامل سوالات گزینه دو در دستان شماست."
          >
            <Image
              src="/images/3.png"
              width={180}
              height={180}
              alt="آزمون‌های من"
              className="object-contain"
              unoptimized
            />
          </InfoItems>

          <InfoItems
            title="سوال‌های من"
            desc="سوالات دشوار یا اشتباهاتت را علامت‌گذاری کن. اینجا لیست شخصی‌سازی شده از نقاط ضعف و علایق تستی تو قرار دارد."
          >
            <Image
              src="/images/4.png"
              width={180}
              height={180}
              alt="سوال‌های من"
              className="object-contain"
              unoptimized
            />
          </InfoItems>

          <InfoItems
            title="کارنامه‌های من"
            desc="تحلیل دقیق هر آزمون به تفکیک درس و مبحث. روند پیشرفت خود را در آزمون‌های مدرسه و کشوری مقایسه و بررسی کنید."
          >
            <Image
              src="/images/5.png"
              width={180}
              height={180}
              alt="کارنامه‌ها"
              className="object-contain"
              unoptimized
            />
          </InfoItems>

          <InfoItems
            title="وضعیت من"
            desc="گزارش آماری هوشمند از روند تحصیلی شما. نقاط قوت و ضعف خود را بر اساس نمودارهای پیشرفت به دقت شناسایی کنید."
          >
            <Image
              src="/images/6.png"
              width={180}
              height={180}
              alt="وضعیت تحصیلی"
              className="object-contain"
              unoptimized
            />
          </InfoItems>
        </div>

        {/* دکمه فراخوان پایین بخش */}
        <div
          className={`mt-20 flex justify-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[20px] text-lg font-black transition-all shadow-xl shadow-blue-200 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              ورود به بانک سوالات هوشمند
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
