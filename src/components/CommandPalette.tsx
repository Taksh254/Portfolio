"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  FlaskConical,
  BookOpen,
  User,
  Send,
  RotateCcw,
  ExternalLink,
  CornerDownLeft,
  X,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { WindowId } from "@/types/os";
import { PROJECTS } from "@/data/projects";
import { EXPERIMENTS } from "@/data/experiments";
import { NOTES } from "@/data/notes";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  onSelectProject?: (projectId: string) => void;
  onSelectExperiment?: (expId: string) => void;
  onSelectNote?: (noteId: string) => void;
  onReboot: () => void;
}

interface CommandItem {
  id: string;
  category: "WINDOW" | "PROJECT" | "LAB" | "NOTE" | "SYSTEM";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenWindow,
  onSelectProject = () => {},
  onSelectExperiment = () => {},
  onSelectNote = () => {},
  onReboot,
}: CommandPaletteProps) {
  const [query, setQuery] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keyboard shortcut listener for Cmd+K / Ctrl+K & Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenWindow("work"); // or trigger palette via props
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onOpenWindow]);

  // Build command index
  const commands: CommandItem[] = [
    // Windows
    {
      id: "win-work",
      category: "WINDOW",
      title: "Open Work & Projects Window",
      subtitle: `${PROJECTS.length} active engineering projects`,
      icon: FolderGit2,
      action: () => {
        onOpenWindow("work");
        onClose();
      },
    },
    {
      id: "win-lab",
      category: "WINDOW",
      title: "Open Lab & Experiment Logs",
      subtitle: `${EXPERIMENTS.length} telemetry logs`,
      icon: FlaskConical,
      action: () => {
        onOpenWindow("lab");
        onClose();
      },
    },
    {
      id: "win-notes",
      category: "WINDOW",
      title: "Open Notes & Engineering Notebook",
      subtitle: `${NOTES.length} technical papers & essays`,
      icon: BookOpen,
      action: () => {
        onOpenWindow("notes");
        onClose();
      },
    },
    {
      id: "win-about",
      category: "WINDOW",
      title: "Open About & Engineer Profile",
      subtitle: "Philosophy, toolchain, and background",
      icon: User,
      action: () => {
        onOpenWindow("about");
        onClose();
      },
    },
    {
      id: "win-contact",
      category: "WINDOW",
      title: "Open Contact & Transmission Terminal",
      subtitle: "Send a direct message packet",
      icon: Send,
      action: () => {
        onOpenWindow("contact");
        onClose();
      },
    },
    // Projects
    ...PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      category: "PROJECT" as const,
      title: p.title,
      subtitle: `${p.category} • [INDEX #${p.number}]`,
      icon: FolderGit2,
      action: () => {
        onSelectProject(p.id);
        onClose();
      },
    })),
    // Labs
    ...EXPERIMENTS.map((e) => ({
      id: `exp-${e.id}`,
      category: "LAB" as const,
      title: e.title,
      subtitle: `${e.domain} • [STATUS: ${e.status.toUpperCase()}]`,
      icon: FlaskConical,
      action: () => {
        onSelectExperiment(e.id);
        onClose();
      },
    })),
    // Notes
    ...NOTES.map((n) => ({
      id: `note-${n.id}`,
      category: "NOTE" as const,
      title: n.title,
      subtitle: `${n.category} • ${n.date}`,
      icon: BookOpen,
      action: () => {
        onSelectNote(n.id);
        onClose();
      },
    })),
    // System & Themes
    {
      id: "theme-dark",
      category: "SYSTEM",
      title: "Set Theme: Obsidian (Technical Dark)",
      subtitle: "Sleek low-light dark terminal mode",
      icon: Moon,
      action: () => {
        document.documentElement.setAttribute("data-theme", "dark");
        if (typeof window !== "undefined") localStorage.setItem("taksh_os_theme", "dark");
        onClose();
      },
    },
    {
      id: "theme-paper",
      category: "SYSTEM",
      title: "Set Theme: Paper (Notebook Light)",
      subtitle: "Warm technical paper aesthetics",
      icon: Sun,
      action: () => {
        document.documentElement.setAttribute("data-theme", "paper");
        if (typeof window !== "undefined") localStorage.setItem("taksh_os_theme", "paper");
        onClose();
      },
    },
    {
      id: "theme-blueprint",
      category: "SYSTEM",
      title: "Set Theme: Blueprint (Cyan Grid)",
      subtitle: "Engineering blueprint grid mode",
      icon: Sparkles,
      action: () => {
        document.documentElement.setAttribute("data-theme", "blueprint");
        if (typeof window !== "undefined") localStorage.setItem("taksh_os_theme", "blueprint");
        onClose();
      },
    },
    {
      id: "sys-reboot",
      category: "SYSTEM",
      title: "Reboot TAKSH.OS Workspace",
      subtitle: "Re-run initialization boot sequence",
      icon: RotateCcw,
      action: () => {
        onReboot();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="w-full max-w-xl bg-[#12151D] border border-[#202634] rounded-xl shadow-[0_24px_70px_rgba(0,0,0,0.6)] overflow-hidden font-mono-tech flex flex-col max-h-[70vh]"
        >
          {/* Search Header */}
          <div className="p-3.5 border-b border-[#202634] bg-[#161B26] flex items-center gap-3">
            <Search className="w-4 h-4 text-[#E5484D] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH TAKSH.OS (WORK, LABS, NOTES, COMMANDS)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-xs text-[#EDEDED] placeholder:text-[#5D6475] focus:outline-none uppercase tracking-wide"
            />
            <button
              onClick={onClose}
              className="text-[#5D6475] hover:text-[#EDEDED] p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = selectedIndex === idx;

                return (
                  <div
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#E5484D] text-white"
                        : "hover:bg-[#161B26] text-[#EDEDED]"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? "text-white" : "text-[#E5484D]"
                        }`}
                      />
                      <div className="truncate">
                        <div className="font-semibold tracking-wide truncate">
                          {cmd.title}
                        </div>
                        {cmd.subtitle && (
                          <div
                            className={`text-[10px] truncate ${
                              isSelected ? "text-white/80" : "text-[#5D6475]"
                            }`}
                          >
                            {cmd.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border uppercase ${
                          isSelected
                            ? "bg-white/20 border-transparent text-white"
                            : "bg-[#161B26] border-[#202634] text-[#5D6475]"
                        }`}
                      >
                        {cmd.category}
                      </span>
                      {isSelected && <CornerDownLeft className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-[#5D6475]">
                NO COMMANDS MATCHING &ldquo;{query.toUpperCase()}&rdquo;
              </div>
            )}
          </div>

          {/* Footer Keyboard Hints */}
          <div className="h-8 px-3.5 bg-[#161B26] border-t border-[#202634] flex items-center justify-between text-[10px] text-[#5D6475] select-none shrink-0">
            <div className="flex items-center gap-3">
              <span>↑↓ NAVIGATE</span>
              <span>•</span>
              <span>ENTER SELECT</span>
              <span>•</span>
              <span>ESC DISMISS</span>
            </div>
            <span>TAKSH.OS KERNEL</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
