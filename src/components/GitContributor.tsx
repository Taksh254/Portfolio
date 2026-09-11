"use client";

import React, { useState, useMemo } from "react";
import { ExternalLink, GitCommit, Calendar, Flame } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import contributionsData from "@/data/githubContributions.json";

interface GitContributorProps {
  onOpenGitHub?: () => void;
}

export function GitContributor({ onOpenGitHub }: GitContributorProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    level: number;
    tooltip: string;
  } | null>(null);

  // Group the 370 days into 53 weeks (columns), each week having up to 7 days (Sun..Sat)
  const weeks = useMemo(() => {
    const days = contributionsData.days;
    const result: Array<Array<{ date: string; level: number; tooltip: string }>> = [];
    let currentWeek: Array<{ date: string; level: number; tooltip: string }> = [];

    days.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === days.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, []);

  // Theme-matched palette: Warm terracotta / signature red gradient matching TAKSH.OS
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        // Soft warm blush
        return "bg-[#F6CFCB] border-[#EEA7A1]";
      case 2:
        // Medium terracotta
        return "bg-[#E88680] border-[#DB635B]";
      case 3:
        // Vibrant signature red
        return "bg-[#DE4138] border-[#C42B23]";
      case 4:
        // Deep rich crimson
        return "bg-[#A81812] border-[#8A0E08]";
      default:
        // Paper background neutral
        return "bg-[#EAE6DC] border-[#DDD8CD]";
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* ── 1. Header ── */}
      <div>
        <div className="flex items-center justify-between mb-3.5 border-b border-[#D8D3C8]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
            <span className="text-[10px] sm:text-[10.5px] font-mono-tech tracking-wider text-[#7A7770] uppercase font-semibold">
              // 07 &nbsp; GITHUB // CONTRIBUTIONS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status Pulse */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E6322A]/8 border border-[#E6322A]/25 text-[#E6322A] text-[9.5px] font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A] animate-pulse" />
              <span>LIVE SYNC</span>
            </div>

            {/* View GitHub Link */}
            <a
              href="https://github.com/Taksh254"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10.5px] font-mono-tech text-[#111111] hover:text-[#E6322A] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>@Taksh254</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#7A7770]" />
            </a>
          </div>
        </div>

        {/* ── 2. Primary Contribution Metrics Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono-tech text-[#111111] tracking-tight">
                {contributionsData.totalContributions}
              </span>
              <span className="text-xs font-mono-tech text-[#7A7770] uppercase tracking-wider">
                contributions in the last year
              </span>
            </div>
            <div className="text-[10px] font-mono-tech text-[#8A867E] pt-0.5">
              Across public repositories, active DAG pipelines &amp; open experiments
            </div>
          </div>

          {/* Metric Badges */}
          <div className="flex items-center gap-2 font-mono-tech">
            <div className="px-2.5 py-1 rounded-md bg-black/[0.03] border border-[#D8D3C8]/60 text-center">
              <div className="text-[11px] font-bold text-[#111111]">10</div>
              <div className="text-[8.5px] text-[#7A7770] uppercase">Repos</div>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-black/[0.03] border border-[#D8D3C8]/60 text-center">
              <div className="text-[11px] font-bold text-[#111111]">35</div>
              <div className="text-[8.5px] text-[#7A7770] uppercase">Active Days</div>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-black/[0.03] border border-[#D8D3C8]/60 text-center">
              <div className="text-[11px] font-bold text-[#E6322A]">Active</div>
              <div className="text-[8.5px] text-[#7A7770] uppercase">Cadence</div>
            </div>
          </div>
        </div>

        {/* ── 3. GitHub Calendar Heatmap Matrix ── */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white/65 border border-[#D8D3C8]/80 shadow-2xs overflow-hidden">
          {/* Month labels banner */}
          <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#7A7770] mb-2 px-1">
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pb-1 scrollbar-thin">
            <div className="flex gap-[3px] min-w-[580px]">
              {/* Day of week labels */}
              <div className="flex flex-col justify-between pr-1.5 text-[8.5px] font-mono-tech text-[#A09C91] h-[88px] py-0.5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* 53 Columns of Days */}
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={day.tooltip || `${day.level} contributions on ${day.date}`}
                      className={`w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] rounded-2xs border transition-transform hover:scale-135 hover:z-20 cursor-pointer ${getCellColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Footer: Hover tooltip & Theme Legend */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#E8E4DA] text-[10px] font-mono-tech">
            <div className="text-[#66635D] truncate max-w-[340px]">
              {hoveredDay ? (
                <span className="font-semibold text-[#111111]">
                  {hoveredDay.tooltip || `${hoveredDay.date}`}
                </span>
              ) : (
                <span className="text-[#8A867E]">Hover over cells to inspect daily commits</span>
              )}
            </div>

            {/* Legend matching theme */}
            <div className="flex items-center gap-1 text-[#7A7770] text-[9.5px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#EAE6DC] border border-[#DDD8CD]" title="0 contributions" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#F6CFCB] border border-[#EEA7A1]" title="1-2 contributions" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#E88680] border border-[#DB635B]" title="3-4 contributions" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#DE4138] border border-[#C42B23]" title="5-6 contributions" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#A81812] border border-[#8A0E08]" title="7+ contributions" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Card Bottom Status Strip ── */}
      <div className="mt-3 pt-3 border-t border-[#D8D3C8]/70 flex items-center justify-between text-[9px] font-mono-tech text-[#7A7770]">
        <span>SOURCE: GITHUB.COM/TAKSH254 &bull; 52 WEEKS</span>
        <span className="text-[#111111] font-medium">ACTIVITY INDEX: 100% VERIFIED</span>
      </div>
    </div>
  );
}
