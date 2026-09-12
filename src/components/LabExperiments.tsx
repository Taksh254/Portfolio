"use client";

import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { EXPERIMENTS, Experiment } from "@/data/experiments";
import { TypewriterHeader } from "./TypewriterHeader";

const LAB_PHRASES = [
  "// 05  LAB // EXPERIMENTS",
  "// TELEMETRY & MULTI-AGENTS",
  "// AUTONOMOUS RESEARCH PIPELINES",
  "// BENCHMARKING: ACTIVE",
];

const STATUS_META: Record<
  Experiment["status"],
  { label: string; color: string; Icon: typeof Clock }
> = {
  in_progress: { label: "IN PROGRESS", color: "#B8860B", Icon: Clock },
  completed: { label: "COMPLETED", color: "#315B50", Icon: CheckCircle2 },
  failed: { label: "FAILED (LEARNED)", color: "#E6322A", Icon: AlertCircle },
};

interface LabExperimentsProps {
  onSelectExperiment?: (id: string) => void;
  onViewAll?: () => void;
}

export function LabExperiments({
  onSelectExperiment,
  onViewAll,
}: LabExperimentsProps) {
  const preview = EXPERIMENTS.slice(0, 4);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <TypewriterHeader phrases={LAB_PHRASES} initialDelay={250} />
        <button
          onClick={onViewAll}
          type="button"
          className="text-[10px] font-mono-tech tracking-wider text-[#33312E] hover:text-[#E6322A] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Experiment Rows — sourced from the same log EngineeringNotebook/LabWindow use */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tech">
        {preview.map((exp) => {
          const meta = STATUS_META[exp.status];
          const Icon = meta.Icon;
          return (
            <div
              key={exp.id}
              onClick={() => onSelectExperiment?.(exp.id)}
              data-cursor="INSPECT EXPERIMENT"
              className="group p-4 rounded-xl apple-glass-card cursor-pointer flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] text-[#7A7770] shrink-0">{exp.number}</span>
                  <span
                    style={{ color: meta.color }}
                    className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-right"
                  >
                    <Icon style={{ width: 10, height: 10 }} className="shrink-0" />
                    {meta.label}
                  </span>
                </div>
                <h4 className="font-sans font-semibold text-[12px] leading-snug text-[#111111] line-clamp-2 min-h-[2.4em]">
                  {exp.title}
                </h4>
                <div className="text-[9px] text-[#A39D8E] uppercase tracking-widest">
                  {exp.domain}
                </div>
              </div>

              {/* Hypothesis snippet — real content instead of a fabricated progress metric */}
              <div className="space-y-1.5 pt-2.5 border-t border-black/[0.07]">
                <p className="font-sans normal-case text-[10.5px] text-[#66635D] leading-relaxed line-clamp-2 min-h-[2.6em]">
                  <span className="text-[#A39D8E] font-mono-tech uppercase tracking-wide text-[8.5px]">
                    HYPOTHESIS —{" "}
                  </span>
                  {exp.hypothesis}
                </p>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-[#A39D8E]">{exp.date}</span>
                  <span className="text-[#33312E] group-hover:text-[#E6322A] transition-colors flex items-center gap-0.5">
                    View log <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
