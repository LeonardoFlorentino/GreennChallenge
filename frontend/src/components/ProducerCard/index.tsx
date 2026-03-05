import { useState } from "react";
import { Medal, Rocket } from "lucide-react";
import type { Producer } from "../../types/producer";
import { ProducerModal } from "../ProducerModal";
import { producerService } from "../../services/producersService";

interface Props {
  producer: Producer;
  onUpdate: (updated: Producer) => void;
}

export function ProducerCard({ producer, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  async function handleModalSuccess() {
    try {
      const updated = await producerService.getById(producer.id);
      onUpdate(updated as Producer);
    } catch (error) {
      console.error("Erro ao recarregar produtor atualizado:", error);
    }
  }

  return (
    <>
      <div
        className="
          relative
          w-full
          h-full
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
        <div className="absolute top-4 right-4 rounded-xl bg-yellow-400/15 border border-yellow-300/30 px-2.5 py-1.5 text-right">
          <div className="flex items-center justify-end gap-1.5 text-yellow-300">
            <div className="flex items-center gap-1">
              <Medal size={14} />
              {(producer.direct_skyrocketing_sales ||
                producer.indirect_skyrocketing_sales) && (
                <Rocket size={12} className="text-orange-400" />
              )}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wide">
              Score
            </span>
          </div>
          <p className="text-sm font-bold text-yellow-200 leading-none mt-1">
            {producer.relevance_score}
          </p>
        </div>

        <img
          src={producer.imageUrl}
          alt={producer.name}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />

        <h3 className="text-xl font-semibold">{producer.name}</h3>

        <p className="text-gray-400 mt-1">
          {producer.followers_instagram.toLocaleString()} seguidores
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
            cursor-pointer
            w-full
          "
        >
          Editar
        </button>
      </div>

      {open && (
        <ProducerModal
          producer={producer}
          onClose={() => setOpen(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
