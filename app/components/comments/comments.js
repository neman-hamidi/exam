"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CommentsItem from "./commentsItem/commentsItem";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Comments() {
  const [commentsData, setCommentsData] = useState([]);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3010/comments/view")
      .then((res) => res.json())
      .then((data) => setCommentsData(data))
      .catch((err) => console.log(err));
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <section className="py-20 bg-slate-50/50 font-[vazir] dir-rtl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">
            نظرات شما
          </h2>
          <div className="w-20 h-1.5 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative group">
          <Swiper
            autoHeight={true}
            spaceBetween={50}
            centeredSlides={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="pb-16"
          >
            {commentsData.map((item) => (
              <SwiperSlide key={item.id}>
                <CommentsItem {...item} />
              </SwiperSlide>
            ))}

            {/* شمارنده هوشمند - خارج از محدوده متن */}
            <div slot="container-end" className="flex justify-center mt-6 -translate-y-8">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
                <svg viewBox="0 0 48 48" className="w-10 h-10 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#f1f5f9"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    ref={progressCircle}
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#2563eb"
                    strokeWidth="4"
                    fill="none"
                    style={{
                      strokeDasharray: "126",
                      strokeDashoffset: "calc(126 * var(--progress))",
                    }}
                  />
                </svg>
                <span
                  ref={progressContent}
                  className="absolute text-[10px] font-bold text-slate-400"
                ></span>
              </div>
            </div>
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #2563eb !important;
          background: white;
          width: 45px !important;
          height: 45px !important;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 25px !important;
          border-radius: 10px !important;
        }
      `}</style>
    </section>
  );
}
