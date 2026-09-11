"use client";

import React from "react";
import {
  Home,
  FolderGit2,
  FlaskConical,
  Trophy,
  User,
  Mail,
} from "lucide-react";

interface OSFloatingDockProps {
  activeSection?: string;
  onSelect?: (id: string) => void;
}

export function OSFloatingDock({
  activeSection = "home",
  onSelect,
}: OSFloatingDockProps) {
  const ITEMS_LEFT = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "lab", label: "Lab", icon: FlaskConical },
  ];

  const ITEMS_RIGHT = [
    { id: "notes", label: "Hackathons", icon: Trophy },
    { id: "about", label: "About", icon: User },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 select-none flex flex-col items-center pointer-events-none">
      <nav
        role="navigation"
        aria-label="Floating island navigation"
        className="pointer-events-auto flex items-center gap-1 p-1 px-3 rounded-full bg-[#FCFAF4]/95 border border-[#D8D3C8] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"
      >
        {/* Left items */}
        {ITEMS_LEFT.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              type="button"
              className="flex flex-col items-center justify-center py-1 px-2.5 sm:px-3 rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer relative group"
            >
              <Icon
                style={{
                  width: 14,
                  height: 14,
                  color: isActive ? "#111111" : "#7A7770",
                }}
                className="group-hover:text-[#111111] transition-colors"
              />
              <span
                className={`text-[8.5px] font-mono-tech mt-0.5 tracking-wider ${
                  isActive ? "font-bold text-[#111111]" : "text-[#7A7770]"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-2.5 h-[2px] bg-[#E6322A] rounded-full inline-block mt-0.5 absolute -bottom-0.5" />
              )}
            </button>
          );
        })}

        {/* Center TAKSH.OS Button: Black Circle with Inverted Triangle Monogram */}
        <button
          onClick={() => onSelect?.("home")}
          type="button"
          title="TAKSH.OS"
          aria-label="TAKSH.OS Workspace Top"
          className="mx-1 w-9 h-9 rounded-full bg-[#111111] text-white border border-[#222222] shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
        >
          {/* Inverted Triangle Monogram */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20 L3 6 L21 6 Z"
              fill="#FCFAF4"
            />
            <line x1="7" y1="9" x2="17" y2="9" stroke="#111111" strokeWidth="1.8" />
            <line x1="12" y1="9" x2="12" y2="16" stroke="#111111" strokeWidth="1.8" />
          </svg>
        </button>

        {/* Right items */}
        {ITEMS_RIGHT.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              type="button"
              className="flex flex-col items-center justify-center py-1 px-2.5 sm:px-3 rounded-full hover:bg-black/[0.04] transition-colors cursor-pointer relative group"
            >
              <Icon
                style={{
                  width: 14,
                  height: 14,
                  color: isActive ? "#111111" : "#7A7770",
                }}
                className="group-hover:text-[#111111] transition-colors"
              />
              <span
                className={`text-[8.5px] font-mono-tech mt-0.5 tracking-wider ${
                  isActive ? "font-bold text-[#111111]" : "text-[#7A7770]"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-2.5 h-[2px] bg-[#E6322A] rounded-full inline-block mt-0.5 absolute -bottom-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
