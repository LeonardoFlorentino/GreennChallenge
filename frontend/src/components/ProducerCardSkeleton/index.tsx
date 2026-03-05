export function ProducerCardSkeleton() {
  return (
    <div
      className="
        w-full
        h-full
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
        animate-pulse
      "
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-white/10 mb-4" />

      {/* Nome */}
      <div className="h-6 w-40 bg-white/10 rounded mb-3" />

      {/* Seguidores */}
      <div className="h-4 w-32 bg-white/10 rounded mb-2" />

      {/* Score */}
      <div className="h-4 w-24 bg-white/10 rounded mb-2" />

      {/* Trending */}
      <div className="h-4 w-28 bg-white/10 rounded mb-6" />

      {/* Botão */}
      <div className="h-10 w-full bg-white/10 rounded-xl" />
    </div>
  );
}
