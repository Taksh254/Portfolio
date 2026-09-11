"use client";

import React from "react";

// ─── EngineeringSketch ───────────────────────────────────────────────────────
// A pure SVG hand-drawn style engineering sketch of an AI/robot system.
// Thin pencil-stroke lines, measurement marks, arrows, and text annotations.

export function EngineeringSketch() {
  return (
    <div
      className="anim-sketch-float"
      style={{ width: "100%", maxWidth: 380, position: "relative" }}
      aria-label="Engineering sketch: AI system architecture diagram"
      role="img"
    >
      <svg
        viewBox="0 0 360 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
      >
        {/* ── Grid dots (very subtle) ── */}
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={30 + col * 48}
              cy={20 + row * 50}
              r={0.8}
              fill="rgba(120,100,70,0.18)"
            />
          ))
        )}

        {/* ═══════════════════════════════════════ */}
        {/*  ROBOT / AI HEAD                       */}
        {/* ═══════════════════════════════════════ */}

        {/* Head outline — slightly hand-drawn (small wobble) */}
        <path
          d="M120 60 Q122 42 160 40 Q198 38 202 60 L204 130 Q205 148 160 150 Q115 148 116 130 Z"
          stroke="#3A3020"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="rgba(244,241,232,0.6)"
        />

        {/* Eyes */}
        <ellipse cx="143" cy="90" rx="10" ry="7" stroke="#3A3020" strokeWidth="1.2" fill="none"/>
        <ellipse cx="177" cy="90" rx="10" ry="7" stroke="#3A3020" strokeWidth="1.2" fill="none"/>
        {/* Eye pupils */}
        <circle cx="143" cy="90" r="3" fill="rgba(217,47,39,0.7)"/>
        <circle cx="177" cy="90" r="3" fill="rgba(217,47,39,0.7)"/>
        {/* Eye highlight */}
        <circle cx="145" cy="88" r="1" fill="white" opacity="0.7"/>
        <circle cx="179" cy="88" r="1" fill="white" opacity="0.7"/>

        {/* Antenna */}
        <line x1="160" y1="40" x2="160" y2="18" stroke="#3A3020" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="160" cy="14" r="4" stroke="#3A3020" strokeWidth="1.2" fill="none"/>
        <circle cx="160" cy="14" r="1.5" fill="#D92F27"/>
        {/* Antenna signal rings */}
        <path d="M152 10 Q160 4 168 10" stroke="#D92F27" strokeWidth="0.8" fill="none" opacity="0.6"/>
        <path d="M148 7 Q160 -1 172 7" stroke="#D92F27" strokeWidth="0.7" fill="none" opacity="0.35"/>

        {/* Mouth/speaker grille */}
        <rect x="138" y="116" width="44" height="16" rx="3" stroke="#3A3020" strokeWidth="1" fill="none"/>
        <line x1="142" y1="120" x2="142" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="148" y1="120" x2="148" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="154" y1="120" x2="154" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="160" y1="120" x2="160" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="166" y1="120" x2="166" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="172" y1="120" x2="172" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="178" y1="120" x2="178" y2="128" stroke="#3A3020" strokeWidth="0.8" strokeLinecap="round"/>

        {/* ═══════════════════════════════════════ */}
        {/*  BODY / SYSTEM                         */}
        {/* ═══════════════════════════════════════ */}

        {/* Neck */}
        <rect x="148" y="150" width="24" height="20" rx="2" stroke="#3A3020" strokeWidth="1.2" fill="rgba(244,241,232,0.5)"/>
        <line x1="153" y1="155" x2="153" y2="165" stroke="#3A3020" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
        <line x1="159" y1="155" x2="159" y2="165" stroke="#3A3020" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
        <line x1="165" y1="155" x2="165" y2="165" stroke="#3A3020" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>

        {/* Body box */}
        <rect x="110" y="170" width="100" height="80" rx="4" stroke="#3A3020" strokeWidth="1.4" fill="rgba(244,241,232,0.5)"/>

        {/* Body panel divider */}
        <line x1="110" y1="200" x2="210" y2="200" stroke="#3A3020" strokeWidth="0.8" opacity="0.4"/>

        {/* Circuit board pattern inside body */}
        <line x1="125" y1="182" x2="155" y2="182" stroke="#1F6B4F" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <line x1="155" y1="182" x2="155" y2="192" stroke="#1F6B4F" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <circle cx="155" cy="192" r="2.5" stroke="#1F6B4F" strokeWidth="0.8" fill="none" opacity="0.7"/>

        <line x1="165" y1="182" x2="190" y2="182" stroke="#1F6B4F" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <line x1="165" y1="182" x2="165" y2="192" stroke="#1F6B4F" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
        <rect x="162" y="189" width="6" height="6" stroke="#1F6B4F" strokeWidth="0.8" fill="none" opacity="0.7"/>

        {/* Lower body: status lights */}
        <circle cx="128" cy="215" r="4" stroke="#D92F27" strokeWidth="1" fill="rgba(217,47,39,0.15)"/>
        <circle cx="142" cy="215" r="4" stroke="#1F6B4F" strokeWidth="1" fill="rgba(31,107,79,0.15)"/>
        <circle cx="156" cy="215" r="4" stroke="#B8860B" strokeWidth="1" fill="rgba(184,134,11,0.12)"/>

        {/* LLM label in body */}
        <text x="170" y="220" fontSize="7" fill="#3A3020" fontFamily="monospace" opacity="0.75">LLM</text>
        <text x="165" y="230" fontSize="6" fill="#3A3020" fontFamily="monospace" opacity="0.55">CORE</text>

        {/* ═══════════════════════════════════════ */}
        {/*  ARMS                                  */}
        {/* ═══════════════════════════════════════ */}

        {/* Left arm */}
        <path d="M110 185 Q78 190 68 215 Q62 232 72 240" stroke="#3A3020" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        {/* Left hand / sensor */}
        <circle cx="72" cy="244" r="8" stroke="#3A3020" strokeWidth="1.1" fill="rgba(244,241,232,0.6)"/>
        <text x="68" y="247" fontSize="5.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">CV</text>

        {/* Right arm */}
        <path d="M210 185 Q242 190 252 215 Q258 232 248 240" stroke="#3A3020" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        {/* Right hand / tool */}
        <circle cx="248" cy="244" r="8" stroke="#3A3020" strokeWidth="1.1" fill="rgba(244,241,232,0.6)"/>
        <text x="243" y="247" fontSize="5.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">API</text>

        {/* ═══════════════════════════════════════ */}
        {/*  LEGS / BASE                           */}
        {/* ═══════════════════════════════════════ */}

        {/* Left leg */}
        <rect x="128" y="250" width="22" height="40" rx="3" stroke="#3A3020" strokeWidth="1.2" fill="rgba(244,241,232,0.5)"/>
        {/* Right leg */}
        <rect x="170" y="250" width="22" height="40" rx="3" stroke="#3A3020" strokeWidth="1.2" fill="rgba(244,241,232,0.5)"/>

        {/* Feet */}
        <rect x="124" y="288" width="30" height="12" rx="3" stroke="#3A3020" strokeWidth="1" fill="rgba(244,241,232,0.6)"/>
        <rect x="166" y="288" width="30" height="12" rx="3" stroke="#3A3020" strokeWidth="1" fill="rgba(244,241,232,0.6)"/>

        {/* ═══════════════════════════════════════ */}
        {/*  MEASUREMENT MARKS                     */}
        {/* ═══════════════════════════════════════ */}

        {/* Height dimension line — right side */}
        <line x1="218" y1="40" x2="218" y2="300" stroke="#77736B" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.55"/>
        {/* Arrow tips */}
        <path d="M215 44 L218 38 L221 44" stroke="#77736B" strokeWidth="0.7" fill="none" opacity="0.55"/>
        <path d="M215 296 L218 302 L221 296" stroke="#77736B" strokeWidth="0.7" fill="none" opacity="0.55"/>
        {/* Dimension label */}
        <text x="223" y="175" fontSize="7" fill="#77736B" fontFamily="monospace" opacity="0.6" transform="rotate(90 223 175)">260mm</text>

        {/* Width dimension — below feet */}
        <line x1="110" y1="310" x2="210" y2="310" stroke="#77736B" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.45"/>
        <path d="M114 307 L108 310 L114 313" stroke="#77736B" strokeWidth="0.7" fill="none" opacity="0.45"/>
        <path d="M206 307 L212 310 L206 313" stroke="#77736B" strokeWidth="0.7" fill="none" opacity="0.45"/>
        <text x="155" y="322" fontSize="7" fill="#77736B" fontFamily="monospace" opacity="0.6" textAnchor="middle">100mm</text>

        {/* ═══════════════════════════════════════ */}
        {/*  ANNOTATIONS                           */}
        {/* ═══════════════════════════════════════ */}

        {/* Annotation: NEURAL CORE */}
        <line x1="75" y1="95" x2="112" y2="95" stroke="#77736B" strokeWidth="0.8" strokeLinecap="round" opacity="0.55"/>
        <circle cx="73" cy="95" r="1.5" fill="#77736B" opacity="0.5"/>
        <text x="8" y="88" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.75">NEURAL</text>
        <text x="8" y="99" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.75">CORE</text>

        {/* Annotation: VISION MODULE */}
        <line x1="68" y1="240" x2="55" y2="265" stroke="#77736B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <text x="5" y="275" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">VISION</text>
        <text x="2" y="285" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">MODULE</text>

        {/* Annotation: TOOL AGENT */}
        <line x1="248" y1="240" x2="268" y2="262" stroke="#77736B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <text x="263" y="272" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">TOOL</text>
        <text x="261" y="282" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">AGENT</text>

        {/* Annotation: SIGNAL (antenna area) */}
        <line x1="175" y1="14" x2="265" y2="30" stroke="#77736B" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <text x="266" y="28" fontSize="7.5" fill="#D92F27" fontFamily="monospace" opacity="0.75">SIGNAL</text>
        <text x="266" y="38" fontSize="7.5" fill="#3A3020" fontFamily="monospace" opacity="0.65">RECV ↓</text>

        {/* Connection arcs (data flow) */}
        <path d="M 82 215 Q 100 175 128 200" stroke="#1F6B4F" strokeWidth="0.9" strokeDasharray="3 2" fill="none" opacity="0.4"/>
        <path d="M 232 215 Q 215 175 200 200" stroke="#1F6B4F" strokeWidth="0.9" strokeDasharray="3 2" fill="none" opacity="0.4"/>

        {/* Small circles at data flow endpoints */}
        <circle cx="82" cy="215" r="2" fill="none" stroke="#1F6B4F" strokeWidth="0.8" opacity="0.5"/>
        <circle cx="232" cy="215" r="2" fill="none" stroke="#1F6B4F" strokeWidth="0.8" opacity="0.5"/>

        {/* Corner hash marks (draftsman style) */}
        <line x1="10" y1="10" x2="30" y2="10" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="10" y1="10" x2="10" y2="30" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="350" y1="10" x2="330" y2="10" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="350" y1="10" x2="350" y2="30" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="10" y1="390" x2="30" y2="390" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="10" y1="390" x2="10" y2="370" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="350" y1="390" x2="330" y2="390" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>
        <line x1="350" y1="390" x2="350" y2="370" stroke="#77736B" strokeWidth="0.6" opacity="0.3"/>

        {/* Title block at bottom */}
        <rect x="8" y="352" width="200" height="36" stroke="#77736B" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <line x1="8" y1="362" x2="208" y2="362" stroke="#77736B" strokeWidth="0.5" opacity="0.35"/>
        <text x="13" y="360" fontSize="6" fill="#77736B" fontFamily="monospace" opacity="0.6">DRAWING: AI-SYS-001</text>
        <text x="13" y="375" fontSize="6.5" fill="#3A3020" fontFamily="monospace" opacity="0.7">AI AGENT ARCHITECTURE</text>
        <text x="13" y="384" fontSize="5.5" fill="#77736B" fontFamily="monospace" opacity="0.55">REV 2.1 — TAKSH SEHRAWAT — 2026</text>
      </svg>

      {/* Floating annotation overlay */}
      <div
        className="font-handwriting"
        style={{
          position: "absolute",
          top: "8%",
          right: "2%",
          fontSize: 11,
          color: "#5A4A2A",
          transform: "rotate(3deg)",
          lineHeight: 1.4,
          opacity: 0.75,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        needs memory
        <br />+ planning + tools
      </div>
    </div>
  );
}
