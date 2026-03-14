import { useCallback, useState } from "react";
import { Carousel } from "../../components/Carousel";
import { CTAButton } from "../../components/CTAButton";
import { NavButton } from "../../components/NavButton";
import "./index.css";

export default function Home() {
  const [hasError, setHasError] = useState(false);
  const [hasProducers, setHasProducers] = useState(false);

  const handleErrorChange = useCallback((error: boolean) => {
    setHasError(error);
  }, []);

  // Novo callback para saber se há produtores
  const handleProducersChange = useCallback((count: number) => {
    setHasProducers(count > 0);
  }, []);

  return (
    <section className="relative pt-16 text-center text-white greenn-home-section">


      {/* Botões no topo */}
      <div className="greenn-header-buttons">
        <NavButton to="/" floating={false} position="left">
          Introdução
        </NavButton>
        <NavButton to="/admin" floating={false}>
          Painel
        </NavButton>
      </div>

      {/* Título centralizado */}
      {!hasError && (
        <div className="greenn-header-title">
          <h2 className="greenn-carousel-title-mobile text-3xl font-light leading-[1.15] tracking-tight text-gray-900 sm:text-[42px] md:text-[56px]">
            Produtores de <span className="font-semibold">todos os tamanhos</span> e mercados
          </h2>
        </div>
      )}

      <Carousel
        onErrorChange={handleErrorChange}
        onProducersChange={handleProducersChange}
      />

      {!hasError && hasProducers && (
        <div className="mt-20 flex justify-center greenn-cta-bottom">
          <CTAButton href="https://adm.greenn.com.br/registro">
            TAMBÉM QUERO VENDER NA GREENN
          </CTAButton>
        </div>
      )}
    </section>
  );
}
