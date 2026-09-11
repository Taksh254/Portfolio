"use client";

import React from "react";
import {
  Code2,
  Atom,
  Server,
  Brain,
  Cog,
  Database,
  Grid,
  GitBranch,
} from "lucide-react";

export function SystemsSkills() {
  const MODULES = [
    { code: "MOD.01", name: "PYTHON", desc: "Core / PyTorch / Async", icon: Code2 },
    { code: "MOD.02", name: "REACT", desc: "Next.js / TypeScript", icon: Atom },
    { code: "MOD.03", name: "NODE.JS", desc: "Server / Event Loop", icon: Server },
    { code: "MOD.04", name: "LLM / AI", desc: "RAG / LangGraph / Quant", icon: Brain },
    { code: "MOD.05", name: "AUTOMATION", desc: "Statecharts / DAG", icon: Cog },
    { code: "MOD.06", name: "DATABASES", desc: "PostgreSQL / pgvector", icon: Database },
    { code: "MOD.07", name: "ROBOTICS", desc: "ROS / Edge Vision", icon: Grid },
    { code: "MOD.08", name: "GIT / CI", desc: "CI/CD / Orchestration", icon: GitBranch },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
            <span className="text-[9.5px] sm:text-[10px] font-mono-tech tracking-wider text-[#7A7770] uppercase font-semibold">
              // 06 &nbsp; SKILLS // ENGINEERING MODULES
            </span>
          </div>
          <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded-full bg-black/[0.04] text-[#7A7770] border border-[#D8D3C8]/60">
            8/8 LOADED
          </span>
        </div>

        {/* 2x4 Square Grid of Engineering Module Tiles */}
        <div className="grid grid-cols-2 gap-2.5 font-mono-tech">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className="p-2.5 sm:p-3 rounded-xl apple-glass-card flex flex-col justify-between space-y-2 cursor-default transition-all hover:border-[#111111]/30 hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-md bg-black/[0.04]">
                    <Icon style={{ width: 14, height: 14, color: "#111111" }} />
                  </div>
                  <span className="text-[8px] tracking-widest text-[#7A7770]">
                    {m.code}
                  </span>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold text-[#111111] tracking-wide">
                    {m.name}
                  </div>
                  <div className="text-[9px] text-[#66635D] truncate pt-0.5">
                    {m.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-3 pt-3 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono-tech text-[#7A7770]">
        <span>[ ARCH: LINUX/POSIX &bull; RUNTIME: NODE+PY ]</span>
        <span className="text-emerald-700 font-medium">ALL NOMINAL</span>
      </div>
    </div>
  );
}

