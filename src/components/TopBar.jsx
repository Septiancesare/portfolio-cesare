import { useEffect, useRef, useState } from "react";
import PixelDino from "./PixelDino";
import { isMuted, subscribeMuted, toggleMuted, sfx } from "../lib/audio";

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/academic", label: "Academic" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
];

function SpeakerIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
      <path d="M4 9h4l5-4v14l-5-4H4V9Z" fill="currentColor" />
      {muted ? (
        <path
          d="m16 9 5 6m0-6-5 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
      ) : (
        <>
          <path
            d="M16 8c1.6 1.1 1.6 6.9 0 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            d="M19 6c2.8 2.4 2.8 9.6 0 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </>
      )}
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
          open ? "top-2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-opacity ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
          open ? "top-2 -rotate-45" : "top-4"
        }`}
      />
    </span>
  );
}

export default function TopBar({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const [muted, setMutedState] = useState(isMuted);
  const navRef = useRef(null);

  useEffect(() => subscribeMuted(() => setMutedState(isMuted())), []);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const go = (event, path) => {
    event.preventDefault();
    setOpen(false);
    sfx.select();
    navigate(path);
  };

  const handleMute = () => {
    toggleMuted();
  };

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[60] border-b-2 border-cyan-400/15 bg-void/95 backdrop-blur-md"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-3 sm:px-5">
        <a
          href="#/"
          onClick={(event) => go(event, "/")}
          className="group flex items-center gap-3"
          aria-label="Septian.exe home"
        >
          <span className="grid h-11 w-11 place-items-center border-2 border-lime-400/35 bg-lime-400/5 text-lime-300 shadow-[0_0_18px_rgba(163,230,53,0.12)] transition-colors group-hover:border-lime-300/70">
            <PixelDino className="h-8 w-8" />
          </span>
          <span>
            <span className="block font-pixel text-[0.68rem] text-slate-100">
              sepTIAN<span className="text-cyan-300">.EXE</span>
            </span>
            <span className="mt-1 hidden font-pixel text-[0.34rem] tracking-[0.22em] text-slate-500 sm:block">
              PIXEL PORTFOLIO v2.6
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {LINKS.map((link) => {
            const active = route === link.path;
            return (
              <a
                key={link.path}
                href={`#${link.path}`}
                onClick={(event) => go(event, link.path)}
                aria-current={active ? "page" : undefined}
                className={`border px-3 py-2 font-pixel text-[0.46rem] uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-200"
                    : "border-transparent text-slate-400 hover:border-line hover:text-cyan-200"
                }`}
              >
                {active ? "> " : ""}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMute}
            aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
            aria-pressed={muted}
            className="grid h-10 w-10 place-items-center border-2 border-line bg-panel/80 text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
          >
            <SpeakerIcon muted={muted} />
          </button>

          <a
            href="#/play"
            onClick={(event) => go(event, "/play")}
            className="pixel-btn pixel-btn--lime pixel-btn--sm hidden sm:inline-flex"
          >
            <span className="blink text-[0.45rem]">&#9654;</span> Play
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center border-2 border-line bg-panel/80 text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t-2 border-cyan-400/15 bg-void/95 px-3 pb-4 pt-3 lg:hidden">
          <p className="mb-2 px-2 font-pixel text-[0.36rem] tracking-[0.2em] text-slate-600">
            SELECT STAGE
          </p>
          <div className="grid grid-cols-2 gap-2">
            {LINKS.map((link) => {
              const active = route === link.path;
              return (
                <a
                  key={link.path}
                  href={`#${link.path}`}
                  onClick={(event) => go(event, link.path)}
                  className={`border px-3 py-3 font-pixel text-[0.46rem] uppercase ${
                    active
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                      : "border-line bg-panel/60 text-slate-300"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#/play"
              onClick={(event) => go(event, "/play")}
              className="col-span-2 border-2 border-lime-400/50 bg-lime-400/10 px-3 py-4 text-center font-pixel text-[0.56rem] uppercase text-lime-200"
            >
              &#9654; Play Dino Runner
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
