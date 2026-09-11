"use client";

import React, { useState } from "react";
import {
  Home,
  FolderGit2,
  FlaskConical,
  BookOpen,
  User,
  Mail,
} from "lucide-react";

interface OSLeftSidebarProps {
  activeSection: string;
  onSelectNav: (id: string) => void;
}

export function OSLeftSidebar({
  activeSection,
  onSelectNav,
}: OSLeftSidebarProps) {
  const [cpu] = useState(12);
  const [mem] = useState("4.2 GB");

  const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "lab", label: "Lab", icon: FlaskConical },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "about", label: "About", icon: User },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside
      className="w-[180px] shrink-0 border-r border-[#D8D3C7] bg-[#F4F1E8]/90 flex flex-col justify-between select-none relative font-mono-tech"
      style={{
        borderRight: "1px solid var(--border, #D8D3C7)",
      }}
    >
      {/* Top Nav Section */}
      <div>
        <nav className="py-2 flex flex-col">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                type="button"
                className={`relative flex items-center gap-3 px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? "font-semibold text-[#111111] bg-black/[0.03]"
                    : "text-[#77736B] hover:text-[#111111] hover:bg-black/[0.02]"
                }`}
              >
                {/* Active Red Bar on left edge */}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 4,
                      bottom: 4,
                      width: 3,
                      backgroundColor: "#D92F27",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}
                <Icon
                  style={{
                    width: 14,
                    height: 14,
                    color: isActive ? "#111111" : "#77736B",
                  }}
                  className="shrink-0"
                />
                <span className="tracking-wide text-[12px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-[#D8D3C7]" />

        {/* System Telemetry */}
        <div className="px-4 py-2 space-y-3">
          <div className="text-[9px] uppercase tracking-widest text-[#77736B]">
            SYSTEM
          </div>

          <div className="space-y-1 text-[10.5px]">
            <div className="flex justify-between items-center text-[#3A3530]">
              <span className="text-[#77736B]">CPU</span>
              <span className="font-semibold">{cpu}%</span>
            </div>
            <div className="flex justify-between items-center text-[#3A3530]">
              <span className="text-[#77736B]">MEM</span>
              <span className="font-semibold">{mem}</span>
            </div>
            <div className="space-y-0.5 text-[#3A3530]">
              <div className="flex justify-between items-center">
                <span className="text-[#77736B]">NET</span>
                <span>↑ 12 KB/s</span>
              </div>
              <div className="flex justify-end text-[#77736B]">
                <span>↓ 8 KB/s</span>
              </div>
            </div>
          </div>

          {/* Mini Line Graph with Points */}
          <div className="pt-1">
            <svg
              viewBox="0 0 140 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-8 overflow-visible"
            >
              {/* Baseline */}
              <line
                x1="0"
                y1="30"
                x2="140"
                y2="30"
                stroke="#D8D3C7"
                strokeWidth="1"
              />
              {/* Grid ticks */}
              <line x1="0" y1="16" x2="140" y2="16" stroke="#E5E0D5" strokeWidth="0.5" strokeDasharray="2 2" />

              {/* Data line */}
              <path
                d="M2 26 L22 24 L42 28 L62 14 L82 22 L102 8 L122 18 L138 12"
                stroke="#B8860B"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {[
                [2, 26],
                [22, 24],
                [42, 28],
                [62, 14],
                [82, 22],
                [102, 8],
                [122, 18],
                [138, 12],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="1.8"
                  fill="#F4F1E8"
                  stroke="#B8860B"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-[#D8D3C7]" />

        {/* Status */}
        <div className="px-4 py-1 space-y-2">
          <div className="text-[9px] uppercase tracking-widest text-[#77736B]">
            STATUS
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1F6B4F] animate-pulse inline-block" />
            <span className="text-[11px] font-bold text-[#1F6B4F] tracking-wide">
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Mountain Sketch */}
      <div className="px-3 pb-2 space-y-3">

        {/* Pencil Mountain Sketch */}
        <div className="w-full opacity-60 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 160 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12"
          >
            {/* Mountain Ridges in Fine Pencil Lines */}
            <path
              d="M0 48 L20 32 L35 40 L60 14 L80 34 L100 20 L125 38 L140 28 L160 48"
              stroke="#77736B"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Shading strokes on ridges */}
            <path
              d="M60 14 L65 48 M100 20 L104 48 M20 32 L22 48"
              stroke="#77736B"
              strokeWidth="0.5"
              strokeDasharray="1 2"
            />
            <path
              d="M52 22 L60 26 M50 28 L62 33 M48 34 L63 39 M45 40 L65 44"
              stroke="#77736B"
              strokeWidth="0.5"
            />
            <path
              d="M92 28 L100 32 M90 35 L102 39 M88 41 L103 44"
              stroke="#77736B"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
}
