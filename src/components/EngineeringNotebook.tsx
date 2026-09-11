"use client";
import React, { useState } from "react";
import { RedPencilUnderline, RedPencilCircle } from "./BatEmblem";
import { ArrowDown } from "lucide-react";

interface Props {
  onExploreWork: () => void;
  onScrollDown: () => void;
}

const FOCUS_TAGS = ["AI SYSTEMS", "AUTOMATION", "SOFTWARE", "RESEARCH", "ROBOTICS"];

export function EngineeringNotebook({ onExploreWork, onScrollDown }: Props) {
  const [activeTag, setActiveTag] = useState("AI SYSTEMS");

  return (
    /* The notebook is a fixed-size physical object — no flex-grow */
    <div className="relative" style={{ userSelect: "none" }}>

      {/* ── Shadow cast down onto the desk surface ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-24px",
          left: "30px",
          right: "6px",
          height: "32px",
          background: "radial-gradient(ellipse at center top, rgba(0,0,0,0.97) 0%, transparent 80%)",
          filter: "blur(14px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── The notebook itself ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "2px 5px 5px 2px",
          boxShadow:
            "0 32px 70px rgba(0,0,0,0.99), 0 16px 36px rgba(0,0,0,0.92), 0 6px 14px rgba(0,0,0,0.8), -2px 3px 12px rgba(0,0,0,0.7)",
          overflow: "visible",
        }}
      >
        {/* Dark back-cover peeking out */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "#0A0806",
            transform: "translate(3px, 4px)",
            borderRadius: "2px 5px 5px 2px",
            zIndex: -1,
          }}
        />

        {/* ── The open page spread ── */}
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            borderRadius: "2px 5px 5px 2px",
          }}
        >

          {/* ===================================================== */}
          {/* SPIRAL BINDING                                         */}
          {/* ===================================================== */}
          <div
            aria-hidden="true"
            style={{
              width: "28px",
              flexShrink: 0,
              background: "linear-gradient(to right, #101010, #1C1C1C, #101010)",
              borderRight: "1px solid #242424",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "20px",
                  height: "12px",
                  borderRadius: "6px",
                  border: "1.5px solid #363636",
                  background: "linear-gradient(to bottom, #262626, #161616)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.04), 0 2px 4px rgba(0,0,0,0.9)",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "8px",
                    height: "7px",
                    borderRadius: "3px",
                    background: "#0A0A0A",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ===================================================== */}
          {/* LEFT PAGE — Introduction                               */}
          {/* ===================================================== */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              background: "#EDE4CC",
              backgroundImage:
                "linear-gradient(rgba(110,80,45,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(110,80,45,0.07) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              padding: "20px 24px 16px 20px",
              position: "relative",
              boxShadow: "inset -12px 0 22px rgba(0,0,0,0.1)",
            }}
          >
            {/* Red margin rule */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50px",
                width: "1px",
                background: "rgba(180,55,35,0.3)",
              }}
            />

            {/* Top rule */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "44px",
                left: "20px",
                right: "16px",
                height: "1px",
                background: "rgba(110,80,45,0.18)",
              }}
            />

            {/* Washi tape — top left corner */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-4px",
                left: "26px",
                width: "46px",
                height: "16px",
                background: "rgba(225,212,182,0.6)",
                border: "1px solid rgba(205,190,155,0.7)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                transform: "rotate(-0.8deg)",
                borderRadius: "1px",
                zIndex: 10,
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, marginTop: "12px" }}>
              {/* Terminal prompt */}
              <div
                className="font-mono-tech"
                style={{ fontSize: "10px", color: "#4A3820", fontWeight: "700", letterSpacing: "0.1em" }}
              >
                &gt;_ / INTRODUCTION
              </div>

              {/* Hello label */}
              <div
                className="font-mono-tech"
                style={{ fontSize: "9px", color: "#6A5030", letterSpacing: "0.16em", fontWeight: "600", marginTop: "8px", textTransform: "uppercase" }}
              >
                HELLO, I&apos;M
              </div>

              {/* Name */}
              <div style={{ marginTop: "4px" }}>
                <h1
                  style={{ fontSize: "clamp(22px, 3.5vw, 34px)", color: "#120C04", fontWeight: "900", letterSpacing: "-0.02em", lineHeight: "1.05" }}
                >
                  Taksh Sehrawat
                </h1>
                <RedPencilUnderline className="w-full text-[#C42020]" style={{ height: "9px", marginTop: "2px" }} />
              </div>

              {/* Role */}
              <div
                className="font-mono-tech"
                style={{ fontSize: "10px", color: "#1E1408", fontWeight: "700", letterSpacing: "0.06em", marginTop: "6px" }}
              >
                AI ENGINEER &amp; DEVELOPER
              </div>

              {/* Bio */}
              <p
                style={{ fontSize: "11px", color: "#3E3020", lineHeight: "1.6", marginTop: "8px", maxWidth: "240px" }}
              >
                I build intelligent systems, automate workflows, and experiment with ideas that push boundaries.
              </p>

              {/* Focus areas */}
              <div style={{ marginTop: "10px" }}>
                <div
                  className="font-mono-tech"
                  style={{ fontSize: "8px", color: "#6A5030", letterSpacing: "0.14em", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}
                >
                  FOCUS AREAS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {FOCUS_TAGS.map((tag) => {
                    const active = tag === activeTag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className="font-mono-tech"
                        style={{
                          padding: "2px 8px",
                          fontSize: "8px",
                          fontWeight: "700",
                          letterSpacing: "0.04em",
                          background: active ? "#120C04" : "rgba(18,12,4,0.08)",
                          color: active ? "#EDE4CC" : "#3E3020",
                          border: active ? "1px solid #120C04" : "1px solid rgba(110,80,45,0.3)",
                          borderRadius: "2px",
                          cursor: "pointer",
                          transition: "all 150ms",
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={onExploreWork}
                className="font-mono-tech"
                style={{
                  padding: "7px 14px",
                  background: "#120C04",
                  color: "#EDE4CC",
                  border: "1px solid #2A1A08",
                  borderRadius: "3px",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <span style={{ color: "#C42020" }}>EXPLORE MY WORK</span>
                <span>→</span>
              </button>
              <button
                onClick={onScrollDown}
                className="font-mono-tech"
                style={{
                  fontSize: "9px",
                  color: "#6A5030",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                SCROLL DOWN <ArrowDown style={{ width: "11px", height: "11px" }} className="animate-bounce" />
              </button>
            </div>

            {/* Page number */}
            <div
              className="font-mono-tech"
              style={{ position: "absolute", bottom: "6px", right: "10px", fontSize: "8px", color: "#8A7050" }}
            >
              P. 01
            </div>
          </div>

          {/* ===================================================== */}
          {/* SPINE                                                  */}
          {/* ===================================================== */}
          <div
            style={{
              width: "7px",
              flexShrink: 0,
              background: "linear-gradient(to right, #B8A880, #CDB890 35%, #C4B084 65%, #B0A070)",
              boxShadow: "inset -2px 0 5px rgba(0,0,0,0.16), inset 2px 0 5px rgba(0,0,0,0.10)",
            }}
          />

          {/* ===================================================== */}
          {/* RIGHT PAGE — Photo + Annotations                       */}
          {/* ===================================================== */}
          <div
            style={{
              flex: "0 0 42%",
              background: "#E4D9B8",
              backgroundImage:
                "linear-gradient(rgba(110,80,45,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(110,80,45,0.07) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              padding: "16px 14px 16px 12px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "inset 8px 0 14px rgba(0,0,0,0.08)",
            }}
          >
            {/* Blueprint sketch marks (barely visible) */}
            <svg
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055, pointerEvents: "none" }}
              viewBox="0 0 220 320"
              fill="none"
              stroke="#2A1808"
              strokeWidth="0.7"
            >
              <circle cx="170" cy="240" r="44" strokeDasharray="4 5" />
              <circle cx="170" cy="240" r="26" />
              <circle cx="170" cy="240" r="3.5" fill="#2A1808" />
              <line x1="170" y1="194" x2="170" y2="286" strokeDasharray="3 4" />
              <line x1="124" y1="240" x2="216" y2="240" strokeDasharray="3 4" />
              <line x1="20" y1="270" x2="80" y2="270" />
              <line x1="20" y1="264" x2="20" y2="276" />
              <line x1="80" y1="264" x2="80" y2="276" />
              <text x="36" y="262" fontSize="6" fontFamily="monospace">24.5mm</text>
              <line x1="42" y1="38" x2="42" y2="66" />
              <line x1="26" y1="52" x2="58" y2="52" />
              <circle cx="42" cy="52" r="11" strokeDasharray="3 3" />
            </svg>

            {/* Washi tape on photo */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-5px",
                left: "50%",
                transform: "translateX(-50%) rotate(-1.5deg)",
                width: "50px",
                height: "17px",
                background: "rgba(225,210,178,0.6)",
                border: "1px solid rgba(205,192,155,0.7)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                borderRadius: "1px",
                zIndex: 10,
              }}
            />

            {/* Dark Polaroid photo */}
            <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "130px",
                  background: "#070809",
                  padding: "6px",
                  paddingBottom: "22px",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.88), 0 4px 10px rgba(0,0,0,0.7)",
                  transform: "rotate(-2deg)",
                  border: "1px solid #18191F",
                  borderRadius: "1px",
                }}
              >
                <div
                  style={{ width: "100%", height: "108px", background: "#03040A", position: "relative", overflow: "hidden" }}
                >
                  {/* Gotham cityscape in photo */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse at 50% 25%, rgba(28,40,68,0.55) 0%, rgba(3,4,10,0.97) 72%)",
                    }}
                  />
                  <svg
                    style={{ position: "absolute", bottom: 0, width: "100%", display: "block" }}
                    viewBox="0 0 118 90"
                    fill="none"
                  >
                    {/* Cloaked silhouette */}
                    <path d="M59 14C55 11 53 8 51 6C50 4 50 9 47 11C41 14 32 7 22 14C25 23 31 34 42 37C45 43 51 50 59 50C67 50 73 43 76 37C87 34 93 23 96 14C86 7 77 14 71 11C68 9 68 4 67 6C65 8 63 11 59 14Z" fill="rgba(18,25,40,0.7)" />
                    <path d="M42 50 L37 92 L43 96 L51 92 L56 76 L59 80 L62 76 L67 92 L73 96 L79 92 L74 50C70 57 65 62 59 62C53 62 48 57 42 50Z" fill="rgba(12,16,28,0.9)" />
                    {/* City bottom */}
                    <path d="M0 90 L0 72 L10 72 L10 62 L14 62 L18 48 L20 48 L22 62 L25 62 L25 72 L34 72 L34 55 L37 55 L40 38 L42 38 L44 55 L47 55 L47 72 L58 72 L58 62 L61 62 L64 50 L65 50 L66 62 L69 72 L78 72 L78 55 L81 55 L84 38 L86 38 L88 55 L91 55 L91 70 L100 70 L100 58 L104 58 L107 44 L110 58 L114 58 L114 72 L118 72 L118 90Z" fill="rgba(10,14,22,0.96)" />
                    {/* Rain */}
                    {[7,18,30,42,55,68,80,92,106].map((x,i) => (
                      <line key={i} x1={x} y1={-2} x2={x-3} y2={92} stroke="rgba(180,200,240,0.022)" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
                {/* Caption */}
                <div
                  className="font-mono-tech"
                  style={{ fontSize: "6px", color: "#504040", textAlign: "center", paddingTop: "4px", letterSpacing: "0.1em" }}
                >
                  REF. #084-G
                </div>
              </div>
            </div>

            {/* Handwritten annotations */}
            <div style={{ marginTop: "10px", paddingLeft: "4px", position: "relative", zIndex: 2 }}>
              {["BUILD.", "BREAK.", "UNDERSTAND."].map((word) => (
                <div
                  key={word}
                  className="font-handwriting"
                  style={{ fontSize: "20px", color: "#2A1E0C", fontWeight: "700", lineHeight: "1.25" }}
                >
                  {word}
                </div>
              ))}

              {/* REPEAT — circled in red */}
              <div style={{ position: "relative", display: "inline-block", marginTop: "2px" }}>
                <span
                  className="font-handwriting"
                  style={{ fontSize: "24px", color: "#C42020", fontWeight: "900", lineHeight: "1" }}
                >
                  REPEAT.
                </span>
                <div style={{ position: "absolute", inset: "-4px -8px", pointerEvents: "none" }}>
                  <RedPencilCircle className="w-full h-full text-[#C42020]" />
                </div>
              </div>
            </div>
            {/* Page number */}
            <div
              className="font-mono-tech"
              style={{ position: "absolute", bottom: "6px", right: "8px", fontSize: "8px", color: "#8A7050" }}
            >
              P. 02
            </div>

            {/* Stacked page edges */}
            <div aria-hidden="true" style={{ position: "absolute", right: 0, top: "4px", bottom: "4px", display: "flex", gap: "1px" }}>
              <div style={{ width: "2px", background: "#CEC08A", opacity: 0.85 }} />
              <div style={{ width: "2px", background: "#C0B070", opacity: 0.55 }} />
              <div style={{ width: "2px", background: "#B4A060", opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
