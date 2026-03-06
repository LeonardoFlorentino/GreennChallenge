import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface LeftArrowButtonProps {
  to: string;
  floating?: boolean;
  shrinkOnScroll?: boolean;
  className?: string;
}

export function LeftArrowButton({
  to,
  floating = true,
  shrinkOnScroll = true,
  className = "",
}: LeftArrowButtonProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldShrink = floating && shrinkOnScroll && isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      to={to}
      className={`
        ${floating ? "fixed top-4 right-4 z-50" : ""}
        inline-flex
        items-center
        justify-center
        ${shouldShrink ? "gap-0" : "gap-2"}
        rounded-xl
        border
        border-white/15
        bg-slate-950/40
        text-white/90
        shadow-lg
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-slate-900/60
        text-xs
        sm:text-sm
        font-medium
        ${shouldShrink ? "p-3" : "px-3 py-2 sm:px-5 sm:py-2.5"}
        ${className}
      `}
    >
      <img
        src="/carousel.svg"
        alt="Carrossel"
        className={`
          h-[28px] w-[28px] object-contain brightness-0 invert
          transition-all duration-500 ease-in-out
          ${shouldShrink ? "opacity-100" : "opacity-0 absolute"}
        `}
      />
      <span
        className={`
          transition-all duration-500 ease-in-out
          whitespace-nowrap overflow-hidden
          ${shouldShrink ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"}
        `}
      >
        Carrossel
      </span>
    </Link>
  );
}
