import React from "react";

type SVGProps = { className?: string; style?: React.CSSProperties };

export function BatEmblem({ className = "w-6 h-4 text-amber-500/80", style }: SVGProps) {
  return (
    <svg
      viewBox="0 0 100 42"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M50 8 C48 4, 46 0, 44 0 C42 0, 42 6, 38 8 C30 10, 16 0, 0 8 C4 18, 12 28, 26 30 C30 36, 38 42, 50 42 C62 42, 70 36, 74 30 C88 28, 96 18, 100 8 C84 0, 70 10, 62 8 C58 6, 58 0, 56 0 C54 0, 52 4, 50 8 Z" />
    </svg>
  );
}

export function GothamSkyline({ className = "w-full h-16 text-white/5", style }: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      preserveAspectRatio="none"
    >
      <path d="M0 120 L0 80 L15 80 L15 65 L20 65 L20 40 L25 20 L27 20 L30 40 L30 65 L35 65 L35 80 L50 80 L50 50 L55 50 L60 30 L63 30 L65 50 L70 50 L70 90 L85 90 L85 45 L92 45 L95 10 L98 45 L105 45 L105 85 L120 85 L120 60 L130 60 L135 35 L140 60 L150 60 L150 95 L170 95 L170 40 L175 40 L180 15 L183 15 L187 40 L195 40 L195 90 L210 90 L210 55 L218 55 L222 25 L226 55 L235 55 L235 85 L250 85 L250 35 L258 35 L262 5 L266 35 L275 35 L275 80 L290 80 L290 60 L300 60 L305 30 L310 60 L320 60 L320 90 L340 90 L340 45 L347 45 L350 20 L353 45 L360 45 L360 75 L380 75 L380 55 L388 55 L392 35 L396 55 L400 55 L400 120 Z" />
    </svg>
  );
}

export function RedPencilUnderline({ className = "w-full h-3 text-[#D92626]", style }: SVGProps) {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M2 10C40 6 120 12 238 6M6 14C50 11 150 15 220 12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function RedPencilCircle({ className = "w-28 h-10 text-[#D92626]", style }: SVGProps) {
  return (
    <svg
      viewBox="0 0 120 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M10 22C8 10 32 4 60 4C95 4 114 12 112 24C110 36 82 40 48 40C20 40 4 32 8 20C10 14 26 8 50 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
    </svg>
  );
}
