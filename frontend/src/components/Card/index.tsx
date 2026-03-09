import "./index.css";
import type { Producer } from "../../types/producer";

interface CardProps {
  producer: Producer;
}

export const Card = ({ producer }: CardProps) => {
  const name = producer.name || "Produtor sem nome";
  const imageUrl = producer.imageUrl || "/greenn-logo-background.webp";
  return (
    <div className="relative flex-shrink-0 w-72 aspect-[3/4] mr-6 rounded-3xl overflow-hidden ">
      {/* Imagem */}
      <img
        src={imageUrl}
        alt={`Foto de ${name}`}
        className="absolute inset-0 w-full h-full object-cover card-image"
      />

      {/* Gradiente inferior só se o nome for renderizado digitalmente */}
      {producer.image_url_has_name !== true && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white text-left">
            <h3 className="text-2xl font-bold leading-tight whitespace-pre-line text-left">
              {name.split(" ").join("\n")}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};
