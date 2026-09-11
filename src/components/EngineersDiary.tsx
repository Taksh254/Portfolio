"use client";

import React, { useState } from "react";
import { Trophy, ExternalLink, Zap, Clock, Award, Sparkles, ChevronRight } from "lucide-react";
import { TypewriterHeader } from "./TypewriterHeader";

const HACKATHON_PHRASES = [
  "// 04  HACKATHONS // SPRINT BUILDS",
  "// 24H–48H RAPID AI PROTOTYPES",
  "// 🏆 1ST PLACE & TOP FINALIST BUILDS",
  "// HIGH-VELOCITY SHIP CADENCE",
];

interface EngineersDiaryProps {
  onSelectEntry?: (id: string) => void;
  onViewAll?: () => void;
}

export interface HackathonBuild {
  id: string;
  name: string;
  shortTitle: string;
  event: string;
  award: string;
  time: string;
  year: string;
  image: string;
  rotation: number;
  offsetY: number;
  summary: string;
  tags: string[];
  metrics: string;
  badgeStyle: string;
  link: string;
}

const HACKATHONS: HackathonBuild[] = [
  {
    id: "hack-01",
    name: "AutoMesh — Multi-Agent Research Engine",
    shortTitle: "AutoMesh",
    event: "Smart India Hackathon / National AI",
    award: "🏆 1ST PLACE WINNER",
    badgeStyle: "text-amber-800 bg-amber-500/10 border-amber-600/30",
    time: "36H SPRINT",
    year: "2025",
    image: "/hackathons/hack_1.jpg",
    rotation: -8,
    offsetY: 4,
    summary:
      "Distributed multi-agent pipeline that autonomously parses academic literature into structured knowledge graphs with source grounding and citation trees.",
    tags: ["LangGraph", "FastAPI", "pgvector", "Claude 3.5"],
    metrics: "Top 1% of 1,200+ Teams",
    link: "https://github.com/Taksh254",
  },
  {
    id: "hack-02",
    name: "EdgeVision — Real-Time Anti-Spoofing",
    shortTitle: "EdgeVision",
    event: "Global Edge AI & Vision Sprint",
    award: "⚡ TOP 3 FINALIST",
    badgeStyle: "text-emerald-800 bg-emerald-500/10 border-emerald-600/30",
    time: "24H SPRINT",
    year: "2025",
    image: "/hackathons/hack_2.jpg",
    rotation: -4,
    offsetY: 1,
    summary:
      "Sub-50ms biometric facial verification running on ARM64 Raspberry Pi with IR texture liveness detection and anti-spoofing defense.",
    tags: ["OpenCV", "PyTorch Mobile", "C++20", "ONNX"],
    metrics: "99.2% Anti-Spoof Precision",
    link: "https://github.com/Taksh254",
  },
  {
    id: "hack-03",
    name: "DAG-Ledger — High-Throughput State Sync",
    shortTitle: "DAG-Ledger",
    event: "Web3 Infra & Consensus Sprint",
    award: "🌟 BEST ARCHITECTURE",
    badgeStyle: "text-blue-800 bg-blue-500/10 border-blue-600/30",
    time: "48H SPRINT",
    year: "2024",
    image: "/hackathons/hack_3.jpg",
    rotation: 0,
    offsetY: 0,
    summary:
      "Zero-copy consensus ledger leveraging Directed Acyclic Graph mempool pipelining and lock-free memory ring buffers.",
    tags: ["Rust", "Tokio", "DAG", "gRPC"],
    metrics: "42,000 tx/sec Throughput",
    link: "https://github.com/Taksh254",
  },
  {
    id: "hack-04",
    name: "NeuroVoice — Streaming Speech Synthesis",
    shortTitle: "NeuroVoice",
    event: "Realtime Multimodal AI Challenge",
    award: "🥇 1ST PLACE INNOVATION",
    badgeStyle: "text-purple-800 bg-purple-500/10 border-purple-600/30",
    time: "36H SPRINT",
    year: "2024",
    image: "/hackathons/hack_4.jpg",
    rotation: 4,
    offsetY: 1,
    summary:
      "Ultra-low-latency conversational speech engine featuring end-to-end neural acoustic synthesis, emotional prosody, and chunked streaming.",
    tags: ["Whisper", "WebRTC", "PyTorch", "Rust"],
    metrics: "<120ms Ear-to-Glass Latency",
    link: "https://github.com/Taksh254",
  },
  {
    id: "hack-05",
    name: "VisionDrone — Autonomous Spatial SLAM",
    shortTitle: "VisionDrone",
    event: "Aerial Robotics & Drone Hack",
    award: "🎯 RUNNER UP / IMPACT",
    badgeStyle: "text-teal-800 bg-teal-500/10 border-teal-600/30",
    time: "48H SPRINT",
    year: "2024",
    image: "/hackathons/hack_5.jpg",
    rotation: 8,
    offsetY: 4,
    summary:
      "Stereo-vision depth SLAM and real-time obstacle avoidance pipeline deployed on lightweight quadcopter companion compute boards.",
    tags: ["ROS2", "YOLOv10", "DepthAI", "C++"],
    metrics: "60 FPS Onboard SLAM",
    link: "https://github.com/Taksh254",
  },
];

export function EngineersDiary({
  onSelectEntry,
  onViewAll,
}: EngineersDiaryProps) {
  // Default to first card selected for telemetry display
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : selectedIdx;
  const activeHack = HACKATHONS[activeIdx] || HACKATHONS[0];

  const handleCardClick = (idx: number, hack: HackathonBuild) => {
    setSelectedIdx(idx);
    if (onSelectEntry) {
      onSelectEntry(hack.id);
    } else if (hack.link) {
      window.open(hack.link, "_blank");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none font-mono-tech">
      {/* ── 1. Header ── */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-2.5">
          <TypewriterHeader phrases={HACKATHON_PHRASES} initialDelay={200} />

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E6322A]/8 border border-[#E6322A]/25 text-[#E6322A] text-[9px] font-bold tracking-wider shrink-0 whitespace-nowrap">
              <Trophy className="w-3 h-3 text-[#E6322A] shrink-0" />
              <span>5 SPRINT BUILDS</span>
            </div>

            <button
              onClick={onViewAll}
              type="button"
              className="text-[9.5px] text-[#33312E] hover:text-[#E6322A] transition-colors cursor-pointer flex items-center gap-1 font-medium ml-1 shrink-0 whitespace-nowrap"
            >
              <span>View All</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* ── 2. Polaroid Fan Layout matching Reference Photo ── */}
        <div className="relative w-full pt-3 pb-5 px-1 overflow-visible flex flex-col items-center justify-center">
          {/* Subtitle / Interaction Hint */}
          <div className="w-full flex items-center justify-between text-[8px] text-[#8C887E] tracking-wider mb-2.5 px-1">
            <span className="flex items-center gap-1 uppercase">
              <Sparkles className="w-2.5 h-2.5 text-[#E6322A]" />
              <span>SPRINT GALLERY // HOVER TO EXPAND</span>
            </span>
            <span className="font-mono-tech">
              [{activeIdx + 1}/5] {activeHack.time}
            </span>
          </div>

          {/* Overlapping Polaroid Cards Fan */}
          <div className="relative flex items-center justify-center w-full min-h-[170px] sm:min-h-[185px] overflow-visible py-3">
            {HACKATHONS.map((hack, idx) => {
              const isHovered = hoveredIdx === idx;

              // Resting overlap: all cards after first card have negative margin
              const marginClass = idx === 0 ? "" : "-ml-5 sm:-ml-6 md:-ml-7";

              return (
                <div
                  key={hack.id}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setSelectedIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleCardClick(idx, hack)}
                  style={{
                    transform: isHovered
                      ? "scale(1.38) translateY(-18px) rotate(0deg)"
                      : `rotate(${hack.rotation}deg) translateY(${hack.offsetY}px)`,
                    zIndex: isHovered ? 50 : idx + 1,
                    transition:
                      "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, z-index 0s",
                  }}
                  className={`relative shrink-0 cursor-pointer ${marginClass} rounded-[3px] bg-white p-1.5 sm:p-2 pb-6 sm:pb-7 ${
                    isHovered
                      ? "shadow-[0_24px_48px_rgba(0,0,0,0.32),0_6px_16px_rgba(0,0,0,0.18)] ring-2 ring-[#E6322A]/60"
                      : "shadow-[0_6px_18px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] border border-[#E2DDD3]"
                  } w-[84px] sm:w-[94px] md:w-[100px] select-none group`}
                >
                  {/* Photo Area */}
                  <div className="relative w-full aspect-square bg-[#1A1917] overflow-hidden rounded-[1px] shadow-[inset_0_0_4px_rgba(0,0,0,0.22)]">
                    <img
                      src={hack.image}
                      alt={hack.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? "scale-110" : "scale-100"
                      }`}
                      loading="eager"
                    />

                    {/* Subtle Polaroid Gloss Sheen */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/20 mix-blend-overlay" />

                    {/* Hover Overlay Badge */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col items-center justify-end text-center transition-opacity duration-200 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="text-[8px] font-mono-tech font-bold text-white tracking-wider leading-none">
                        {hack.year} • {hack.time}
                      </span>
                    </div>
                  </div>

                  {/* Polaroid Chin with Authentic Handwritten Title */}
                  <div
                    className={`absolute inset-x-0 bottom-0 h-6 sm:h-7 flex items-center ${
                      isHovered || idx === 4
                        ? "justify-center px-1"
                        : "justify-start pl-2 pr-6"
                    }`}
                  >
                    <span
                      className={`font-caveat font-bold text-[#22201D] tracking-tight leading-none whitespace-nowrap overflow-hidden text-ellipsis transition-all ${
                        isHovered
                          ? "text-[13px] sm:text-[14px] text-[#E6322A]"
                          : "text-[10.5px] sm:text-[11.5px]"
                      }`}
                    >
                      {hack.shortTitle}
                    </span>
                  </div>

                  {/* Corner External Link Badge on Hover */}
                  {isHovered && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#E6322A] text-white flex items-center justify-center shadow-lg animate-in fade-in zoom-in-75 duration-200 border border-white">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Connected Active Telemetry Card ── */}
        <div className="p-3.5 rounded-xl apple-glass-card border border-[#D8D3C8]/80 transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Progress Indicator */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-md border text-[8.5px] font-bold tracking-wider ${activeHack.badgeStyle}`}
              >
                {activeHack.award}
              </span>
              <span className="text-[8.5px] text-[#7A7770] uppercase tracking-wide truncate max-w-[150px] sm:max-w-[200px]">
                {activeHack.event}
              </span>
            </div>

            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/[0.04] border border-[#D8D3C8]/60 text-[8px] text-[#7A7770] shrink-0 font-mono-tech">
              <Clock className="w-2.5 h-2.5 text-[#E6322A]" />
              <span>{activeHack.time}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-2">
            <h4
              className="font-bold text-[12.5px] text-[#111111] flex items-center justify-between group cursor-pointer"
              onClick={() => {
                if (activeHack.link) window.open(activeHack.link, "_blank");
              }}
            >
              <span className="hover:text-[#E6322A] transition-colors">
                {activeHack.name}
              </span>
              <span className="text-[9px] text-[#E6322A] flex items-center gap-1 font-mono-tech shrink-0 ml-2 group-hover:underline">
                <span>View Build</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </h4>
            <p className="text-[10px] text-[#555047] leading-relaxed pt-1 font-sans">
              {activeHack.summary}
            </p>
          </div>

          {/* Footer: Tags & Metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA]/70 text-[8.5px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              {activeHack.tags.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded bg-black/[0.04] text-[#66635D] text-[8px] font-mono-tech"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="text-[#111111] font-semibold text-[8px] tracking-wide font-mono-tech shrink-0">
              {activeHack.metrics}
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Sprint Telemetry Status ── */}
      <div className="mt-3 pt-2.5 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[8.5px] text-[#7A7770]">
        <span>[ CADENCE: 24H–48H RAPID PROTOTYPE ]</span>
        <span className="text-[#111111] font-semibold flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-[#E6322A]" />
          <span>100% PROTOTYPE &rarr; PROD</span>
        </span>
      </div>
    </div>
  );
}

// Alias export for consistency
export { EngineersDiary as HackathonSection };

