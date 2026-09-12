"use client";

import React from "react";
import { Package, BookOpen, Compass, Newspaper } from "lucide-react";
import { TypewriterHeader } from "./TypewriterHeader";

const CURRENTLY_PHRASES = [
  "// 02  CURRENTLY",
  "// ACTIVE RESEARCH",
  "// REAL-TIME FOCUS",
  "// AUTONOMOUS STACK",
];

export function CurrentlyCard() {
  const ITEMS = [
    {
      label: "Building",
      value: "Research Agent v2",
      icon: Package,
    },
    {
      label: "Learning",
      value: "Transformers & Multi-Agents",
      icon: BookOpen,
    },
    {
      label: "Exploring",
      value: "Robotics & Automation",
      icon: Compass,
    },
    {
      label: "Reading",
      value: "The Pragmatic Programmer",
      icon: Newspaper,
    },
  ];

  return (
    <div className="flex items-start select-none relative w-full min-w-0 max-w-[285px]">
      {/* Main Card Column */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* // 02 CURRENTLY Card */}
        <div className="relative p-3 sm:p-3.5 rounded-xl apple-glass-card shadow-sm">
          {/* Silver Paperclip at Top-Right */}
          <div
            className="absolute -top-3 right-3 pointer-events-none z-20"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="25"
              viewBox="0 0 24 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12 L8 28 A4 4 0 0 0 16 28 L16 8 A6 6 0 0 0 4 8 L4 30 A8 8 0 0 0 20 30 L20 14"
                stroke="#6B7280"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.08] mb-1.5">
            <TypewriterHeader phrases={CURRENTLY_PHRASES} showAccentBar={false} initialDelay={250} />
            <span className="text-[9.5px] font-mono-tech tracking-wider text-[#E6322A] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A] animate-pulse" />
              LIVE
            </span>
          </div>

          {/* 4 Rows */}
          <div className="divide-y divide-black/[0.06]">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="py-1.5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-1.5 text-[#66635D] shrink-0 font-mono-tech">
                    <Icon style={{ width: 12, height: 12, color: "#111111" }} />
                    <span className="text-[10.5px] font-medium">{item.label}</span>
                  </div>
                  <div className="font-sans font-medium text-[11.5px] text-[#111111] text-right truncate">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
