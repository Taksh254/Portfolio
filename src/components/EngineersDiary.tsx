"use client";

import React from "react";
import { TypewriterHeader } from "./TypewriterHeader";

const DIARY_PHRASES = [
  "// 04  ENGINEER'S DIARY",
  "// LAB NOTES & ARCHITECTURE",
  "// TRANSFORMERS & ATTENTION",
  "// DISTRIBUTED REASONING",
];

interface EngineersDiaryProps {
  onSelectEntry?: (id: string) => void;
  onViewAll?: () => void;
}

export function EngineersDiary({
  onSelectEntry,
  onViewAll,
}: EngineersDiaryProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <TypewriterHeader phrases={DIARY_PHRASES} initialDelay={200} />
        <button
          onClick={onViewAll}
          type="button"
          className="text-[10px] font-mono-tech tracking-wider text-[#33312E] hover:text-[#E6322A] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Content: Left is Entries, Right is Architecture Diagrams */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Left: 2 Entries */}
        <div className="flex-1 space-y-2.5 w-full">
          {/* Entry 1 */}
          <article
            onClick={() => onSelectEntry?.("note-01")}
            className="group p-2.5 rounded-xl apple-glass-card cursor-pointer space-y-1"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A] inline-block shrink-0" />
              <span className="text-[10px] font-mono-tech text-[#7A7770] font-medium tracking-wide">
                09.09.26
              </span>
            </div>
            <h4 className="font-mono-tech font-bold text-[12px] text-[#111111] group-hover:text-[#E6322A] transition-colors">
              Understanding Attention
            </h4>
            <p className="text-[10px] text-[#555047] leading-snug">
              Attention allows a model to focus on relevant parts of the input.
              The magic is in the weights.
            </p>
            <div className="text-[8.5px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5">
              #transformers &nbsp; #deep-learning
            </div>
          </article>

          {/* Entry 2 */}
          <article
            onClick={() => onSelectEntry?.("note-02")}
            className="group p-2.5 rounded-xl apple-glass-card cursor-pointer space-y-1"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A] inline-block shrink-0" />
              <span className="text-[10px] font-mono-tech text-[#7A7770] font-medium tracking-wide">
                08.09.26
              </span>
            </div>
            <h4 className="font-mono-tech font-bold text-[12px] text-[#111111] group-hover:text-[#E6322A] transition-colors">
              Building Autonomous Agents
            </h4>
            <p className="text-[10px] text-[#555047] leading-snug">
              Agents need memory, planning and tools. The combination creates
              intelligence.
            </p>
            <div className="text-[8.5px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5">
              #agents &nbsp; #automation
            </div>
          </article>
        </div>

        {/* Right: Technical Architecture Diagrams (Attention Q-K-V and Agent Feedback Loop) */}
        <div className="w-full sm:w-[145px] shrink-0 flex flex-col items-center justify-center space-y-2 pt-0.5 pointer-events-none select-none font-mono-tech text-[8px] text-[#4A453C]">
          {/* Top Diagram: Attention Matrix Q-K-V */}
          <div className="flex flex-col items-center space-y-0.5 p-2 rounded-xl apple-glass-card w-full">
            <span className="font-handwriting text-[12px] text-[#2C261E] italic">
              attention
            </span>
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              <div className="flex flex-col items-center">
                <span className="w-4.5 h-4.5 rounded-xs border border-[#8C8476] flex items-center justify-center bg-white text-[6.5px]">
                  &bull;&bull;&bull;
                </span>
                <span className="text-[7px] font-bold text-[#111111] mt-0.5">Q</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-4.5 h-4.5 rounded-xs border border-[#8C8476] flex items-center justify-center bg-white text-[6.5px]">
                  &bull;&bull;&bull;
                </span>
                <span className="text-[7px] font-bold text-[#111111] mt-0.5">K</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-4.5 h-4.5 rounded-xs border border-[#8C8476] flex items-center justify-center bg-white text-[6.5px]">
                  &bull;&bull;&bull;
                </span>
                <span className="text-[7px] font-bold text-[#111111] mt-0.5">V</span>
              </div>
            </div>
            {/* Soft grid lines */}
            <div className="w-4/5 h-[1px] bg-[#DDD7CA] my-0.5" />
            <div className="text-[6px] text-[#7A7770]">Softmax(QK^T / &radic;d)</div>
          </div>

          {/* Bottom Diagram: Autonomous Agent Feedback Loop (Plan, Observe, Act, Memory) */}
          <div className="flex flex-col items-center p-2 rounded-xl apple-glass-card w-full text-[6.5px]">
            {/* Plan */}
            <div className="px-2 py-0.2 rounded-xs border border-[#8C8476] bg-white text-center font-bold">
              plan
            </div>
            {/* Middle Row: Observe & Act */}
            <div className="w-full flex items-center justify-between px-1 my-0.5">
              <div className="px-1.5 py-0.2 rounded-xs border border-[#8C8476] bg-white font-bold">
                observe
              </div>
              <span className="text-[6.5px] text-[#A8A295]">&harr;</span>
              <div className="px-1.5 py-0.2 rounded-xs border border-[#8C8476] bg-white font-bold">
                act
              </div>
            </div>
            {/* Memory */}
            <div className="px-2 py-0.2 rounded-xs border border-[#8C8476] bg-white text-center font-bold">
              memory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
