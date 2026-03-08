import { useEffect, useState } from "react";
import "./index.css";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { Card } from "../Card";
import { SkeletonCard } from "../SkeletonCard";
import { ConnectionError } from "../ConnectionError";

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
}

export const Carousel = ({ onErrorChange }: CarouselProps) => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [skeletonCount, setSkeletonCount] = useState<number>(getSkeletonCount);

  const validateImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  async function fetchProducers() {
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

      const validated = await Promise.all(
        data.map(async (producer: Producer) => {
          const isValid = await validateImage(producer.imageUrl);
          return isValid ? producer : null;
        }),
      );

      const filtered = validated.filter(Boolean) as Producer[];
      setProducers(sortByScoreDesc(filtered));
      setError(null);
      setLoading(false);
    } catch (err) {
      const errorCode =
        err instanceof Error && "status" in err
          ? String((err as any).status)
          : "UNKNOW";
      setError({
        message: "Não foi possível carregar os produtores.",
        code: errorCode || "UNKNOW",
      });
      setProducers([]);
      setLoading(false);
      console.error("Erro ao carregar produtores:", err);
    }
  }

  useEffect(() => {
    fetchProducers();
  }, []);

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
        <ConnectionError
          code={error.code}
          onRetry={fetchProducers}
          loading={loading}
        />
      </section>
    );
  }

  return (
    <section className="w-full max-w-full overflow-hidden">
      <div className="flex w-max animate-marquee">
        {loading || producers.length === 0
          ? skeletons.map((skeleton) => <SkeletonCard key={skeleton.id} />)
          : ["a", "b"].flatMap((copy) =>
              producers.map((producer) => (
                <Card key={`${copy}-${producer.id}`} producer={producer} />
              )),
            )}
      </div>
    </section>
  );
};
