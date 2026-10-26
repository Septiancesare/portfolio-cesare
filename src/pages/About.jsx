import PageHeader from "../components/PageHeader";
import { PROFILE, cvFile, profilePhoto } from "../data/profile";
import { sfx } from "../lib/audio";

const CHARACTER = [
  ["Name", PROFILE.name],
  ["Class", "Software Developer"],
  ["Guild", "Universitas Sebelas Maret"],
  ["Origin", PROFILE.location],
  ["Status", "Open to work"],
  ["Specialty", "Web / Mobile / AI"],
];

const FOCUS = [
  {
    title: "WEB SYSTEMS",
    text: "Laravel, React, Filament, REST APIs, and relational databases.",
    accent: "cyan",
  },
  {
    title: "MOBILE APPS",
    text: "Flutter and Firebase apps with practical, everyday use cases.",
    accent: "lime",
  },
  {
    title: "INTERACTIVE MEDIA",
    text: "Unity, VR, IoT, and learning experiences that feel alive.",
    accent: "amber",
  },
];

export default function About({ navigate }) {
  const go = (event, path) => {
    event.preventDefault();
    sfx.select();
    navigate(path);
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="page-wrap">
        <PageHeader
          kicker="Character Sheet"
          title="ABOUT THE PLAYER"
          description="A short readme for the human behind the code. No lore dumps — just who I am, what I build, and where I am heading."
          accent="lime"
        />

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="space-y-6">
            <div className="pixel-panel pixel-panel--lime p-4">
              <div className="player-card__photo aspect-[4/5]">
                <img src={profilePhoto} alt={PROFILE.name} />
              </div>

              <div className="mt-4">
                <h2 className="font-pixel text-[0.6rem] leading-relaxed text-white">
                  SEPTian C. ARDEN
                </h2>
                <p className="mt-2 font-terminal text-lg text-slate-400">
                  {PROFILE.role} / Fresh Graduate
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="stat-tile">
                    <p className="stat-tile__value">3.90</p>
                    <p className="stat-tile__label">GPA</p>
                  </div>
                  <div className="stat-tile">
                    <p className="stat-tile__value !text-cyan-300">08+</p>
                    <p className="stat-tile__label">Builds</p>
                  </div>
                  <div className="stat-tile">
                    <p className="stat-tile__value !text-cyan-300">2026</p>
                    <p className="stat-tile__label">Graduate</p>
                  </div>
                  <div className="stat-tile">
                    <p className="stat-tile__value">ID</p>
                    <p className="stat-tile__label">Indonesia</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {PROFILE.tags.map((tag) => (
                    <span key={tag} className="pixel-chip pixel-chip--lime">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pixel-panel p-5">
              <p className="section-kicker">Warp Menu</p>
              <div className="mt-4 grid gap-2.5">
                <a
                  href="#/academic"
                  onClick={(event) => go(event, "/academic")}
                  className="pixel-btn pixel-btn--ghost pixel-btn--sm w-full"
                >
                  <span className="text-amber-300">A</span> Academic Record
                </a>
                <a
                  href="#/skills"
                  onClick={(event) => go(event, "/skills")}
                  className="pixel-btn pixel-btn--ghost pixel-btn--sm w-full"
                >
                  <span className="text-cyan-300">S</span> Skill Tree
                </a>
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn pixel-btn--lime pixel-btn--sm w-full"
                >
                  <span className="text-[0.55rem]">&#8599;</span> View CV
                </a>
                <a
                  href="#/projects"
                  onClick={(event) => go(event, "/projects")}
                  className="pixel-btn pixel-btn--ghost pixel-btn--sm w-full"
                >
                  <span className="text-rose-300">P</span> Project Vault
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="pixel-panel p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-lime-400" />
                <p className="section-kicker !text-[0.48rem] text-lime-300">Bio</p>
              </div>

              <h2 className="mt-4 font-pixel text-[0.78rem] leading-relaxed text-white">
                THE STORY SO FAR
              </h2>

              <p className="mt-5 font-terminal text-xl leading-relaxed text-slate-300">
                {PROFILE.bioLong}
              </p>

              <p className="mt-4 font-terminal text-xl leading-relaxed text-slate-400">
                I like clean interfaces, sensible data structures, and products
                that solve a real problem. Most of my work starts with a simple
                question:{" "}
                <span className="text-cyan-200">
                  "can this be easier to use?"
                </span>{" "}
                Then I prototype, build, test, and iterate until it is.
              </p>

              <div className="mt-6 border-l-2 border-lime-400/40 bg-lime-400/[0.03] px-4 py-3">
                <p className="font-terminal text-lg italic leading-snug text-slate-400">
                  "{PROFILE.quote}"
                </p>
              </div>
            </section>

            <section className="pixel-panel p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-cyan-400" />
                <p className="section-kicker !text-[0.48rem]">Player Stats</p>
              </div>

              <h2 className="mt-4 font-pixel text-[0.78rem] leading-relaxed text-white">
                CHARACTER DATA
              </h2>

              <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                {CHARACTER.map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-line bg-panel/60 px-3 py-2.5"
                  >
                    <dt className="font-pixel text-[0.34rem] uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 font-terminal text-lg leading-tight text-slate-300">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {FOCUS.map((item) => (
                  <div
                    key={item.title}
                    className="border border-line bg-void/60 p-4"
                  >
                    <span
                      className={`block h-1 w-8 ${
                        item.accent === "lime"
                          ? "bg-lime-400"
                          : item.accent === "amber"
                            ? "bg-amber-400"
                            : "bg-cyan-400"
                      }`}
                    />
                    <h3 className="mt-3 font-pixel text-[0.44rem] leading-relaxed text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-terminal text-lg leading-snug text-slate-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="pixel-panel pixel-panel--lime p-6 md:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="section-kicker !text-[0.48rem] text-lime-300">
                    Quest Log
                  </p>
                  <h2 className="mt-3 font-pixel text-[0.72rem] leading-relaxed text-white">
                    CURRENT OBJECTIVE
                  </h2>
                  <p className="mt-3 max-w-xl font-terminal text-xl leading-snug text-slate-400">
                    Looking for a team where I can ship real products, learn from
                    experienced engineers, and grow into a well-rounded software
                    developer.
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="pixel-btn pixel-btn--lime pixel-btn--sm"
                  >
                    Contact Me
                  </button>
                  <a
                    href="#/projects"
                    onClick={(event) => go(event, "/projects")}
                    className="pixel-btn pixel-btn--ghost pixel-btn--sm"
                  >
                    See Work
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
