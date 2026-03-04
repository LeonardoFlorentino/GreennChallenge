import { Carousel } from "../../components/Carousel";
import { CTAButton } from "../../components/CTAButton";
import { NavButton } from "../../components/NavButton";

export default function Home() {
  return (
    <section className="pt-16 text-center text-white relative">
      {/* Botão flutuante para o painel */}
      <NavButton to="/admin">Painel</NavButton>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16 px-6">
        <h2 className="text-[42px] md:text-[56px] font-light leading-[1.15] tracking-tight text-gray-900">
          Produtores de <span className="font-semibold">todos os tamanhos</span>{" "}
          e mercados
        </h2>
      </div>

      {/* Carousel */}
      <Carousel />

      {/* CTA */}
      <div className="flex justify-center mt-20">
        <CTAButton href="https://adm.greenn.com.br/registro">
          TAMBÉM QUERO VENDER NA GREENN
        </CTAButton>
      </div>
    </section>
  );
}
