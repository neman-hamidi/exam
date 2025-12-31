"use client";
import React, { useEffect, useRef } from "react";

export default function InfoItems({ children, title, desc }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;

      elementRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${
        -moveY / 2
      }deg) rotateY(${moveX / 2}deg)`;
    };

    const handleMouseLeave = () => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg)`;
      }
    };

    const el = elementRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="p-4 h-full" style={{ perspective: "1000px" }}>
      <div
        ref={elementRef}
        className="group relative h-full min-h-[280px] bg-white/70 backdrop-blur-lg border border-slate-100 rounded-[35px] shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 ease-out p-8 flex flex-col items-center text-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* افکت نوری پس‌زمینه هنگام هاور */}
        <div className="absolute -inset-24 bg-gradient-to-br from-blue-50/40 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* بخش تصویر/آیکون */}
        <div className="relative z-10 mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
          <div className="drop-shadow-xl">{children}</div>
        </div>

        {/* تیتر با استایل نوبار */}
        <h3 className="relative z-10 text-xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* خط جداکننده افقی ظریف */}
        <div className="relative z-10 w-12 h-1 bg-blue-100 rounded-full mb-4 group-hover:w-24 group-hover:bg-blue-400 transition-all duration-500"></div>

        {/* توضیحات */}
        <p className="relative z-10 text-slate-500 text-sm leading-7 font-medium text-justify line-clamp-4 group-hover:text-slate-600 transition-colors">
          {desc}
        </p>

        {/* دکوراسیون گوشه کارت */}
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
      </div>
    </div>
  );
}
