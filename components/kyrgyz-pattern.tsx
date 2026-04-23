"use client";

/**
 * KyrgyzLogo - Circular felt badge with Kyrgyz landscape
 * Design: Red ornamental ring, mountains, HORIZONTAL river, Tunduk crown
 */
export function KyrgyzLogo({
  className = "",
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
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
      <defs>
        {/* Felt background */}
        <radialGradient id="km-felt" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </radialGradient>

        {/* Sky */}
        <linearGradient id="km-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        {/* Far mountains */}
        <linearGradient id="km-mfar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Near mountains */}
        <linearGradient id="km-mnear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Meadow */}
        <linearGradient id="km-meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* River - horizontal blue */}
        <linearGradient id="km-river" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Red border */}
        <linearGradient id="km-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Tunduk gold */}
        <radialGradient id="km-tunduk" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>

        <clipPath id="km-clip">
          <circle cx="100" cy="100" r="74" />
        </clipPath>
      </defs>

      {/* Shadow */}
      <circle cx="100" cy="104" r="96" fill="black" opacity="0.1" />

      {/* Outer red ring */}
      <circle cx="100" cy="100" r="96" fill="url(#km-ring)" />
      <circle cx="100" cy="100" r="96" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.6" />

      {/* Gold ornaments on ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180 - Math.PI / 2;
        const cx = 100 + 85 * Math.cos(angle);
        const cy = 100 + 85 * Math.sin(angle);
        return (
          <g key={`orn-${i}`}>
            <circle cx={cx} cy={cy} r="4" fill="#FCD34D" opacity="0.85" />
            <circle cx={cx} cy={cy} r="2" fill="#F59E0B" opacity="0.9" />
          </g>
        );
      })}

      {/* Inner gold border */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#F59E0B" strokeWidth="2.5" opacity="0.7" />

      {/* Inner felt disc */}
      <circle cx="100" cy="100" r="74" fill="url(#km-felt)" />

      {/* Landscape clipped inside */}
      <g clipPath="url(#km-clip)">
        {/* Sky */}
        <rect x="26" y="26" width="148" height="148" fill="url(#km-sky)" />

        {/* Sun */}
        <circle cx="145" cy="50" r="16" fill="#FEF9C3" opacity="0.9" />
        <circle cx="145" cy="50" r="11" fill="#FDE68A" />
        <circle cx="145" cy="50" r="7" fill="#FBBF24" />

        {/* Far mountains (lighter) */}
        <path
          d="M26 115 L42 85 L58 100 L74 70 L90 90 L106 60 L122 80 L138 55 L154 75 L170 65 L174 95 L174 130 L26 130Z"
          fill="url(#km-mfar)"
          opacity="0.5"
        />
        {/* Snow caps far */}
        <path d="M74 70 L66 85 L82 85Z" fill="white" opacity="0.9" />
        <path d="M106 60 L97 77 L115 77Z" fill="white" opacity="0.95" />
        <path d="M138 55 L128 72 L148 72Z" fill="white" opacity="0.9" />

        {/* Near mountains (darker) */}
        <path
          d="M26 140 L40 110 L56 122 L72 95 L88 112 L104 85 L120 105 L136 80 L152 100 L168 88 L174 110 L174 155 L26 155Z"
          fill="url(#km-mnear)"
          opacity="0.75"
        />
        {/* Snow caps near */}
        <path d="M72 95 L63 110 L81 110Z" fill="white" opacity="0.95" />
        <path d="M104 85 L94 102 L114 102Z" fill="white" opacity="0.98" />
        <path d="M136 80 L126 96 L146 96Z" fill="white" opacity="0.95" />

        {/* Green meadow */}
        <path
          d="M26 138 Q60 132, 100 136 Q140 140, 174 134 L174 175 L26 175Z"
          fill="url(#km-meadow)"
          opacity="0.85"
        />

        {/* === HORIZONTAL RIVER (flowing left to right) === */}
        <path
          d="M26 145 Q50 138, 75 145 Q100 152, 125 145 Q150 138, 174 145"
          stroke="url(#km-river)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* River highlight */}
        <path
          d="M30 143 Q55 136, 80 143 Q105 150, 130 143 Q155 136, 174 143"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Shimmer dots on river */}
        <circle cx="50" cy="143" r="2" fill="white" opacity="0.7" />
        <circle cx="90" cy="148" r="2.5" fill="white" opacity="0.6" />
        <circle cx="130" cy="143" r="2" fill="white" opacity="0.65" />
        <circle cx="160" cy="145" r="1.8" fill="white" opacity="0.5" />

        {/* Birds (eagles) */}
        <path d="M50 55 Q54 50, 58 55 Q62 50, 66 55" stroke="#1E3A5F" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M70 45 Q73 41, 76 45 Q79 41, 82 45" stroke="#1E3A5F" strokeWidth="1.2" fill="none" opacity="0.4" />

        {/* Small yurt on meadow */}
        <g transform="translate(48, 125)">
          <ellipse cx="12" cy="8" rx="14" ry="7" fill="#FAF5FF" opacity="0.9" />
          <path d="M0 8 Q12 -2, 24 8Z" fill="white" />
          <ellipse cx="12" cy="2" rx="4" ry="2" fill="#D97706" opacity="0.8" />
          <rect x="10" y="5" width="4" height="5" fill="#78716C" opacity="0.6" />
        </g>
      </g>

      {/* Inner border */}
      <circle cx="100" cy="100" r="74" fill="none" stroke="#1E293B" strokeWidth="1" opacity="0.1" />

      {/* === TUNDUK BROOCH (top) === */}
      <g transform="translate(100, 18)">
        <circle r="14" fill="url(#km-tunduk)" />
        <circle r="14" fill="none" stroke="#92400E" strokeWidth="1.2" />
        <circle r="10" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
        <circle r="5" fill="#DC2626" />
        <circle r="5" fill="none" stroke="#B91C1C" strokeWidth="0.6" />
        {/* Main spokes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={`sp-${i}`}
              x1={5 * Math.cos(a)} y1={5 * Math.sin(a)}
              x2={10 * Math.cos(a)} y2={10 * Math.sin(a)}
              stroke="white" strokeWidth="1.8" strokeLinecap="round"
            />
          );
        })}
        {/* Half spokes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = ((i * 45 + 22.5) * Math.PI) / 180;
          return (
            <line
              key={`sh-${i}`}
              x1={5 * Math.cos(a)} y1={5 * Math.sin(a)}
              x2={8 * Math.cos(a)} y2={8 * Math.sin(a)}
              stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
            />
          );
        })}
        <circle r="1.8" fill="#FDE68A" />
      </g>
    </svg>
  );
}

/**
 * TundukIcon - small icon for card backs
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
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="50" cy="50" r="14" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 14 * Math.cos(a)} y1={50 + 14 * Math.sin(a)}
            x2={50 + 32 * Math.cos(a)} y2={50 + 32 * Math.sin(a)}
            stroke="currentColor" strokeWidth="3"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = ((i * 45 + 22.5) * Math.PI) / 180;
        return (
          <line
            key={`s-${i}`}
            x1={50 + 14 * Math.cos(a)} y1={50 + 14 * Math.sin(a)}
            x2={50 + 26 * Math.cos(a)} y2={50 + 26 * Math.sin(a)}
            stroke="currentColor" strokeWidth="2" opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

/**
 * DecorativeBorder - wavy Kyrgyz ornament divider
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
          stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"
        />
        <path
          d="M0 10 Q 25 20, 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10"
          stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"
        />
      </svg>
    </div>
  );
}
