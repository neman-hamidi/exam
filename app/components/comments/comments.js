import CommentsItem from "./commentsItem/commentsItem";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./comments.css";
export default function comments() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3010/comments/view")
        .then((res) => res.json())
        .then((data) => setComments(data));
    }, 2000);
  }, [comments]);
  return (
    <div className="h-96 md:h-auto mt-24 mb-16">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {comments.map((item) => (
          <SwiperSlide key={item.id}>
            <CommentsItem
              name={item.name}
              userClass={item.userClass}
              suggest={item.suggest}
              text={item.text}
            />
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
