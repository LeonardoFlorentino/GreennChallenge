import { Carousel } from "../../components/Carousel";
import { CTAButton } from "../../components/CTAButton";
import { NavButton } from "../../components/NavButton";

export default function Home() {
  return (
    <section className="relative pt-16 text-center text-white">
      <NavButton to="/" position="left">
        Introdução
      </NavButton>

      <NavButton to="/admin">Painel</NavButton>

      <div className="mx-auto mb-16 max-w-4xl px-6">
        <h2 className="text-3xl font-light leading-[1.15] tracking-tight text-gray-900 sm:text-[42px] md:text-[56px]">
          Produtores de <span className="font-semibold">todos os tamanhos</span>{" "}
          e mercados
        </h2>
      </div>

      <Carousel />

      <div className="mt-20 flex justify-center">
        <CTAButton href="https://adm.greenn.com.br/registro">
          TAMBÉM QUERO VENDER NA GREENN
        </CTAButton>
      </div>
    </section>
  );
}
