const STORAGE_KEY = "cesare.sfx.muted";

let ctx = null;
let muted = false;

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    muted = false;
  }
}

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!ctx) {
    try {
      ctx = new AudioCtor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function tone({
  freq = 440,
  to = null,
  duration = 0.1,
  type = "square",
  volume = 0.04,
  delay = 0,
}) {
  if (muted) return;
  const ac = getContext();
  if (!ac) return;

  try {
    const start = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), start);
    if (to) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + duration);
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(
      Math.max(0.0002, volume),
      start + 0.012
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  } catch {
    /* audio is a nice-to-have */
  }
}

export function unlockAudio() {
  getContext();
}

export function isMuted() {
  return muted;
}

export function setMuted(value) {
  muted = Boolean(value);
  try {
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cesare:audio"));
  }
}

export function toggleMuted() {
  const next = !muted;
  setMuted(next);
  if (!next) sfx.select();
  return next;
}

export function subscribeMuted(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("cesare:audio", callback);
  return () => window.removeEventListener("cesare:audio", callback);
}

export const sfx = {
  jump() {
    tone({ freq: 320, to: 760, duration: 0.14, type: "square", volume: 0.05 });
  },
  hit() {
    tone({ freq: 240, to: 48, duration: 0.36, type: "sawtooth", volume: 0.075 });
    tone({
      freq: 120,
      to: 42,
      duration: 0.48,
      type: "square",
      volume: 0.05,
      delay: 0.04,
    });
  },
  point() {
    tone({ freq: 880, duration: 0.07, type: "square", volume: 0.045 });
    tone({
      freq: 1320,
      duration: 0.09,
      type: "square",
      volume: 0.04,
      delay: 0.07,
    });
  },
  select() {
    tone({ freq: 520, to: 780, duration: 0.09, type: "square", volume: 0.04 });
    tone({
      freq: 1040,
      duration: 0.08,
      type: "square",
      volume: 0.035,
      delay: 0.09,
    });
  },
  start() {
    tone({ freq: 392, duration: 0.1, type: "square", volume: 0.05 });
    tone({ freq: 523, duration: 0.1, type: "square", volume: 0.05, delay: 0.1 });
    tone({ freq: 784, duration: 0.16, type: "square", volume: 0.05, delay: 0.2 });
  },
  block() {
    tone({ freq: 660, to: 990, duration: 0.08, type: "square", volume: 0.05 });
    tone({
      freq: 1320,
      duration: 0.1,
      type: "square",
      volume: 0.04,
      delay: 0.08,
    });
  },
  gameover() {
    tone({ freq: 392, duration: 0.16, type: "square", volume: 0.05 });
    tone({ freq: 311, duration: 0.16, type: "square", volume: 0.05, delay: 0.16 });
    tone({ freq: 233, duration: 0.3, type: "square", volume: 0.05, delay: 0.32 });
  },
};
