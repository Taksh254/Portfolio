"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Clock,
  Sparkles,
  ChevronRight,
  FolderGit2,
  Zap,
} from "lucide-react";
import { TypewriterHeader } from "./TypewriterHeader";
import { PROJECTS } from "@/data/projects";

const PROJECTS_PHRASES = [
  "// 03  FEATURED PROJECTS // BUILDS",
  "// ARCHITECTURE: FULL-STACK AI",
  "// SHIPPED FROM GITHUB.COM/TAKSH254",
  "// HIGH-VELOCITY SHIP CADENCE",
];

interface FeaturedProjectsProps {
  onSelectProject?: (id: string) => void;
  onViewAll?: () => void;
}

export interface FeaturedProjectBuild {
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

const STATUS_BADGE: Record<string, { label: string; style: string }> = {
  live: { label: "● LIVE DEPLOYMENT", style: "text-emerald-800 bg-emerald-500/10 border-emerald-600/30" },
  building: { label: "◐ ACTIVE DEVELOPMENT", style: "text-amber-800 bg-amber-500/10 border-amber-600/30" },
  operational: { label: "● OPERATIONAL", style: "text-emerald-800 bg-emerald-500/10 border-emerald-600/30" },
  archived: { label: "○ ARCHIVED", style: "text-slate-700 bg-slate-500/10 border-slate-500/30" },
};

const FAN_LAYOUT = [
  { rotation: -8, offsetY: 4 },
  { rotation: -4, offsetY: 1 },
  { rotation: 0, offsetY: 0 },
  { rotation: 4, offsetY: 1 },
  { rotation: 8, offsetY: 4 },
];

const SHORT_TITLES: Record<string, string> = {
  "finova": "Finova",
  "oryn": "Oryn",
  "tiny-mind-play-school": "Tiny Mind",
  "edith-ai": "EDITH AI",
  "beejmantra": "BeejMantra",
};

const FEATURED_PROJECTS: FeaturedProjectBuild[] = PROJECTS.map((project, idx) => {
  const badge = STATUS_BADGE[project.status] ?? STATUS_BADGE.building;
  const layout = FAN_LAYOUT[idx % FAN_LAYOUT.length];
  return {
    id: project.id,
    name: project.title,
    shortTitle: SHORT_TITLES[project.id] ?? project.title,
    event: project.category,
    award: badge.label,
    badgeStyle: badge.style,
    time: project.year,
    year: project.year,
    image: project.image,
    rotation: layout.rotation,
    offsetY: layout.offsetY,
    summary: project.summary,
    tags: project.stack.slice(0, 4),
    metrics: project.metrics?.[0]?.value ?? project.category,
    link: project.demoUrl || project.githubUrl || "https://github.com/Taksh254",
  };
});

export function FeaturedProjects({
  onSelectProject,
  onViewAll,
}: FeaturedProjectsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : selectedIdx;
  const activeProject = FEATURED_PROJECTS[activeIdx] || FEATURED_PROJECTS[0];

  const handleCardClick = (idx: number, proj: FeaturedProjectBuild) => {
    setSelectedIdx(idx);
    if (onSelectProject) {
      onSelectProject(proj.id);
    } else if (proj.link) {
      window.open(proj.link, "_blank");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none font-mono-tech">
      {/* ── 1. Header ── */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-2.5">
          <TypewriterHeader phrases={PROJECTS_PHRASES} initialDelay={150} />

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E6322A]/8 border border-[#E6322A]/25 text-[#E6322A] text-[9px] font-bold tracking-wider shrink-0 whitespace-nowrap">
              <FolderGit2 className="w-3 h-3 text-[#E6322A] shrink-0" />
              <span>{FEATURED_PROJECTS.length} FEATURED BUILDS</span>
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
              <span>PROJECT GALLERY // HOVER TO EXPAND</span>
            </span>
            <span className="font-mono-tech">
              [{activeIdx + 1}/{FEATURED_PROJECTS.length}] {activeProject.time}
            </span>
          </div>

          {/* Overlapping Polaroid Cards Fan */}
          <div className="relative flex items-center justify-center w-full min-h-[170px] sm:min-h-[185px] overflow-visible py-3">
            {FEATURED_PROJECTS.map((proj, idx) => {
              const isHovered = hoveredIdx === idx;

              // Resting overlap: all cards after first card have negative margin
              const marginClass = idx === 0 ? "" : "-ml-5 sm:-ml-6 md:-ml-7";

              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setSelectedIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleCardClick(idx, proj)}
                  style={{
                    transform: isHovered
                      ? "scale(1.38) translateY(-18px) rotate(0deg)"
                      : `rotate(${proj.rotation}deg) translateY(${proj.offsetY}px)`,
                    zIndex: isHovered ? 50 : idx + 1,
                    transition:
                      "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, z-index 0s",
                  }}
                  className={`relative shrink-0 cursor-pointer ${marginClass} rounded-[3px] bg-white p-1.5 sm:p-2 pb-6 sm:pb-7 ${
                    isHovered
                      ? "shadow-[0_24px_48px_rgba(0,0,0,0.32),0_6px_16px_rgba(0,0,0,0.18)] ring-2 ring-[#E6322A]/60"
                      : "shadow-[0_6px_18px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] border border-[#E2DDD3]"
                  } w-[86px] sm:w-[96px] md:w-[104px] select-none group`}
                >
                  {/* Photo Area */}
                  <div className="relative w-full aspect-square bg-[#1A1917] overflow-hidden rounded-[1px] shadow-[inset_0_0_4px_rgba(0,0,0,0.22)]">
                    <img
                      src={proj.image}
                      alt={proj.name}
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
                        {proj.year} • {proj.time}
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
                      {proj.shortTitle}
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
                className={`px-2 py-0.5 rounded-md border text-[8.5px] font-bold tracking-wider ${activeProject.badgeStyle}`}
              >
                {activeProject.award}
              </span>
              <span className="text-[8.5px] text-[#7A7770] uppercase tracking-wide truncate max-w-[170px] sm:max-w-[240px]">
                {activeProject.event}
              </span>
            </div>

            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/[0.04] border border-[#D8D3C8]/60 text-[8px] text-[#7A7770] shrink-0 font-mono-tech">
              <Clock className="w-2.5 h-2.5 text-[#E6322A]" />
              <span>{activeProject.time}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-2">
            <h4
              className="font-bold text-[12.5px] text-[#111111] flex items-center justify-between group cursor-pointer"
              onClick={() => {
                if (activeProject.link) window.open(activeProject.link, "_blank");
              }}
            >
              <span className="hover:text-[#E6322A] transition-colors">
                {activeProject.name}
              </span>
              <span className="text-[9px] text-[#E6322A] flex items-center gap-1 font-mono-tech shrink-0 ml-2 group-hover:underline">
                <span>View Build</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </h4>
            <p className="text-[10.5px] text-[#555047] leading-relaxed pt-1 font-sans">
              {activeProject.summary}
            </p>
          </div>

          {/* Footer: Tags & Metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8E4DA]/70 text-[8.5px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              {activeProject.tags.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded bg-black/[0.04] text-[#66635D] text-[8px] font-mono-tech"
                >
                  #{t}
                </span>
              ))}
            </div>

            <span className="text-[#111111] font-semibold text-[8px] tracking-wide font-mono-tech shrink-0">
              {activeProject.metrics}
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Sprint Telemetry Status ── */}
      <div className="mt-3 pt-2.5 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[8.5px] text-[#7A7770]">
        <span>[ ARCHITECTURE: FULL-STACK AI & HIGH-THROUGHPUT SYSTEMS ]</span>
        <span className="text-[#111111] font-semibold flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-[#E6322A]" />
          <span>100% PROTOTYPE &rarr; PROD</span>
        </span>
      </div>
    </div>
  );
}
