import React, { useEffect, useState } from "react";
import InfoItems from "./infoItems/infoItems";
import Image from "next/image";

export default function infoQuestions() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const desktopTriggerHeight = 1000;  // Desktop
      const mobileTriggerHeight = 1970;    // Phone
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
    <>
      <div className="flex flex-wrap justify-center">
        <InfoItems
          desc="
            سوالات هر مبحث درسی رو (پس از تدریس دبیر) جواب بده و اونقدر تمرین کن
            تا به درس مورد نظر مسلط بشی. با ویژگی حل تمرین در بانک سوال نیازی به
            تمرین‌های اضافی نداری!
          "
          title="حل تمرین"
        >
          <Image src="/images/1.png" width={273} height={273} alt="" />
        </InfoItems>
        <InfoItems
          title="حل آزمون"
          desc="با ویژگی ساخت آزمون بانک سوال به راحتی در درسهای مختلف با زمانبندی مشخص از خودت آزمون بگیر. به سوالات آزمون پاسخ بده و به سادگی کارنامه و مشاوره دریافت کن."
        >
          <Image src="/images/2.png" width={273} height={273} alt="" />
        </InfoItems>
        <InfoItems
          title="آزمون های من"
          desc=" در بخش آزمون‌های من در بانک سوال به آزمون هایی که قبلا ساختی، یا آزمون‌هایی که دبیرت برات ارسال کرده و آزمون ‌های پیشنهادهای گزینه دو مثل پیش آزمون ها دسترسی داری."
        >
          <Image src="/images/3.png" width={273} height={273} alt="" />
        </InfoItems>
        <InfoItems
          title="سوال های من"
          desc="شما می توانید سوالاتی را به دلخواه خود علامت گذاری کنید. در بخش سوال‌های من لیست سوالات مورد علاقه ات و سوالاتی که در نرم افزار غلط جواب دادی به همراه پاسخ تشریحی آن قابل دسترس است."
        >
          <Image src="/images/4.png" width={273} height={273} alt="" />
        </InfoItems>
        <InfoItems
          title="کارنامه های من"
          desc="هر آزمونی در گزینه دو کارنامه ای دارد. در بخش کارنامه‌های من امکان دسترسی به کارنامه تمام آزمون هایی که شرکت کردی به تفکیک آزمون (آزمون خودم، آزمون مدرسه و آزمون گزینه دو) وجود دارد."
        >
          <Image src="/images/5.png" width={273} height={273} alt="" />
        </InfoItems>
        <InfoItems
          title="وضعیت من"
          desc="در بخش وضعیت من می توانی گزارش از روند تحصیلی خودت دریافت کنی! روند پیشرفت و افت تحصیلیت بر اساس تمام فعالیت هایی که تو بانک انجام دادی، به تفکیک هر درس قابل مشاهده می‌باشد."
        >
          <Image src="/images/6.png" width={273} height={273} alt="" />
        </InfoItems>
      </div>
      <div
        className={`text-center my-3 transition-all duration-[2000ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="submit"
          className="py-2 w-6/12 bg-yellow-300 rounded-lg text-sm md:text-lg"
        >
          ورود به بانک سوالات
        </button>
      </div>
    </>
  );
}
