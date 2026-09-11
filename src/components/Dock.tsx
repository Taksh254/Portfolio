"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  FolderGit2,
  FlaskConical,
  BookOpen,
  User,
  Send,
  Command,
} from "lucide-react";
import { WindowId } from "@/types/os";

interface DockProps {
  openWindows: Record<WindowId, boolean>;
  activeWindow: WindowId | null;
  onToggleWindow: (id: WindowId) => void;
  onOpenCommandPalette: () => void;
  onScrollToTop?: () => void;
}

interface DockItem {
  id: WindowId | "home";
  label: string;
  count?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "home", label: "HOME", icon: Home },
  { id: "work", label: "WORK", count: "05", icon: FolderGit2 },
  { id: "lab", label: "LAB", count: "06", icon: FlaskConical },
  { id: "notes", label: "NOTES", count: "04", icon: BookOpen },
  { id: "about", label: "ABOUT", count: "PRF", icon: User },
  { id: "contact", label: "CONTACT", count: "TX", icon: Send },
];

export function Dock({
  openWindows,
  activeWindow,
  onToggleWindow,
  onOpenCommandPalette,
  onScrollToTop,
}: DockProps) {
  const handleClick = (id: WindowId | "home") => {
    if (id === "home") {
      if (onScrollToTop) onScrollToTop();
      else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      onToggleWindow(id);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 select-none max-w-[calc(100vw-2rem)]">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#12151D]/90 backdrop-blur-lg border border-[#232938] px-2.5 sm:px-3.5 py-1.5 rounded-full shadow-[0_16px_45px_rgba(0,0,0,0.45)] flex items-center gap-1 sm:gap-1.5"
      >
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isHome = item.id === "home";
          const isOpen = !isHome && openWindows[item.id as WindowId];
          const isActive = !isHome && activeWindow === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              data-cursor={`GOTO ${item.label}`}
              className={`group relative flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#E5484D] text-[#FFFFFF] shadow-xs"
                  : "text-[#8E95A5] hover:text-[#EDEDED] hover:bg-[#1A1F2C]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive
                      ? "text-[#FFFFFF]"
                      : "text-[#8E95A5] group-hover:text-[#E5484D]"
                  }`}
                />
                <span className="text-[11px] font-medium tracking-wider">
                  {item.label}
                </span>
              </div>

              {/* Window Open Indicator Dot */}
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActive ? "bg-[#FFFFFF]" : "bg-[#E5484D]"
                    }`}
                  />
                </div>
              )}
            </button>
          );
        })}

        <div className="h-4 w-px bg-[#232938] mx-1" />

        {/* Command Palette Trigger in Dock */}
        <button
          onClick={onOpenCommandPalette}
          data-cursor="COMMANDS"
          title="Open Command Palette (⌘K)"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[#8E95A5] hover:text-[#EDEDED] hover:bg-[#1A1F2C] text-xs font-mono-tech transition-colors cursor-pointer"
        >
          <Command className="w-3.5 h-3.5 text-[#5D6475] group-hover:text-[#EDEDED]" />
          <span className="text-[10px] hidden sm:inline text-[#5D6475] font-semibold">
            ⌘K
          </span>
        </button>
      </motion.nav>
    </div>
  );
}
