"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-2 md:p-4 rounded shadow-lg 
        transition-all duration-300 bg-red-500 text-white 
        hover:bg-red-700 cursor-pointer 
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Back to top"
    >
      <FaArrowUp size={18} />
    </button>
  );
}
