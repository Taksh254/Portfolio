"use client";

import React from "react";
import { ArrowLeft, ExternalLink, Terminal, CheckCircle2, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/projects";

interface ProjectNotebookProps {
  project: Project;
  onBack: () => void;
}

export function ProjectNotebook({ project, onBack }: ProjectNotebookProps) {
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "live":
        return { text: "● LIVE DEPLOYMENT", color: "text-[#30A46C] bg-[#16261E] border-[#224431]" };
      case "building":
        return { text: "◐ ACTIVE DEVELOPMENT", color: "text-[#E5A024] bg-[#262115] border-[#44381C]" };
      case "operational":
        return { text: "● OPERATIONAL SYSTEM", color: "text-[#30A46C] bg-[#16261E] border-[#224431]" };
      case "archived":
        return { text: "○ ARCHIVED CODEBASE", color: "text-[#5D6475] bg-[#161B26] border-[#232938]" };
    }
  };

  const statusInfo = getStatusBadge(project.status);

  return (
    <article className="max-w-3xl mx-auto font-sans text-[#EDEDED] pb-10">
      {/* Navigation Top Action */}
      <div className="flex items-center justify-between border-b border-[#202634] pb-4 mb-6 font-mono-tech text-xs">
        <button
          onClick={onBack}
          data-cursor="BACK"
          className="flex items-center gap-1.5 text-[#8E95A5] hover:text-[#E5484D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO WORK INDEX</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[#5D6475]">NOTEBOOK / {project.number}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        </div>
      </div>

      {/* Title & Metadata */}
      <header className="space-y-3 mb-8">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#E5484D]">
          <span>INDEX #{project.number}</span>
          <span>•</span>
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
          {project.title}
        </h1>

        <p className="text-base text-[#B0B7C6] leading-relaxed pt-1">
          {project.summary}
        </p>

        {/* Links / Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#E5484D] hover:bg-[#F0565B] text-white rounded-lg font-mono-tech text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#161B26] hover:bg-[#1C2230] border border-[#232938] hover:border-[#384256] text-[#EDEDED] rounded-lg font-mono-tech text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>SOURCE CODE REPO</span>
              <ExternalLink className="w-3 h-3 text-[#5D6475]" />
            </a>
          )}
        </div>
      </header>

      {/* Structured Technical Notebook Sections */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Objective & Problem Statement */}
        <section className="space-y-2.5 p-5 bg-[#12151D] border border-[#202634] rounded-xl">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#E5484D]">
            01 // OBJECTIVE &amp; SYSTEM GOAL
          </h2>
          <p className="text-xs sm:text-sm text-[#B0B7C6] leading-relaxed">
            {project.objective}
          </p>
        </section>

        {/* System Architecture & Visual Diagram */}
        <section className="space-y-4">
          <div className="flex items-center justify-between font-mono-tech text-xs border-b border-[#202634] pb-2">
            <h2 className="font-bold uppercase tracking-wider text-[#FFFFFF]">
              02 // ARCHITECTURE &amp; EXECUTION GRAPH
            </h2>
            <span className="text-[#5D6475]">FLOW DIAGRAM</span>
          </div>

          <p className="text-xs sm:text-sm text-[#8E95A5]">
            {project.architecture.overview}
          </p>

          {/* Interactive DAG / Flow Step Visualization */}
          <div className="p-4 bg-[#0B0D12] border border-[#202634] rounded-xl space-y-3 font-mono-tech">
            <div className="text-[10px] text-[#5D6475] uppercase tracking-wider">
              PIPELINE EXECUTION NODES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {project.architecture.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-3 bg-[#12151D] border border-[#202634] rounded-lg space-y-1 relative group"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#E5484D] font-bold">NODE 0{idx + 1}</span>
                    <span className="text-[#5D6475] uppercase">{step.type}</span>
                  </div>
                  <div className="text-xs font-bold text-[#EDEDED]">{step.label}</div>
                  {step.sublabel && (
                    <div className="text-[10px] text-[#8E95A5] truncate">{step.sublabel}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF] border-b border-[#202634] pb-2">
            03 // TECHNICAL STACK &amp; DEPENDENCY LAYER
          </h2>
          <div className="flex flex-wrap gap-2 pt-1 font-mono-tech">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-[#161B26] border border-[#232938] text-[#EDEDED] rounded-lg text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Key Engineering Results & Highlights */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#FFFFFF] border-b border-[#202634] pb-2">
            04 // SYSTEM HIGHLIGHTS &amp; EMPIRICAL RESULTS
          </h2>
          <div className="space-y-2 pt-1">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#12151D] border border-[#202634] rounded-lg flex items-start gap-2.5 text-xs text-[#B0B7C6]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#30A46C] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Launch Terminal Command */}
        {project.terminalCommand && (
          <section className="p-4 bg-[#0B0D12] border border-[#202634] rounded-xl font-mono-tech text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#5D6475] text-[10px] uppercase">
              <Terminal className="w-3.5 h-3.5 text-[#E5484D]" />
              <span>TERMINAL QUICK LAUNCH</span>
            </div>
            <div className="p-2.5 bg-[#161B26] rounded border border-[#232938] text-[#EDEDED] flex items-center justify-between">
              <code>$ {project.terminalCommand}</code>
              <span className="text-[10px] text-[#5D6475]">[RUN]</span>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
