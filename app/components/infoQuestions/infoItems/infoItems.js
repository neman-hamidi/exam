import React, { useEffect, useRef } from "react";

export default function infoItems({ children, title, desc }) {
  const elementRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const offsetX = x - (rect.left + rect.width / 2);
        const offsetY = y - (rect.top + rect.height / 2);
        elementRef.current.style.transform = `translate(${offsetX / 10}px, ${
          offsetY / 10
        }px)`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className="rounded-xl bg-gray-100 w-fit my-4 mx-auto md:w-[680px] max-h-[300px]"
      ref={elementRef}
    >
      <div className="flex items-center gap-1 flex-row p-2 md:p-4 md:gap-2 ">
        <div className="flex items-center flex-col w-20 lg:w-64">
          <p className="text-center font-bold text-blue-500 text-lg">{title}</p>
          <div>{children}</div>
        </div>
        <div className="w-1 h-52 rounded-lg my-auto mx-1 bg-yellow-300"></div>
        <div className="flex items-center text-xs lg:text-base w-40 md:w-80">
          <p className="pt-4 text-gray-400 leading-8 text-justify">{desc}</p>
        </div>
      </div>
    </div>
  );
}
