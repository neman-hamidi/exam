import React from "react";
import UtilitiItem from "./utilitiItem/utilitiItem";

export default function Utiliti() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white font-[vazir] dir-rtl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* هدر با استایل مدرن */}
        <div className="relative mb-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              امکانات و <span className="text-blue-600">ویژگی‌ها</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
              <p className="text-slate-400 font-medium md:text-lg">
                هوشمندترین ابزارهای یادگیری در دستان شما
              </p>
              <span className="w-12 h-1 bg-yellow-400 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* گرید هوشمند: با استفاده از grid به جای flex برای نظم بیشتر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <UtilitiItem
            title="آزمون آنلاین شخصی"
            desc="بر اساس کتاب، فصل، درس یا حتی موضوع مطابق آخرین تغییرات کتاب‌های درسی، محدوده آزمون را انتخاب کنید، سوالات را حل کنید و کارنامه بگیرید."
          />
          <UtilitiItem
            title="آزمون آنلاین گروهی"
            desc="تمام آزمون‌ها و پیش‌آزمون‌های آنلاین گزینه دو و آزمون‌هایی که دبیرتان برای شما ارسال می‌کند را در بانک سوال پاسخ دهید و کارنامه جامع بگیرید."
          />
          <UtilitiItem
            title="جابه جایی گزینه"
            desc="ترتیب گزینه‌های هر سوال برای هر دانش‌آموز متفاوت است؛ به این ترتیب در آزمون‌های آنلاین، هر شرکت‌کننده کلید آزمون اختصاصی خودش را دارد."
          />
          <UtilitiItem
            title="امکانات آزمون آنلاین"
            desc="در طول آزمون، سوالات شک‌دار را نشان‌دار کنید، سوالات مورد علاقه را ذخیره کنید و زمان را به حرفه‌ای‌ترین شکل ممکن مدیریت کنید."
          />
          <UtilitiItem
            title="رفع اشکال هوشمند"
            desc="بعد از آزمون، می‌توانید با سیستم هوشمند بر روی سوالات غلط و نزده یا سوالات جدید با همان موضوعات تمرین کنید تا یادگیری کامل شود."
          />
          <UtilitiItem
            title="کارنامه‌های تحلیلی"
            desc="بعد از هر آزمون علاوه بر درصدها، نتایج آماری عملکردتان را مشاهده کنید و با تحلیل دقیق، شناخت بهتری از نقاط قوت و ضعف خود بیابید."
          />
        </div>

        {/* بخش ویژه (Special Cards) برای موارد مهم‌تر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:px-20">
          <UtilitiItem
            title="دسترسی آسان"
            desc="فقط با یک گوشی هوشمند، اینترنت و نصب اپلیکیشن یا ورود به سایت گزینه دو، تمام امکانات بانک سوال در هر لحظه در اختیار شماست."
          />
          <div className="transform scale-105">
            <UtilitiItem
              title="رایگان"
              desc="برای دسترسی رایگان به این امکانات فوق‌العاده، کافیست در تعداد مشخصی از آزمون‌های گزینه دو ثبت‌نام کنید و از مزایای آن بهره‌مند شوید."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
