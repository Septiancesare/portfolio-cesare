import DinoRunner from "../game/DinoRunner";
import { sfx } from "../lib/audio";

const INFO_PANELS = [
  {
    title: "CONTROLS",
    lines: [
      ["SPACE / W / UP", "Jump"],
      ["DOWN / S", "Duck"],
      ["TOUCH", "Jump + Duck buttons"],
      ["CLICK / TAP", "Start or restart"],
    ],
  },
  {
    title: "SCORE SYSTEM",
    lines: [
      ["DISTANCE", "1 point / 12px"],
      ["MILESTONE", "Sound every 100 pts"],
      ["HIGH SCORE", "Saved in localStorage"],
      ["DIFFICULTY", "Speed ramps up"],
    ],
  },
];

export default function Play({ navigate }) {
  const go = (event, path) => {
    event.preventDefault();
    sfx.select();
    navigate(path);
  };

  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="page-wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-lime-400" />
              <p className="section-kicker !text-[0.48rem] text-lime-300">
                Stage 02 / Arcade
              </p>
            </div>
            <h1 className="section-title !text-2xl md:!text-4xl">
              DINO RUNNER
            </h1>
            <p className="mt-4 max-w-2xl font-terminal text-xl leading-snug text-slate-300 md:text-2xl">
              The classic offline runner, rebuilt for this portfolio. Jump the
              cacti, duck under pterodactyls, and see how far the little dino can
              go.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="stat-tile">
              <p className="stat-tile__value !text-cyan-300">∞</p>
              <p className="stat-tile__label">Endless</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile__value">WAV</p>
              <p className="stat-tile__label">Audio</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile__value !text-cyan-300">LOCAL</p>
              <p className="stat-tile__label">Save</p>
            </div>
          </div>
        </div>

        <DinoRunner navigate={navigate} />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {INFO_PANELS.map((panel) => (
            <section key={panel.title} className="pixel-panel p-5">
              <h2 className="font-pixel text-[0.48rem] text-cyan-300">
                {panel.title}
              </h2>

              <dl className="mt-4 space-y-2">
                {panel.lines.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-line/60 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="font-pixel text-[0.3rem] uppercase tracking-[0.08em] text-slate-500">
                      {label}
                    </dt>
                    <dd className="text-right font-terminal text-lg leading-tight text-slate-300">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section className="pixel-panel pixel-panel--lime p-5">
            <h2 className="font-pixel text-[0.48rem] text-lime-300">
              WARP OUT
            </h2>
            <p className="mt-3 font-terminal text-lg leading-snug text-slate-400">
              Done running? The rest of the portfolio is one click away.
            </p>

            <div className="mt-4 grid gap-2">
              <a
                href="#/"
                onClick={(event) => go(event, "/")}
                className="pixel-btn pixel-btn--ghost pixel-btn--sm w-full"
              >
                Home Base
              </a>
              <a
                href="#/projects"
                onClick={(event) => go(event, "/projects")}
                className="pixel-btn pixel-btn--lime pixel-btn--sm w-full"
              >
                Project Vault
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
