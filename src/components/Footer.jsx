import { PROFILE, cvFile } from "../data/profile";

const QUICK_LINKS = [
  { path: "/", label: "Home Base" },
  { path: "/about", label: "About Player" },
  { path: "/academic", label: "Academic Log" },
  { path: "/skills", label: "Skill Tree" },
  { path: "/projects", label: "Project Vault" },
  { path: "/play", label: "Dino Runner" },
];

const SOCIALS = [
  { label: "GitHub", tag: "GH", href: PROFILE.socials.github },
  { label: "LinkedIn", tag: "IN", href: PROFILE.socials.linkedin },
  { label: "Instagram", tag: "IG", href: PROFILE.socials.instagram },
];

export default function Footer({ navigate, withCompanion = true }) {
  const year = new Date().getFullYear();

  const go = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <footer
      id="contact"
      className={`relative overflow-hidden border-t-2 border-cyan-400/20 bg-[#04060b] ${
        withCompanion ? "pb-64" : "pb-10"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8),0_0_22px_rgba(34,211,238,0.45)]" />
      <div className="scene-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-14 md:px-6 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-cyan-400" />
              <p className="section-kicker">Contact / Co-op</p>
            </div>

            <h2 className="mt-4 font-pixel text-lg leading-[1.7] text-white md:text-xl">
              LET'S BUILD
              <br />
              <span className="text-cyan-300 neon-text">SOMETHING.</span>
            </h2>

            <p className="mt-5 max-w-md font-terminal text-xl leading-relaxed text-slate-400">
              Have an opportunity, project, or just want to connect? My inbox is
              always open. Send a message and let's start a new quest.
            </p>

            <a
              href={`mailto:${PROFILE.email}`}
              className="group mt-8 inline-flex items-center gap-4 border border-line bg-panel/70 px-4 py-3 transition-colors hover:border-cyan-400/60"
            >
              <span className="grid h-10 w-10 place-items-center border border-cyan-400/30 bg-cyan-400/5 font-pixel text-[0.48rem] text-cyan-300">
                @
              </span>
              <span>
                <span className="block font-pixel text-[0.38rem] uppercase tracking-[0.16em] text-slate-500">
                  Email
                </span>
                <span className="mt-1 block font-terminal text-xl text-slate-200 transition-colors group-hover:text-cyan-200">
                  {PROFILE.email}
                </span>
              </span>
            </a>

            <p className="mt-4 flex items-center gap-2 font-terminal text-lg text-slate-500">
              <span className="text-lime-300">+</span>
              {PROFILE.location}
            </p>
          </div>

          <div>
            <p className="font-pixel text-[0.42rem] uppercase tracking-[0.18em] text-slate-500">
              Quick Warp
            </p>
            <ul className="mt-5 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <a
                    href={`#${link.path}`}
                    onClick={(event) => go(event, link.path)}
                    className="group flex items-center gap-2 py-1 font-terminal text-xl text-slate-400 transition-colors hover:text-cyan-200"
                  >
                    <span className="text-cyan-400/50 transition-transform group-hover:translate-x-1">
                      &gt;
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-pixel text-[0.42rem] uppercase tracking-[0.18em] text-slate-500">
              Player Links
            </p>

            <div className="mt-5 space-y-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-line bg-panel/50 px-3 py-2.5 transition-colors hover:border-cyan-400/50"
                >
                  <span className="grid h-8 w-8 place-items-center border border-line bg-void font-pixel text-[0.4rem] text-slate-400 transition-colors group-hover:border-cyan-400/40 group-hover:text-cyan-300">
                    {social.tag}
                  </span>
                  <span className="font-terminal text-xl text-slate-400 transition-colors group-hover:text-cyan-200">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            <a
              href={cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn--ghost pixel-btn--sm mt-5 w-full"
            >
              View CV
            </a>

            <p className="mt-5 border-l-2 border-cyan-400/30 pl-3 font-terminal text-base italic leading-snug text-slate-500">
              "{PROFILE.quote}"
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line/80 py-6 sm:flex-row sm:items-center">
          <p className="font-terminal text-lg text-slate-500">
            &copy; {year} {PROFILE.name}. All rights reserved.
          </p>
          <p className="font-pixel text-[0.36rem] uppercase tracking-[0.14em] text-slate-600">
            Built with React // Coffee // Pixels
          </p>
        </div>
      </div>
    </footer>
  );
}
