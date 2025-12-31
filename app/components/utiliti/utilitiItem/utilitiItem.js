import React from "react";

export default function UtilitiItem({ title, desc }) {
  return (
    <div
      className="group relative p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[35px] 
                    hover:bg-white transition-all duration-500 flex flex-col items-start
                    shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)]
                    hover:-translate-y-2 overflow-hidden h-full"
    >
      {/* نشانگر رنگی کناری */}
      <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

      {/* آیکون تزئینی کوچک در پس‌زمینه */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400/5 rounded-full group-hover:bg-yellow-400/10 transition-colors duration-500"></div>

      <div className="relative z-10 w-full">
        <h3 className="text-xl md:text-2xl text-slate-800 font-black mb-5 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          {title}
        </h3>

        <p className="leading-8 text-slate-500 text-sm md:text-base text-justify font-medium group-hover:text-slate-600 transition-colors">
          {desc}
        </p>
      </div>

      {/* افکت نورانی گوشه */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
