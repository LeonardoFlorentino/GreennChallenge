import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface Props {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 4000 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[100]
        flex items-center gap-3
        px-5 py-3.5
        rounded-2xl
        bg-emerald-900/90 border border-emerald-500/30
        text-white text-sm font-medium
        shadow-2xl shadow-black/40
        backdrop-blur-sm
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <CheckCircle size={18} className="text-emerald-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 text-white/50 hover:text-white transition cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
