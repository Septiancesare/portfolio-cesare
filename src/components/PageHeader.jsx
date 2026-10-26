export default function PageHeader({ kicker, title, description, accent = "cyan" }) {
  const accentClass =
    accent === "lime"
      ? "text-lime-300"
      : accent === "amber"
        ? "text-amber-300"
        : accent === "rose"
          ? "text-rose-300"
          : "text-cyan-300";

  const ruleClass =
    accent === "lime"
      ? "bg-lime-400/80"
      : accent === "amber"
        ? "bg-amber-400/80"
        : accent === "rose"
          ? "bg-rose-400/80"
          : "bg-cyan-400/80";

  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 ${ruleClass}`} />
        <p className={`section-kicker !text-[0.5rem] ${accentClass}`}>{kicker}</p>
        <span className="pixel-rule hidden max-w-[9rem] flex-1 opacity-40 sm:block" />
        <span className={`font-pixel text-[0.5rem] ${accentClass}`}>
          {"///"}
        </span>
      </div>

      <h1 className="section-title max-w-4xl">{title}</h1>

      {description ? (
        <p className="mt-5 max-w-2xl font-terminal text-xl leading-relaxed text-slate-300 md:text-2xl">
          {description}
        </p>
      ) : null}

      <div className="mt-7 flex items-center gap-2">
        <span className={`h-1 w-16 ${ruleClass}`} />
        <span className="h-1 w-4 bg-slate-700" />
        <span className="h-1 w-2 bg-slate-700" />
      </div>
    </header>
  );
}
