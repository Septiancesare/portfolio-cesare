import { useState } from "react";
import PixelDino from "../components/PixelDino";
import { PROFILE, profilePhoto } from "../data/profile";
import { sfx } from "../lib/audio";

const PATHS = [
  {
    path: "/play",
    icon: ">_",
    tag: "STAGE 01",
    title: "PLAY THE GAME",
    description:
      "Jump into my endless runner. Dodge cacti, duck under pterodactyls, and chase the local high score.",
    meta: "ENDLESS RUNNER",
    accent: "lime",
  },
  {
    path: "/about",
    icon: "i",
    tag: "STAGE 02",
    title: "MEET THE PLAYER",
    description:
      "Who is behind the pixels? Read my story, view my CV, and find my academic and skill logs.",
    meta: "CHARACTER SHEET",
    accent: "cyan",
  },
  {
    path: "/projects",
    icon: "P",
    tag: "STAGE 03",
    title: "OPEN THE VAULT",
    description:
      "Eight builds across web, mobile, machine learning, and interactive learning. Browse the gallery.",
    meta: "8 PROJECTS",
    accent: "amber",
  },
];

function readHighScore() {
  try {
    return Number(localStorage.getItem("cesare.dino.highscore")) || 0;
  } catch {
    return 0;
  }
}

function Stat({ value, label, accent = "lime" }) {
  return (
    <div className="stat-tile">
      <p className={`stat-tile__value ${accent === "cyan" ? "!text-cyan-300" : ""}`}>
        {value}
      </p>
      <p className="stat-tile__label">{label}</p>
    </div>
  );
}

export default function Landing({ navigate }) {
  const [highScore] = useState(readHighScore);

  const go = (event, path) => {
    event.preventDefault();
    sfx.select();
    navigate(path);
  };

  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-80" />
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="scene-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="page-wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-3 border border-lime-400/30 bg-lime-400/5 px-3 py-2">
              <span className="blink h-2 w-2 bg-lime-400" />
              <span className="font-pixel text-[0.42rem] tracking-[0.18em] text-lime-200">
                PLAYER 1 — READY
              </span>
            </div>

            <p className="mt-8 font-pixel text-[0.48rem] tracking-[0.22em] text-cyan-300">
              HELLO, WORLD. I AM
            </p>

            <h1 className="mt-5 font-pixel text-[1.5rem] leading-[1.6] text-white sm:text-[2rem] lg:text-[2.9rem]">
              <span className="block">SEPTIAN</span>
              <span className="lime-text block text-lime-300">CESARE</span>
              <span className="neon-text block text-cyan-300">ARDEN</span>
            </h1>

            <p className="mt-6 max-w-xl font-terminal text-xl leading-snug text-slate-300 sm:text-2xl">
              {PROFILE.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#/play"
                onClick={(event) => go(event, "/play")}
                className="pixel-btn pixel-btn--lime"
              >
                <span className="text-[0.6rem]">&#9654;</span> Start Game
              </a>
              <a
                href="#/about"
                onClick={(event) => go(event, "/about")}
                className="pixel-btn pixel-btn--ghost"
              >
                Player Info
              </a>
              <a
                href="#/projects"
                onClick={(event) => go(event, "/projects")}
                className="pixel-btn pixel-btn--ghost"
              >
                Project Vault
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              <Stat value="3.90" label="GPA" />
              <Stat value="08+" label="Projects" accent="cyan" />
              <Stat value="2026" label="Graduate" accent="cyan" />
            </div>

            <p className="mt-7 max-w-xl font-terminal text-lg leading-snug text-slate-500">
              <span className="text-lime-300">► TIP:</span> use{" "}
              <span className="text-slate-300">WASD / ARROWS</span> to walk the
              dino below, then jump and headbutt a glowing block to warp between
              stages.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -left-6 top-24 hidden h-9 w-9 border-2 border-cyan-400/30 bg-cyan-400/10 md:block float-slow" />
            <div className="pointer-events-none absolute -right-5 top-8 hidden h-7 w-7 border-2 border-lime-400/30 bg-lime-400/10 md:block float-slow [animation-delay:1.4s]" />
            <div className="pointer-events-none absolute -right-8 bottom-28 hidden h-6 w-6 border-2 border-amber-400/30 bg-amber-400/10 md:block float-slow [animation-delay:0.7s]" />

            <div className="pixel-panel pixel-panel--glow p-4">
              <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-rose-400/80" />
                  <span className="h-2 w-2 bg-amber-400/80" />
                  <span className="h-2 w-2 bg-lime-400/80" />
                </div>
                <span className="font-pixel text-[0.34rem] tracking-[0.12em] text-slate-500">
                  PLAYER_CARD.SAV
                </span>
              </div>

              <div className="player-card__photo aspect-[4/5]">
                <img src={profilePhoto} alt={PROFILE.name} />
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-pixel text-[0.58rem] leading-relaxed text-white">
                      SEPTian C. ARDEN
                    </h2>
                    <p className="mt-2 font-terminal text-lg text-slate-400">
                      {PROFILE.role} / IT Enthusiast
                    </p>
                  </div>
                  <span className="shrink-0 border border-lime-400/40 bg-lime-400/10 px-2 py-1 font-pixel text-[0.32rem] text-lime-200">
                    LV.22
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="pixel-chip pixel-chip--lime">Web</span>
                  <span className="pixel-chip">Mobile</span>
                  <span className="pixel-chip pixel-chip--amber">AI / ML</span>
                  <span className="pixel-chip pixel-chip--rose">VR / IoT</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="font-pixel text-[0.34rem] uppercase tracking-[0.14em] text-slate-500">
                    Hi-Score
                  </span>
                  <span className="font-pixel text-[0.54rem] text-amber-300">
                    {String(highScore).padStart(5, "0")}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-line pt-3">
                  <PixelDino className="h-12 w-16 shrink-0 text-lime-300" running />
                  <p className="font-terminal text-lg leading-tight text-slate-500">
                    All systems online.
                    <br />
                    Press start to explore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="marquee mt-16">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <span key={copy} aria-hidden={copy === 1}>
                <span>INSERT COIN</span>
                <span className="text-slate-600">{"//"}</span>
                <span>WELCOME TO MY PIXEL PORTFOLIO</span>
                <span className="text-slate-600">{"//"}</span>
                <span>SOFTWARE DEVELOPER</span>
                <span className="text-slate-600">{"//"}</span>
                <span>FRESH GRADUATE 2026</span>
                <span className="text-slate-600">{"//"}</span>
                <span>PRESS START</span>
                <span className="text-slate-600">{"//"}</span>
              </span>
            ))}
          </div>
        </div>

        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Select Your Path</p>
              <h2 className="section-title !text-lg md:!text-2xl">THREE DOORS</h2>
            </div>
            <p className="max-w-md font-terminal text-lg leading-snug text-slate-500">
              Every door is also a floating block in the nav bar below. Walk,
              jump, and headbutt it.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {PATHS.map((card) => (
              <a
                key={card.path}
                href={`#${card.path}`}
                onClick={(event) => go(event, card.path)}
                className="pixel-panel pixel-hover group flex flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center border font-pixel text-sm ${
                      card.accent === "lime"
                        ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                        : card.accent === "amber"
                          ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                          : "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    }`}
                  >
                    {card.icon}
                  </span>
                  <span className="font-pixel text-[0.36rem] tracking-[0.12em] text-slate-600">
                    {card.tag}
                  </span>
                </div>

                <h3 className="mt-7 font-pixel text-[0.62rem] leading-relaxed text-white transition-colors group-hover:text-lime-200">
                  {card.title}
                </h3>

                <p className="mt-3 flex-1 font-terminal text-lg leading-snug text-slate-400">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-3">
                  <span className="font-pixel text-[0.34rem] tracking-[0.1em] text-slate-500">
                    {card.meta}
                  </span>
                  <span className="font-pixel text-[0.4rem] text-cyan-300 transition-transform group-hover:translate-x-1">
                    PRESS &gt;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
