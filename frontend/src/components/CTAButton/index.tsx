interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const CTAButton = ({ children, onClick }: CTAButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#14916A]
        hover:bg-[#0f7c59]
        text-white
        font-semibold
        px-12
        py-4
        rounded-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        shadow-lg
    "
    >
      {children}
    </button>
  );
};
