"use client";

import React from "react";
import { ArrowLeft, FlaskConical, AlertCircle, CheckCircle2, Clock, Terminal, Activity } from "lucide-react";
import { Experiment } from "@/data/experiments";

interface ExperimentDetailProps {
  experiment: Experiment;
  onBack: () => void;
}

export function ExperimentDetail({ experiment, onBack }: ExperimentDetailProps) {
  const getStatusBadge = (status: Experiment["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          text: "● COMPLETED / VALIDATED",
          style: "text-[#30A46C] bg-[#16261E] border-[#224431]",
        };
      case "in_progress":
        return {
          icon: Clock,
          text: "◐ ACTIVE TRIAL / IN PROGRESS",
          style: "text-[#E5A024] bg-[#262115] border-[#44381C]",
        };
      case "failed":
        return {
          icon: AlertCircle,
          text: "✕ FAILED HYPOTHESIS / DISPROVEN",
          style: "text-[#E5484D] bg-[#2D1619] border-[#4A1D23]",
        };
      default:
        return {
          icon: CheckCircle2,
          text: "● ARCHIVE",
          style: "text-[#5D6475] bg-[#161B26] border-[#232938]",
        };
    }
  };

  const statusInfo = getStatusBadge(experiment.status);
  const StatusIcon = statusInfo.icon;

  return (
    <article className="max-w-3xl mx-auto font-sans text-[#EDEDED] pb-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#202634] pb-4 mb-6 font-mono-tech text-xs">
        <button
          onClick={onBack}
          data-cursor="BACK"
          className="flex items-center gap-1.5 text-[#8E95A5] hover:text-[#E5484D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPERIMENT LOG</span>
        </button>

        <span className="text-[#5D6475]">LOG / #{experiment.number}</span>
      </div>

      {/* Header */}
      <header className="space-y-3 mb-6">
        <div className="flex items-center gap-2 font-mono-tech text-xs">
          <span className="font-bold text-[#E5484D]">#{experiment.number}</span>
          <span>•</span>
          <span className="text-[#5D6475]">{experiment.date}</span>
          <span>•</span>
          <span className="text-[#8E95A5]">{experiment.domain}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
          {experiment.title}
        </h1>

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-tech font-semibold border mt-2 ${statusInfo.style}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusInfo.text}</span>
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-6 text-sm leading-relaxed">
        {/* Hypothesis */}
        <section className="space-y-2 p-5 bg-[#12151D] border border-[#202634] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#E5484D]">
            01 // HYPOTHESIS &amp; CONJECTURE
          </h2>
          <p className="text-xs sm:text-sm text-[#B0B7C6] leading-relaxed">
            {experiment.hypothesis}
          </p>
        </section>

        {/* Method & What Was Tried */}
        <section className="space-y-2 p-5 bg-[#12151D] border border-[#202634] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF]">
            02 // METHODOLOGY &amp; TRIAL EXECUTION
          </h2>
          <div className="space-y-2 pt-1 font-mono-tech text-xs text-[#B0B7C6]">
            {experiment.whatITried.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#E5484D] font-bold">[{idx + 1}]</span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results & Observations */}
        <section className="space-y-2 p-5 bg-[#12151D] border border-[#202634] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF]">
            03 // EMPIRICAL RESULT &amp; OBSERVATION
          </h2>
          <p className="text-xs sm:text-sm text-[#B0B7C6] leading-relaxed">
            {experiment.result}
          </p>
        </section>

        {/* What I Learned / Root Cause */}
        <section className="space-y-2 p-5 bg-[#161B26] border border-[#232938] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#E5484D]">
            04 // WHAT I LEARNED &amp; ARCHITECTURAL TAKEAWAY
          </h2>
          <p className="text-xs sm:text-sm text-[#EDEDED] leading-relaxed">
            {experiment.whatILearned}
          </p>
        </section>

        {/* Next Iteration */}
        <section className="space-y-2 p-5 bg-[#0B0D12] border border-[#202634] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#30A46C]">
            05 // NEXT ITERATION &amp; MITIGATION PATH
          </h2>
          <p className="text-xs sm:text-sm text-[#EDEDED] font-mono-tech leading-relaxed">
            {experiment.nextIteration}
          </p>
        </section>

        {/* Telemetry Metrics */}
        {experiment.metricsOrNotes && (
          <div className="p-3.5 bg-[#0B0D12] border border-[#202634] rounded-lg font-mono-tech text-xs text-[#8E95A5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#E5484D]" />
              <span>METRICS:</span>
              <span className="text-[#EDEDED] font-bold">{experiment.metricsOrNotes}</span>
            </div>
            <span className="text-[10px] text-[#5D6475]">BENCHMARK RUNTIME</span>
          </div>
        )}
      </div>
    </article>
  );
}
