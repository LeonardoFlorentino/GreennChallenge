import { useEffect, useState } from "react";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { ProducerCard } from "../../components/ProducerCard";
import { ProducerCardSkeleton } from "../../components/ProducerCardSkeleton";
import { LeftArrowButton } from "../../components/LeftArrowButton";
import { NavButton } from "../../components/NavButton";

function sortByScoreDesc(items: Producer[]) {
  return [...items].sort((a, b) => b.relevance_score - a.relevance_score);
}

export default function Admin() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntroButton, setShowIntroButton] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await producerService.getAll();
      setProducers(sortByScoreDesc(data as Producer[]));
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowIntroButton(window.scrollY < 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleUpdate(updated: Producer) {
    setProducers((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      return sortByScoreDesc(next);
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#019c7c] via-[#012e25] to-black" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src="/greenn-logo-background.webp"
          alt="Greenn Background"
          className="w-[1000px] max-w-none select-none opacity-[0.10] blur-sm mix-blend-lighten"
        />
      </div>

      <div className="relative z-20 p-6 pt-24 sm:p-10 sm:pt-28 lg:p-12 lg:pt-32">
        <NavButton
          to="/"
          position="left"
          className={`top-6 left-6 sm:top-10 sm:left-10 lg:top-12 lg:left-12 ${
            showIntroButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          Introdução
        </NavButton>
        <LeftArrowButton
          to="/home"
          className="top-6 right-6 sm:top-10 sm:right-10 lg:top-12 lg:right-12"
        />

        <div className="mb-14">
          <h1 className="bg-gradient-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Painel de Produtores
          </h1>

          <p className="mt-3 text-lg text-white/60">
            Gestão estratégica de performance e relevância digital
          </p>
        </div>

        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
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
