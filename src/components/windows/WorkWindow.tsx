"use client";

import React, { useState } from "react";
import { Search, FolderGit2, ArrowUpRight, Cpu } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { ProjectNotebook } from "./ProjectNotebook";

interface WorkWindowProps {
  selectedProjectId?: string | null;
  onSelectProject?: (id: string | null) => void;
  onClose?: () => void;
}

export function WorkWindow({
  selectedProjectId,
  onSelectProject,
}: WorkWindowProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    selectedProjectId || null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeId = selectedProjectId !== undefined ? selectedProjectId : internalSelectedId;
  const setSelected = (id: string | null) => {
    setInternalSelectedId(id);
    if (onSelectProject) onSelectProject(id);
  };

  const selectedProject = PROJECTS.find((p) => p.id === activeId);

  const filteredProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedProject) {
    return (
      <ProjectNotebook
        project={selectedProject}
        onBack={() => setSelected(null)}
      />
    );
  }

  const getStatusIndicator = (status: Project["status"]) => {
    switch (status) {
      case "live":
        return <span className="text-[#30A46C] font-semibold">● LIVE</span>;
      case "building":
        return <span className="text-[#E5A024] font-semibold">◐ BUILDING</span>;
      case "operational":
        return <span className="text-[#30A46C] font-semibold">● ACTIVE</span>;
      case "archived":
        return <span className="text-[#5D6475]">○ ARCHIVE</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-[#EDEDED] pb-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202634]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#FFFFFF] font-mono-tech">
            WORK &amp; DEPLOYED ARCHITECTURES
          </h2>
          <p className="text-xs text-[#8E95A5] mt-0.5">
            Documented engineering notebooks, architecture diagrams, and source code.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5D6475] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs font-mono-tech text-[#EDEDED] placeholder:text-[#5D6475] focus:outline-none focus:border-[#E5484D]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelected(project.id)}
            data-cursor="OPEN NOTEBOOK"
            className="bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            {/* Top metadata */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="text-[#5D6475] font-bold group-hover:text-[#E5484D] transition-colors">
                  INDEX #{project.number}
                </span>
                <span className="text-[10px]">{getStatusIndicator(project.status)}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#FFFFFF] group-hover:text-[#E5484D] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[11px] text-[#5D6475] font-mono-tech mt-0.5">
                    {project.category}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#5D6475] group-hover:text-[#E5484D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </div>

              <p className="text-xs text-[#8E95A5] line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Architecture Pipeline Flow Snippet */}
            <div className="p-2.5 bg-[#0B0D12] border border-[#1C2230] rounded-lg font-mono-tech text-[10px] text-[#8E95A5] space-y-1.5">
              <div className="text-[8px] text-[#5D6475] uppercase tracking-wider flex items-center justify-between">
                <span>EXECUTION GRAPH</span>
                <span className="text-[#E5484D]">FLOW ↗</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[9px] text-[#B0B7C6]">
                {project.architecture.flow.slice(0, 4).map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="px-1.5 py-0.5 bg-[#161B26] rounded border border-[#232938] whitespace-nowrap">
                      {step}
                    </span>
                    {i < 3 && <span className="text-[#5D6475]">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Stack Badges */}
            <div className="pt-2 border-t border-[#1C2230] flex items-center justify-between text-xs font-mono-tech">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-[#161B26] text-[#8E95A5] rounded text-[10px] border border-[#252C3D]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="text-[#8E95A5] group-hover:text-[#E5484D] text-[11px] font-semibold flex items-center gap-1">
                Notebook →
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center border border-dashed border-[#202634] rounded-xl text-xs font-mono-tech text-[#5D6475]">
          No matching architectures found for query &ldquo;{searchQuery}&rdquo;.
        </div>
      )}
    </div>
  );
}
