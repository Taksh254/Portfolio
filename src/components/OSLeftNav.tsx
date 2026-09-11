"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "HOME",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2 6.5L7 2l5 4.5V12H9.5V9H4.5v3H2V6.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "projects",
    label: "PROJECTS",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="2" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1"/>
        <line x1="4" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="4" y1="9.5" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "lab",
    label: "LAB",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M5 2v5L2 11a1 1 0 00.9 1.5h8.2A1 1 0 0012 11L9 7V2" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
        <line x1="4.5" y1="2" x2="9.5" y2="2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="5.5" cy="9.5" r="0.8" fill="currentColor"/>
        <circle cx="8.5" cy="10.5" r="0.6" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "notes",
    label: "NOTES",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="2.5" y="1.5" width="9" height="11" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
        <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="4.5" y1="6.5" x2="9.5" y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="4.5" y1="8.5" x2="7.5" y2="8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "about",
    label: "ABOUT",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle cx="7" cy="4.5" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M2.5 12c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "contact",
    label: "CONTACT",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="1.5" y="3.5" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M1.5 4.5l5.5 4 5.5-4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

interface OSLeftNavProps {
  activeSection?: string;
}

export function OSLeftNav({ activeSection = "home" }: OSLeftNavProps) {
  const [active, setActive] = useState(activeSection);

  useEffect(() => {
    setActive(activeSection);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActive(id);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:flex"
      style={{
        position: "fixed",
        top: "var(--topbar-height, 32px)",
        left: 0,
        bottom: 0,
        width: "var(--sidebar-width, 64px)",
        background: "rgba(244, 241, 232, 0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 80,
        gap: 2,
        zIndex: 90,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* System indicator row */}
      <div
        style={{
          width: 28,
          height: 2,
          background: "var(--accent-red)",
          borderRadius: 1,
          marginBottom: 16,
          opacity: 0.7,
        }}
      />

      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className="os-nav-item"
            style={{ color: isActive ? "var(--accent-red)" : undefined }}
            title={item.label}
          >
            {/* Active indicator bar */}
            {isActive && <span className="os-nav-active-bar" />}

            {/* Icon */}
            <span style={{ opacity: isActive ? 1 : 0.65 }}>{item.icon}</span>

            {/* Label */}
            <span
              className="font-mono-tech"
              style={{
                fontSize: 6.5,
                letterSpacing: "0.12em",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Bottom: vertical line decoration */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 16, alignItems: "center" }}>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--border), transparent)" }} />
      </div>
    </nav>
  );
}
