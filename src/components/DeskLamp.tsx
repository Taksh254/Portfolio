"use client";

import { useState, useEffect, useRef } from "react";

interface DeskLampProps {
  onBrightnessChange?: (brightness: number) => void;
  toggleTrigger?: number;
}

export function DeskLamp({ onBrightnessChange, toggleTrigger }: DeskLampProps) {
  const [brightness, setBrightness] = useState(0); // 0.0 → 1.0
  const [isOn, setIsOn] = useState(false);
  const [switchDepressed, setSwitchDepressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isFirstMount = useRef(true);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const at = (ms: number, fn: () => void) =>
    timers.current.push(setTimeout(fn, ms));

  // Propagate brightness to parent for desk glow overlay
  useEffect(() => {
    onBrightnessChange?.(brightness);
  }, [brightness, onBrightnessChange]);

  useEffect(() => () => clearAll(), []);

  // Respond to external toggle trigger (e.g. from SystemBar button)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    toggle();
  }, [toggleTrigger]);

  const toggle = () => {
    clearAll();
    setSwitchDepressed(true);
    at(175, () => setSwitchDepressed(false));

    if (!isOn) {
      setIsOn(true);
      // Tungsten warm-up flicker sequence
      at(50,  () => setBrightness(0.18));
      at(100, () => setBrightness(0.00));
      at(175, () => setBrightness(0.40));
      at(235, () => setBrightness(0.05));
      at(315, () => setBrightness(0.62));
      at(375, () => setBrightness(0.12));
      at(455, () => setBrightness(0.78));
      at(505, () => setBrightness(0.22));
      at(580, () => setBrightness(0.92));
      at(640, () => setBrightness(0.68));
      at(710, () => setBrightness(1.00));
    } else {
      // Quick tungsten cool-down
      at(50,  () => setBrightness(0.38));
      at(120, () => setBrightness(0.00));
      at(160, () => setIsOn(false));
    }
  };

  const b = brightness;

  // Hexagonal bolt detail helper
  const hex = (cx: number, cy: number, r: number): string =>
    [0, 60, 120, 180, 240, 300]
      .map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
      })
      .join(" ");

  return (
    <div
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        filter: hovered ? "brightness(1.09)" : "brightness(1)",
        transition: "filter 0.22s ease",
      }}
    >
      {/* Subtle Workstation HUD tooltip on hover */}
      <div
        style={{
          position: "absolute",
          top: -26,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(5,7,10,0.88)",
          border: "1px solid rgba(255,200,100,0.30)",
          backdropFilter: "blur(8px)",
          padding: "3px 8px",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 14px rgba(0,0,0,0.8)",
          zIndex: 50,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: isOn ? "#FFAE19" : "#5A6070",
            boxShadow: isOn ? "0 0 6px #FFAE19" : "none",
            display: "inline-block",
          }}
        />
        <span
          className="font-mono-tech"
          style={{
            fontSize: 8,
            letterSpacing: "0.12em",
            color: isOn ? "#FFE2A8" : "#8C92A0",
          }}
        >
          {isOn ? "DESK LAMP // ACTIVE (CLICK TO SWITCH OFF)" : "DESK LAMP // CLICK TO SWITCH ON"}
        </span>
      </div>

      <svg
        viewBox="0 0 240 360"
        style={{ width: "100%", height: "auto", overflow: "visible", display: "block" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        aria-label={
          isOn
            ? "Desk lamp is on — click to turn off"
            : "Desk lamp is off — click to turn on"
        }
      >
        <defs>
          {/* ── Metal cross-section gradient (left→right, simulates tube highlight) ── */}
          <linearGradient id="dl-metal" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#0C0C10" />
            <stop offset="20%"  stopColor="#1E1E28" />
            <stop offset="46%"  stopColor="#181820" />
            <stop offset="72%"  stopColor="#1C1C26" />
            <stop offset="100%" stopColor="#0A0A0E" />
          </linearGradient>

          {/* ── Metal vertical (for neck, short segments) ── */}
          <linearGradient id="dl-metal-v" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#1C1C24" />
            <stop offset="50%"  stopColor="#131318" />
            <stop offset="100%" stopColor="#0C0C10" />
          </linearGradient>

          {/* ── Base cylinder body ── */}
          <linearGradient id="dl-base" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#0A0A0E" />
            <stop offset="28%"  stopColor="#1C1C26" />
            <stop offset="55%"  stopColor="#181820" />
            <stop offset="80%"  stopColor="#161620" />
            <stop offset="100%" stopColor="#0C0C12" />
          </linearGradient>

          {/* ── Base top face (lighter specular toward front-left) ── */}
          <radialGradient id="dl-base-top" cx="36%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#242432" />
            <stop offset="100%" stopColor="#0C0C14" />
          </radialGradient>

          {/* ── Spherical joint (radial from upper-left specular) ── */}
          <radialGradient id="dl-joint" cx="32%" cy="28%" r="68%">
            <stop offset="0%"   stopColor="#2E2E3C" />
            <stop offset="40%"  stopColor="#18181E" />
            <stop offset="100%" stopColor="#0C0C12" />
          </radialGradient>

          {/* ── Aged brass accent rings ── */}
          <linearGradient id="dl-brass" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#5A4220" />
            <stop offset="45%"  stopColor="#8C6A32" />
            <stop offset="70%"  stopColor="#A07A40" />
            <stop offset="100%" stopColor="#6A5030" />
          </linearGradient>

          {/* ── Shade exterior (dark matte dome) ── */}
          <linearGradient id="dl-shade-ext" x1="0.2" x2="0.8" y1="0" y2="1">
            <stop offset="0%"   stopColor="#1C1C24" />
            <stop offset="45%"  stopColor="#141418" />
            <stop offset="100%" stopColor="#0C0C12" />
          </linearGradient>

          {/* ── Shade interior — warm amber when lit ── */}
          <radialGradient id="dl-shade-lit" cx="50%" cy="80%" r="75%">
            <stop offset="0%"   stopColor="rgba(255,200,100,1)" />
            <stop offset="38%"  stopColor="rgba(180,90,25,0.80)" />
            <stop offset="100%" stopColor="rgba(10,5,0,0)" />
          </radialGradient>

          {/* ── Bulb glow halo ── */}
          <radialGradient id="dl-bulb-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,252,220,1)" />
            <stop offset="20%"  stopColor="rgba(255,228,130,0.90)" />
            <stop offset="50%"  stopColor="rgba(255,178,55,0.55)" />
            <stop offset="75%"  stopColor="rgba(255,128,18,0.20)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* ── Cone of light from shade opening ── */}
          <linearGradient id="dl-cone" x1="0.5" x2="0.5" y1="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,205,85,0.44)" />
            <stop offset="25%"  stopColor="rgba(255,178,58,0.23)" />
            <stop offset="55%"  stopColor="rgba(255,148,32,0.10)" />
            <stop offset="85%"  stopColor="rgba(255,112,12,0.03)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          {/* ── Desk illumination pool (extends below viewBox) ── */}
          <radialGradient id="dl-pool" cx="45%" cy="8%" r="75%" fx="45%" fy="8%">
            <stop offset="0%"   stopColor="rgba(255,192,72,0.52)" />
            <stop offset="28%"  stopColor="rgba(255,162,48,0.28)" />
            <stop offset="58%"  stopColor="rgba(255,128,28,0.11)" />
            <stop offset="82%"  stopColor="rgba(255,92,8,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* ── Contact shadow under base ── */}
          <radialGradient id="dl-contact" cx="50%" cy="28%" r="55%">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.72)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* ── Blur filters for glow ── */}
          <filter id="dl-blur6" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="dl-blur3" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════ */}
        {/* LAYER 0 — LIGHTING  (behind lamp body)                */}
        {/* ══════════════════════════════════════════════════════ */}

        {/* Desk illumination pool — extends well below viewBox */}
        <ellipse
          cx="115" cy="425" rx="222" ry="92"
          fill="url(#dl-pool)"
          style={{ opacity: b }}
        />

        {/* Light cone from shade opening, spreading down */}
        <polygon
          points="99,163 201,163 265,425 45,425"
          fill="url(#dl-cone)"
          style={{ opacity: b }}
        />

        {/* Soft bounce light warming the arm body */}
        <ellipse
          cx="122" cy="202" rx="86" ry="118"
          fill="rgba(255,158,38,0.07)"
          style={{ opacity: b }}
        />

        {/* ══════════════════════════════════════════════════════ */}
        {/* LAYER 1 — LAMP BODY                                   */}
        {/* ══════════════════════════════════════════════════════ */}

        {/* Contact shadow on desk surface */}
        <ellipse cx="100" cy="358" rx="75" ry="9" fill="url(#dl-contact)" />

        {/* ─── BASE ─── */}
        {/* Cylinder body */}
        <path
          d="M 33,341 Q 33,328 100,328 Q 167,328 167,341
             L 167,349 Q 167,358 100,358 Q 33,358 33,349 Z"
          fill="url(#dl-base)"
        />
        {/* Top face */}
        <ellipse cx="100" cy="328" rx="67" ry="11" fill="url(#dl-base-top)" />
        <ellipse cx="100" cy="328" rx="67" ry="11" fill="none" stroke="#222232" strokeWidth="0.6" />
        {/* Worn front highlight on top rim */}
        <path
          d="M 44,334 Q 72,321 100,321 Q 128,321 156,334"
          fill="none" stroke="#272740" strokeWidth="0.8" strokeLinecap="round"
        />
        {/* Underside shadow stripe */}
        <path
          d="M 33,349 Q 33,358 100,358 Q 167,358 167,349"
          fill="rgba(0,0,0,0.34)"
        />
        {/* Bolt studs */}
        {[58, 142].map((x) => (
          <g key={x}>
            <circle cx={x} cy="338" r="3.8" fill="#0E0E16" stroke="#1C1C28" strokeWidth="0.5" />
            <circle cx={x} cy="338" r="1.8" fill="#121218" />
            <line x1={x - 1.6} y1="338" x2={x + 1.6} y2="338" stroke="#0A0A12" strokeWidth="0.6" />
            <line x1={x} y1="336.4" x2={x} y2="339.6" stroke="#0A0A12" strokeWidth="0.6" />
          </g>
        ))}
        {/* Warm base bounce when lamp is on */}
        <ellipse
          cx="92" cy="341" rx="60" ry="8"
          fill={`rgba(255,158,48,${b * 0.14})`}
        />

        {/* ── Realistic brass toggle switch on base (matches physical reference) ── */}
        <g id="dl-base-toggle-switch">
          {/* Base collar */}
          <ellipse cx="134" cy="331" rx="7.5" ry="4" fill="#20180C" stroke="url(#dl-brass)" strokeWidth="1.2" />
          <ellipse cx="134" cy="330" rx="5.2" ry="2.6" fill="#120E06" />
          {/* Hex nut */}
          <polygon
            points={hex(134, 330, 4.2)}
            fill="#4A3418"
            stroke="#8C6A32"
            strokeWidth="0.5"
          />
          {/* Toggle lever tilting based on state */}
          <line
            x1="134"
            y1="330"
            x2={isOn ? (switchDepressed ? "137" : "140") : (switchDepressed ? "131" : "128")}
            y2={switchDepressed ? "323" : "317"}
            stroke="url(#dl-brass)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Toggle ball head with specular highlight */}
          <circle
            cx={isOn ? (switchDepressed ? 137 : 140) : (switchDepressed ? 131 : 128)}
            cy={switchDepressed ? 323 : 317}
            r="2.4"
            fill="url(#dl-brass)"
            stroke="#FFE494"
            strokeWidth="0.4"
          />
          {/* Lever cast shadow */}
          <ellipse
            cx={isOn ? 141 : 127}
            cy="333"
            rx="3.5"
            ry="1.6"
            fill="rgba(0,0,0,0.60)"
          />
        </g>

        {/* ─── STEM ─── */}
        <path d="M 93,320 L 91,281 L 101,281 L 103,320 Z" fill="url(#dl-metal)" />
        {/* Stem brass collar */}
        <ellipse cx="97" cy="285" rx="8.5" ry="3.5" fill="#121218" />
        <ellipse cx="97" cy="285" rx="8.5" ry="3.5" fill="none" stroke="url(#dl-brass)" strokeWidth="1.4" />
        <ellipse cx="97" cy="281" rx="8" ry="3" fill="#1A1A24" />

        {/* ─── JOINT 1 — lower pivot ─── */}
        <circle cx="97" cy="270" r="14" fill="url(#dl-joint)" />
        <circle cx="97" cy="270" r="14" fill="none" stroke="#1C1C28" strokeWidth="0.6" />
        <circle cx="97" cy="270" r="14" fill="none" stroke="url(#dl-brass)" strokeWidth="1.0" opacity="0.55" />
        {/* Hex bolt */}
        <circle cx="97" cy="270" r="6" fill="#0E0E18" stroke="#181824" strokeWidth="0.5" />
        <circle cx="97" cy="270" r="3" fill="#0A0A0E" />
        <polygon points={hex(97, 270, 4.6)} fill="none" stroke="#1E1E2A" strokeWidth="0.6" />

        {/* ─── LOWER ARM ─── */}
        <path d="M 91,267 L 141,168 L 154,175 L 105,275 Z" fill="url(#dl-metal)" />
        {/* Top-edge highlight */}
        <path d="M 92,265 L 143,167" stroke="#252438" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Bottom-edge shadow */}
        <path d="M 104,273 L 153,173" stroke="#07070C" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* Spring / tension wire */}
        <path
          d="M 94,264 Q 101,248 109,231 Q 117,214 125,197 Q 133,180 139,168"
          fill="none" stroke="#181826" strokeWidth="1.1"
          strokeDasharray="3.5,2.8" strokeLinecap="round"
        />
        {/* Rivets along arm */}
        {[0.28, 0.52, 0.76].map((t) => (
          <circle
            key={t}
            cx={91 + (141 - 91) * t + 6}
            cy={267 + (168 - 267) * t + 4}
            r={2.3}
            fill="#0E0E18" stroke="#1C1C28" strokeWidth="0.4"
          />
        ))}

        {/* ─── JOINT 2 — upper elbow ─── */}
        <circle cx="147" cy="171" r="15.5" fill="url(#dl-joint)" />
        <circle cx="147" cy="171" r="15.5" fill="none" stroke="#1C1C28" strokeWidth="0.6" />
        <circle cx="147" cy="171" r="15.5" fill="none" stroke="url(#dl-brass)" strokeWidth="1.1" opacity="0.50" />
        <circle cx="147" cy="171" r="6.5" fill="#0E0E18" stroke="#181824" strokeWidth="0.5" />
        <circle cx="147" cy="171" r="3.2" fill="#0A0A0E" />
        <polygon points={hex(147, 171, 5.0)} fill="none" stroke="#1E1E2A" strokeWidth="0.6" />
        {/* Spring attachment stubs */}
        <path d="M 138,162 Q 127,155 120,150" fill="none" stroke="#14141E" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M 156,162 Q 165,155 171,148" fill="none" stroke="#14141E" strokeWidth="1.3" strokeLinecap="round" />

        {/* ─── UPPER ARM ─── */}
        <path d="M 141,167 L 161,96 L 171,100 L 153,174 Z" fill="url(#dl-metal)" />
        <path d="M 142,165 L 162,95" stroke="#252438" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M 152,172 L 170,98" stroke="#07070C" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path
          d="M 144,164 Q 149,145 154,126 Q 159,107 163,96"
          fill="none" stroke="#181826" strokeWidth="1.0"
          strokeDasharray="3,2.5" strokeLinecap="round"
        />

        {/* ─── HEAD JOINT ─── */}
        <circle cx="164" cy="97" r="12" fill="url(#dl-joint)" />
        <circle cx="164" cy="97" r="12" fill="none" stroke="#1C1C28" strokeWidth="0.5" />
        <circle cx="164" cy="97" r="12" fill="none" stroke="url(#dl-brass)" strokeWidth="0.9" opacity="0.45" />
        <circle cx="164" cy="97" r="4.8" fill="#0E0E18" />
        <circle cx="164" cy="97" r="2.4" fill="#0A0A0E" />
        <polygon points={hex(164, 97, 3.6)} fill="none" stroke="#1E1E2A" strokeWidth="0.55" />

        {/* ─── SHADE NECK ─── */}
        <path d="M 158,101 L 151,131 L 160,133 L 167,102 Z" fill="url(#dl-metal-v)" />
        {/* Neck brass collar */}
        <ellipse cx="155" cy="134" rx="5.8" ry="2.6" fill="#121218" />
        <ellipse cx="155" cy="134" rx="5.8" ry="2.6" fill="none" stroke="url(#dl-brass)" strokeWidth="1.2" />

        {/* ─── SHADE ─── */}
        {/* Exterior dome */}
        <path
          d="M 97,161
             C 95,126 97,99 150,93
             C 203,87 209,123 209,161
             L 205,166
             C 203,173 178,176 150,176
             C 122,176 97,173 95,166 Z"
          fill="url(#dl-shade-ext)"
        />
        {/* Interior — always dark base layer */}
        <path
          d="M 99,161
             C 99,123 101,106 150,100
             C 199,94 201,124 201,161
             C 192,169 174,173 150,173
             C 126,173 108,169 99,161 Z"
          fill="#040408"
        />
        {/* Interior — warm lit overlay (opacity driven by brightness) */}
        <path
          d="M 99,161
             C 99,123 101,106 150,100
             C 199,94 201,124 201,161
             C 192,169 174,173 150,173
             C 126,173 108,169 99,161 Z"
          fill="url(#dl-shade-lit)"
          style={{ opacity: b }}
        />

        {/* Opening rim */}
        <ellipse cx="150" cy="162" rx="53" ry="9.5" fill="#040408" fillOpacity="0.88" />
        <ellipse cx="150" cy="161" rx="53" ry="9.5" fill="none" stroke="#262638" strokeWidth="1.5" />
        {/* Rim worn bright edge */}
        <path d="M 98,158 Q 150,149 202,158" fill="none" stroke="#1E1E30" strokeWidth="0.9" />

        {/* Shade top collar */}
        <ellipse cx="154" cy="95" rx="22" ry="6.5" fill="#0F0F1A" />
        <ellipse cx="154" cy="95" rx="22" ry="6.5" fill="none" stroke="#252540" strokeWidth="0.9" />

        {/* Exterior curvature rim highlight */}
        <path
          d="M 103,145 C 113,110 138,95 162,95"
          fill="none" stroke="#1C1C2E" strokeWidth="1.1" strokeLinecap="round"
        />
        {/* Shade underside shadow */}
        <path
          d="M 95,166 C 95,173 122,176 150,176 C 178,176 205,173 209,166"
          fill="rgba(0,0,0,0.44)"
        />
        {/* Warm exterior reflection when on */}
        <path
          d="M 97,161 C 95,126 97,99 150,93 C 203,87 209,123 209,161"
          fill="none"
          stroke={`rgba(255,158,48,${b * 0.10})`}
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* ─── SWITCH KNOB ─── */}
        <circle
          cx="140" cy="149"
          r={switchDepressed ? 5.0 : 5.8}
          fill={switchDepressed ? "#181822" : "#14141E"}
          stroke="#232336"
          strokeWidth="1.0"
        />
        <circle cx="140" cy="149" r={switchDepressed ? 2.5 : 2.9} fill={switchDepressed ? "#0C0C14" : "#10101C"} />
        <line x1="140" y1="146.1" x2="140" y2="151.9" stroke="#181828" strokeWidth="0.7" />

        {/* ══════════════════════════════════════════════════════ */}
        {/* LAYER 2 — BULB & GLOW  (topmost, over shade)         */}
        {/* ══════════════════════════════════════════════════════ */}

        {/* Outer soft halo (blurred) */}
        <circle
          cx="150" cy="134" r="58"
          fill="url(#dl-bulb-halo)"
          filter="url(#dl-blur6)"
          style={{ opacity: b }}
        />
        {/* Inner crisp halo */}
        <circle
          cx="150" cy="134" r="26"
          fill="url(#dl-bulb-halo)"
          filter="url(#dl-blur3)"
          style={{ opacity: b }}
        />

        {/* Bulb glass */}
        <ellipse
          cx="150" cy="130"
          rx="14.5" ry="12.5"
          fill={b > 0 ? `rgba(255,252,215,${Math.min(b * 1.3, 1)})` : "#06060A"}
          stroke={b > 0 ? `rgba(255,228,140,${b * 0.40})` : "#181826"}
          strokeWidth="1.0"
        />

        {/* Filament — only visible when lamp is off */}
        {b < 0.06 && (
          <>
            <path
              d="M 145,127 Q 148,122 150,127 Q 152,122 155,127"
              fill="none" stroke="#28202E" strokeWidth="0.9"
            />
            <line x1="150" y1="127" x2="150" y2="136" stroke="#28202E" strokeWidth="0.7" />
            <line x1="146.5" y1="136" x2="153.5" y2="136" stroke="#28202E" strokeWidth="0.7" />
          </>
        )}

        {/* Specular sparkle on bulb glass */}
        {b > 0.5 && (
          <ellipse
            cx="143" cy="123" rx="5.5" ry="4"
            fill={`rgba(255,255,255,${b * 0.70})`}
          />
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* HOVER LABEL                                            */}
        {/* ══════════════════════════════════════════════════════ */}
        {hovered && (
          <text
            x="175" y="302"
            fill="rgba(255,255,255,0.15)"
            fontFamily="monospace"
            fontSize="7"
            letterSpacing="0.10em"
          >
            {isOn ? "CLICK · OFF" : "CLICK · ON"}
          </text>
        )}
      </svg>
    </div>
  );
}
