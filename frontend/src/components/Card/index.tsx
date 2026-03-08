import type { Producer } from "../../types/producer";

interface CardProps {
  producer: Producer;
}

export const Card = ({ producer }: CardProps) => {
  return (
    <div className="relative flex-shrink-0 w-72 aspect-[3/4] mr-6 rounded-3xl overflow-hidden">
      {/* Imagem */}
      <img
        src={producer.imageUrl}
        alt={`Foto de ${producer.name}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Nome */}
      {producer.image_url_has_name !== true && (
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold leading-tight">{producer.name}</h3>
        </div>
      )}
    </div>
  );
};
