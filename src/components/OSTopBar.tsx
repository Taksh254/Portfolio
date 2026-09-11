"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Search } from "lucide-react";

interface OSTopBarProps {
  onCommandOpen?: () => void;
  activeTheme?: "paper" | "dark";
  onToggleTheme?: () => void;
}

export function OSTopBar({
  onCommandOpen,
  activeTheme = "paper",
  onToggleTheme,
}: OSTopBarProps) {
  const [time, setTime] = useState("WED, 09 SEP 2026 02:30 PM");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      const d = days[now.getDay()];
      const m = months[now.getMonth()];
      const date = String(now.getDate()).padStart(2, "0");
      const year = now.getFullYear();
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const h = String(hours).padStart(2, "0");
      const min = String(now.getMinutes()).padStart(2, "0");
      setTime(`${d}, ${date} ${m} ${year} ${h}:${min} ${ampm}`);
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      role="banner"
      style={{
        height: "40px",
        backgroundColor:
          activeTheme === "paper"
            ? "rgba(245, 242, 233, 0.40)"
            : "rgba(13, 16, 23, 0.40)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom:
          activeTheme === "paper"
            ? "1px solid rgba(216, 211, 200, 0.40)"
            : "1px solid rgba(45, 55, 72, 0.40)",
      }}
      className="w-full flex items-center justify-between px-4 sm:px-6 text-[10.5px] font-mono-tech text-[#111111] select-none z-50 sticky top-0"
    >
      {/* Left: Date/Time + Location */}
      <div className="flex items-center gap-3">
        <span className="tracking-wide text-[10.5px] text-[#2C2925] font-semibold">
          {time}
        </span>
        <span className="text-[#B8B1A2]">|</span>
        <span className="tracking-widest text-[10.5px] text-[#66635D] font-semibold">
          INDIA
        </span>
      </div>

      {/* Right: Telemetry Load, Online Status, Search, Theme */}
      <div className="flex items-center gap-3.5">
        <div className="hidden sm:flex items-center gap-2.5 text-[10.5px]">
          <span className="text-[#7A7770]">SYS_LOAD</span>
          <span className="font-semibold text-[#111111]">12%</span>
          <span className="text-[#C5BFB2]">|</span>
          <span className="text-[#7A7770]">STATUS</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#235848]">ONLINE</span>
            <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block shadow-[0_0_6px_#10B981]" />
          </div>
        </div>

        <div className="h-3.5 w-[1px] bg-[#D8D3C8]/60 hidden sm:block" />

        {/* Search / Command trigger pill */}
        <button
          onClick={onCommandOpen}
          type="button"
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF7F0]/60 border border-[#D8D3C8]/70 text-[#7A7770] hover:text-[#111111] hover:border-[#B8B1A2] transition-all cursor-pointer shadow-2xs"
        >
          <Search style={{ width: 12, height: 12 }} className="text-[#7A7770]" />
          <span className="text-[10px] text-[#8C8476] hidden md:inline">
            Search anything...
          </span>
          <span className="text-[8.5px] font-mono-tech px-1 py-0.2 rounded border border-[#DDD7CA] bg-[#F2EDE1] text-[#66635D] font-semibold">
            ⌘ K
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          type="button"
          title="Toggle Theme"
          aria-label="Toggle Theme"
          className="p-1 text-[#66635D] hover:text-[#111111] transition-colors cursor-pointer"
        >
          {activeTheme === "paper" ? (
            <Sun style={{ width: 14, height: 14 }} />
          ) : (
            <Moon style={{ width: 14, height: 14 }} />
          )}
        </button>
      </div>
    </header>
  );
}
