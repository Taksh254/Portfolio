"use client";

import React, { useState, useEffect } from "react";

export function OSTopBar() {
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
        backgroundColor: "rgba(245, 242, 233, 0.40)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(216, 211, 200, 0.40)",
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
      </div>
    </header>
  );
}
