"use client";

import React, { useState } from "react";
import { FlaskConical, Search, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { EXPERIMENTS, Experiment } from "@/data/experiments";
import { ExperimentDetail } from "./ExperimentDetail";

interface LabWindowProps {
  selectedExpId?: string | null;
  onSelectExp?: (id: string | null) => void;
  onClose?: () => void;
}

export function LabWindow({ selectedExpId, onSelectExp }: LabWindowProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    selectedExpId || null
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeId = selectedExpId !== undefined ? selectedExpId : internalSelectedId;
  const setSelected = (id: string | null) => {
    setInternalSelectedId(id);
    if (onSelectExp) onSelectExp(id);
  };

  const selectedExp = EXPERIMENTS.find((e) => e.id === activeId);

  const filteredExperiments = EXPERIMENTS.filter((e) => {
    const matchesFilter =
      filterStatus === "all" || e.status === filterStatus;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (selectedExp) {
    return (
      <ExperimentDetail
        experiment={selectedExp}
        onBack={() => setSelected(null)}
      />
    );
  }

  const getStatusBadge = (status: Experiment["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="text-[#30A46C] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#30A46C]" />
            COMPLETED
          </span>
        );
      case "in_progress":
        return (
          <span className="text-[#E5A024] font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#E5A024]" />
            IN PROGRESS
          </span>
        );
      case "failed":
        return (
          <span className="text-[#E5484D] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-[#E5484D]" />
            FAILED (LEARNED)
          </span>
        );
      default:
        return (
          <span className="text-[#5D6475] font-semibold flex items-center gap-1">
            ARCHIVE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-[#EDEDED] pb-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202634]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#FFFFFF] font-mono-tech">
            LAB &amp; R&amp;D TELEMETRY LOGS
          </h2>
          <p className="text-xs text-[#8E95A5] mt-0.5">
            Empirical trials, hypotheses, runtime benchmarks, and documented dead-ends.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5D6475] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs font-mono-tech text-[#EDEDED] placeholder:text-[#5D6475] focus:outline-none focus:border-[#E5484D]"
          />
        </div>
      </div>

      {/* Filter Tabs — colored per-status to match the badges below and the detail page */}
      <div className="flex items-center gap-2 font-mono-tech text-xs">
        {[
          { id: "all", label: "All Logs", activeStyle: "bg-[#E5484D] text-white border-[#E5484D]" },
          { id: "completed", label: "Completed", activeStyle: "bg-[#16261E] text-[#30A46C] border-[#224431]" },
          { id: "in_progress", label: "In Progress", activeStyle: "bg-[#262115] text-[#E5A024] border-[#44381C]" },
          { id: "failed", label: "Failed (Learned)", activeStyle: "bg-[#2D1619] text-[#E5484D] border-[#4A1D23]" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer text-xs font-semibold ${
              filterStatus === tab.id
                ? tab.activeStyle
                : "bg-[#161B26] text-[#8E95A5] border-[#252C3D] hover:text-[#EDEDED] font-normal"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiments List */}
      <div className="space-y-3">
        {filteredExperiments.map((exp) => (
          <div
            key={exp.id}
            onClick={() => setSelected(exp.id)}
            data-cursor="INSPECT EXPERIMENT"
            className="p-4 bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-sm hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono-tech text-xs">
                <span className="font-bold text-[#5D6475] group-hover:text-[#E5484D]">
                  {exp.number}
                </span>
                <span className="text-[#5D6475]">•</span>
                <span className="text-[#8E95A5]">{exp.domain}</span>
                <span className="text-[#5D6475]">•</span>
                <span className="text-[#5D6475]">{exp.date}</span>
              </div>
              <h3 className="text-base font-bold text-[#FFFFFF] group-hover:text-[#E5484D] transition-colors">
                {exp.title}
              </h3>
              <p className="text-xs text-[#8E95A5] line-clamp-1 leading-relaxed max-w-xl">
                <span className="text-[#5D6475] font-mono-tech uppercase">HYPOTHESIS: </span>
                {exp.hypothesis}
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono-tech text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1C2230]">
              <div className="text-[11px]">{getStatusBadge(exp.status)}</div>
              <ArrowUpRight className="w-4 h-4 text-[#5D6475] group-hover:text-[#E5484D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
