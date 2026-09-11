"use client";

import React, { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
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

  // Filter contributions to start from November (2025-11-02, first Sunday of November)
  const { weeks, monthMap } = useMemo(() => {
    const MONTH_NAMES = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Filter starting from November 2025 (aligned to Sunday Nov 2nd)
    const filteredDays = contributionsData.days.filter((d) => d.date >= "2025-11-02");

    const weeksResult: Array<Array<{ date: string; level: number; tooltip: string }>> = [];
    let currentWeek: Array<{ date: string; level: number; tooltip: string }> = [];

    filteredDays.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === filteredDays.length - 1) {
        weeksResult.push(currentWeek);
        currentWeek = [];
      }
    });

    // Map each week to a month label if a month starts or is introduced in that week
    const monthLabels = new Map<number, string>();
    let lastMonth = -1;

    weeksResult.forEach((week, wIdx) => {
      if (week.length > 0) {
        const monthNum = parseInt(week[0].date.split("-")[1], 10) - 1;
        if (monthNum !== lastMonth) {
          monthLabels.set(wIdx, MONTH_NAMES[monthNum]);
          lastMonth = monthNum;
        }
      }
    });

    return { weeks: weeksResult, monthMap: monthLabels };
  }, []);

  // Theme-matched palette: Warm terracotta / signature red gradient matching TAKSH.OS
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#F6CFCB] border-[#EEA7A1]";
      case 2:
        return "bg-[#E88680] border-[#DB635B]";
      case 3:
        return "bg-[#DE4138] border-[#C42B23]";
      case 4:
        return "bg-[#A81812] border-[#8A0E08]";
      default:
        return "bg-[#EAE6DC] border-[#DDD8CD]";
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* ── Top Bar: Taksh254 on the right top corner ── */}
      <div className="flex items-center justify-end w-full pb-3 border-b border-[#D8D3C8]/70">
        <a
          href="https://github.com/Taksh254"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onOpenGitHub) {
              e.preventDefault();
              onOpenGitHub();
            }
          }}
          className="flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-[#111111] hover:text-[#E6322A] transition-colors group cursor-pointer"
        >
          <GithubIcon className="w-3.5 h-3.5 text-[#111111] group-hover:text-[#E6322A] transition-colors" />
          <span>Taksh254</span>
          <ExternalLink className="w-2.5 h-2.5 text-[#7A7770] group-hover:text-[#E6322A] transition-colors" />
        </a>
      </div>

      {/* ── GitHub Calendar Heatmap Matrix (Starting from November) ── */}
      <div className="my-auto py-3 sm:py-6">
        {/* Matrix Grid with scroll containment */}
        <div className="overflow-x-auto pb-1 scrollbar-none">
          {/* Month labels banner aligned to week columns */}
          <div className="flex gap-[2px] pl-[22px] pr-4 mb-2 text-[8px] sm:text-[8.5px] font-mono-tech text-[#7A7770] h-3.5 relative">
            {weeks.map((_, wIdx) => {
              const label = monthMap.get(wIdx);
              return (
                <div
                  key={wIdx}
                  className="w-[7px] sm:w-[8px] md:w-[8.5px] lg:w-[7.2px] xl:w-[8.5px] 2xl:w-[9.5px] shrink-0 relative"
                >
                  {label && (
                    <span
                      className={`absolute top-0 whitespace-nowrap ${
                        wIdx >= weeks.length - 2 ? "right-0" : "left-0"
                      }`}
                    >
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-[2px] pr-4">
            {/* Day of week labels */}
            <div className="flex flex-col justify-between pr-1 text-[7.5px] sm:text-[8px] font-mono-tech text-[#A09C91] h-[64px] sm:h-[72px] md:h-[76px] lg:h-[66px] xl:h-[76px] 2xl:h-[84px] py-0.5 shrink-0 w-[22px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Columns of Days from November */}
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[2px] shrink-0">
                {week.map((day) => (
                  <div
                    key={day.date}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={day.tooltip || `${day.level} contributions on ${day.date}`}
                    className={`w-[7px] sm:w-[8px] md:w-[8.5px] lg:w-[7.2px] xl:w-[8.5px] 2xl:w-[9.5px] h-[7px] sm:h-[8px] md:h-[8.5px] lg:h-[7.2px] xl:h-[8.5px] 2xl:h-[9.5px] rounded-[1.5px] border transition-transform hover:scale-140 hover:z-20 cursor-pointer ${getCellColor(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Footer: Hover tooltip & Theme Legend */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E8E4DA] text-[10px] font-mono-tech">
          <div className="text-[#66635D] truncate max-w-[280px] sm:max-w-[340px]">
            {hoveredDay ? (
              <span className="font-semibold text-[#111111]">
                {hoveredDay.tooltip || `${hoveredDay.date}`}
              </span>
            ) : (
              <span className="text-[#8A867E]">Hover over cells to inspect daily commits</span>
            )}
          </div>

          {/* Legend matching theme */}
          <div className="flex items-center gap-1 text-[#7A7770] text-[9px]">
            <span>Less</span>
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#EAE6DC] border border-[#DDD8CD]"
              title="0 contributions"
            />
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#F6CFCB] border border-[#EEA7A1]"
              title="1-2 contributions"
            />
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#E88680] border border-[#DB635B]"
              title="3-4 contributions"
            />
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#DE4138] border border-[#C42B23]"
              title="5-6 contributions"
            />
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#A81812] border border-[#8A0E08]"
              title="7+ contributions"
            />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
