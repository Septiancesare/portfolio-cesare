import { useCallback, useEffect, useRef, useState } from "react";
import {
  isMuted,
  sfx,
  subscribeMuted,
  toggleMuted,
} from "../lib/audio";

const HIGH_KEY = "cesare.dino.highscore";

const DINO_X = 72;
const DINO_W = 48;
const DINO_H = 52;
const DUCK_W = 58;
const DUCK_H = 32;
const GRAVITY = 2600;
const JUMP_V = 920;
const BASE_SPEED = 420;
const MAX_SPEED = 920;
const GROUND_MARGIN = 64;

const COLORS = {
  dino: "#bef264",
  dinoDark: "#65a30d",
  eye: "#05070d",
  deadEye: "#fb7185",
  cactus: "#4ade80",
  cactusDark: "#166534",
  cactusLight: "#86efac",
  bird: "#fb7185",
  birdDark: "#9f1239",
  birdLight: "#fecdd3",
};

function readHighScore() {
  try {
    return Number(localStorage.getItem(HIGH_KEY)) || 0;
  } catch {
    return 0;
  }
}

function makeStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random() * 0.56,
    size: Math.random() < 0.82 ? 1 : 2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 1.4,
    alpha: 0.28 + Math.random() * 0.62,
    color: Math.random() < 0.12 ? "#fde68a" : "#dff9ff",
  }));
}

function makeClouds(w, h) {
  return Array.from({ length: 4 }, () => ({
    x: Math.random() * w,
    y: 36 + Math.random() * Math.max(26, h * 0.2),
    w: 46 + Math.random() * 42,
    speed: 7 + Math.random() * 11,
  }));
}

function createWorld(w, h) {
  const ground = Math.max(220, h - GROUND_MARGIN);
  return {
    w,
    h,
    ground,
    stars: makeStars(64),
    clouds: makeClouds(w, h),
    obstacles: [],
    particles: [],
    distance: 0,
    speed: BASE_SPEED,
    nextSpawn: 1.15,
    dinoY: 0,
    dinoVy: 0,
    ducking: false,
    legTimer: 0,
    legFrame: 0,
    groundOffset: 0,
    time: 0,
    shake: 0,
    flash: 0,
    dead: false,
    pointsFlash: 0,
    lastMilestone: 0,
  };
}

function spawnObstacle(world) {
  const useBird = world.distance > 760 && Math.random() < 0.36;

  if (useBird) {
    const heights = [24, 74, 128];
    const above = heights[Math.floor(Math.random() * heights.length)];
    world.obstacles.push({
      type: "bird",
      x: world.w + 40,
      y: world.ground - above,
      w: 52,
      h: 32,
      wing: 0,
    });
    return;
  }

  const cluster = Math.random() < 0.22 ? 2 : 1;
  const baseWidth = 18 + Math.random() * 14;

  for (let index = 0; index < cluster; index += 1) {
    const height = 34 + Math.random() * 26;
    world.obstacles.push({
      type: "cactus",
      x: world.w + 30 + index * (baseWidth + 12),
      y: world.ground,
      w: baseWidth,
      h: height,
    });
  }
}

function spawnParticles(world, x, y, count, palette) {
  for (let index = 0; index < count; index += 1) {
    const life = 0.4 + Math.random() * 0.45;
    world.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 280,
      vy: 80 + Math.random() * 320,
      gravity: 680 + Math.random() * 320,
      life,
      maxLife: life,
      size: 2 + Math.floor(Math.random() * 3),
      color: palette[Math.floor(Math.random() * palette.length)],
    });
  }
}

function updateParticles(world, dt) {
  for (const particle of world.particles) {
    particle.x += particle.vx * dt;
    particle.y -= particle.vy * dt;
    particle.vy -= particle.gravity * dt;
    particle.life -= dt;
  }
  world.particles = world.particles.filter((particle) => particle.life > 0);
}

function dinoBox(world) {
  const width = world.ducking ? DUCK_W : DINO_W;
  const height = world.ducking ? DUCK_H : DINO_H;
  return {
    x: DINO_X + 6,
    y: world.ground - world.dinoY - height,
    w: width - 12,
    h: height - 4,
  };
}

function overlaps(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function updateWorld(world, dt) {
  world.time += dt;
  world.speed = Math.min(MAX_SPEED, BASE_SPEED + world.distance / 26);
  world.distance += world.speed * dt;
  world.groundOffset = (world.groundOffset + world.speed * dt) % 68;

  if (world.dinoY > 0 || world.dinoVy > 0) {
    world.dinoVy -= GRAVITY * dt;
    world.dinoY += world.dinoVy * dt;
    if (world.dinoY <= 0) {
      world.dinoY = 0;
      world.dinoVy = 0;
    }
  }

  if (world.dinoY <= 0.5) {
    world.legTimer += dt;
    if (world.legTimer > 0.1) {
      world.legTimer = 0;
      world.legFrame = world.legFrame === 0 ? 1 : 0;
    }
  }

  for (const cloud of world.clouds) {
    cloud.x -= cloud.speed * dt;
    if (cloud.x < -cloud.w) {
      cloud.x = world.w + cloud.w;
      cloud.y = 36 + Math.random() * Math.max(26, world.h * 0.2);
    }
  }

  for (const obstacle of world.obstacles) {
    obstacle.x -= world.speed * dt;
    if (obstacle.type === "bird") {
      obstacle.wing += dt;
    }
  }
  world.obstacles = world.obstacles.filter(
    (obstacle) => obstacle.x + obstacle.w > -50
  );

  world.nextSpawn -= dt;
  if (world.nextSpawn <= 0) {
    spawnObstacle(world);
    world.nextSpawn = (420 + Math.random() * 380) / world.speed;
  }

  const hitbox = dinoBox(world);

  for (const obstacle of world.obstacles) {
    const box =
      obstacle.type === "cactus"
        ? {
            x: obstacle.x + 4,
            y: obstacle.y - obstacle.h + 4,
            w: obstacle.w - 8,
            h: obstacle.h - 4,
          }
        : {
            x: obstacle.x + 8,
            y: obstacle.y + 7,
            w: obstacle.w - 16,
            h: obstacle.h - 14,
          };

    if (overlaps(hitbox, box)) {
      world.dead = true;
      world.flash = 1;
      world.shake = 18;
      spawnParticles(world, DINO_X + 28, world.ground - world.dinoY - 26, 20, [
        "#a3e635",
        "#fb7185",
        "#fbbf24",
      ]);
      return;
    }
  }

  const score = Math.floor(world.distance / 12);
  const milestone = Math.floor(score / 100);
  if (milestone > 0 && milestone !== world.lastMilestone) {
    world.lastMilestone = milestone;
    world.pointsFlash = 1;
    spawnParticles(world, world.w - 110, 92, 9, ["#fbbf24", "#fde68a"]);
    sfx.point();
  }

  updateParticles(world, dt);

  if (world.pointsFlash > 0) {
    world.pointsFlash = Math.max(0, world.pointsFlash - dt * 1.2);
  }
  if (world.shake > 0) {
    world.shake = Math.max(0, world.shake - dt * 42);
  }
  if (world.flash > 0) {
    world.flash = Math.max(0, world.flash - dt * 2.3);
  }
}

/* ---------- drawing ---------- */

function drawStars(ctx, world) {
  for (const star of world.stars) {
    const twinkle =
      0.45 + 0.55 * (0.5 + 0.5 * Math.sin(world.time * star.speed + star.phase));
    ctx.globalAlpha = twinkle * star.alpha;
    ctx.fillStyle = star.color;
    ctx.fillRect(
      Math.round(star.x * world.w),
      Math.round(star.y * world.ground),
      star.size,
      star.size
    );
  }
  ctx.globalAlpha = 1;
}

function drawMoon(ctx, world) {
  const cx = world.w - 100;
  const cy = 74;

  ctx.save();
  ctx.shadowColor = "rgba(34, 211, 238, 0.55)";
  ctx.shadowBlur = 42;
  ctx.fillStyle = "#a5f3fc";
  ctx.beginPath();
  ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "rgba(8, 20, 38, 0.32)";
  ctx.fillRect(cx - 9, cy - 7, 5, 5);
  ctx.fillRect(cx + 3, cy + 4, 4, 4);
  ctx.fillRect(cx + 8, cy - 11, 3, 3);
}

function drawSkyline(ctx, world) {
  const offset = (world.distance * 0.05) % 140;
  const heightPattern = [72, 104, 58, 88, 120];

  for (let index = -1; index < Math.ceil(world.w / 140) + 2; index += 1) {
    const x = index * 140 - offset;
    const height = heightPattern[Math.abs(index) % heightPattern.length];

    ctx.fillStyle = "rgba(9, 23, 41, 0.92)";
    ctx.fillRect(x, world.ground - height, 52, height);
    ctx.fillRect(x + 16, world.ground - height - 22, 26, 22);
    ctx.fillRect(x + 78, world.ground - height * 0.55, 34, height * 0.55);

    ctx.fillStyle = "rgba(34, 211, 238, 0.08)";
    for (let wy = world.ground - height + 12; wy < world.ground - 12; wy += 18) {
      ctx.fillRect(x + 8, wy, 4, 4);
      ctx.fillRect(x + 30, wy, 4, 4);
    }
  }
}

function drawClouds(ctx, world) {
  ctx.fillStyle = "rgba(125, 211, 252, 0.1)";
  for (const cloud of world.clouds) {
    ctx.fillRect(cloud.x, cloud.y, cloud.w, 7);
    ctx.fillRect(cloud.x + 9, cloud.y - 7, cloud.w - 22, 7);
    ctx.fillRect(cloud.x + 22, cloud.y - 13, cloud.w - 44, 6);
    ctx.fillRect(cloud.x - 6, cloud.y + 4, cloud.w + 12, 3);
  }
}

function drawGround(ctx, world) {
  const { w, h, ground, groundOffset } = world;

  ctx.fillStyle = "#07111f";
  ctx.fillRect(0, ground, w, h - ground);

  ctx.fillStyle = "rgba(34, 211, 238, 0.6)";
  ctx.fillRect(0, ground, w, 2);
  ctx.fillStyle = "rgba(34, 211, 238, 0.12)";
  ctx.fillRect(0, ground + 2, w, 1);

  ctx.fillStyle = "rgba(34, 211, 238, 0.28)";
  for (let x = -groundOffset; x < w; x += 68) {
    ctx.fillRect(x, ground + 18, 30, 2);
  }

  ctx.fillStyle = "rgba(163, 230, 53, 0.18)";
  for (let x = -groundOffset * 0.7; x < w; x += 110) {
    ctx.fillRect(x + 40, ground + 34, 8, 2);
  }

  ctx.strokeStyle = "rgba(34, 211, 238, 0.045)";
  ctx.lineWidth = 1;
  for (let x = -groundOffset; x < w; x += 68) {
    ctx.beginPath();
    ctx.moveTo(x, ground);
    ctx.lineTo(x - 42, h);
    ctx.stroke();
  }
}

function drawCactus(ctx, obstacle) {
  const { x, y, w, h } = obstacle;
  const top = y - h;

  ctx.fillStyle = COLORS.cactusDark;
  ctx.fillRect(x + w * 0.28, top + 4, w * 0.44, h - 4);

  ctx.fillStyle = COLORS.cactus;
  ctx.fillRect(x + w * 0.36, top, w * 0.3, h);
  ctx.fillRect(x, top + h * 0.28, w * 0.36, w * 0.2);
  ctx.fillRect(x, top + h * 0.17, w * 0.15, h * 0.3);
  ctx.fillRect(x + w * 0.64, top + h * 0.44, w * 0.36, w * 0.2);
  ctx.fillRect(x + w * 0.85, top + h * 0.3, w * 0.15, h * 0.33);

  ctx.fillStyle = COLORS.cactusLight;
  ctx.fillRect(x + w * 0.4, top + 3, 2, h - 8);
  ctx.fillRect(x + 2, top + h * 0.24, 2, h * 0.16);

  ctx.fillStyle = "rgba(5, 7, 13, 0.28)";
  ctx.fillRect(x + w * 0.56, top + 4, w * 0.08, h - 8);
}

function drawBird(ctx, obstacle) {
  const { x, y, wing } = obstacle;
  const wingUp = Math.floor(wing * 9) % 2 === 0;

  ctx.fillStyle = COLORS.birdDark;
  ctx.fillRect(x + 10, y + 15, 36, 9);

  ctx.fillStyle = COLORS.bird;
  ctx.fillRect(x + 12, y + 11, 34, 10);
  ctx.fillRect(x + 2, y + 7, 18, 13);
  ctx.fillRect(x - 8, y + 13, 12, 4);
  ctx.fillRect(x + 40, y + 9, 10, 7);

  ctx.fillStyle = COLORS.birdLight;
  ctx.fillRect(x + 9, y + 10, 4, 4);

  ctx.fillStyle = COLORS.bird;
  if (wingUp) {
    ctx.fillRect(x + 14, y - 8, 24, 7);
    ctx.fillRect(x + 4, y - 3, 12, 6);
  } else {
    ctx.fillRect(x + 14, y + 21, 24, 7);
    ctx.fillRect(x + 6, y + 26, 12, 5);
  }

  ctx.fillStyle = "rgba(5, 7, 13, 0.25)";
  ctx.fillRect(x + 26, y + 12, 16, 3);
  ctx.fillRect(x + 44, y + 12, 6, 2);
}

function drawDino(ctx, x, ground, dinoY, ducking, legFrame, dead) {
  if (ducking) {
    const width = DUCK_W;
    const height = DUCK_H;
    const top = ground - dinoY - height;
    const sx = width / 96;
    const sy = height / 40;

    const rect = (px, py, pw, ph, color = COLORS.dino) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + px * sx, top + py * sy, pw * sx, ph * sy);
    };

    rect(0, 24, 14, 7, COLORS.dinoDark);
    rect(10, 18, 18, 9);
    rect(24, 14, 46, 15);
    rect(34, 26, 30, 4, COLORS.dinoDark);
    rect(58, 6, 24, 13);
    rect(72, 15, 24, 7);
    rect(92, 21, 4, 3);
    rect(68, 9, 6, 6, dead ? COLORS.deadEye : COLORS.eye);
    rect(64, 20, 10, 3, COLORS.dinoDark);
    rect(30, 29, 8, 9);
    rect(26, 36, 15, 4, COLORS.dinoDark);
    rect(50, 29, 8, 9);
    rect(48, 36, 15, 4, COLORS.dinoDark);
    return;
  }

  const width = DINO_W;
  const height = DINO_H;
  const top = ground - dinoY - height;
  const sx = width / 96;
  const sy = height / 72;

  const rect = (px, py, pw, ph, color = COLORS.dino) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + px * sx, top + py * sy, pw * sx, ph * sy);
  };

  rect(0, 46, 12, 8, COLORS.dinoDark);
  rect(8, 40, 14, 10);
  rect(18, 34, 12, 12);
  rect(24, 30, 40, 20);
  rect(28, 46, 34, 6, COLORS.dinoDark);
  rect(30, 24, 7, 7, COLORS.dinoDark);
  rect(39, 21, 7, 10, COLORS.dinoDark);
  rect(48, 25, 6, 6, COLORS.dinoDark);
  rect(50, 16, 14, 18);
  rect(58, 2, 26, 18);
  rect(66, 14, 26, 10);
  rect(82, 22, 10, 6);
  rect(56, 38, 13, 4);
  rect(66, 42, 6, 4);
  rect(36, 36, 20, 3, "#86efac");
  rect(72, 7, 7, 7, dead ? COLORS.deadEye : COLORS.eye);

  if (legFrame === 0) {
    rect(30, 50, 9, 16);
    rect(26, 64, 18, 8, COLORS.dinoDark);
    rect(48, 50, 9, 13);
    rect(44, 62, 16, 6, COLORS.dinoDark);
  } else {
    rect(30, 50, 9, 13);
    rect(26, 62, 16, 6, COLORS.dinoDark);
    rect(48, 50, 9, 16);
    rect(44, 64, 18, 8, COLORS.dinoDark);
  }
}

function drawParticles(ctx, world) {
  for (const particle of world.particles) {
    ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.fillRect(
      Math.round(particle.x),
      Math.round(particle.y),
      particle.size,
      particle.size
    );
  }
  ctx.globalAlpha = 1;
}

function drawScene(ctx, world, status) {
  const { w, h, ground } = world;

  const sky = ctx.createLinearGradient(0, 0, 0, ground);
  sky.addColorStop(0, "#060b16");
  sky.addColorStop(0.62, "#081426");
  sky.addColorStop(1, "#0a1a2e");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, ground);

  drawStars(ctx, world);
  drawMoon(ctx, world);
  drawSkyline(ctx, world);
  drawClouds(ctx, world);

  const shakeX = world.shake ? Math.sin(world.time * 72) * world.shake * 0.4 : 0;
  const shakeY = world.shake ? Math.cos(world.time * 63) * world.shake * 0.3 : 0;

  ctx.save();
  ctx.translate(shakeX, shakeY);

  drawGround(ctx, world);

  for (const obstacle of world.obstacles) {
    if (obstacle.type === "cactus") {
      drawCactus(ctx, obstacle);
    } else {
      drawBird(ctx, obstacle);
    }
  }

  drawDino(
    ctx,
    DINO_X,
    world.ground,
    world.dinoY,
    world.ducking,
    world.legFrame,
    status === "over"
  );

  drawParticles(ctx, world);
  ctx.restore();

  if (world.pointsFlash > 0) {
    ctx.globalAlpha = Math.min(1, world.pointsFlash);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "14px 'Press Start 2P', monospace";
    ctx.textAlign = "right";
    ctx.fillText("+100", w - 90, 104);
    ctx.textAlign = "left";
    ctx.globalAlpha = 1;
  }

  if (world.flash > 0) {
    ctx.fillStyle = `rgba(251, 113, 133, ${world.flash * 0.18})`;
    ctx.fillRect(0, 0, w, h);
  }

  const vignette = ctx.createRadialGradient(
    w / 2,
    h / 2,
    Math.min(w, h) * 0.25,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.75
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

/* ---------- component ---------- */

export default function DinoRunner({ navigate }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  const sizeRef = useRef({ w: 800, h: 380 });
  const statusRef = useRef("idle");
  const highRef = useRef(readHighScore());

  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(() => readHighScore());
  const [isRecord, setIsRecord] = useState(false);
  const [muted, setMuted] = useState(isMuted);

  const endRef = useRef(null);

  useEffect(() => subscribeMuted(() => setMuted(isMuted())), []);

  const startGame = useCallback(() => {
    const { w, h } = sizeRef.current;
    worldRef.current = createWorld(w || 800, h || 380);
    statusRef.current = "running";
    setStatus("running");
    setScore(0);
    setIsRecord(false);
    sfx.start();
  }, []);

  const endGame = useCallback(() => {
    if (statusRef.current !== "running") return;
    const world = worldRef.current;
    if (!world) return;

    const finalScore = Math.floor(world.distance / 12);
    statusRef.current = "over";
    setStatus("over");
    setScore(finalScore);

    if (finalScore > highRef.current) {
      highRef.current = finalScore;
      setHigh(finalScore);
      setIsRecord(true);
      try {
        localStorage.setItem(HIGH_KEY, String(finalScore));
      } catch {
        /* storage can be unavailable */
      }
    }

    sfx.hit();
    sfx.gameover();
  }, []);

  useEffect(() => {
    endRef.current = endGame;
  }, [endGame]);

  const jump = useCallback(() => {
    if (statusRef.current === "idle" || statusRef.current === "over") {
      startGame();
      return;
    }

    const world = worldRef.current;
    if (!world || statusRef.current !== "running") return;

    if (world.dinoY <= 0.5) {
      world.dinoVy = JUMP_V;
      world.dinoY = 0.6;
      world.ducking = false;
      spawnParticles(world, DINO_X + 16, world.ground - 4, 5, [
        "#a3e635",
        "#65a30d",
      ]);
      sfx.jump();
    }
  }, [startGame]);

  const setDuck = useCallback((value) => {
    const world = worldRef.current;
    if (!world || statusRef.current !== "running") return;
    world.ducking = value;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(320, Math.round(rect.width));
      const h = Math.max(240, Math.round(rect.height));

      sizeRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
      }

      if (!worldRef.current || statusRef.current === "idle") {
        worldRef.current = createWorld(w, h);
      } else {
        const world = worldRef.current;
        world.w = w;
        world.h = h;
        world.ground = Math.max(220, h - GROUND_MARGIN);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let raf = 0;
    let last = performance.now();
    let lastUi = 0;

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const world = worldRef.current;
      if (world) {
        if (statusRef.current === "running") {
          updateWorld(world, dt);

          if (world.dead) {
            endRef.current();
          }

          if (now - lastUi > 100) {
            lastUi = now;
            setScore(Math.floor(world.distance / 12));
          }
        } else if (statusRef.current === "over") {
          world.time += dt;
          world.shake = Math.max(0, world.shake - dt * 46);
          world.flash = Math.max(0, world.flash - dt * 2.4);
          if (world.dinoY > 0 || world.dinoVy > 0) {
            world.dinoVy -= GRAVITY * dt;
            world.dinoY += world.dinoVy * dt;
            if (world.dinoY <= 0) {
              world.dinoY = 0;
              world.dinoVy = 0;
            }
          }
          updateParticles(world, dt);
        } else {
          world.time += dt;
          for (const cloud of world.clouds) {
            cloud.x -= cloud.speed * 0.35 * dt;
            if (cloud.x < -cloud.w) {
              cloud.x = world.w + cloud.w;
            }
          }
          updateParticles(world, dt);
        }

        drawScene(ctx, world, statusRef.current);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const isField = (element) =>
      element instanceof Element &&
      (element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT" ||
        element.isContentEditable);

    const onKeyDown = (event) => {
      if (isField(event.target)) return;
      const key = event.key.toLowerCase();

      if (key === " " || key === "arrowup" || key === "w") {
        const interactive =
          event.target instanceof Element &&
          event.target.closest(
            "a, button:not(.game-control-btn):not(.pad-btn)"
          );
        if (key === " " && interactive) return;
        event.preventDefault();
        jump();
      } else if (key === "arrowdown" || key === "s") {
        event.preventDefault();
        setDuck(true);
      }
    };

    const onKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (key === "arrowdown" || key === "s") {
        setDuck(false);
      }
    };

    const onBlur = () => setDuck(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [jump, setDuck]);

  const handleStageClick = () => {
    if (statusRef.current === "running") {
      jump();
    } else {
      startGame();
    }
  };

  const liveBest = Math.max(high, score);

  return (
    <div className="game-shell pixel-panel">
      <div className="flex items-center justify-between gap-3 border-b-2 border-line bg-void/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="blink h-2 w-2 bg-rose-400" />
          <span className="font-pixel text-[0.38rem] tracking-[0.12em] text-slate-400">
            DINO_RUNNER.EXE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden font-pixel text-[0.3rem] tracking-[0.1em] text-slate-600 sm:block">
            AUTO-SCROLL
          </span>
          <button
            type="button"
            onClick={toggleMuted}
            className="border border-line bg-panel/80 px-2 py-1 font-pixel text-[0.34rem] text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
            aria-label={muted ? "Unmute game audio" : "Mute game audio"}
            aria-pressed={muted}
          >
            SFX {muted ? "OFF" : "ON"}
          </button>
        </div>
      </div>

      <div ref={stageRef} className="game-stage" onClick={handleStageClick}>
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label="Endless runner game. Press space, up arrow, or tap to jump. Press down arrow to duck."
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 md:p-4">
          <div className="game-hud text-left">
            <span className="game-hud__label">SCORE</span>
            <span className="game-hud__value">
              {String(score).padStart(5, "0")}
            </span>
          </div>

          <div className="game-hud">
            <span className="game-hud__label">HI-SCORE</span>
            <span className="game-hud__value game-hud__value--lime">
              {String(liveBest).padStart(5, "0")}
            </span>
          </div>
        </div>

        {status === "idle" ? (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center p-4">
            <div
              className="pointer-events-auto pixel-panel max-h-full max-w-lg overflow-y-auto bg-void/90 p-5 text-center md:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="section-kicker !text-[0.44rem] text-lime-300">
                Arcade Mode
              </p>
              <h2 className="mt-4 font-pixel text-base text-lime-300 lime-text md:text-lg">
                DINO RUNNER
              </h2>
              <p className="mt-4 font-terminal text-lg leading-snug text-slate-300">
                Auto-run through the neon wasteland. Jump the cacti, duck under
                the pterodactyls, and chase your best score.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="game-key">
                  SPACE / W / &uarr; <span className="text-lime-300">JUMP</span>
                </span>
                <span className="game-key">
                  &darr; / S <span className="text-cyan-300">DUCK</span>
                </span>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  startGame();
                }}
                className="pixel-btn pixel-btn--lime mt-6"
              >
                <span className="text-[0.6rem]">&#9654;</span> Insert Coin — Start
              </button>

              <p className="mt-4 font-pixel text-[0.32rem] tracking-[0.1em] text-slate-500">
                HI-SCORE {String(high).padStart(5, "0")}
              </p>
            </div>
          </div>
        ) : null}

        {status === "over" ? (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center p-4">
            <div
              className="pointer-events-auto pixel-panel max-h-full max-w-md overflow-y-auto bg-void/95 p-5 text-center md:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="section-kicker !text-[0.44rem] text-rose-300">
                Signal Lost
              </p>
              <h2 className="mt-3 font-pixel text-lg text-rose-300 md:text-xl">
                GAME OVER
              </h2>

              {isRecord ? (
                <p className="blink mt-3 font-pixel text-[0.44rem] text-amber-300">
                  NEW HIGH SCORE!
                </p>
              ) : null}

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="stat-tile">
                  <p className="stat-tile__value !text-cyan-300">
                    {String(score).padStart(5, "0")}
                  </p>
                  <p className="stat-tile__label">Score</p>
                </div>
                <div className="stat-tile">
                  <p className="stat-tile__value">
                    {String(high).padStart(5, "0")}
                  </p>
                  <p className="stat-tile__label">Best</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    startGame();
                  }}
                  className="pixel-btn pixel-btn--lime pixel-btn--sm"
                >
                  Retry
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    sfx.select();
                    navigate("/projects");
                  }}
                  className="pixel-btn pixel-btn--ghost pixel-btn--sm"
                >
                  View Projects
                </button>
              </div>

              <p className="mt-4 font-pixel text-[0.3rem] tracking-[0.08em] text-slate-500">
                PRESS SPACE TO RETRY
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t-2 border-line p-3 md:p-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="game-control-btn game-control-btn--jump"
            onPointerDown={(event) => {
              event.preventDefault();
              jump();
            }}
            aria-label="Jump"
          >
            <span className="text-[0.65rem]">&uarr;</span> JUMP
          </button>
          <button
            type="button"
            className="game-control-btn game-control-btn--duck"
            onPointerDown={(event) => {
              event.preventDefault();
              setDuck(true);
            }}
            onPointerUp={() => setDuck(false)}
            onPointerLeave={() => setDuck(false)}
            onPointerCancel={() => setDuck(false)}
            aria-label="Duck"
          >
            <span className="text-[0.65rem]">&darr;</span> DUCK
          </button>
        </div>

        <p className="mt-3 font-terminal text-base leading-snug text-slate-500">
          <span className="text-lime-300">TIP:</span> pterodactyls fly at three
          heights. Duck for the middle lane, jump for the low lane, and run under
          the high lane.
        </p>
      </div>
    </div>
  );
}
