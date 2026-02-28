export default function DailyCheckIn() {
  return (
    <section
      aria-label="Daily check-in"
      className="rounded-blob-2 border border-stone/40 bg-paper/80 px-5 py-5 shadow-sm md:px-7"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/65">Check-In Quotidien</p>
      <h1 className="mt-2 font-serif text-2xl text-ink md:text-3xl">Planter une idée aujourd&apos;hui</h1>
      <form className="mt-4">
        <label
          htmlFor="daily-seed"
          className="sr-only"
        >
          Planter une idée aujourd&apos;hui
        </label>
        <input
          id="daily-seed"
          name="daily-seed"
          type="text"
          placeholder="Une idée, une image mentale, une phrase..."
          className="w-full rounded-2xl border border-stone/45 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-stone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seedling"
        />
      </form>
    </section>
  );
}
