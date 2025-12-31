"use client";
import { useEffect, useState } from "react";
import { KeyboardDoubleArrowUp } from "@mui/icons-material";

export default function Move() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] p-4 
                 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-400/50 
                 transition-all duration-500 hover:bg-blue-700 hover:-translate-y-2
                 ${
                   isVisible
                     ? "opacity-100 scale-100"
                     : "opacity-0 scale-50 pointer-events-none"
                 }`}
    >
      <KeyboardDoubleArrowUp fontSize="medium" />
    </button>
  );
}
