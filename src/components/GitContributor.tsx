"use client";

import React, { useState, useMemo } from "react";
import {
  ExternalLink,
  GitCommit,
  GitBranch,
  Copy,
  Check,
  FolderGit2,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import contributionsData from "@/data/githubContributions.json";

interface GitContributorProps {
  onOpenGitHub?: () => void;
}

export function GitContributor({ onOpenGitHub }: GitContributorProps) {
  const [copied, setCopied] = useState(false);
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

  const handleCopyClone = () => {
    navigator.clipboard.writeText("git clone https://github.com/Taksh254/Portfolio.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cell color classes based on level
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#85E89D] border-[#69D182]";
      case 2:
        return "bg-[#34D058] border-[#2EB64D]";
      case 3:
        return "bg-[#28A745] border-[#1F8637]";
      case 4:
        return "bg-[#196C2E] border-[#125021]";
      default:
        return "bg-[#EAE6DC] border-[#DDD8CD]";
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* ── 1. Header ── */}
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-[#D8D3C8]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
            <span className="text-[10.5px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
              // 07 &nbsp; GITHUB // CONTRIBUTION MATRIX
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status Pulse */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[9.5px] font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE SYNC</span>
            </div>

            {/* View GitHub Link */}
            <a
              href="https://github.com/Taksh254"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10.5px] font-mono-tech text-[#111111] hover:text-[#E6322A] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>@Taksh254</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* ── 2. Identity & Summary Metrics ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <div className="p-2.5 rounded-lg bg-black/[0.02] border border-[#D8D3C8]/60 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-700">
              <GitCommit className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-bold font-mono-tech text-[#111111] leading-none">
                {contributionsData.totalContributions}+
              </div>
              <div className="text-[9px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5 uppercase">
                Contributions
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/[0.02] border border-[#D8D3C8]/60 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-700">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-bold font-mono-tech text-[#111111] leading-none">
                10 Repos
              </div>
              <div className="text-[9px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5 uppercase">
                Public Code
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/[0.02] border border-[#D8D3C8]/60 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-700">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-bold font-mono-tech text-[#111111] leading-none">
                Active
              </div>
              <div className="text-[9px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5 uppercase">
                Commit Cadence
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/[0.02] border border-[#D8D3C8]/60 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-700">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-bold font-mono-tech text-[#111111] leading-none">
                AI / Systems
              </div>
              <div className="text-[9px] font-mono-tech text-[#7A7770] tracking-wider pt-0.5 uppercase">
                Primary Core
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. GitHub Calendar Heatmap Matrix ── */}
        <div className="p-3 sm:p-4 rounded-xl bg-white/60 border border-[#D8D3C8]/80 shadow-2xs overflow-hidden">
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
                      className={`w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] rounded-2xs border transition-transform hover:scale-130 hover:z-20 cursor-pointer ${getCellColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Footer: Hover tooltip & Legend */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#E8E4DA] text-[10px] font-mono-tech">
            <div className="text-[#66635D] truncate max-w-[320px]">
              {hoveredDay ? (
                <span className="font-medium text-[#111111]">
                  {hoveredDay.tooltip || `${hoveredDay.date}`}
                </span>
              ) : (
                <span>Hover over squares to inspect contributions</span>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 text-[#7A7770] text-[9.5px]">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#EAE6DC] border border-[#DDD8CD]" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#85E89D] border-[#69D182]" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#34D058] border-[#2EB64D]" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#28A745] border-[#1F8637]" />
              <span className="w-2.5 h-2.5 rounded-2xs bg-[#196C2E] border-[#125021]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Quick Clone Command Box ── */}
      <div className="mt-3 pt-3 border-t border-[#D8D3C8]/70 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#66635D]">
          <Terminal className="w-3.5 h-3.5 text-[#111111]" />
          <span>Quick Clone:</span>
          <code className="px-2 py-0.5 rounded bg-black/[0.04] border border-[#D8D3C8]/60 text-[#111111] text-[9.5px] font-mono">
            git clone https://github.com/Taksh254/Portfolio.git
          </code>
        </div>

        <button
          onClick={handleCopyClone}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#111111] text-[#FCFAF4] hover:bg-[#262626] text-[10px] font-mono-tech transition-colors cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>COPY COMMAND</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
