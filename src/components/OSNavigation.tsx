"use client";

import React, { useState } from "react";
import {
  Terminal,
  Briefcase,
  FlaskConical,
  BookOpen,
  Boxes,
  GitBranch,
  User,
  Send,
} from "lucide-react";

export type OSModule =
  | "home"
  | "work"
  | "lab"
  | "notes"
  | "stack"
  | "journey"
  | "about"
  | "contact";

export interface OSNavModule {
  id: OSModule;
  code: string;
  label: string;
  pageIndex: number;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

export const OS_MODULES: OSNavModule[] = [
  { id: "home",    code: "01", label: "HOME",    pageIndex: 0, icon: Terminal },
  { id: "work",    code: "02", label: "WORK",    pageIndex: 1, icon: Briefcase },
  { id: "lab",     code: "03", label: "LAB",     pageIndex: 2, icon: FlaskConical },
  { id: "notes",   code: "04", label: "NOTES",   pageIndex: 3, icon: BookOpen },
  { id: "stack",   code: "05", label: "STACK",   pageIndex: 4, icon: Boxes },
  { id: "journey", code: "06", label: "JOURNEY", pageIndex: 5, icon: GitBranch },
  { id: "about",   code: "07", label: "ABOUT",   pageIndex: 6, icon: User },
  { id: "contact", code: "08", label: "CONTACT", pageIndex: 7, icon: Send },
];

interface OSNavigationProps {
  currentPage: number;
  onNavigate: (pageIndex: number) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

/**
 * OSNavigation: Compact, high-precision operating system navigation rail.
 * Represents system modules of TAKSH.OS.
 */
export function OSNavigation({
  currentPage,
  onNavigate,
  mobileOpen = false,
  onMobileClose,
}: OSNavigationProps) {
  const [hoveredModule, setHoveredModule] = useState<OSModule | null>(null);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3,4,6,0.78)",
            backdropFilter: "blur(8px)",
            zIndex: 49,
          }}
          className="md:hidden"
        />
      )}

      {/* OS Navigation Dock */}
      <nav
        aria-label="TAKSH.OS System Modules"
        style={{
          position: "fixed",
          top: "50%",
          left: 18,
          width: 50,
          background: "rgba(11, 13, 16, 0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 25,
          padding: "8px 4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          zIndex: 50,
          boxShadow:
            "0 20px 45px rgba(0, 0, 0, 0.92), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
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
        {OS_MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = currentPage === mod.pageIndex;
          const isHovered = hoveredModule === mod.id;

          return (
            <div key={mod.id} style={{ position: "relative" }}>
              {/* Active amber indicator line */}
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
                      "0 0 10px rgba(255, 226, 168, 0.92), 0 0 3px rgba(200, 160, 80, 0.65)",
                    zIndex: 2,
                  }}
                />
              )}

              <button
                onClick={() => onNavigate(mod.pageIndex)}
                onMouseEnter={() => setHoveredModule(mod.id)}
                onMouseLeave={() => setHoveredModule(null)}
                aria-label={`Open ${mod.label} Diary Page`}
                style={{
                  width: 40,
                  height: 38,
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isActive
                    ? "rgba(255, 255, 255, 0.07)"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.04)"
                    : "transparent",
                  border: "none",
                  color: isActive
                    ? "#FFE2A8"
                    : isHovered
                    ? "#EDE4CC"
                    : "rgba(140, 148, 160, 0.45)",
                  cursor: "pointer",
                  transition: "all 160ms ease",
                  position: "relative",
                  outline: "none",
                  padding: 0,
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2 : 1.7} />
                <span
                  className="font-mono-tech"
                  style={{
                    fontSize: 6.5,
                    letterSpacing: "0.06em",
                    marginTop: 2,
                    opacity: isActive ? 1 : 0.65,
                  }}
                >
                  {mod.code}
                </span>
              </button>

              {/* Tooltip on hover */}
              {isHovered && (
                <div
                  className="font-mono-tech"
                  style={{
                    position: "absolute",
                    left: 52,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(12, 14, 18, 0.96)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 10,
                    letterSpacing: "0.10em",
                    color: "#EDE4CC",
                    whiteSpace: "nowrap",
                    zIndex: 60,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.9)",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#C8A050", fontWeight: 700 }}>{mod.code}</span>
                  <span>{mod.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
