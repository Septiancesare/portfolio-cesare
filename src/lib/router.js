import { useCallback, useEffect, useState } from "react";

export const ROUTES = [
  "/",
  "/play",
  "/about",
  "/academic",
  "/skills",
  "/projects",
];

function normalize(hash) {
  const raw = String(hash || "").replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  const clean = raw.startsWith("/") ? raw : `/${raw}`;
  return ROUTES.includes(clean) ? clean : "/";
}

export function useHashRoute() {
  const [route, setRoute] = useState(() =>
    typeof window === "undefined" ? "/" : normalize(window.location.hash)
  );

  useEffect(() => {
    const onChange = () => {
      const next = normalize(window.location.hash);
      setRoute(next);
      if (window.location.hash !== `#${next}`) {
        window.history.replaceState(null, "", `#${next}`);
      }
    };

    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to) => {
    const next = ROUTES.includes(to) ? to : "/";
    if (next === normalize(window.location.hash)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = next;
  }, []);

  return [route, navigate];
}
