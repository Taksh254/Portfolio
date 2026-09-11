"use client";

import React from "react";
import { Trophy, ExternalLink } from "lucide-react";
import { TypewriterHeader } from "./TypewriterHeader";
import { HACKATHONS } from "@/data/hackathons";

const HACKATHONS_PHRASES = [
  "// 04  HACKATHONS // SPRINT BUILDS",
  "// SHIP FAST, DEMO FASTER",
  "// 24-48H BUILD WINDOWS",
  "// TEAM SPRINTS & SOLO RUNS",
];

export function HackathonsSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none font-mono-tech">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-2.5">
          <TypewriterHeader phrases={HACKATHONS_PHRASES} initialDelay={200} />
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E6322A]/8 border border-[#E6322A]/25 text-[#E6322A] text-[9px] font-bold tracking-wider shrink-0 whitespace-nowrap">
              <Trophy className="w-3 h-3 text-[#E6322A] shrink-0" />
              <span>{HACKATHONS.length} SPRINT BUILDS</span>
            </div>
          </div>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {HACKATHONS.map((h) => (
            <a
              key={h.id}
              href={h.demoUrl || h.githubUrl || undefined}
              target={h.demoUrl || h.githubUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group rounded-xl apple-glass-card overflow-hidden transition-all hover:border-[#111111]/30 hover:-translate-y-0.5 cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-video bg-[#1A1917] overflow-hidden">
                <img
                  src={h.image}
                  alt={`${h.projectName} — ${h.hackathonName}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-1.5 right-1.5 text-[8px] font-mono-tech font-bold text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
                  {h.year}
                </span>
                {(h.demoUrl || h.githubUrl) && (
                  <ExternalLink className="absolute bottom-1.5 right-1.5 w-3 h-3 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <div className="p-2 space-y-0.5">
                <div className="text-[8px] font-mono-tech text-[#7A7770] tracking-wide uppercase truncate">
                  {h.hackathonName}
                </div>
                <h4 className="font-mono-tech font-bold text-[11px] text-[#111111] group-hover:text-[#E6322A] transition-colors truncate">
                  {h.projectName}
                </h4>
                <p className="text-[9px] text-[#555047] leading-snug font-sans line-clamp-2">
                  {h.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer / Status */}
      <div className="mt-3 pt-2.5 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[8.5px] text-[#7A7770]">
        <span>[ RAPID SPRINT BUILDS & DEMOS ]</span>
        <span className="text-[#111111] font-semibold">SHIPPED UNDER PRESSURE</span>
      </div>
    </div>
  );
}
