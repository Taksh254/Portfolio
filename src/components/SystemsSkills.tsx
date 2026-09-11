"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Atom,
  Server,
  Brain,
  Cog,
  Database,
  Grid,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function SystemsSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<0 | 1>(0);

  const MODULES_PAGE_1 = [
    { code: "MOD.01", name: "PYTHON", desc: "Core / PyTorch / Async", icon: Code2 },
    { code: "MOD.02", name: "REACT", desc: "Next.js / TypeScript", icon: Atom },
    { code: "MOD.03", name: "NODE.JS", desc: "Server / Event Loop", icon: Server },
    { code: "MOD.04", name: "LLM / AI", desc: "RAG / LangGraph / Quant", icon: Brain },
  ];

  const MODULES_PAGE_2 = [
    { code: "MOD.05", name: "AUTOMATION", desc: "Statecharts / DAG", icon: Cog },
    { code: "MOD.06", name: "DATABASES", desc: "PostgreSQL / pgvector", icon: Database },
    { code: "MOD.07", name: "ROBOTICS", desc: "ROS / Edge Vision", icon: Grid },
    { code: "MOD.08", name: "GIT / CI", desc: "CI/CD / Orchestration", icon: GitBranch },
  ];

  // Scroll down to scroll right: automatically advances to page 2 as the user scrolls down
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight =
              window.innerHeight || document.documentElement.clientHeight;

            // When user scrolls down and section is in lower half vs upper half of viewport
            const triggerPoint = windowHeight * 0.45;
            if (rect.top < triggerPoint && rect.bottom > 120) {
              setActivePage(1);
            } else if (rect.top >= triggerPoint) {
              setActivePage(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderModuleCard = (m: (typeof MODULES_PAGE_1)[0]) => {
    const Icon = m.icon;
    return (
      <div
        key={m.name}
        className="p-2.5 sm:p-3 rounded-xl apple-glass-card flex flex-col justify-between space-y-1.5 cursor-default transition-all hover:border-[#111111]/30 hover:scale-[1.01]"
      >
        <div className="flex items-center justify-between">
          <div className="p-1.5 rounded-md bg-black/[0.04]">
            <Icon style={{ width: 14, height: 14, color: "#111111" }} />
          </div>
          <span className="text-[8px] tracking-widest text-[#7A7770] font-bold">
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
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col justify-between select-none"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
            <span className="text-[9.5px] sm:text-[10px] font-mono-tech tracking-wider text-[#7A7770] uppercase font-semibold">
              // 06 &nbsp; SKILLS // MODULES
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Page indicator pill */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/[0.04] border border-[#D8D3C8]/60 text-[8.5px] font-mono-tech text-[#7A7770]">
              <span>{activePage === 0 ? "MOD 01-04" : "MOD 05-08"}</span>
              <span className="text-[#111111] font-bold">
                [{activePage + 1}/2]
              </span>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setActivePage(0)}
                disabled={activePage === 0}
                className={`p-1 rounded-md transition-colors ${
                  activePage === 0
                    ? "text-[#C0BCB3] cursor-default"
                    : "text-[#111111] hover:bg-black/[0.05] cursor-pointer"
                }`}
                title="Show modules 01-04"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActivePage(1)}
                disabled={activePage === 1}
                className={`p-1 rounded-md transition-colors ${
                  activePage === 1
                    ? "text-[#C0BCB3] cursor-default"
                    : "text-[#111111] hover:bg-black/[0.05] cursor-pointer"
                }`}
                title="Show modules 05-08"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2x2 Square Grid Slider: Shows 4 things first, then slides right */}
        <div className="w-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {/* Page 1: MOD 01 to 04 */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 font-mono-tech pr-1">
              {MODULES_PAGE_1.map((m) => renderModuleCard(m))}
            </div>

            {/* Page 2: MOD 05 to 08 */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 font-mono-tech pl-1">
              {MODULES_PAGE_2.map((m) => renderModuleCard(m))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status with Dot Indicator */}
      <div className="mt-3 pt-2.5 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono-tech text-[#7A7770]">
        <span>[ ARCH: LINUX &bull; RUNTIME: NODE+PY ]</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActivePage(0)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              activePage === 0 ? "w-4 bg-[#E6322A]" : "bg-[#D8D3C8]"
            }`}
            title="Page 1"
          />
          <button
            type="button"
            onClick={() => setActivePage(1)}
            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
              activePage === 1 ? "w-4 bg-[#E6322A]" : "bg-[#D8D3C8]"
            }`}
            title="Page 2"
          />
        </div>
      </div>
    </div>
  );
}
