"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface QuickNotesProps {
  onViewAll?: () => void;
}

export function QuickNotes({ onViewAll }: QuickNotesProps) {
  const [items, setItems] = useState([
    {
      id: "task-1",
      text: "Finish research agent pipeline",
      completed: true,
      color: "#111111",
    },
    {
      id: "task-2",
      text: "Write blog on attention",
      completed: true,
      color: "#D92F27",
    },
    {
      id: "task-3",
      text: "Improve portfolio design",
      completed: false,
      color: "#77736B",
    },
    {
      id: "task-4",
      text: "Explore robotics simulation",
      completed: false,
      color: "#77736B",
    },
    {
      id: "task-5",
      text: "Read 2 chapters (Pragmatic Programmer)",
      completed: false,
      color: "#77736B",
    },
  ]);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it))
    );
  };

  return (
    <div className="relative p-5 md:p-6 border-b border-[#D8D3C7] bg-[#FAF9F4]/40 h-full flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#77736B] uppercase font-semibold">
          // 07 &nbsp; QUICK NOTES
        </span>
        <button
          onClick={onViewAll}
          type="button"
          className="text-[10px] font-mono-tech tracking-wider text-[#3A3530] hover:text-[#D92F27] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Main Checklist Body */}
      <div className="flex gap-4 items-end justify-between relative z-10">
        <div className="space-y-2.5 flex-1 max-w-[280px]">
          {items.map((it) => (
            <div
              key={it.id}
              onClick={() => toggle(it.id)}
              className="flex items-center gap-2.5 cursor-pointer group text-xs font-mono-tech"
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: it.completed ? it.color : "transparent",
                  borderColor: it.completed ? it.color : "#9E9789",
                }}
                className="border flex items-center justify-center shrink-0 transition-colors"
              >
                {it.completed && (
                  <Check style={{ width: 10, height: 10, color: "#FAF9F4", strokeWidth: 3 }} />
                )}
              </div>

              {/* Text */}
              <span
                style={{
                  color: it.completed ? "#3A3530" : "#555047",
                  textDecoration: it.completed ? "none" : "none",
                }}
                className="text-[11.5px] leading-tight truncate group-hover:text-[#111111]"
              >
                {it.text}
              </span>
            </div>
          ))}
        </div>

        {/* Right side: Handwriting Script "Progress > Perfection." */}
        <div className="shrink-0 text-right pb-1">
          <div className="font-handwriting text-[19px] text-[#2C261E] leading-none">
            Progress
          </div>
          <div className="font-handwriting text-[15px] text-[#8C8272] leading-tight pl-2">
            &gt;
          </div>
          <div className="font-handwriting text-[19px] text-[#2C261E] leading-none">
            Perfection.
          </div>
        </div>
      </div>

      {/* City Skyline Pencil Sketch in Bottom-Right Corner */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 z-0">
        <svg
          width="120"
          height="50"
          viewBox="0 0 160 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Skyline Building Outlines */}
          <path
            d="M0 70 L0 50 L12 50 L12 35 L20 35 L20 15 L24 15 L24 35 L32 35 L32 55 L45 55 L45 25 L55 25 L55 10 L58 4 L61 10 L61 25 L75 25 L75 45 L90 45 L90 30 L102 30 L102 20 L106 8 L110 20 L110 50 L125 50 L125 38 L140 38 L140 60 L160 60 L160 70 Z"
            stroke="#77736B"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Window grid ticks */}
          <line x1="20" y1="22" x2="24" y2="22" stroke="#77736B" strokeWidth="0.5" />
          <line x1="20" y1="28" x2="24" y2="28" stroke="#77736B" strokeWidth="0.5" />
          <line x1="50" y1="32" x2="52" y2="32" stroke="#77736B" strokeWidth="0.5" />
          <line x1="50" y1="38" x2="52" y2="38" stroke="#77736B" strokeWidth="0.5" />
          <line x1="95" y1="36" x2="98" y2="36" stroke="#77736B" strokeWidth="0.5" />
          <line x1="95" y1="42" x2="98" y2="42" stroke="#77736B" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}
