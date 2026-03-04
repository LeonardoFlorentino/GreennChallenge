import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
}

export function NavButton({ to, children }: NavButtonProps) {
  return (
    <Link
      to={to}
      className="
        fixed
        top-4
        right-4
        z-50
        bg-gray-900
        hover:bg-gray-800
        text-white
        px-5
        py-2.5
        rounded-xl
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        flex
        items-center
        gap-2
      "
    >
      {children}
    </Link>
  );
}
