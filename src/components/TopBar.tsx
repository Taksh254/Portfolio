"use client";

import React, { useState, useEffect } from "react";
import { Search, Moon, Sun, Sparkles } from "lucide-react";

export type OSTheme = "dark" | "paper" | "blueprint";

interface WorkspaceTopBarProps {
  sysLoad?: number;
  onThemeToggle?: () => void;
}

export function WorkspaceTopBar({ sysLoad = 0.28 }: WorkspaceTopBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [theme, setTheme] = useState<OSTheme>("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = (localStorage.getItem("taksh_os_theme") as OSTheme) || "dark";
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const cycleTheme = () => {
    const next: OSTheme = theme === "dark" ? "paper" : theme === "paper" ? "blueprint" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("taksh_os_theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDateStr(
        now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ThemeIcon = theme === "dark" ? Moon : theme === "paper" ? Sun : Sparkles;
  const themeColor = theme === "dark" ? "#8090A8" : theme === "paper" ? "#C8A050" : "#60B0D8";

  return (
    <div
      className="font-mono-tech"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        background: "rgba(4,5,7,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        zIndex: 45,
        userSelect: "none",
      }}
    >
      {/* Left: telemetry */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: "#C8A050", letterSpacing: "0.16em" }}>
          TAKSH.OS
        </span>
        <Divider />
        <span style={{ fontSize: 8.5, color: "rgba(140,148,162,0.45)", letterSpacing: "0.06em" }}>v1.0.0</span>
        <Divider />
        <span style={{ fontSize: 8.5, color: "rgba(140,148,162,0.40)", letterSpacing: "0.06em" }}>SYSTEM:</span>
        <span style={{ fontSize: 8.5, color: "#2D8A5A", letterSpacing: "0.08em", marginLeft: 4, fontWeight: 700 }}>
          ONLINE
        </span>
        <Divider />
        <span style={{ fontSize: 8.5, color: "rgba(140,148,162,0.40)", letterSpacing: "0.06em" }}>BUILD:</span>
        <span style={{ fontSize: 8.5, color: "rgba(220,215,205,0.75)", letterSpacing: "0.08em", marginLeft: 4 }}>
          ACTIVE
        </span>
        <Divider />
        <span style={{ fontSize: 8.5, color: "rgba(140,148,162,0.40)", letterSpacing: "0.06em" }}>SYS_LOAD:</span>
        <span style={{ fontSize: 8.5, color: "rgba(200,160,80,0.75)", letterSpacing: "0.06em", marginLeft: 4 }}>
          {sysLoad.toFixed(2)}
        </span>
      </div>

      {/* Right: status & controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Online status */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            className="status-dot-green"
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#2D8A5A",
              boxShadow: "0 0 5px rgba(45,138,90,0.45)",
            }}
          />
          <span style={{ fontSize: 8.5, color: "#2D8A5A", letterSpacing: "0.08em", fontWeight: 700 }}>
            ONLINE
          </span>
        </div>

        <Divider />

        {/* Date */}
        <span style={{ fontSize: 8.5, color: "rgba(140,148,162,0.45)", letterSpacing: "0.06em" }}>
          {dateStr}
        </span>

        <Divider />

        {/* Time */}
        <span
          style={{
            fontSize: 8.5,
            color: "rgba(220,215,205,0.85)",
            letterSpacing: "0.08em",
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum"',
          }}
        >
          {timeStr}
        </span>

        <Divider />

        {/* Search */}
        <button
          title="Search"
          style={{
            background: "none",
            border: "none",
            color: "rgba(140,148,162,0.45)",
            cursor: "pointer",
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(220,215,205,0.85)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(140,148,162,0.45)")}
        >
          <Search size={11} strokeWidth={1.8} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          title="Cycle theme"
          style={{
            background: "none",
            border: "none",
            color: themeColor,
            cursor: "pointer",
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            opacity: 0.65,
            transition: "opacity 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
        >
          <ThemeIcon size={11} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 1,
        height: 10,
        background: "rgba(255,255,255,0.08)",
        margin: "0 10px",
        flexShrink: 0,
        verticalAlign: "middle",
      }}
    />
  );
}

// ── Legacy TopBar export (preserves compatibility with any other callers) ──
export { WorkspaceTopBar as TopBar };
export type { WorkspaceTopBarProps as TopBarProps };
