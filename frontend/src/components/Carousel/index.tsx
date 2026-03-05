import { useEffect, useState } from "react";
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

export const Carousel = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState<number>(getSkeletonCount);

  const validateImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    const fetchProducers = async () => {
      const data = await producerService.getAll();

      const validated = await Promise.all(
        data.map(async (producer: Producer) => {
          const isValid = await validateImage(producer.imageUrl);
          return isValid ? producer : null;
        }),
      );

      const filtered = validated.filter(Boolean) as Producer[];

      setProducers(sortByScoreDesc(filtered));
      setLoading(false);
    };

    fetchProducers();
  }, []);

  useEffect(() => {
    const onResize = () => setSkeletonCount(getSkeletonCount());

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const skeletons = Array.from({ length: skeletonCount });

  return (
    <section className="w-screen overflow-hidden">
      <div className="flex w-max animate-marquee">
        {loading
          ? skeletons.map((_, index) => <SkeletonCard key={index} />)
          : [...producers, ...producers].map((producer, index) => (
              <Card key={index} producer={producer} />
            ))}
      </div>
    </section>
  );
};
