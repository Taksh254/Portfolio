"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export function AboutSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
        <span className="text-[10.5px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
          // 07 &nbsp; ABOUT // PROFILE SPECIFICATION
        </span>
      </div>

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
      </div>
    </div>
  );
}
