import PageHeader from "../components/PageHeader";
import { PROFILE, cvFile } from "../data/profile";

const COURSES = [
  "Web Development",
  "Programming",
  "Database Systems",
  "Software Engineering",
  "Mobile Development",
  "Computer Networks",
  "Artificial Intelligence",
  "Machine Learning",
  "UI/UX Design",
  "Multimedia Development",
  "Virtual Reality",
  "Internet of Things",
];

const EXPERIENCE = [
  "Developed web-based applications using Laravel, React, PHP, and MySQL.",
  "Built mobile applications using Flutter and integrated Firebase services and REST APIs.",
  "Developed a machine learning project using Python and Scikit-learn for classification analysis.",
  "Designed and developed interactive learning media using Unity, Virtual Reality, and IoT technologies.",
  "Worked on software projects involving system analysis, database design, UI/UX, and application development.",
  "Collaborated in academic projects involving programming, networking, multimedia, and educational technology.",
];

export default function Academic() {
  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="page-wrap">
        <PageHeader
          kicker="Education Log"
          title="ACADEMIC RECORD"
          description="Four years of formal training in informatics and computer engineering education, plus the projects that turned theory into practice."
          accent="amber"
        />

        <div className="grid gap-6 lg:grid-cols-[0.68fr_1.32fr]">
          <div className="space-y-6">
            <section className="pixel-panel pixel-panel--glow p-6 text-center">
              <p className="section-kicker !text-[0.46rem] text-amber-300">
                Cumulative GPA
              </p>

              <p className="mt-5 font-pixel text-4xl text-lime-300 lime-text md:text-5xl">
                {PROFILE.gpa}
              </p>
              <p className="mt-3 font-pixel text-[0.44rem] tracking-[0.14em] text-slate-500">
                / 4.00
              </p>

              <div className="mt-6 space-y-2 border-t border-line pt-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-pixel text-[0.34rem] uppercase tracking-[0.12em] text-slate-500">
                    Degree
                  </span>
                  <span className="max-w-[11rem] text-right font-terminal text-lg leading-tight text-slate-300">
                    Bachelor of Education
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-pixel text-[0.34rem] uppercase tracking-[0.12em] text-slate-500">
                    Major
                  </span>
                  <span className="max-w-[11rem] text-right font-terminal text-lg leading-tight text-slate-300">
                    Informatics & Computer Engineering Education
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-pixel text-[0.34rem] uppercase tracking-[0.12em] text-slate-500">
                    Period
                  </span>
                  <span className="max-w-[11rem] text-right font-terminal text-lg leading-tight text-slate-300">
                    2022 — 2026
                  </span>
                </div>
              </div>

              <a
                href={cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn--lime pixel-btn--sm mt-6 w-full"
              >
                <span className="text-[0.55rem]">&#8599;</span> View CV
              </a>
            </section>

            <section className="pixel-panel p-5">
              <p className="section-kicker !text-[0.46rem]">Milestones</p>
              <h2 className="mt-3 font-pixel text-[0.62rem] text-white">
                LEVEL PROGRESS
              </h2>

              <ol className="mt-5 space-y-0">
                {[
                  ["2022", "Entered Universitas Sebelas Maret", "START"],
                  ["2023", "Web & mobile development track", "LVL UP"],
                  ["2024", "ML, VR, and IoT projects", "SIDE QUESTS"],
                  ["2026", "Graduated with GPA 3.90", "CLEAR"],
                ].map(([year, text, tag], index, list) => (
                  <li key={year} className="relative flex gap-3 pb-5 last:pb-0">
                    {index < list.length - 1 ? (
                      <span className="absolute left-[5px] top-3 h-full w-px bg-line" />
                    ) : null}
                    <span className="relative mt-1.5 h-2.5 w-2.5 shrink-0 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
                    <div>
                      <p className="font-pixel text-[0.38rem] text-amber-300">
                        {year}
                      </p>
                      <p className="mt-1.5 font-terminal text-lg leading-snug text-slate-300">
                        {text}
                      </p>
                      <p className="mt-1 font-pixel text-[0.3rem] tracking-[0.1em] text-slate-600">
                        {tag}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <div className="space-y-6">
            <section className="pixel-panel p-6 md:p-7">
              <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-pixel text-[0.38rem] tracking-[0.14em] text-amber-300">
                    AUG 2022 — JUL 2026
                  </p>
                  <h2 className="mt-3 font-pixel text-[0.8rem] leading-relaxed text-white">
                    UNIVERSITAS SEBELAS MARET
                  </h2>
                  <p className="mt-2 font-terminal text-xl text-slate-400">
                    Informatics and Computer Engineering Education
                  </p>
                </div>

                <div className="w-fit border border-lime-400/30 bg-lime-400/5 px-4 py-2">
                  <p className="font-pixel text-[0.32rem] uppercase tracking-[0.14em] text-slate-500">
                    GPA
                  </p>
                  <p className="mt-1 font-pixel text-sm text-lime-300">
                    {PROFILE.gpa}
                    <span className="text-[0.36rem] text-slate-500"> / 4.00</span>
                  </p>
                </div>
              </div>

              <p className="mt-5 font-terminal text-xl leading-relaxed text-slate-300">
                Completed a bachelor's degree in Informatics and Computer
                Engineering Education, building a strong foundation in software
                development, information technology, and educational technology
                through coursework, collaborative projects, and applied
                development.
              </p>

              <div className="mt-7">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-cyan-400" />
                  <h3 className="font-pixel text-[0.52rem] text-white">
                    RELEVANT COURSEWORK
                  </h3>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {COURSES.map((course, index) => (
                    <div
                      key={course}
                      className="group flex items-center gap-3 border border-line bg-void/50 px-3 py-2.5 transition-colors hover:border-amber-400/40 hover:bg-amber-400/[0.04]"
                    >
                      <span className="font-pixel text-[0.32rem] text-amber-400/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-terminal text-lg leading-tight text-slate-300 transition-colors group-hover:text-amber-100">
                        {course}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="pixel-panel p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-lime-400" />
                <h2 className="font-pixel text-[0.56rem] text-white">
                  ACADEMIC PROJECTS & EXPERIENCE
                </h2>
              </div>

              <ul className="mt-5 space-y-3">
                {EXPERIENCE.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-line/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="mt-1.5 font-pixel text-[0.32rem] text-lime-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-terminal text-xl leading-snug text-slate-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
