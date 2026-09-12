"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { TypewriterHeader } from "./TypewriterHeader";

const ABOUT_PHRASES = [
  "// 08  ABOUT // PROFILE SPECIFICATION",
  "// SYSTEM SPEC: TAKSH SEHRAWAT",
  "// CORE: AI SYSTEMS & ARCHITECTURE",
  "// AVAILABLE FOR RESEARCH & BUILDS",
];

export function AboutSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <TypewriterHeader phrases={ABOUT_PHRASES} className="mb-5" initialDelay={350} />

      {/* Profile Document Sheet */}
      <div className="p-6 md:p-8 apple-glass-card space-y-6 font-mono-tech">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/[0.08] text-xs">
          <div>
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">NAME</div>
            <div className="text-[15px] font-bold text-[#111111]">{PROFILE.name}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">ROLE</div>
            <div className="text-[13px] font-semibold text-[#33312E]">AI Engineer &amp; Developer</div>
          </div>
          <div>
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">LOCATION</div>
            <div className="text-[13px] text-[#555047]">{PROFILE.location}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">AVAILABILITY</div>
            <div className="text-[12px] font-bold text-[#315B50]">● AVAILABLE FOR RESEARCH &amp; BUILDS</div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-2">
          <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">CORE FOCUS</div>
          <div className="flex flex-wrap gap-2">
            {["AI Systems", "Automation", "Software Architecture", "Research", "Robotics"].map((f) => (
              <span
                key={f}
                className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-[#2C261E] text-xs font-medium"
              >
                {f}
              </span>
            ))}
          </div>
        </div>


        {/* Narrative */}
        <div className="font-sans text-xs sm:text-[13px] text-[#555047] leading-relaxed space-y-3 pt-2">
          {PROFILE.narrative.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Process Loop — the mantra rendered as a running state machine */}
        <div className="pt-4 border-t border-black/[0.08] space-y-2.5">
          <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">
            // PROCESS: INFINITE LOOP
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            {PROFILE.mantra.map((step, i) => (
              <React.Fragment key={step}>
                <span className="px-2.5 py-1 rounded-md bg-black/[0.03] border border-black/[0.07] text-[10px] sm:text-[11px] font-mono-tech font-bold tracking-[0.12em] uppercase text-[#111111]">
                  {step}
                </span>
                {i < PROFILE.mantra.length - 1 && (
                  <span className="text-[#E6322A] text-xs font-mono-tech" aria-hidden="true">
                    &rarr;
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="text-[#E6322A] text-sm font-mono-tech ml-0.5" aria-hidden="true">
              &#8635;
            </span>
            <span className="text-[9px] text-[#7A7770] font-mono-tech uppercase tracking-widest ml-1">
              loops to Think
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
