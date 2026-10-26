import PageHeader from "../components/PageHeader";

const TECHNICAL = [
  {
    title: "Web Development",
    code: "WEB-01",
    accent: "cyan",
    skills: ["Laravel", "React", "REST API", "Next.js"],
  },
  {
    title: "Programming",
    code: "PRG-02",
    accent: "lime",
    skills: ["PHP", "JavaScript", "Python", "Dart", "Java"],
  },
  {
    title: "Database",
    code: "DB-03",
    accent: "amber",
    skills: ["MySQL", "Firebase", "SQLite"],
  },
  {
    title: "Machine Learning",
    code: "ML-04",
    accent: "rose",
    skills: [
      "Python",
      "Classification",
      "Clustering",
      "Forecasting",
      "Scikit-learn",
    ],
  },
];

const SOFT = [
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Adaptability",
  "Critical Thinking",
  "Continuous Learning",
];

const TOOLS = [
  "VS Code",
  "Git",
  "GitHub",
  "Figma",
  "Postman",
  "Laragon",
  "Unity",
  "Firebase",
  "Scikit-learn",
];

const accentStyles = {
  cyan: {
    border: "border-cyan-400/30",
    text: "text-cyan-300",
    bar: "bg-cyan-400",
    bg: "bg-cyan-400/10",
  },
  lime: {
    border: "border-lime-400/30",
    text: "text-lime-300",
    bar: "bg-lime-400",
    bg: "bg-lime-400/10",
  },
  amber: {
    border: "border-amber-400/30",
    text: "text-amber-300",
    bar: "bg-amber-400",
    bg: "bg-amber-400/10",
  },
  rose: {
    border: "border-rose-400/30",
    text: "text-rose-300",
    bar: "bg-rose-400",
    bg: "bg-rose-400/10",
  },
};

export default function Skills() {
  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="page-wrap">
        <PageHeader
          kicker="Skill Tree"
          title="SKILLS"
          description="The tools I reach for, the languages I write, and the soft skills that keep projects moving."
          accent="cyan"
        />

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Technical Skills</p>
              <h2 className="section-title !text-lg md:!text-2xl">
                EQUIPPED MODULES
              </h2>
            </div>
            <p className="max-w-sm font-terminal text-lg leading-snug text-slate-500">
              Four core categories, learned through academic projects and
              hands-on builds.
            </p>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {TECHNICAL.map((category, index) => {
              const accent = accentStyles[category.accent];
              return (
                <article
                  key={category.title}
                  className="pixel-panel pixel-hover p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`grid h-11 w-11 place-items-center border ${accent.border} ${accent.bg} font-pixel text-[0.5rem] ${accent.text}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="text-right">
                      <p className="font-pixel text-[0.32rem] tracking-[0.14em] text-slate-600">
                        {category.code}
                      </p>
                      <p className="mt-1 font-pixel text-[0.3rem] text-slate-500">
                        {category.skills.length} MODULES
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-6 font-pixel text-[0.62rem] leading-relaxed text-white">
                    {category.title}
                  </h3>

                  {/* <div className={`mt-4 h-1 w-full ${accent.bg}`}>
                    <div
                      className={`h-full ${accent.bar}`}
                      style={{
                        width: `${Math.min(
                          100,
                          category.skills.length * 18
                        )}%`,
                      }}
                    />
                  </div> */}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-line bg-void/60 px-2.5 py-1 font-terminal text-base text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="pixel-panel p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-lime-400" />
              <p className="section-kicker !text-[0.48rem] text-lime-300">
                Passive Skills
              </p>
            </div>

            <h2 className="mt-4 font-pixel text-[0.72rem] text-white">
              SOFT SKILLS
            </h2>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {SOFT.map((skill, index) => (
                <span
                  key={skill}
                  className="group flex items-center gap-2 border border-line bg-void/60 px-3 py-2 font-terminal text-lg text-slate-300 transition-colors hover:border-lime-400/40 hover:text-lime-100"
                >
                  <span className="font-pixel text-[0.3rem] text-lime-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 border-l-2 border-cyan-400/30 pl-4">
              <p className="font-terminal text-lg italic leading-snug text-slate-500">
                "I learn fast, communicate clearly, and I am not afraid to ask
                questions when the map is unclear."
              </p>
            </div>
          </section>

          <section className="pixel-panel p-6 md:p-7">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-amber-400" />
              <p className="section-kicker !text-[0.48rem] text-amber-300">
                Inventory
              </p>
            </div>

            <h2 className="mt-4 font-pixel text-[0.72rem] text-white">
              TOOLS & GEAR
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {TOOLS.map((tool) => (
                <div
                  key={tool}
                  className="flex items-center gap-2 border border-line bg-void/50 px-2.5 py-2"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-amber-400/80" />
                  <span className="font-terminal text-base leading-tight text-slate-300">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
