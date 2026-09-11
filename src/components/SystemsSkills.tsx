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
    { name: "PYTHON", desc: "Core Engine / PyTorch / FastAsync", icon: Code2 },
    { name: "REACT", desc: "Next.js / TypeScript / WebUI", icon: Atom },
    { name: "NODE.JS", desc: "Server Runtime / Event Loop", icon: Server },
    { name: "LLM / AI", desc: "RAG / LangGraph / Quantization", icon: Brain },
    { name: "AUTOMATION", desc: "Statecharts / DAG Orchestration", icon: Cog },
    { name: "DATABASES", desc: "PostgreSQL / pgvector / Redis", icon: Database },
    { name: "ROBOTICS", desc: "ROS / Edge Vision / Embedded", icon: Grid },
    { name: "GIT", desc: "Version Control / CI/CD Workflows", icon: GitBranch },
  ];

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
        <span className="text-[10.5px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
          // 06 &nbsp; SKILLS // ENGINEERING MODULES
        </span>
      </div>

      {/* Grid of Engineering Module Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-tech">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.name}
              className="p-3.5 rounded-xl apple-glass-card flex flex-col justify-between space-y-2.5 cursor-default transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-md bg-black/[0.04]">
                  <Icon style={{ width: 16, height: 16, color: "#111111" }} />
                </div>
                <span className="text-[8px] tracking-widest text-[#7A7770]">MOD</span>
              </div>
              <div>
                <div className="text-[12px] font-bold text-[#111111] tracking-wide">
                  {m.name}
                </div>
                <div className="text-[9.5px] text-[#66635D] truncate pt-0.5">
                  {m.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
