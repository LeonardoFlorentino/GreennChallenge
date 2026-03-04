import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // assuming you use lucide-react

interface LeftArrowButtonProps {
  to: string;
  children?: React.ReactNode;
}

export function LeftArrowButton({ to }: LeftArrowButtonProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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
        fixed
        top-4
        right-4
        z-50
        bg-gray-900
        hover:bg-gray-800
        text-white
        rounded-xl
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        flex
        items-center
        justify-center
        ${isScrolled ? "p-3" : "px-5 py-2.5"}
      `}
    >
      <ArrowLeft size={18} />
      <span
        className={`
          transition-all
          duration-300
          overflow-hidden
          ${isScrolled ? "max-w-0 opacity-0" : "max-w-xs opacity-100 ml-2"}
        `}
      >
        Voltar
      </span>
    </Link>
  );
}
