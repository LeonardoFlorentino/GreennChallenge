import { User } from "lucide-react";
import { useState } from "react";

interface Props {
  imageUrl?: string;
  name?: string;
}

export function ProfileImageCircle({ imageUrl, name }: Props) {
  const [errored, setErrored] = useState(false);
  const showFallback = !imageUrl || errored;
  // 21% maior que w-16/h-16 (4rem * 1.21 = 4.84rem)
  const sizeClass = "w-[4.84rem] h-[4.84rem]";
  return showFallback ? (
    <div
      className={`${sizeClass} rounded-full bg-emerald-900/60 border border-emerald-800 flex items-center justify-center`}
    >
      <User size={35} className="text-emerald-300" />
    </div>
  ) : (
    <div
      className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center`}
    >
      <img
        src={imageUrl}
        alt={name ? `Foto de ${name}` : "Foto do produtor"}
        className="w-full h-full object-cover"
        style={{ aspectRatio: "1 / 1", display: "block" }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
