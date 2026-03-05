import { useEffect, useState } from "react";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { Card } from "../Card";
import { SkeletonCard } from "../SkeletonCard";

const sortByScoreDesc = (items: Producer[]) =>
  [...items].sort((a, b) => b.relevance_score - a.relevance_score);

export const Carousel = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Quantidade de skeletons visíveis
  const skeletons = Array.from({ length: 6 });

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
