import "./styles/global.css";
import { Carousel } from "./components/Carousel";
import { CTAButton } from "./components/CTAButton";

export default function App() {
  return (
    <section className="carousel-section">
      <div className="section-header">
        <h1>Desafio Técnico - Carrossel de Produtores</h1>

        <p>
          Este projeto tem como objetivo reconstruir o componente de carrossel,
          melhorando a estabilidade de renderização, a fluidez das animações e
          garantindo uma rotação determinística dos itens exibidos.
        </p>
      </div>

      <Carousel />
      <CTAButton />
    </section>
  );
}
