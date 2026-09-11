"use client";

import React from "react";

export function PolaroidPhoto() {
  return (
    <div className="relative flex items-center justify-center select-none py-1">
      {/* ── Background Subtle Framing Lines & Crosshairs ── */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
        <div className="w-[280px] h-[310px] border border-dashed border-[#8C8476]/50 rounded-xs relative">
          <span className="absolute -top-2 -left-2 text-[#8C8476] text-xs font-mono">+</span>
          <span className="absolute -top-2 -right-2 text-[#8C8476] text-xs font-mono">+</span>
          <span className="absolute -bottom-2 -left-2 text-[#8C8476] text-xs font-mono">+</span>
          <span className="absolute -bottom-2 -right-2 text-[#8C8476] text-xs font-mono">+</span>
        </div>
      </div>

      {/* ── Polaroid Frame ── */}
      <div className="relative z-10 hover:scale-[1.02] transition-transform duration-500 ease-out">
        <div className="w-[185px] sm:w-[205px] md:w-[220px] lg:w-[230px]">
          <img
            src="/polaroid-transparent.png"
            alt="Taksh Sehrawat — Keep Building Polaroid"
            className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)] block"
            loading="eager"
          />
        </div>
      </div>

    </div>
  );
}
