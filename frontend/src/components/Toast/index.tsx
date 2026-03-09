import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

type ToastType = "success" | "error";
interface Props {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: ToastType;
}

export function Toast({
  message,
  onClose,
  duration = 4000,
  type = "success",
  isHtml = false,
}: Props & { isHtml?: boolean }) {
  const [visible, setVisible] = useState(false);

  // Se a mensagem for longa, aumenta a duração para 10s
  const effectiveDuration = message && message.length >= 120 ? 10000 : duration;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, effectiveDuration);
    return () => clearTimeout(timer);
  }, [effectiveDuration, onClose]);

  return (
    <div
      className={`
        fixed top-6 right-6 z-[100]
        flex items-center gap-3
        px-5 py-3.5
        rounded-2xl
        ${
          type === "error"
            ? "bg-yellow-700/90 border-yellow-400/40"
            : "bg-emerald-900/90 border-emerald-500/30"
        }
        text-white text-sm font-medium
        shadow-2xl shadow-black/40
        backdrop-blur-sm
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        w-full max-w-[400px]
      `}
      style={{ wordBreak: "break-word" }}
    >
      {type === "error" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-300 shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ) : (
        <CheckCircle size={18} className="text-emerald-400 shrink-0" />
      )}
      {isHtml ? (
        <span dangerouslySetInnerHTML={{ __html: message }} />
      ) : (
        <span>{message}</span>
      )}
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
