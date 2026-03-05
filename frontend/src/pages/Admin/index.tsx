import { useEffect, useState } from "react";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { ProducerCard } from "../../components/ProducerCard";
import { ProducerCardSkeleton } from "../../components/ProducerCardSkeleton";
import { ArrowLeft } from "lucide-react";
import { LeftArrowButton } from "../../components/LeftArrowButton";

function sortByScoreDesc(items: Producer[]) {
  return [...items].sort((a, b) => b.relevance_score - a.relevance_score);
}

export default function Admin() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await producerService.getAll();
      setProducers(sortByScoreDesc(data as Producer[]));
      setLoading(false);
    }
    load();
  }, []);

  function handleUpdate(updated: Producer) {
    setProducers((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      return sortByScoreDesc(next);
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🔥 Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#019c7c] via-[#012e25] to-black" />

      {/* 🔥 Logo premium de fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/greenn-logo-background.webp"
          alt="Greenn Background"
          className="
            w-[1000px]
            max-w-none
            opacity-[0.10]
            blur-sm
            mix-blend-lighten
            select-none
          "
        />
      </div>

      {/* 🔥 Camada de conteúdo */}
      <div className="relative z-20 p-12">
        <LeftArrowButton to="/">
          <span className="text-lg leading-none">
            <ArrowLeft size={18} />
          </span>
          <span>Voltar</span>
        </LeftArrowButton>

        {/* Header premium */}
        <div className="mb-14">
          <h1
            className="
            text-6xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-white
            via-green-300
            to-emerald-400
            bg-clip-text
            text-transparent
          "
          >
            Painel de Produtores
          </h1>

          <p className="text-white/60 mt-3 text-lg">
            Gestão estratégica de performance e relevância digital
          </p>
        </div>

        {/* Grid */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProducerCardSkeleton key={i} />
              ))
            : producers.map((producer) => (
                <ProducerCard
                  key={producer.id}
                  producer={producer}
                  onUpdate={handleUpdate}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
