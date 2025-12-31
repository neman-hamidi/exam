import React, { useState } from "react";
import Image from "next/image";
import swal from "sweetalert";
import { SendRounded, MoodRounded } from "@mui/icons-material";

export default function RegisterComments() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, SetError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    suggest: "",
    userClass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error[name]) SetError({ ...error, [name]: "" });
  };

  const validate = () => {
    let tempError = {};
    if (!formData.name.trim()) tempError.name = "لطفاً نام خود را وارد کنید";
    if (!formData.text.trim()) tempError.text = "متن نظر نمی‌تواند خالی باشد";
    SetError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const res = await fetch("http://localhost:3010/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setFormData({ name: "", text: "", suggest: "", userClass: "" });
          swal({
            title: "ارسال موفقیت‌آمیز",
            text: "نظر شما پس از بازبینی در سایت قرار خواهد گرفت.",
            icon: "success",
            button: "باشه", // دکمه به صورت پیش‌فرض در وسط است
            timer: 2000, // بسته شدن خودکار بعد از ۲ ثانیه (۲۰۰۰ میلی‌ثانیه)
          });
        }
      } catch (err) {
        swal({ title: "خطا در اتصال", icon: "error" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="w-full py-16 bg-white font-[vazir] dir-rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
          {/* بخش فرم */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-2 mb-8 text-slate-800">
              <h2 className="text-2xl md:text-3xl font-black">اشتراک تجربه</h2>
              <MoodRounded className="text-green-500 text-3xl" />
            </div>

            <form
              onSubmit={submitHandler}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* فیلد نام */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 mr-2">
                  نام و نام خانوادگی*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="مثلاً: علی محمدی"
                  className={`p-4 rounded-2xl border bg-white outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/10 ${
                    error.name
                      ? "border-red-400 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                  onChange={handleChange}
                />
                {error.name && (
                  <span className="text-[10px] text-red-500 mr-2 font-bold">
                    {error.name}
                  </span>
                )}
              </div>

              {/* فیلد پایه تحصیلی */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 mr-2">
                  پایه تحصیلی
                </label>
                <input
                  type="text"
                  name="userClass"
                  value={formData.userClass}
                  placeholder="مثلاً: دوازدهم تجربی"
                  className="p-4 rounded-2xl border border-slate-200 bg-white outline-none focus:border-blue-500 transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* فیلد موضوع - تمام عرض در موبایل */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-600 mr-2">
                  موضوع نظر
                </label>
                <input
                  type="text"
                  name="suggest"
                  value={formData.suggest}
                  placeholder="مثلاً: کیفیت سوالات، سرعت سایت و..."
                  className="p-4 rounded-2xl border border-slate-200 bg-white outline-none focus:border-blue-500 transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* فیلد متن نظر */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-600 mr-2">
                  متن نظر شما*
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  rows={4}
                  placeholder="نظرات، انتقادات یا پیشنهادات خود را اینجا بنویسید..."
                  className={`p-4 rounded-2xl border bg-white outline-none transition-all resize-none ${
                    error.text
                      ? "border-red-400 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-blue-500"
                  }`}
                  onChange={handleChange}
                ></textarea>
                {error.text && (
                  <span className="text-[10px] text-red-500 mr-2 font-bold">
                    {error.text}
                  </span>
                )}
              </div>

              {/* دکمه ارسال مدرن */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all duration-300 disabled:bg-slate-400 hover:-translate-y-1 active:scale-95 w-full md:w-fit"
                >
                  {isSubmitting ? "در حال ارسال..." : "ثبت و ارسال نظر"}
                  <SendRounded
                    className={`text-xl transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ${
                      isSubmitting ? "animate-ping" : ""
                    }`}
                  />
                </button>
              </div>
            </form>
          </div>

          {/* بخش تصویر */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <Image
                src="/images/comments.svg"
                width={400}
                height={400}
                alt="contact-us"
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl animate-float"
                unoptimized
              />
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
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
