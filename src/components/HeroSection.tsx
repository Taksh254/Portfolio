"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { PolaroidPhoto } from "./PolaroidPhoto";
import { CurrentlyCard } from "./CurrentlyCard";
import { GlassMusicPlayer } from "./GlassMusicPlayer";
import { TypewriterHeader } from "./TypewriterHeader";

const HERO_PHRASES = [
  "// 01  WELCOME // TAKSH.OS",
  "// AI SYSTEMS & ARCHITECTURE",
  "// SYSTEM ONLINE: ALL NOMINAL",
  "// KERNEL v2.1.0 // INITIALIZED",
];

interface HeroSectionProps {
  onExploreClick?: () => void;
  onDiaryClick?: () => void;
}

export function HeroSection({
  onExploreClick,
  onDiaryClick,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="w-full pt-1 pb-1 md:pt-2 md:pb-2 relative select-text"
    >
      {/* 12-Column Balanced Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-3 items-center">
        {/* ── Left 5 Columns: Welcome, Identity, Bio, CTAs & Annotation ── */}
        <div className="lg:col-span-5 space-y-1.5 relative pr-1">
          {/* Section Identifier */}
          <TypewriterHeader phrases={HERO_PHRASES} initialDelay={100} />

          <div className="relative">
            {/* Heading with Serif Typography */}
            <div className="space-y-0.5">
              <div className="font-serif-editorial text-2xl sm:text-[26px] text-[#111111] font-normal leading-tight">
                Hello, I&apos;m
              </div>
              <h1 className="font-serif-display text-4xl sm:text-[46px] xl:text-[50px] font-bold text-[#111111] tracking-tight leading-[1.02]">
                Taksh<br />Sehrawat<span className="text-[#E6322A] ml-0.5 font-bold">.</span>
              </h1>
            </div>


          </div>

          {/* Subtitle */}
          <div className="text-[10px] sm:text-[10.5px] font-mono-tech tracking-[0.22em] text-[#66635D] font-bold mt-1 uppercase">
            AI ENGINEER &amp; DEVELOPER
          </div>

          {/* Bio Description */}
          <p className="text-[11.5px] sm:text-xs text-[#555047] leading-relaxed max-w-sm mt-0.5">
            I build intelligent systems, automate workflows, and experiment with
            ideas that push boundaries.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 pt-1.5">
            <button
              onClick={onExploreClick}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#111111] text-[#FCFAF4] text-[11px] font-mono-tech font-medium tracking-wider hover:bg-[#262626] transition-colors cursor-pointer shadow-xs"
            >
              <span>Explore My Work</span>
              <span className="text-xs leading-none">&rarr;</span>
            </button>

            <button
              onClick={onDiaryClick}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#FCFAF4] border border-[#D8D3C8] text-[#111111] text-[11px] font-mono-tech font-medium tracking-wider hover:bg-white hover:border-[#B8B1A2] transition-colors cursor-pointer shadow-2xs"
            >
              <BookOpen style={{ width: 12, height: 12 }} />
              <span>Open Diary</span>
            </button>
          </div>
        </div>

        {/* ── Center 4 Columns: Polaroid Photo ── */}
        <div className="lg:col-span-4 flex items-center justify-center py-1 lg:py-0">
          <PolaroidPhoto />
        </div>

        {/* ── Right 3 Columns: Currently Panel & Glass Music Player ── */}
        <div className="lg:col-span-3 min-w-0 w-full flex flex-col items-center lg:items-end gap-3 pt-3 lg:pt-4">
          <CurrentlyCard />
          <GlassMusicPlayer />
        </div>
      </div>
    </section>
  );
}
