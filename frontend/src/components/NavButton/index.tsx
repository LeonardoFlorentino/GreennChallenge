import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  floating?: boolean;
  position?: "left" | "right";
}

export function NavButton({
  to,
  children,
  className = "",
  floating = true,
  position = "right",
}: NavButtonProps) {
  const positionClass = position === "left" ? "left-4" : "right-4";

  const baseClasses = `
    inline-flex
    items-center
    gap-2
    rounded-xl
    border
    border-white/15
    bg-slate-950/60
    px-5
    py-2.5
    text-sm
    font-medium
    text-white/90
    shadow-lg
    backdrop-blur
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-slate-900/80
  `;

  const floatingClasses = floating
    ? `fixed top-4 ${positionClass} z-50`
    : "";

  return (
    <Link to={to} className={`${baseClasses} ${floatingClasses} ${className}`}>
      {children}
    </Link>
  );
}
