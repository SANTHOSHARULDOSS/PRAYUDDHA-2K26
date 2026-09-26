import { useEffect, useState } from 'react';

export default function ArcherAnimation() {
  const [shooting, setShooting] = useState(false);

  useEffect(() => {
    // Subtle periodic bow drawing and arrow release
    const interval = setInterval(() => {
      setShooting(true);
      setTimeout(() => setShooting(false), 1800);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 -left-6 hidden xl:block z-10 select-none opacity-80"
    >
      <div className="relative w-36 h-24 flex items-center justify-center">
        {/* SVG Archer Bow & Trail */}
        <svg
          viewBox="0 0 160 100"
          className="w-full h-full text-[var(--accent)] filter drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bow body */}
          <path
            d="M 20 20 Q 5 50 20 80"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-[var(--accent)]"
          />

          {/* Bow string */}
          <path
            d={shooting ? "M 20 20 L 25 50 L 20 80" : "M 20 20 L 8 50 L 20 80"}
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* Arrow */}
          <g
            className={`transition-all duration-700 ease-out ${
              shooting
                ? 'translate-x-32 opacity-0'
                : 'translate-x-0 opacity-100'
            }`}
          >
            {/* Arrow Shaft */}
            <line x1="12" y1="50" x2="65" y2="50" stroke="#f97316" strokeWidth="2.5" />
            {/* Arrow Head */}
            <polygon points="65,45 75,50 65,55" fill="#f97316" stroke="none" />
            {/* Arrow Fletching */}
            <path d="M 12 44 L 18 50 L 12 56" stroke="#fb923c" strokeWidth="2" fill="none" />
          </g>

          {/* Shooting Sparkle Trail */}
          {shooting && (
            <path
              d="M 30 50 Q 80 48 140 50"
              stroke="url(#arrowTrail)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          )}

          <defs>
            <linearGradient id="arrowTrail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle motion caption badge */}
        <span className="absolute -bottom-1 left-2 text-[9px] font-mono tracking-widest uppercase text-[var(--accent)] font-semibold opacity-70">
          Target Locked
        </span>
      </div>
    </div>
  );
}
