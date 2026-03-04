import { NavButton } from "../../components/NavButton";
export default function Admin() {
  return (
    <div className="min-h-screen p-10">
      {/* Botão voltar */}
      <NavButton to="/">←</NavButton>
      <h2 className="text-[42px] md:text-[36px] leading-[1.15] tracking-tight text-gray-200 text-3xl font-bold mb-6">
        Painel de Produtores
      </h2>

      <div className="bg-gray-900 rounded-2xl shadow p-6">
        <p>Em breve: tabela de produtores</p>
      </div>
    </div>
  );
}
