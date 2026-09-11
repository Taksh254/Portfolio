"use client";

import React, { useState } from "react";
import { Layers, Briefcase, Cpu, Code, Compass, Zap, PenLine } from "lucide-react";

export type NavSection =
  | "work"
  | "projects"
  | "finova"
  | "systems"
  | "research"
  | "skills"
  | "notes"
  | "home"
  | "code"
  | "essays"
  | "tools"
  | "journal";

interface GothamSidebarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const PILL_NAV_ITEMS = [
  { id: "work" as NavSection,     label: "introduction", icon: Layers,    spreadIndex: 0 },
  { id: "projects" as NavSection, label: "projects",     icon: Briefcase, spreadIndex: 1 },
  { id: "finova" as NavSection,   label: "finova",       icon: Cpu,       spreadIndex: 2 },
  { id: "systems" as NavSection,  label: "ai systems",   icon: Code,      spreadIndex: 3 },
  { id: "research" as NavSection, label: "research",     icon: Compass,   spreadIndex: 4 },
  { id: "skills" as NavSection,   label: "skills",       icon: Zap,       spreadIndex: 5 },
  { id: "notes" as NavSection,    label: "contact",      icon: PenLine,   spreadIndex: 6 },
] as const;

export function GothamSidebar({
  activeSection,
  onNavigate,
  mobileOpen = false,
  onMobileClose,
}: GothamSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<NavSection | null>(null);

  // Map legacy/alias IDs to the 7 pill items
  const normalizedActive =
    activeSection === "home"
      ? "work"
      : activeSection === "code"
      ? "systems"
      : activeSection === "essays" || activeSection === "journal"
      ? "notes"
      : activeSection;

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(6px)",
            zIndex: 49,
          }}
          className="md:hidden"
        />
      )}

      <nav
        aria-label="Workstation Navigation Dock"
        style={{
          position: "fixed",
          top: "50%",
          left: 20,
          width: 48,
          background: "rgba(14, 15, 18, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 26,
          padding: "8px 4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 50,
          boxShadow:
            "0 18px 40px rgba(0, 0, 0, 0.88), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
          userSelect: "none",
          pointerEvents: "auto",
          transition: "transform 260ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className={`${
          mobileOpen
            ? "translate-y-[-50%] translate-x-0"
            : "translate-y-[-50%] max-md:translate-x-[-90px] md:translate-x-0"
        }`}
      >
      {PILL_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = normalizedActive === item.id;
        const isHovered = hoveredItem === item.id;

        return (
          <div key={item.id} style={{ position: "relative" }}>
            {/* Active yellowish light indicator bar on the left edge */}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  left: -4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3.5,
                  height: 18,
                  borderRadius: 2,
                  background: "#FFE2A8",
                  boxShadow:
                    "0 0 10px rgba(255, 226, 168, 0.90), 0 0 3px rgba(255, 190, 70, 0.60)",
                  zIndex: 2,
                }}
              />
            )}

            <button
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={item.label}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive
                  ? "rgba(255, 255, 255, 0.06)"
                  : isHovered
                  ? "rgba(255, 255, 255, 0.04)"
                  : "transparent",
                border: "none",
                color: isActive
                  ? "#FFE2A8"
                  : isHovered
                  ? "#E0DDD5"
                  : "rgba(145, 150, 160, 0.45)",
                cursor: "pointer",
                transition: "all 160ms ease",
                position: "relative",
                outline: "none",
                padding: 0,
              }}
            >
              <Icon size={19} strokeWidth={isActive ? 1.9 : 1.7} />
            </button>

            {/* Floating label badge on hover */}
            {isHovered && (
              <div
                className="font-mono-tech"
                style={{
                  position: "absolute",
                  left: 48,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(16, 17, 20, 0.95)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "#DCDAD2",
                  whiteSpace: "nowrap",
                  zIndex: 60,
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.85)",
                  pointerEvents: "none",
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  </>
  );
}
