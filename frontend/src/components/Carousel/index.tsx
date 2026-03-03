import { useEffect, useState } from "react";
import { getProducers } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { Card } from "../Card";

export const Carousel = () => {
  const [producers, setProducers] = useState<Producer[]>([]);

  useEffect(() => {
    const fetchProducers = async () => {
      const data = await getProducers();
      setProducers(data);
    };

    fetchProducers();
  }, []);

  if (!producers.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const infiniteList = [...producers, ...producers];

  return (
    <section className="w-screen overflow-hidden">
      <div className="flex w-max animate-marquee ">
        {infiniteList.map((producer, index) => (
          <Card key={index} producer={producer} />
        ))}
      </div>
    </section>
  );
};
