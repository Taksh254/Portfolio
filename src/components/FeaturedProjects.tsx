"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface FeaturedProjectsProps {
  onSelectProject?: (id: string) => void;
  onViewAll?: () => void;
}

export function FeaturedProjects({
  onSelectProject,
  onViewAll,
}: FeaturedProjectsProps) {
  const PROJECTS = [
    {
      num: "01",
      id: "tatvam-chatbot",
      title: "Tatvam Chatbot",
      desc: "Conversational AI system with memory & context.",
      tags: ["Python", "React", "LLM"],
      preview: "chat",
    },
    {
      num: "02",
      id: "research-agent",
      title: "Research Agent",
      desc: "Autonomous research agent that finds, analyzes & reports.",
      tags: ["Python", "LangChain", "API"],
      preview: "dag",
    },
    {
      num: "03",
      id: "attendance-system",
      title: "Attendance System",
      desc: "Automated attendance management system.",
      tags: ["React", "Node", "MongoDB"],
      preview: "dashboard",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
          // 03 &nbsp; FEATURED PROJECTS
        </div>
        <button
          onClick={onViewAll}
          type="button"
          className="text-[10px] font-mono-tech tracking-wider text-[#33312E] hover:text-[#E6322A] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* 3 Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject?.(p.id)}
            className="group p-2.5 sm:p-3 apple-glass-card cursor-pointer flex flex-col justify-between"
          >
            {/* UI Preview Thumbnail */}
            <div className="w-full h-20 sm:h-22 rounded-lg overflow-hidden relative mb-2 select-none border border-black/10 flex flex-col justify-between shadow-2xs">
              {p.preview === "chat" && (
                <div className="w-full h-full bg-[#11141B] p-1.5 flex gap-1.5 font-mono-tech text-[8px] text-[#A0AEC0]">
                  {/* Left Sidebar */}
                  <div className="w-1/4 h-full bg-[#161B26] rounded-2xs p-1 flex flex-col justify-between border-r border-[#22293A]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A]" />
                        <span className="text-[7.5px] font-bold text-white tracking-wide">Tatvam</span>
                      </div>
                      <div className="w-full h-0.5 bg-[#283246] rounded-xs" />
                      <div className="w-4/5 h-0.5 bg-[#283246] rounded-xs" />
                      <div className="w-3/5 h-0.5 bg-[#283246] rounded-xs" />
                    </div>
                    <div className="w-full h-1 bg-[#1F2738] rounded-xs" />
                  </div>
                  {/* Main Chat Area */}
                  <div className="flex-1 h-full flex flex-col justify-between">
                    <div className="space-y-1 pt-0.5">
                      {/* User message */}
                      <div className="self-end w-3/4 bg-[#1E2536] border border-[#2B354C] rounded-2xs p-0.5 ml-auto text-[6.5px] text-[#E2E8F0] truncate">
                        Explain attention KV caching...
                      </div>
                      {/* Assistant response */}
                      <div className="w-full bg-[#161B26] border border-[#232B3E] rounded-2xs p-0.5 space-y-0.5 text-[6.5px] text-[#CBD5E1]">
                        <div className="w-full h-0.5 bg-[#3A4762] rounded-xs" />
                        <div className="w-5/6 h-0.5 bg-[#3A4762] rounded-xs" />
                      </div>
                    </div>
                    {/* Input box */}
                    <div className="w-full h-3 bg-[#181F2E] border border-[#283248] rounded-xs flex items-center px-1.5 justify-between text-[6.5px] text-[#718096]">
                      <span>Ask Tatvam...</span>
                      <span className="text-[#38BDF8]">&crarr;</span>
                    </div>
                  </div>
                </div>
              )}

              {p.preview === "dag" && (
                <div className="w-full h-full bg-[#0E1219] p-1.5 relative flex items-center justify-center font-mono-tech text-[6.5px]">
                  {/* Top-Left Node */}
                  <div className="absolute left-2 top-2 px-1 py-0.5 rounded-2xs bg-[#162032] border border-[#38BDF8]/60 text-[#7DD3FC] flex items-center gap-1 shadow-xs">
                    <span className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                    <span>Query</span>
                  </div>

                  {/* Middle Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-7 px-1 py-0.5 rounded-2xs bg-[#241A34] border border-[#C084FC]/60 text-[#E9D5FF] flex items-center gap-1 shadow-xs">
                    <span className="w-1 h-1 rounded-full bg-[#C084FC]" />
                    <span>Planner</span>
                  </div>

                  {/* Right Node */}
                  <div className="absolute right-2 top-2 px-1 py-0.5 rounded-2xs bg-[#132A20] border border-[#4ADE80]/60 text-[#86EFAC] flex items-center gap-1 shadow-xs">
                    <span className="w-1 h-1 rounded-full bg-[#4ADE80]" />
                    <span>Synthesis</span>
                  </div>

                  {/* Connecting SVG Curves */}
                  <svg className="w-full h-full" viewBox="0 0 160 80" fill="none">
                    <path d="M42 16 C70 16, 70 38, 80 38" stroke="#3A4864" strokeWidth="1.2" strokeDasharray="3 3" />
                    <path d="M100 38 C115 38, 115 16, 126 16" stroke="#3A4864" strokeWidth="1.2" />
                    <circle cx="80" cy="38" r="2" fill="#C084FC" />
                    <circle cx="42" cy="16" r="1.5" fill="#38BDF8" />
                    <circle cx="126" cy="16" r="1.5" fill="#4ADE80" />
                  </svg>
                  <div className="absolute bottom-1 right-2 text-[6px] text-[#64748B]">
                    DAG RUNNING &bull; 140ms
                  </div>
                </div>
              )}

              {p.preview === "dashboard" && (
                <div className="w-full h-full bg-[#FFFFFF] p-1.5 flex flex-col justify-between font-sans text-[6.5px] text-[#4A5568]">
                  {/* Top KPI Widgets */}
                  <div className="grid grid-cols-3 gap-1">
                    <div className="p-0.5 rounded-2xs bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
                      <span className="text-[6px] text-[#166534] font-semibold">99.4%</span>
                      <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                    </div>
                    <div className="p-0.5 rounded-2xs bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between">
                      <span className="text-[6px] text-[#1E40AF] font-semibold">34ms</span>
                      <span className="w-1 h-1 rounded-full bg-[#3B82F6]" />
                    </div>
                    <div className="p-0.5 rounded-2xs bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between">
                      <span className="text-[6px] text-[#6B21A8] font-semibold">Live</span>
                      <span className="w-1 h-1 rounded-full bg-[#A855F7]" />
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-0.5 py-0.5 border-t border-b border-[#F1F5F9]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#E2E8F0] inline-block" />
                        <span className="text-[6.5px] font-medium text-[#1E293B]">Taksh S.</span>
                      </div>
                      <span className="px-1 py-0.2 rounded-2xs bg-[#DCFCE7] text-[#15803D] text-[5.5px] font-bold">VERIFIED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#E2E8F0] inline-block" />
                        <span className="text-[6.5px] font-medium text-[#1E293B]">Research Node</span>
                      </div>
                      <span className="px-1 py-0.2 rounded-2xs bg-[#DCFCE7] text-[#15803D] text-[5.5px] font-bold">ACTIVE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[6px] text-[#94A3B8]">
                    <span>Automated Edge Sync</span>
                    <span>Sheets &bull; WhatsApp</span>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-0.5 mb-1 font-mono-tech">
              <div className="text-[11.5px] font-semibold text-[#111111] group-hover:text-[#E6322A] transition-colors flex items-center">
                <span className="text-[#7A7770] font-normal mr-1.5">{p.num}</span>
                <span>{p.title}</span>
              </div>
              <p className="text-[10px] text-[#555047] leading-snug font-sans line-clamp-2">
                {p.desc}
              </p>
            </div>

            {/* Tags and Arrow */}
            <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.06]">
              <div className="flex items-center gap-1 flex-wrap">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8.5px] font-mono-tech px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.06] text-[#4A453C]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight
                style={{ width: 13, height: 13 }}
                className="text-[#7A7770] group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
