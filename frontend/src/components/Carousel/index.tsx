import { useEffect, useState } from "react";
import "./index.css";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { Card } from "../Card";
import { SkeletonCard } from "../SkeletonCard";

const sortByScoreDesc = (items: Producer[]) =>
  [...items].sort((a, b) => b.relevance_score - a.relevance_score);

const CARD_WIDTH_PX = 288; // Tailwind w-72
const CARD_GAP_PX = 24; // Tailwind mr-6
const CARD_SLOT_PX = CARD_WIDTH_PX + CARD_GAP_PX;

const getSkeletonCount = () => {
  if (typeof window === "undefined") return 8;

  // Extra cards avoid visual gaps on wide screens while loading.
  return Math.max(8, Math.ceil(window.innerWidth / CARD_SLOT_PX) + 3);
};

interface ErrorState {
  message: string;
  code: string;
}

interface CarouselProps {
  onErrorChange?: (hasError: boolean) => void;
  onProducersChange?: (count: number) => void;
}

export const Carousel = ({
  onErrorChange,
  onProducersChange,
}: CarouselProps) => {
  console.log("Carousel montado");
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [skeletonCount, setSkeletonCount] = useState<number>(getSkeletonCount);
  // Garante pelo menos 6 cartões, intercalando produtores existentes
  function getMinCardsList(list: Producer[], min: number): Producer[] {
    if (list.length === 0) return [];
    if (list.length >= min) return list;
    const result: Producer[] = [];
    let i = 0;
    while (result.length < min) {
      result.push(list[i % list.length]);
      i++;
    }
    return result;
  }

  async function fetchProducers() {
    console.log("Buscando produtores...");
    try {
      setError(null);
      setLoading(true);

      const timeoutId = setTimeout(() => {
        setError({
          message: "Não foi possível carregar os produtores.",
          code: "TIMEOUT",
        });
        setLoading(false);
      }, 10000);

      const data = await producerService.getAll();
      clearTimeout(timeoutId);

      // Debug: logar retorno da API
      console.log("Producers retornados:", data);
      setProducers(sortByScoreDesc(data));
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar produtores:", err);
      const errorCode =
        err instanceof Error &&
        typeof (err as { status?: unknown }).status !== "undefined"
          ? String((err as { status?: unknown }).status)
          : "UNKNOW";
      setError({
        message: "Não foi possível carregar os produtores.",
        code: errorCode || "UNKNOW",
      });
      setProducers([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchProducers();
    }, 0);

    const handleProducersUpdated = () => {
      fetchProducers();
    };
    window.addEventListener("producers-updated", handleProducersUpdated);
    return () => {
      window.removeEventListener("producers-updated", handleProducersUpdated);
    };
  }, []);

  // Notifica a Home sobre a quantidade de produtores
  useEffect(() => {
    if (onProducersChange) {
      onProducersChange(producers.length);
    }
  }, [producers, onProducersChange]);

  useEffect(() => {
    onErrorChange?.(error !== null);
  }, [error, onErrorChange]);

  useEffect(() => {
    const onResize = () => setSkeletonCount(getSkeletonCount());

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const skeletons = Array.from({ length: skeletonCount }, (_, id) => ({
    id: `skeleton-${id}`,
  }));

  if (error) {
    return (
      <section className="w-full max-w-full overflow-hidden flex items-center justify-center min-h-[calc(100vh-120px)] text-left">
        <div className="text-center">
          <div className="text-red-500 font-bold text-xl mb-2">
            Erro ao carregar produtores
          </div>
          <div className="text-gray-400 mb-4">
            {error.message} (código: {error.code})
          </div>
          <button
            onClick={fetchProducers}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="w-full max-w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {skeletons.map((skeleton) => (
            <SkeletonCard key={skeleton.id} />
          ))}
        </div>
      </section>
    );
  }

  if (producers.length === 0) {
    return (
      <section className="w-full max-w-full min-h-[300px] relative">
        <div className="flex flex-col items-center justify-center gap-5 w-full max-w-xs mx-auto py-12">
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-emerald-400 opacity-80 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 0v8m0 4h.01"
            />
          </svg>
          <div className="text-center text-gray-400 text-xl font-semibold">
            Nenhum produtor encontrado
          </div>
          <div className="text-center text-gray-400 text-base font-normal max-w-xs">
            Adicione um produtor para começar!
          </div>
          <div className="flex justify-center w-full mt-2">
            <button
              type="button"
              className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                // Sinaliza para abrir modal ao chegar no painel
                localStorage.setItem("openCreateProducerModal", "1");
                window.location.href = "/admin";
              }}
            >
              Adicionar produtor
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Garante pelo menos 6 cartões, intercalando
  const displayProducers = getMinCardsList(producers, 6);
  return (
    <section className="w-full max-w-full overflow-hidden">
      <div className="flex w-max animate-marquee  mx-auto">
        {["a", "b"].flatMap((copy) =>
          displayProducers.map((producer, idx) => (
            <Card
              key={`${copy}-${producer.id}-${copy}-${idx}`}
              producer={producer}
            />
          )),
        )}
      </div>
    </section>
  );
};
