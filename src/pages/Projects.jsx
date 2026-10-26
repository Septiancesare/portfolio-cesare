import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PageHeader from "../components/PageHeader";
import { PROJECTS } from "../data/projects";
import { sfx } from "../lib/audio";

const CATEGORIES = ["All", ...new Set(PROJECTS.map((project) => project.category))];

const ACCENTS = {
  "Web Development": "cyan",
  "Mobile Development": "lime",
  "Interactive Learning": "amber",
};

function ImageWithFallback({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback ${className}`}>
        <span className="max-w-[14rem] px-4 text-center font-pixel text-[0.4rem] leading-relaxed text-slate-500">
          SIGNAL LOST
          <br />
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === filter),
    [filter]
  );

  useEffect(() => {
    if (!selected) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      } else if (event.key === "ArrowRight") {
        setImageIndex((index) => (index + 1) % selected.images.length);
      } else if (event.key === "ArrowLeft") {
        setImageIndex(
          (index) =>
            (index - 1 + selected.images.length) % selected.images.length
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const openProject = (project) => {
    sfx.select();
    setSelected(project);
    setImageIndex(0);
  };

  const closeProject = () => setSelected(null);

  const nextImage = () =>
    setImageIndex((index) => (index + 1) % selected.images.length);

  const prevImage = () =>
    setImageIndex(
      (index) => (index - 1 + selected.images.length) % selected.images.length
    );

  return (
    <div className="page-shell">
      <div className="starfield pointer-events-none absolute inset-0 opacity-40" />
      <div className="scene-glow pointer-events-none absolute inset-0" />

      <div className="page-wrap">
        <PageHeader
          kicker="Project Vault"
          title="SELECT A BUILD"
          description="A collection of academic and personal projects across web development, mobile apps, machine learning, and interactive technology."
          accent="rose"
        />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = filter === category;
              const count =
                category === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((project) => project.category === category)
                      .length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    sfx.select();
                    setFilter(category);
                  }}
                  className={`border-2 px-3 py-2 font-pixel text-[0.4rem] uppercase tracking-[0.06em] transition-colors ${
                    active
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                      : "border-line bg-panel/50 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-200"
                  }`}
                >
                  {category} <span className="text-slate-600">[{count}]</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border border-line bg-panel/50 px-3 py-2">
            <span className="h-2 w-2 bg-lime-400" />
            <span className="font-pixel text-[0.36rem] tracking-[0.12em] text-slate-400">
              {filtered.length} ENTR{filtered.length === 1 ? "Y" : "IES"} FOUND
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => {
            const accent = ACCENTS[project.category] || "cyan";
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => openProject(project)}
                className="project-card text-left"
                aria-label={`Open ${project.title}`}
              >
                <div className="project-card__media">
                  <ImageWithFallback
                    src={project.images[0]}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`absolute left-3 top-3 z-10 border px-2 py-1 font-pixel text-[0.3rem] uppercase tracking-[0.08em] ${
                      accent === "lime"
                        ? "border-lime-400/40 bg-void/80 text-lime-300"
                        : accent === "amber"
                          ? "border-amber-400/40 bg-void/80 text-amber-300"
                          : "border-cyan-400/40 bg-void/80 text-cyan-300"
                    }`}
                  >
                    {project.category}
                  </span>

                  <span className="absolute right-3 top-3 z-10 border border-line bg-void/80 px-2 py-1 font-pixel text-[0.32rem] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-pixel text-[0.58rem] leading-relaxed text-white">
                    {project.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 font-terminal text-lg leading-snug text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="border border-line bg-void/60 px-2 py-0.5 font-terminal text-base text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 ? (
                        <span className="border border-line bg-void/60 px-2 py-0.5 font-terminal text-base text-cyan-300">
                          +{project.tech.length - 4}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                      <span className="font-pixel text-[0.3rem] tracking-[0.06em] text-slate-500">
                        {project.images.length} SCREENSHOTS
                      </span>
                      <span className="font-pixel text-[0.38rem] text-cyan-300">
                        VIEW &gt;
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="pixel-panel p-10 text-center">
            <p className="font-pixel text-[0.6rem] text-slate-400">
              NO PROJECTS FOUND
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="pixel-btn pixel-btn--ghost pixel-btn--sm mt-5"
            >
              Reset Filter
            </button>
          </div>
        ) : null}
      </div>

      {selected
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-md md:p-6"
              onClick={closeProject}
              role="presentation"
            >
          <div
            className="pixel-panel relative max-h-[86vh] w-full max-w-5xl overflow-y-auto overscroll-contain"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              type="button"
              onClick={closeProject}
              className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center border-2 border-line bg-void/90 font-pixel text-[0.6rem] text-slate-300 transition-colors hover:border-rose-400/60 hover:text-rose-300"
              aria-label="Close project details"
            >
              X
            </button>

            <div className="relative h-[200px] overflow-hidden border-b-2 border-line bg-[#03060c] sm:h-[260px] md:h-[360px]">
              <ImageWithFallback
                key={`${selected.title}-${imageIndex}`}
                src={selected.images[imageIndex]}
                alt={`${selected.title} screenshot ${imageIndex + 1}`}
                className="h-full w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.02)_0_1px,transparent_1px_4px)]" />

              {selected.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-void/80 font-pixel text-[0.6rem] text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
                    aria-label="Previous screenshot"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-line bg-void/80 font-pixel text-[0.6rem] text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
                    aria-label="Next screenshot"
                  >
                    &gt;
                  </button>
                </>
              ) : null}

              <span className="absolute bottom-3 left-3 border border-line bg-void/85 px-2 py-1 font-pixel text-[0.32rem] text-slate-400">
                {String(imageIndex + 1).padStart(2, "0")} /{" "}
                {String(selected.images.length).padStart(2, "0")}
              </span>
            </div>

            <div className="p-5 md:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pixel-chip">{selected.category}</span>
                <span className="pixel-chip pixel-chip--lime">
                  {selected.tech.length} TECH
                </span>
                <span className="pixel-chip pixel-chip--amber">
                  {selected.images.length} SHOTS
                </span>
              </div>

              <h2 className="mt-4 font-pixel text-base leading-relaxed text-white md:text-lg">
                {selected.title}
              </h2>

              <p className="mt-4 max-w-3xl font-terminal text-xl leading-relaxed text-slate-300">
                {selected.description}
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.8fr]">
                <div className="border border-line bg-void/50 p-4">
                  <h3 className="font-pixel text-[0.44rem] text-cyan-300">
                    OBJECTIVE
                  </h3>
                  <p className="mt-3 font-terminal text-lg leading-snug text-slate-400">
                    {selected.objective}
                  </p>
                </div>

                <div className="border border-line bg-void/50 p-4">
                  <h3 className="font-pixel text-[0.44rem] text-lime-300">
                    TECH STACK
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selected.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line bg-panel/60 px-2 py-0.5 font-terminal text-base text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selected.images.length > 1 ? (
                <div className="mt-6">
                  <p className="font-pixel text-[0.34rem] uppercase tracking-[0.14em] text-slate-500">
                    Screenshot Gallery
                  </p>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                    {selected.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        className={`h-14 w-20 shrink-0 overflow-hidden border-2 transition-colors ${
                          index === imageIndex
                            ? "border-cyan-400"
                            : "border-line hover:border-slate-500"
                        }`}
                        aria-label={`Show screenshot ${index + 1}`}
                        aria-pressed={index === imageIndex}
                      >
                        <ImageWithFallback
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-5 font-terminal text-base text-slate-600">
                ESC to close · ARROW KEYS to browse screenshots
              </p>
            </div>
            </div>
          </div>,
          document.body
          )
        : null}
    </div>
  );
}
