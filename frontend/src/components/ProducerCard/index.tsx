import { useState } from "react";
import type { Producer } from "../../types/producer";
import { ProducerModal } from "../ProducerModal";

interface Props {
  producer: Producer;
  onUpdate: (updated: Producer) => void;
}

export function ProducerCard({ producer, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          hover:border-green-400/40
          transition-all
          duration-300
          hover:scale-[1.02]
        "
      >
        <img
          src={producer.imageUrl}
          alt={producer.name}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />

        <h3 className="text-xl font-semibold">{producer.name}</h3>

        <p className="text-gray-400 mt-1">
          {producer.followers_instagram.toLocaleString()} seguidores
        </p>

        <p className="mt-1 text-sm">
          Score:{" "}
          <span className="font-semibold">{producer.relevance_score}</span>
        </p>

        <p className="mt-1">
          {producer.is_trending ? (
            <span className="text-orange-400">🔥 Trending</span>
          ) : (
            <span className="text-gray-500">— Não trending</span>
          )}
        </p>

        <button
          onClick={() => setOpen(true)}
          className="
            mt-6
            bg-[#14916A]
            hover:bg-[#0f7c59]
            px-4
            py-2
            rounded-xl
            transition
            w-full
          "
        >
          Edição
        </button>
      </div>

      {open && (
        <ProducerModal
          producer={producer}
          onClose={() => setOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
