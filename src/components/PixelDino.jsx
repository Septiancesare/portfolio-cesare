export default function PixelDino({ className = "", running = false }) {
  return (
    <svg
      viewBox="0 0 96 72"
      className={`dino-sprite ${running ? "is-running" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <g fill="currentColor">
        <rect x="0" y="46" width="12" height="8" />
        <rect x="8" y="40" width="14" height="10" />
        <rect x="18" y="34" width="12" height="12" />
        <rect x="24" y="30" width="40" height="20" />
        <rect x="28" y="46" width="34" height="6" />
        <rect x="30" y="24" width="7" height="7" />
        <rect x="39" y="21" width="7" height="10" />
        <rect x="48" y="25" width="6" height="6" />
        <rect x="50" y="16" width="14" height="18" />
        <rect x="58" y="2" width="26" height="18" />
        <rect x="66" y="14" width="26" height="10" />
        <rect x="82" y="22" width="10" height="6" />
        <rect x="56" y="38" width="13" height="4" />
        <rect x="66" y="42" width="6" height="4" />
      </g>
      <rect x="72" y="7" width="7" height="7" fill="#05070d" />
      <rect x="58" y="32" width="10" height="3" fill="rgba(5,7,13,0.28)" />
      <g className="dino-leg dino-leg--a" fill="currentColor">
        <rect x="30" y="50" width="9" height="16" />
        <rect x="26" y="64" width="18" height="8" />
      </g>
      <g className="dino-leg dino-leg--b" fill="currentColor">
        <rect x="48" y="50" width="9" height="16" />
        <rect x="44" y="64" width="18" height="8" />
      </g>
    </svg>
  );
}
