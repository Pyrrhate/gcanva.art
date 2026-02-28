export function Hero() {
  return (
    <section className="relative px-6 pt-20 pb-16 md:px-12 md:pt-32 md:pb-24 border-b border-border">
      {/* Decorative index */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        N.001 / 2026
      </div>

      <div className="max-w-4xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl italic leading-[0.9] tracking-tight text-balance">
          Carnet<span className="text-muted-foreground mx-3 font-sans not-italic text-3xl md:text-5xl lg:text-6xl">:</span>
          <br />
          <span className="glow-text">Alchimie</span>
          <br />
          Digitale
        </h1>

        <p className="mt-8 md:mt-12 max-w-lg font-mono text-sm md:text-base leading-relaxed text-muted-foreground">
          Journal de bord de l{"'"}Underground Alchemist.
          <br className="hidden md:block" />
          {" "}Ou la technique mute en matiere sensible.
        </p>
      </div>

      {/* Bottom decorative line with animated dash pattern */}
      <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 h-px" aria-hidden="true">
        <svg width="100%" height="1" className="text-border">
          <line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
        </svg>
      </div>
    </section>
  )
}
