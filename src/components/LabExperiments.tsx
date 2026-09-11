"use client";

import React from "react";

interface LabExperimentsProps {
  onSelectExperiment?: (id: string) => void;
  onViewAll?: () => void;
}

export function LabExperiments({
  onSelectExperiment,
  onViewAll,
}: LabExperimentsProps) {
  const EXPERIMENTS = [
    {
      id: "exp-021",
      number: "#021",
      name: "Autonomous Research Agent",
      status: "IN PROGRESS",
      statusColor: "#E6322A",
      pct: 73,
    },
    {
      id: "exp-020",
      number: "#020",
      name: "Multi-Agent Systems",
      status: "EXPERIMENTING",
      statusColor: "#B8860B",
      pct: 48,
    },
    {
      id: "exp-019",
      number: "#019",
      name: "Generative UI",
      status: "RESEARCH",
      statusColor: "#7A7770",
      pct: 12,
    },
    {
      id: "exp-018",
      number: "#018",
      name: "ROS Navigation",
      status: "BENCHMARKING",
      statusColor: "#315B50",
      pct: 34,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
          <span className="text-[10.5px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
            // 05 &nbsp; LAB
          </span>
        </div>
        <button
          onClick={onViewAll}
          type="button"
          className="text-[10px] font-mono-tech tracking-wider text-[#33312E] hover:text-[#E6322A] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Experiment Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tech">
        {EXPERIMENTS.map((exp) => (
          <div
            key={exp.id}
            onClick={() => onSelectExperiment?.(exp.id)}
            className="p-4 rounded-xl apple-glass-card cursor-pointer flex flex-col justify-between space-y-3.5"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] text-[#7A7770]">{exp.number}</span>
                <span
                  style={{ color: exp.statusColor }}
                  className="text-[9.5px] font-bold tracking-wider"
                >
                  {exp.status}
                </span>
              </div>
              <h4 className="font-sans font-semibold text-[13px] text-[#111111]">
                {exp.name}
              </h4>
            </div>

            {/* Progress track */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] text-[#7A7770]">
                <span>TELEMETRY</span>
                <span className="font-bold">{exp.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${exp.pct}%`,
                    backgroundColor:
                      exp.pct > 50
                        ? "#E6322A"
                        : exp.pct > 25
                        ? "#B8860B"
                        : "#315B50",
                  }}
                  className="h-full rounded-full transition-all duration-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
