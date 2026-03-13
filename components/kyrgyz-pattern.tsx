"use client";

/**
 * KyrgyzLogo - Circular felt cloth (kiyiz) badge with painted mountains & river.
 *
 * Design concept:
 *   A round piece of traditional Kyrgyz felt decorated with a mountain-and-river
 *   landscape, surrounded by an ornamental red border with gold embroidery dots
 *   and ram-horn motifs. The tunduk crown sits at the top like a brooch.
 */
export function KyrgyzLogo({
  className = "",
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  // Unique prefix so multiple logos on the same page don't collide
  const p = `kl-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kyrgyz Memory logo"
    >
      {/* ---------- DEFS ---------- */}
      <defs>
        {/* Felt-texture radial (warm ivory centre -> sand edge) */}
        <radialGradient id={`${p}-felt`} cx="50%" cy="42%" r="52%">
          <stop offset="0%" stopColor="#FEF9EF" />
          <stop offset="55%" stopColor="#FDE68A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F3E0C6" />
        </radialGradient>

        {/* Sky */}
        <linearGradient id={`${p}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E7490" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.08" />
        </linearGradient>

        {/* Far mountain range */}
        <linearGradient id={`${p}-mf`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B7FA3" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Near mountain range */}
        <linearGradient id={`${p}-mn`} x1="-10" y1="-10" x2="-10" y2="-10">
          <stop offset="0%" stopColor="#3E526B" />
          <stop offset="100%" stopColor="#5B7291" />
        </linearGradient>

        {/* River */}
        <linearGradient id={`${p}-rv`} x1="0" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.65" />
        </linearGradient>

        {/* Meadow */}
        <linearGradient id={`${p}-md`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
        </linearGradient>

        {/* Red ring */}
        <linearGradient id={`${p}-rr`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        {/* Circular clip for the inner scene */}
        <clipPath id={`${p}-c`}>
          <circle cx="100" cy="100" r="74" />
        </clipPath>

        {/* Fabric stitching texture (tiny diagonal lines) */}
        <pattern
          id={`${p}-stitch`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="#C6A96C" strokeWidth="0.4" opacity="0.18" />
        </pattern>
      </defs>

      {/* ---------- OUTER SHADOW ---------- */}
      <circle cx="100" cy="103" r="96" fill="black" opacity="0.07" />

      {/* ---------- OUTER RED FELT RING ---------- */}
      <circle cx="100" cy="100" r="96" fill={`url(#${p}-rr)`} />

      {/* Gold outer trim */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="#DAA520" strokeWidth="2" opacity="0.6" />

      {/* Gold ornamental dots (like embroidery beads) */}
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i * 11.25 * Math.PI) / 180;
        return (
          <circle
            key={`od-${i}`}
            cx={100 + 90 * Math.cos(a)}
            cy={100 + 90 * Math.sin(a)}
            r={i % 4 === 0 ? 2 : 1.2}
            fill="#FCD34D"
            opacity={i % 4 === 0 ? 0.85 : 0.55}
          />
        );
      })}

      {/* Ram-horn ornaments around the ring (8 positions) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = ((i * 45 + 22.5) * Math.PI) / 180;
        const cx = 100 + 84 * Math.cos(a);
        const cy = 100 + 84 * Math.sin(a);
        const rot = i * 45 + 22.5;
        return (
          <g key={`rh-${i}`} transform={`rotate(${rot} ${cx} ${cy})`}>
            {/* Simplified ram-horn double spiral */}
            <path
              d={`M${cx - 5},${cy} C${cx - 5},${cy - 5} ${cx},${cy - 6} ${cx},${cy - 2}
                  C${cx},${cy + 2} ${cx + 5},${cy - 6} ${cx + 5},${cy}`}
              fill="none"
              stroke="#FCD34D"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        );
      })}

      {/* Inner gold trim ring */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#DAA520" strokeWidth="1.8" opacity="0.55" />

      {/* ---------- INNER FELT DISC ---------- */}
      <circle cx="100" cy="100" r="74" fill={`url(#${p}-felt)`} />
      {/* Stitching texture overlay */}
      <circle cx="100" cy="100" r="74" fill={`url(#${p}-stitch)`} />

      {/* ---------- LANDSCAPE SCENE (clipped) ---------- */}
      <g clipPath={`url(#${p}-c)`}>
        {/* Sky fill */}
        <rect x="26" y="26" width="148" height="148" fill={`url(#${p}-sky)`} />

        {/* ---- SUN ---- */}
        <circle cx="150" cy="48" r="18" fill="#FDE68A" opacity="0.18" />
        <circle cx="150" cy="48" r="11" fill="#FBBF24" opacity="0.5" />
        <circle cx="150" cy="48" r="6" fill="#FCD34D" opacity="0.85" />
        {/* rays */}
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * 36 * Math.PI) / 180;
          return (
            <line
              key={`sr-${i}`}
              x1={150 + 8 * Math.cos(a)}
              y1={48 + 8 * Math.sin(a)}
              x2={150 + 15 * Math.cos(a)}
              y2={48 + 15 * Math.sin(a)}
              stroke="#FBBF24"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.3"
            />
          );
        })}

        {/* ---- FAR MOUNTAINS ---- */}
        <path
          d="M26 112 L42 80 L55 92 L72 60 L86 76 L100 50 L114 70 L132 42 L148 62 L162 52 L174 82 L174 128 L26 128Z"
          fill={`url(#${p}-mf)`}
          opacity="0.4"
        />
        {/* Snow caps far */}
        <path d="M100 50 L91 66 L109 66Z" fill="white" opacity="0.8" />
        <path d="M132 42 L123 58 L141 58Z" fill="white" opacity="0.85" />
        <path d="M72 60 L65 73 L79 73Z" fill="white" opacity="0.65" />

        {/* ---- NEAR MOUNTAINS ---- */}
        <path
          d="M26 130 L40 106 L52 116 L68 90 L82 105 L98 82 L112 98 L126 80 L142 94 L156 82 L170 102 L174 112 L174 148 L26 148Z"
          fill={`url(#${p}-mn)`}
          opacity="0.6"
        />
        {/* Snow caps near */}
        <path d="M98 82 L90 96 L106 96Z" fill="white" opacity="0.9" />
        <path d="M126 80 L118 94 L134 94Z" fill="white" opacity="0.85" />
        <path d="M68 90 L61 103 L75 103Z" fill="white" opacity="0.7" />

        {/* ---- GREEN MEADOW VALLEY ---- */}
        <path
          d="M26 128 Q62 120, 100 124 Q138 128, 174 122 L174 180 L26 180Z"
          fill={`url(#${p}-md)`}
        />
        {/* Grass texture */}
        {[34, 52, 70, 88, 108, 126, 144, 160].map((x, i) => (
          <circle key={`g-${i}`} cx={x} cy={136 + (i % 3) * 4} r="0.8" fill="#059669" opacity="0.22" />
        ))}

        {/* ---- WINDING RIVER ---- */}
        <path
          d="M106 82 C92 100, 118 112, 104 128 C90 144, 110 156, 96 174"
          stroke={`url(#${p}-rv)`}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* River water highlights */}
        <path
          d="M108 84 C94 102, 120 112, 106 128 C92 142, 112 154, 98 170"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        {/* Shimmer dots */}
        <circle cx="107" cy="95" r="1.2" fill="white" opacity="0.5" />
        <circle cx="114" cy="118" r="1.4" fill="white" opacity="0.4" />
        <circle cx="100" cy="140" r="1" fill="white" opacity="0.45" />
        <circle cx="108" cy="160" r="1.3" fill="white" opacity="0.35" />

        {/* ---- BIRDS / EAGLES ---- */}
        <path d="M52 48 Q56 43, 60 48 Q64 43, 68 48" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M76 38 Q79 34, 82 38 Q85 34, 88 38" stroke="#334155" strokeWidth="0.9" fill="none" opacity="0.25" />
        <path d="M42 60 Q44 57, 46 60 Q48 57, 50 60" stroke="#334155" strokeWidth="0.7" fill="none" opacity="0.2" />
      </g>

      {/* ---- INNER CIRCLE EDGE SHADOW ---- */}
      <circle cx="100" cy="100" r="74" fill="none" stroke="black" strokeWidth="1.5" opacity="0.06" />

      {/* ---------- TUNDUK CROWN BROOCH (top center) ---------- */}
      <g transform="translate(100, 16)">
        {/* Gold disc */}
        <circle r="12" fill="#DAA520" />
        <circle r="12" fill="none" stroke="#B8860B" strokeWidth="0.8" />
        {/* Inner cream ring */}
        <circle r="8.5" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
        {/* Red centre */}
        <circle r="4" fill="#B91C1C" />
        {/* Tunduk spokes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={`tk-${i}`}
              x1={4 * Math.cos(a)}
              y1={4 * Math.sin(a)}
              x2={8.5 * Math.cos(a)}
              y2={8.5 * Math.sin(a)}
              stroke="#FEF3C7"
              strokeWidth="1.2"
            />
          );
        })}
      </g>
    </svg>
  );
}

/**
 * TundukIcon -- Small icon used on card backs and UI details.
 */
export function TundukIcon({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="15" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 15 * Math.cos(a)}
            y1={50 + 15 * Math.sin(a)}
            x2={50 + 35 * Math.cos(a)}
            y2={50 + 35 * Math.sin(a)}
            stroke="currentColor"
            strokeWidth="3"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = ((i * 45 + 22.5) * Math.PI) / 180;
        return (
          <line
            key={`s-${i}`}
            x1={50 + 15 * Math.cos(a)}
            y1={50 + 15 * Math.sin(a)}
            x2={50 + 30 * Math.cos(a)}
            y2={50 + 30 * Math.sin(a)}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

/**
 * DecorativeBorder - Kyrgyz ornamental wave border.
 */
export function DecorativeBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="w-full h-4"
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M0 10 Q 25 20, 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
