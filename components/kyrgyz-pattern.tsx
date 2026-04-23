"use client";

/**
 * KyrgyzLogo — круглый кыргызский платок (орнаментальная рамка + горы + река).
 *
 * Дизайн:
 *  • Внешнее кольцо — красный бордюр с золотым орнаментом (ромбы + точки)
 *  • Внутри — небо, заснеженные горы Тянь-Шаня, зелёная долина, синяя река
 *  • Тундук-брошь наверху (символ на флаге КР)
 *  • Без случайных id — используем статичный уникальный prefix
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
        <radialGradient id="km-felt" cx="50%" cy="45%" r="55%">
          <stop offset="0%"   stopColor="#FFFBEF" />
          <stop offset="70%"  stopColor="#FEF3C7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.3" />
        </radialGradient>

        {/* Sky gradient */}
        <linearGradient id="km-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1E40AF" stopOpacity="0.5" />
          <stop offset="50%"  stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.1" />
        </linearGradient>

        {/* Far mountains */}
        <linearGradient id="km-mfar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Near mountains */}
        <linearGradient id="km-mnear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#334155" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Meadow */}
        <linearGradient id="km-meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4ADE80" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#16A34A" stopOpacity="0.5" />
        </linearGradient>

        {/* River */}
        <linearGradient id="km-river" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.75" />
        </linearGradient>

        {/* Red border ring */}
        <linearGradient id="km-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Tunduk gold */}
        <radialGradient id="km-tunduk-gold" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>

        {/* Clip to circle */}
        <clipPath id="km-clip">
          <circle cx="100" cy="100" r="76" />
        </clipPath>
      </defs>

      {/* ── DROP SHADOW ── */}
      <circle cx="100" cy="104" r="94" fill="black" opacity="0.12" />

      {/* ── OUTER RED RING ── */}
      <circle cx="100" cy="100" r="94" fill="url(#km-ring)" />

      {/* Gold outer edge */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="#F59E0B" strokeWidth="2.5" opacity="0.7" />
      <circle cx="100" cy="100" r="89" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.4" />

      {/* ── GOLD ORNAMENTAL PATTERN on red ring ── */}
      {/* Diamonds at 12 positions */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 100 + 83 * Math.cos(angle - Math.PI / 2);
        const cy = 100 + 83 * Math.sin(angle - Math.PI / 2);
        return (
          <g key={`dia-${i}`} transform={`translate(${cx},${cy}) rotate(${i * 30})`}>
            <path d="M0,-4 L3,0 0,4 -3,0Z" fill="#FCD34D" opacity="0.85" />
          </g>
        );
      })}
      {/* Small dots between diamonds */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = ((i * 15 + 7.5) * Math.PI) / 180 - Math.PI / 2;
        const cx = 100 + 83 * Math.cos(angle);
        const cy = 100 + 83 * Math.sin(angle);
        return (
          <circle key={`dot-${i}`} cx={cx} cy={cy} r="1.5" fill="#FCD34D" opacity="0.55" />
        );
      })}

      {/* Traditional ram-horn (kazak-göz) motifs at 4 corners */}
      {[0, 90, 180, 270].map((deg) => {
        const a = (deg * Math.PI) / 180 - Math.PI / 2;
        const cx = 100 + 83 * Math.cos(a);
        const cy = 100 + 83 * Math.sin(a);
        return (
          <g key={`rh-${deg}`} transform={`translate(${cx},${cy}) rotate(${deg})`}>
            <path
              d="M-5,0 C-5,-6 0,-8 2,-4 C4,0 0,4 -2,2 C-4,0 -3,-3 0,-3 C3,-3 4,0 2,3"
              stroke="#FCD34D"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </g>
        );
      })}

      {/* Inner gold divider ring */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="100" r="77" fill="none" stroke="#FDE68A" strokeWidth="0.8" opacity="0.5" />

      {/* ── INNER FELT DISC ── */}
      <circle cx="100" cy="100" r="76" fill="url(#km-felt)" />

      {/* ── LANDSCAPE SCENE (clipped inside circle) ── */}
      <g clipPath="url(#km-clip)">

        {/* Sky */}
        <rect x="24" y="24" width="152" height="152" fill="url(#km-sky)" />

        {/* Sun */}
        <circle cx="148" cy="46" r="20" fill="#FEF9C3" opacity="0.15" />
        <circle cx="148" cy="46" r="12" fill="#FDE68A" opacity="0.45" />
        <circle cx="148" cy="46" r="7"  fill="#FCD34D" opacity="0.9"  />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={`sun-${i}`}
              x1={148 + 9  * Math.cos(a)} y1={46 + 9  * Math.sin(a)}
              x2={148 + 17 * Math.cos(a)} y2={46 + 17 * Math.sin(a)}
              stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"
            />
          );
        })}

        {/* ── FAR MOUNTAINS (lighter, behind) ── */}
        <path
          d="M24 118
             L38  88 L48  98 L60  72 L74  86
             L88  58 L100 72
             L112 56 L126 70
             L138 48 L152 68
             L166 54 L176 78
             L176 130 L24 130Z"
          fill="url(#km-mfar)"
          opacity="0.45"
        />
        {/* Snow caps far */}
        <path d="M88 58  L80 72  L96 72Z"  fill="white" opacity="0.85" />
        <path d="M112 56 L104 70 L120 70Z" fill="white" opacity="0.9"  />
        <path d="M138 48 L129 63 L147 63Z" fill="white" opacity="0.88" />
        <path d="M60 72  L53 84  L67 84Z"  fill="white" opacity="0.6"  />

        {/* ── NEAR MOUNTAINS (darker, front) ── */}
        <path
          d="M24 138
             L34 116 L44 124 L56 104 L68 116
             L80 94  L92 108
             L104 88 L116 102
             L128 84 L140 96
             L152 78 L164 94
             L176 86 L176 148 L24 148Z"
          fill="url(#km-mnear)"
          opacity="0.7"
        />
        {/* Snow caps near */}
        <path d="M80  94 L72 108 L88 108Z"  fill="white" opacity="0.95" />
        <path d="M104 88 L96 102 L112 102Z" fill="white" opacity="0.9"  />
        <path d="M128 84 L120 97 L136 97Z"  fill="white" opacity="0.88" />
        <path d="M152 78 L144 91 L160 91Z"  fill="white" opacity="0.85" />
        <path d="M56 104 L49 115 L63 115Z"  fill="white" opacity="0.7"  />

        {/* ── VALLEY / MEADOW ── */}
        <path
          d="M24 140 Q52 132, 80 136 Q108 140, 136 134 Q156 130, 176 136 L176 176 L24 176Z"
          fill="url(#km-meadow)"
        />

        {/* ── WINDING RIVER (Naryn style) ── */}
        <path
          d="M100 90 C 86 100, 114 112, 100 126 C 86 140, 108 152, 96 170"
          stroke="url(#km-river)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        {/* River highlight / shimmer */}
        <path
          d="M102 92 C 88 102, 116 113, 102 127 C 88 141, 110 152, 98 168"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        {/* Shimmer dots */}
        <circle cx="100" cy="98"  r="1.5" fill="white" opacity="0.6" />
        <circle cx="107" cy="118" r="1.8" fill="white" opacity="0.5" />
        <circle cx="99"  cy="140" r="1.4" fill="white" opacity="0.45"/>
        <circle cx="105" cy="158" r="1.2" fill="white" opacity="0.4" />

        {/* ── BIRDS (eagles) ── */}
        <path d="M46 52 Q50 46, 54 52 Q58 46, 62 52" stroke="#1E3A5F" strokeWidth="1.4" fill="none" opacity="0.4" />
        <path d="M60 40 Q63 35, 66 40 Q69 35, 72 40" stroke="#1E3A5F" strokeWidth="1.1" fill="none" opacity="0.3" />
        <path d="M36 65 Q38 61, 40 65 Q42 61, 44 65" stroke="#1E3A5F" strokeWidth="0.9" fill="none" opacity="0.25"/>

        {/* ── SMALL YURT in valley ── */}
        <g transform="translate(52, 140)">
          <ellipse cx="10" cy="10" rx="11" ry="6" fill="#F5F5F4" opacity="0.8" />
          <path d="M0 10 Q10 2, 20 10Z" fill="#FAFAF9" opacity="0.9" />
          <rect x="8" y="7" width="4" height="5" fill="#78716C" opacity="0.5" />
          {/* door */}
          <ellipse cx="10" cy="4" rx="3" ry="1.5" fill="#DAA520" opacity="0.6" />
          {/* tunduk hole */}
        </g>

      </g>

      {/* ── INNER CIRCLE BORDER ── */}
      <circle cx="100" cy="100" r="76" fill="none" stroke="#1E293B" strokeWidth="1" opacity="0.08" />

      {/* ── TUNDUK BROOCH (top center) ── */}
      <g transform="translate(100, 17)">
        {/* Outer gold ring */}
        <circle r="13" fill="url(#km-tunduk-gold)" />
        <circle r="13" fill="none" stroke="#92400E" strokeWidth="1" />
        {/* White inner ring */}
        <circle r="9" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9" />
        {/* Red centre */}
        <circle r="4.5" fill="#DC2626" />
        <circle r="4.5" fill="none" stroke="#B91C1C" strokeWidth="0.5" />
        {/* Tunduk spokes (8 main + 8 half) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={`sp-${i}`}
              x1={4.5 * Math.cos(a)} y1={4.5 * Math.sin(a)}
              x2={9   * Math.cos(a)} y2={9   * Math.sin(a)}
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = ((i * 45 + 22.5) * Math.PI) / 180;
          return (
            <line
              key={`sh-${i}`}
              x1={4.5 * Math.cos(a)} y1={4.5 * Math.sin(a)}
              x2={7.5 * Math.cos(a)} y2={7.5 * Math.sin(a)}
              stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.75"
            />
          );
        })}
        {/* Gold highlight dot */}
        <circle r="1.5" fill="#FDE68A" opacity="0.9" />
      </g>

    </svg>
  );
}

/**
 * TundukIcon -- маленькая иконка для обратной стороны карточек.
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
 * DecorativeBorder — волнистый кыргызский орнамент-бордюр.
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
