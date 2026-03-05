import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
        rounded-xl
        border
        border-white/15
        bg-slate-950/60
        text-white/90
        shadow-lg
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-slate-900/80
        text-sm
        font-medium
        ${shouldShrink ? "p-3" : "px-5 py-2.5"}
        ${className}
      `}
    >
      <ArrowLeft size={18} />
      <span
        className={`
          transition-all
          duration-300
          overflow-hidden
          ${shouldShrink ? "max-w-0 opacity-0" : "max-w-xs opacity-100 ml-2"}
        `}
      >
        Voltar
      </span>
    </Link>
  );
}
