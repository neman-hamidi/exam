import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function userInfo() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const desktopTriggerHeight = 1400; // Desktop
      const mobileTriggerHeight = 2370; // Phone
      if (window.innerWidth >= 768) {
        if (scrollTop >= desktopTriggerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        if (scrollTop >= mobileTriggerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex items-center justify-center flex-col md:flex-row gap-1 w-full md:w-2/3 mx-auto">
      <div
        className={`transition-all duration-[3000ms] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
      >
        <Image src="/images/7.png" width={400} height={400} alt="" />
      </div>
      <div
        className={`w-full md:w-1/2 transition-all duration-[3000ms] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 "
        }`}
      >
        <h4 className="font-bold text-lg md:text-3xl text-center">
          کاربران و مخاطبان نرم افزار
        </h4>
        <p className="my-5 text-justify leading-7 text-xs md:text-lg md:leading-9 px-2 ">
          بانک سوال برای داوطلبان آزمون سراسری ،دانش آموزان پایه های دهم و
          یازدهم و دانش آموزان دوره اول متوسطه، با ثبت نام در آزمون های گزینه دو
          و متناسب با تعداد مراحل ثبت نام شده، ارائه می شود. به این صورت که
          متناسب با تعداد مراحل ثبت نامی، امتیاز دریافت می کنند و از طریق این
          امتیاز می توانند بسته های دسترسی به بانک را خریداری نمایند. جهت
          ثبت‌نام در آزمون های مؤسسه گزینه دو و اطلاع از شرایط آن، می‌توان با
          نمایندگی شهر خود تماس بگیرند یا از لینک زیر بصورت آنلاین ثبت‌نام
          نمایند و در نتیجه بصورت رایگان و بدون هزینه به بانک سوال دسترسی داشته
          باشند.
        </p>
        <div className="flex items-center justify-center gap-9">
          <button
            type="submit"
            className="p-2 bg-yellow-300 rounded-lg text-xs md:text-lg"
          >
            مارکت گزینه دو
          </button>
          <button
            type="submit"
            className="p-2 bg-yellow-300 rounded-lg text-xs md:text-lg"
          >
            راهنمای دریافت امتیاز
          </button>
        </div>
      </div>
    </div>
  );
}
