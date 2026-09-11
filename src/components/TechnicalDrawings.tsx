import React from "react";

type SVGProps = { className?: string; style?: React.CSSProperties };

/**
 * Hand-drawn red pencil underline for emphasizing key technical headlines
 */
export function RedPencilUnderline({
  className = "w-full h-3 text-[#C42020]",
  style,
}: SVGProps) {
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
        opacity="0.88"
      />
    </svg>
  );
}

/**
 * Hand-drawn red pencil circle for highlighting specs or status tags
 */
export function RedPencilCircle({
  className = "w-28 h-10 text-[#C42020]",
  style,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 120 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M10 22 C10 10, 50 4, 90 6 C115 8, 118 26, 95 36 C65 44, 20 40, 8 28 C3 20, 25 12, 60 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Technical precision grid alignment crosshair
 */
export function TechnicalCrosshair({
  className = "w-4 h-4 text-[#8A7050]",
  style,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Engineering drafting angle bracket
 */
export function TechnicalBracket({
  className = "w-3 h-5 text-[#8A7050]",
  style,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M10 2 L2 2 L2 22 L10 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
