import React from "react";
import Image from "next/image";

import "./commentsItem.css";
export default function commentsItem({ name, userClass, suggest, text }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center justify-center  w-4/6  mx-auto">
      <div className="flex flex-row gap-3 items-center">
        <div>
          <Image
            src="/images/123.png"
            width={110}
            height={110}
            alt="user-profile-comments"
            className="rounded-lg"
          />
          <p className="font-bold text-center text-lg md:text-sm mt-1">اسم: {name}</p>
          <p className="font-bold text-center text-sm md:text-xs my-1">پایه: {userClass}</p>
          <p className="font-bold text-center text-sm md:text-xs">موضوع: {suggest}</p>
        </div>
      </div>
      <div className="w-fit md:w-4/6">
        <p className="blur-bg py-3 px-3 rounded-lg leading-7 text-justify text-xs md:text-lg">{text}</p>
      </div>
    </div>
  );
}
