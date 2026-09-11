"use client";

import React, { useState } from "react";
import { User, Terminal, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { LinkSubWindow, LinkTarget } from "./LinkSubWindow";

interface AboutWindowProps {
  onClose?: () => void;
}

export function AboutWindow({ onClose }: AboutWindowProps = {}) {
  const [activeSubWindow, setActiveSubWindow] = useState<LinkTarget | null>(null);

  const getTargetFromLabel = (label: string): LinkTarget => {
    if (label.toLowerCase().includes("github")) return "github";
    if (label.toLowerCase().includes("linkedin")) return "linkedin";
    if (label.toLowerCase().includes("x") || label.toLowerCase().includes("twitter")) return "x";
    return "email";
  };

  return (
    <div className="max-w-3xl mx-auto font-sans text-[#EDEDED] space-y-8 pb-8">
      {/* Link Sub Window */}
      {activeSubWindow && (
        <LinkSubWindow
          target={activeSubWindow}
          onClose={() => setActiveSubWindow(null)}
        />
      )}

      {/* Header Profile Document */}
      <header className="border-b border-[#202634] pb-6 space-y-4 font-mono-tech">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5D6475]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
            <span>IDENTIFIER / SPEC_ID #TK-01</span>
          </div>
          <span>BUILD: {PROFILE.version} • {PROFILE.location}</span>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#E5484D] font-bold tracking-widest uppercase">
            NAME / PRINCIPAL ENGINEER
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
            {PROFILE.name}
          </h1>
        </div>

        {/* Focus Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {PROFILE.focus.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 bg-[#161B26] border border-[#232938] rounded-lg text-xs font-mono-tech text-[#EDEDED] font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* Narrative & Philosophy */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF] border-b border-[#202634] pb-2">
          01 // BIOGRAPHY &amp; ENGINEERING CONTEXT
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[#B0B7C6] leading-relaxed">
          {PROFILE.narrative.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF] border-b border-[#202634] pb-2">
          02 // OPERATIONAL PRINCIPLES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#12151D] border border-[#202634] rounded-xl space-y-1.5"
            >
              <div className="text-xs font-bold font-mono-tech text-[#E5484D]">
                [ PRINCIPLE 0{idx + 1} ]
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#FFFFFF]">
                {pr.title}
              </h3>
              <p className="text-xs text-[#8E95A5] leading-relaxed">
                {pr.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Toolchain Matrix */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF] border-b border-[#202634] pb-2">
          03 // ACTIVE TOOLCHAIN &amp; RUNTIME STACK
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech">
          {PROFILE.toolchain.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#12151D] border border-[#202634] rounded-xl space-y-2"
            >
              <div className="text-[10px] text-[#5D6475] uppercase tracking-wider">
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 bg-[#161B26] border border-[#232938] rounded text-xs text-[#EDEDED]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Network Handles */}
      <section className="space-y-3 font-mono-tech text-xs pt-4 border-t border-[#202634]">
        <div className="text-[10px] text-[#5D6475] uppercase">
          COMMUNICATION CHANNELS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PROFILE.links.map((link) => (
            <button
              key={link.label}
              onClick={() => setActiveSubWindow(getTargetFromLabel(link.label))}
              className="p-3 bg-[#12151D] border border-[#202634] hover:border-[#E5484D] rounded-xl flex items-center justify-between transition-colors text-left cursor-pointer group"
            >
              <div>
                <div className="text-[9px] text-[#5D6475]">{link.label}</div>
                <div className="text-xs text-[#EDEDED] font-semibold group-hover:text-[#E5484D]">
                  {link.handle}
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5D6475] group-hover:text-[#E5484D]" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
