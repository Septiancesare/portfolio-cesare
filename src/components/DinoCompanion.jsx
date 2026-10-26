import { useCallback, useEffect, useRef, useState } from "react";
import PixelDino from "./PixelDino";
import { sfx } from "../lib/audio";

const NAV_BLOCKS = [
  { path: "/", label: "Home", icon: "H", left: 10 },
  { path: "/about", label: "About", icon: "?", left: 26 },
  { path: "/academic", label: "Academic", icon: "A", left: 42 },
  { path: "/skills", label: "Skills", icon: "S", left: 58 },
  { path: "/projects", label: "Projects", icon: "P", left: 74 },
  { path: "/play", label: "Play", icon: ">", left: 90 },
];

const isField = (element) =>
  element instanceof Element &&
  (element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.tagName === "SELECT" ||
    element.isContentEditable);

export default function DinoCompanion({ route, navigate }) {
  const dinoRef = useRef(null);
  const shadowRef = useRef(null);
  const blockRefs = useRef([]);
  const keysRef = useRef({ left: false, right: false });
  const stateRef = useRef({
    x: 34,
    y: 0,
    vy: 0,
    facing: 1,
    grounded: true,
    locked: false,
  });
  const navRef = useRef(navigate);
  const [hitPath, setHitPath] = useState(null);
  const [moving, setMoving] = useState(false);
  const movingRef = useRef(false);
  const triggerRef = useRef(null);

  navRef.current = navigate;

  const triggerHit = useCallback((block) => {
    const state = stateRef.current;
    if (state.locked) return;

    state.locked = true;
    state.vy = -220;
    state.grounded = false;
    setHitPath(block.path);
    sfx.block();

    window.setTimeout(() => {
      setHitPath(null);
      state.locked = false;
      navRef.current(block.path);
    }, 300);
  }, []);

  triggerRef.current = triggerHit;

  const jump = useCallback(() => {
    const state = stateRef.current;
    if (state.locked || !state.grounded) return;
    state.vy = 860;
    state.grounded = false;
    state.y = Math.max(state.y, 1);
    sfx.jump();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.045);
      last = now;

      const state = stateRef.current;
      const narrow = window.innerWidth < 640;
      const dinoWidth = narrow ? 54 : 68;
      const moveSpeed = narrow ? 210 : 250;
      const maxX = Math.max(10, window.innerWidth - dinoWidth - 12);

      const move =
        (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);

      const isMoving = move !== 0;
      if (isMoving !== movingRef.current) {
        movingRef.current = isMoving;
        setMoving(isMoving);
      }

      if (move !== 0) {
        state.x += move * moveSpeed * dt;
        state.facing = move;
      }
      state.x = Math.max(10, Math.min(maxX, state.x));

      if (!state.grounded || state.y > 0) {
        state.vy -= 2600 * dt;
        state.y += state.vy * dt;
        if (state.y <= 0) {
          state.y = 0;
          state.vy = 0;
          state.grounded = true;
        }
      }

      const dino = dinoRef.current;
      if (dino) {
        dino.style.transform = `translate3d(${state.x}px, ${-state.y}px, 0)`;
        dino.dataset.facing = state.facing < 0 ? "left" : "right";

        if (state.vy > 0 && !state.locked) {
          const dinoRect = dino.getBoundingClientRect();
          const head = {
            left: dinoRect.left + dinoRect.width * 0.28,
            right: dinoRect.right - 2,
            top: dinoRect.top,
            bottom: dinoRect.top + dinoRect.height * 0.46,
          };

          for (let index = 0; index < NAV_BLOCKS.length; index += 1) {
            const element = blockRefs.current[index];
            if (!element) continue;
            const blockRect = element.getBoundingClientRect();
            const overlapsX =
              head.right > blockRect.left + 8 &&
              head.left < blockRect.right - 8;
            const overlapsY =
              head.top < blockRect.bottom - 4 &&
              head.bottom > blockRect.top + 4;

            if (overlapsX && overlapsY) {
              triggerRef.current(NAV_BLOCKS[index]);
              break;
            }
          }
        }
      }

      if (shadowRef.current) {
        const scale = 1 - Math.min(state.y, 180) / 520;
        shadowRef.current.style.transform = `translate3d(${state.x}px, 0, 0) scale(${scale})`;
        shadowRef.current.style.opacity = String(
          Math.max(0.12, 0.5 - state.y / 500)
        );
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isField(event.target)) return;
      if (document.querySelector('[role="dialog"]')) return;
      const key = event.key.toLowerCase();

      if (key === "a" || key === "arrowleft") {
        keysRef.current.left = true;
        event.preventDefault();
      } else if (key === "d" || key === "arrowright") {
        keysRef.current.right = true;
        event.preventDefault();
      } else if (key === "w" || key === "arrowup" || key === " ") {
        const interactive =
          event.target instanceof Element &&
          (event.target.closest("button") || event.target.closest("a"));
        if (key === " " && interactive) return;
        event.preventDefault();
        jump();
      } else if (key === "s" || key === "arrowdown") {
        const state = stateRef.current;
        if (!state.grounded) {
          state.vy -= 700;
          event.preventDefault();
        }
      }
    };

    const onKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (key === "a" || key === "arrowleft") keysRef.current.left = false;
      if (key === "d" || key === "arrowright") keysRef.current.right = false;
    };

    const reset = () => {
      keysRef.current.left = false;
      keysRef.current.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", reset);
    };
  }, [jump]);

  const press = (direction) => (event) => {
    event.preventDefault();
    keysRef.current[direction] = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const release = (direction) => () => {
    keysRef.current[direction] = false;
  };

  return (
    <div className="companion" aria-label="Dino navigation companion">
      <div className="companion__fade" />
      <div className="companion__scan" />
      <div className="companion__scan noise-overlay" />
      <div className="companion__edge" />
      <div className="companion__ground" />

      <div className="companion__hint hidden md:inline-flex">
        <span className="text-lime-300">WASD / ARROWS</span>
        <span className="text-slate-600">|</span>
        <span>Jump into a block to navigate</span>
      </div>

      <div className="companion__blocks">
        {NAV_BLOCKS.map((block, index) => (
          <button
            key={block.path}
            ref={(element) => {
              blockRefs.current[index] = element;
            }}
            type="button"
            onClick={() => triggerHit(block)}
            className={`nav-block ${
              route === block.path ? "is-active" : ""
            } ${hitPath === block.path ? "is-hit" : ""}`}
            style={{ left: `${block.left}%` }}
            aria-label={`Open ${block.label}`}
            title={`Headbutt or click to open ${block.label}`}
          >
            <span className="nav-block__box" aria-hidden="true">
              {block.icon}
            </span>
            <span className="nav-block__label">{block.label}</span>
          </button>
        ))}
      </div>

      <div ref={shadowRef} className="companion__shadow" aria-hidden="true" />

      <div ref={dinoRef} className="companion__dino" aria-hidden="true">
        <PixelDino className="h-full w-full" running={moving} />
      </div>

      <div className="companion-controls">
        <div className="companion-controls__pad">
          <button
            type="button"
            className="pad-btn"
            onPointerDown={press("left")}
            onPointerUp={release("left")}
            onPointerLeave={release("left")}
            onPointerCancel={release("left")}
            onContextMenu={(event) => event.preventDefault()}
            aria-label="Walk left"
          >
            &lt;
          </button>
          <button
            type="button"
            className="pad-btn"
            onPointerDown={press("right")}
            onPointerUp={release("right")}
            onPointerLeave={release("right")}
            onPointerCancel={release("right")}
            onContextMenu={(event) => event.preventDefault()}
            aria-label="Walk right"
          >
            &gt;
          </button>
        </div>

        <div className="companion-controls__jump">
          <button
            type="button"
            className="pad-btn pad-btn--jump"
            onPointerDown={(event) => {
              event.preventDefault();
              jump();
            }}
            onContextMenu={(event) => event.preventDefault()}
            aria-label="Jump"
          >
            JUMP
          </button>
        </div>
      </div>
    </div>
  );
}
