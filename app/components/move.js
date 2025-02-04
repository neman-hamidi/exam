import { useEffect, useRef, useState } from "react";
export default function move() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const triggerHeight = 300;
      if (scrollTop >= triggerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {isVisible && (
        <div
          style={{
            backgroundColor: "#3498db",
            width: "100px",
            height: "100px",
            position: "fixed",
            bottom: "50px",
            right: "50px",
            transition: "opacity 0.5s ease",
            opacity: isVisible ? 1 : 0,
          }}
        >
          I'm visible now!
        </div>
      )}
    </div>
  );
}
