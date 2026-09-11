"use client";

import React, { useState } from "react";
import { Trophy, ExternalLink, Zap, Clock, Award } from "lucide-react";
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
  event: string;
  award: string;
  time: string;
  year: string;
  summary: string;
  tags: string[];
  metrics: string;
  badgeStyle: string;
  link?: string;
}

const HACKATHONS: HackathonBuild[] = [
  {
    id: "hack-01",
    name: "AutoMesh — Multi-Agent Research Engine",
    event: "Smart India Hackathon / National AI",
    award: "🏆 1ST PLACE WINNER",
    badgeStyle: "text-amber-800 bg-amber-500/10 border-amber-600/30",
    time: "36H SPRINT",
    year: "2025",
    summary:
      "Distributed multi-agent pipeline that autonomously parses academic literature into structured knowledge graphs with source grounding.",
    tags: ["LangGraph", "FastAPI", "pgvector"],
    metrics: "Top 1% of 1,200+ Teams",
    link: "https://github.com/Taksh254",
  },
  {
    id: "hack-02",
    name: "EdgeVision — Real-time Anti-Spoofing",
    event: "Global Edge AI & Vision Sprint",
    award: "⚡ TOP 3 FINALIST",
    badgeStyle: "text-emerald-800 bg-emerald-500/10 border-emerald-600/30",
    time: "24H SPRINT",
    year: "2025",
    summary:
      "Sub-50ms biometric facial verification running on ARM64 Raspberry Pi with IR texture liveness detection and anti-spoofing defense.",
    tags: ["OpenCV", "PyTorch Mobile", "C++20"],
    metrics: "99.2% Anti-Spoof Precision",
    link: "https://github.com/Taksh254",
  },
];

export function EngineersDiary({
  onSelectEntry,
  onViewAll,
}: EngineersDiaryProps) {
  const [activeHackIdx, setActiveHackIdx] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none font-mono-tech">
      {/* ── 1. Header ── */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-2.5">
          <TypewriterHeader phrases={HACKATHON_PHRASES} initialDelay={200} />

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E6322A]/8 border border-[#E6322A]/25 text-[#E6322A] text-[9px] font-bold tracking-wider shrink-0 whitespace-nowrap">
              <Trophy className="w-3 h-3 text-[#E6322A] shrink-0" />
              <span>3 SPRINT WINS</span>
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

        {/* ── 2. Featured Hackathon Cards ── */}
        <div className="space-y-2.5">
          {HACKATHONS.map((hack, idx) => (
            <article
              key={hack.id}
              onClick={() => {
                if (onSelectEntry) {
                  onSelectEntry(hack.id);
                } else if (hack.link) {
                  window.open(hack.link, "_blank");
                }
              }}
              onMouseEnter={() => setActiveHackIdx(idx)}
              onMouseLeave={() => setActiveHackIdx(null)}
              className="group p-3 rounded-xl apple-glass-card cursor-pointer space-y-1.5 transition-all hover:border-[#111111]/30 hover:scale-[1.008] relative overflow-hidden"
            >
              {/* Top Row: Event & Award Pills */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[8.5px] font-bold tracking-wider ${hack.badgeStyle}`}
                  >
                    {hack.award}
                  </span>
                  <span className="text-[8.5px] text-[#7A7770] uppercase truncate max-w-[140px] sm:max-w-[180px]">
                    {hack.event}
                  </span>
                </div>

                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/[0.03] border border-[#D8D3C8]/60 text-[8px] text-[#7A7770]">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{hack.time}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="font-bold text-[12px] text-[#111111] group-hover:text-[#E6322A] transition-colors flex items-center justify-between">
                  <span>{hack.name}</span>
                  <ExternalLink className="w-3 h-3 text-[#A8A49B] group-hover:text-[#E6322A] transition-colors opacity-0 group-hover:opacity-100" />
                </h4>
                <p className="text-[10px] text-[#555047] leading-snug pt-0.5 font-sans">
                  {hack.summary}
                </p>
              </div>

              {/* Footer: Tags & Metrics */}
              <div className="flex items-center justify-between pt-1 border-t border-[#E8E4DA]/60 text-[8.5px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {hack.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.2 rounded bg-black/[0.04] text-[#66635D] text-[8px]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-[#111111] font-semibold text-[8px] tracking-wide">
                  {hack.metrics}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── 3. Bottom Sprint Telemetry Status ── */}
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
