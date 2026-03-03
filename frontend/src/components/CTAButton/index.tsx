interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export const CTAButton = ({ children, onClick, href }: CTAButtonProps) => {
  const baseClasses = `
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
    inline-block
    text-center
  `;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};
