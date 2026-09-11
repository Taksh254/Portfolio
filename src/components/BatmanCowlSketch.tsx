"use client";

import React from "react";

export function BatmanCowlSketch() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="0 0 340 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[300px] overflow-visible"
      >
        {/* ── Background Drafting Construction Lines & Crosshairs ── */}
        <line x1="20" y1="160" x2="320" y2="160" stroke="#DDD7CA" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="170" y1="10" x2="170" y2="310" stroke="#DDD7CA" strokeWidth="0.8" strokeDasharray="4 4" />

        {/* Concentric compass circles */}
        <circle cx="270" cy="80" r="32" stroke="#D0C9BA" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="270" cy="80" r="18" stroke="#DDD7CA" strokeWidth="0.6" />
        <circle cx="270" cy="80" r="2.5" fill="#B8860B" opacity="0.6" />
        <line x1="270" y1="42" x2="270" y2="118" stroke="#DDD7CA" strokeWidth="0.6" />
        <line x1="232" y1="80" x2="308" y2="80" stroke="#DDD7CA" strokeWidth="0.6" />

        {/* Measurement line with arrows on left */}
        <line x1="50" y1="70" x2="50" y2="240" stroke="#8C8476" strokeWidth="0.7" />
        <path d="M47 76 L50 70 L53 76 M47 234 L50 240 L53 234" stroke="#8C8476" strokeWidth="0.8" fill="none" />
        <text x="40" y="158" fill="#8C8476" fontSize="8" fontFamily="monospace" transform="rotate(-90 40 158)">
          // 24.5
        </text>

        {/* ── Cursive text above sketch ── */}
        <text
          x="195"
          y="36"
          fill="#332E27"
          fontSize="13"
          fontFamily="var(--font-caveat), cursive"
          fontStyle="italic"
        >
          Better Systems
        </text>
        <text
          x="195"
          y="52"
          fill="#332E27"
          fontSize="13"
          fontFamily="var(--font-caveat), cursive"
          fontStyle="italic"
        >
          A Brighter Tomorrow.
        </text>

        {/* ── Batman Cowl Profile Blueprint Outline ── */}
        {/* Main ear line shooting straight up */}
        <path
          d="M190 26 L175 110 L158 135 L142 165 L138 185 L144 205 L160 230 L185 260 L220 280 L230 282"
          stroke="#2A241C"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ear back curve */}
        <path
          d="M190 26 L198 85 L215 130 L228 170 L236 215 L238 270"
          stroke="#2A241C"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Brow, eye socket & nose bridge */}
        <path
          d="M158 135 L175 142 L192 145 L202 152"
          stroke="#3A3226"
          strokeWidth="1.2"
        />
        {/* Cowl eye slot */}
        <polygon
          points="174,152 192,152 188,162 172,158"
          stroke="#2A241C"
          strokeWidth="1.1"
          fill="rgba(244,241,232,0.9)"
        />

        {/* Cheekbone & jaw angle */}
        <path
          d="M172 164 L180 195 L200 220 L225 240"
          stroke="#3A3226"
          strokeWidth="1.2"
        />
        {/* Mouth/chin opening contour */}
        <path
          d="M180 195 L175 210 L184 225 L198 228"
          stroke="#554B3D"
          strokeWidth="1"
        />

        {/* Structural wireframe mesh lines on cowl forehead & ear */}
        <path d="M185 45 L180 85 L168 115" stroke="#776E60" strokeWidth="0.6" />
        <path d="M192 65 L190 100 L180 128" stroke="#776E60" strokeWidth="0.6" />
        <path d="M178 95 L205 92" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M172 120 L218 115" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M164 140 L224 138" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M155 170 L232 172" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M165 200 L235 205" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M175 230 L236 235" stroke="#8C8272" strokeWidth="0.6" />
        <path d="M190 255 L234 258" stroke="#8C8272" strokeWidth="0.6" />

        {/* Cross-hatch shading on cowl temple */}
        <path
          d="M200 135 L215 150 M204 133 L219 148 M208 131 L223 146 M212 129 L227 144"
          stroke="#8C8272"
          strokeWidth="0.5"
        />

        {/* Circuit nodes / technical dots */}
        <circle cx="175" cy="110" r="1.5" fill="#D92F27" />
        <circle cx="190" cy="26" r="2" fill="#D92F27" />
        <circle cx="228" cy="170" r="1.5" fill="#B8860B" />
        <circle cx="180" cy="195" r="1.5" fill="#1F6B4F" />

        {/* ── Box Diagram: IDEA 01 / SKETCH / BUILD / LEARN / REPEAT ── */}
        <g transform="translate(230, 185)">
          <rect
            x="0"
            y="0"
            width="58"
            height="62"
            fill="#FAF9F4"
            stroke="#D0C9BA"
            strokeWidth="0.8"
            rx="2"
          />
          <text x="6" y="14" fill="#332E27" fontSize="8" fontFamily="var(--font-geist-mono)" fontWeight="700">
            IDEA <tspan fill="#D92F27">01</tspan>
          </text>
          <line x1="6" y1="18" x2="52" y2="18" stroke="#E5E0D5" strokeWidth="0.6" />
          <text x="6" y="28" fill="#665F53" fontSize="7" fontFamily="var(--font-geist-mono)">
            SKETCH
          </text>
          <text x="6" y="38" fill="#665F53" fontSize="7" fontFamily="var(--font-geist-mono)">
            BUILD
          </text>
          <text x="6" y="48" fill="#665F53" fontSize="7" fontFamily="var(--font-geist-mono)">
            LEARN
          </text>
          <text x="6" y="58" fill="#665F53" fontSize="7" fontFamily="var(--font-geist-mono)">
            REPEAT
          </text>
        </g>

        {/* Technical Callout Lines */}
        <line x1="140" y1="190" x2="110" y2="210" stroke="#A89F90" strokeWidth="0.6" />
        <line x1="110" y1="210" x2="80" y2="210" stroke="#A89F90" strokeWidth="0.6" />
        <text x="82" y="206" fill="#8C8272" fontSize="7.5" fontFamily="var(--font-geist-mono)">
          End out
        </text>
        <text x="82" y="218" fill="#8C8272" fontSize="7.5" fontFamily="var(--font-geist-mono)">
          Grid line
        </text>

        {/* Alignment Crosshair at bottom left */}
        <circle cx="85" cy="275" r="5" stroke="#C0B8A8" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <line x1="85" y1="266" x2="85" y2="284" stroke="#C0B8A8" strokeWidth="0.6" />
        <line x1="76" y1="275" x2="94" y2="275" stroke="#C0B8A8" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
