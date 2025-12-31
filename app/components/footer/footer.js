import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Footer = () => {
  return (
    <footer
      className="bg-[#fcfcfc] border-t border-gray-200 pt-16 pb-6 font-[vazir,tahoma]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ستون برندینگ */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-2xl font-black text-gray-800">
                بانک سوال هوشمند
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-8 text-justify pl-4">
              دسترسی سریع و آسان به هزاران نمونه سوال امتحانی و آزمون‌های
              آزمایشی. ما به شما کمک می‌کنیم تا با برنامه‌ریزی هوشمندانه، بهترین
              نتایج را در تحصیل خود کسب کنید.
            </p>
          </div>

          {/* ستون لینک‌های سریع با هاور خطی */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-7 relative inline-block">
              دسترسی سریع
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {[
                "لیست آزمون‌ها",
                "بانک سوالات",
                "پنل کاربری دانش‌آموز",
                "درباره ما",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-blue-600 hover:pr-2 transition-all duration-300 ease-in-out relative group"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون اطلاعات تماس با هاور رنگی */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-7 relative inline-block">
              ارتباط با ما
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                <div className="bg-blue-50 p-2 rounded-md group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <EmailIcon fontSize="small" />
                </div>
                <span className="text-sm text-gray-600">info@smartbank.ir</span>
              </div>

              <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                <div className="bg-green-50 p-2 rounded-md group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <PhoneEnabledIcon fontSize="small" />
                </div>
                <span className="text-sm text-gray-600 ltr tracking-wider">
                  021-91000000
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-500 shadow-sm"
                >
                  <InstagramIcon fontSize="small" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all duration-500 shadow-sm"
                >
                  <TelegramIcon fontSize="small" />
                </a>
              </div>
            </div>
          </div>

          {/* ستون اینماد با هاور Lift-up */}
          <div className="flex flex-col items-start lg:items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-7">
              مجوزهای قانونی
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative w-24 h-28 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-2 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 group-hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <VerifiedUserIcon className="text-gray-300 group-hover:text-blue-500" />
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-blue-600 font-bold">
                  اینماد
                </span>
                {/* <img src="/enamad.png" className="w-full h-full object-contain" /> */}
              </div>

              <div className="group relative w-24 h-28 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-2 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 group-hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <VerifiedUserIcon className="text-gray-300 group-hover:text-blue-500" />
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-blue-600 font-bold">
                  ساماندهی
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* بخش پایین فوتر */}
        <div className="mt-16 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[11px] md:text-xs">
            © ۱۴۰۴ تمامی حقوق مادی و معنوی این پلتفرم برای{" "}
            <span className="text-gray-700 font-bold underline decoration-yellow-400 decoration-2">
              بانک سوال هوشمند
            </span>{" "}
            محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-500 rounded-full hidden md:block"></div>
            <span className="text-[10px] text-gray-300 uppercase tracking-widest">
              Designed with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
