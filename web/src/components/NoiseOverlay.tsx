export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-20"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="presentation"
      >
        <filter id="app-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.95"
            numOctaves="3"
            seed="21"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="saturate"
            values="0"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#app-noise-filter)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
