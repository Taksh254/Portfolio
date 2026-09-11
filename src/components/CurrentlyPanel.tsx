"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

const ROWS = [
  {
    key: "building" as const,
    label: "BUILDING",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <rect x="1" y="5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="0.9"/>
        <circle cx="6" cy="8" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: "learning" as const,
    label: "LEARNING",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M1 4L6 1.5 11 4 6 6.5 1 4z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" fill="none"/>
        <path d="M3 5.5v3.5c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5V5.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
        <line x1="11" y1="4" x2="11" y2="8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "exploring" as const,
    label: "EXPLORING",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M6 1v1M6 10v1M1 6h1M10 6h1" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
];

export function CurrentlyPanel() {
  const c = PROFILE.currently;
  const reading = "The Pragmatic Programmer";

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "14px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <span className="section-label" style={{ display: "block", marginBottom: 2 }}>
            // 02 &nbsp; CURRENTLY
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 6px",
            border: "1px solid rgba(217,47,39,0.25)",
            borderRadius: 2,
          }}
        >
          <div className="status-dot-red" style={{ width: 4, height: 4, borderRadius: "50%" }} />
          <span className="font-mono-tech" style={{ fontSize: 7, color: "var(--accent-red)", letterSpacing: "0.12em" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {ROWS.map((row, i) => (
          <div
            key={row.key}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "9px 0",
              borderBottom: i < ROWS.length ? "1px solid var(--border)" : "none",
            }}
          >
            <span style={{ color: "var(--text-muted)", marginTop: 1, flexShrink: 0 }}>
              {row.icon}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="font-mono-tech" style={{ fontSize: 7.5, letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 2 }}>
                {row.label}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c[row.key]}
              </div>
            </div>
          </div>
        ))}

        {/* Reading row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 0" }}>
          <span style={{ color: "var(--text-muted)", marginTop: 1, flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 2h3.5c.8 0 1.5 1 1.5 1S7.8 2 8.5 2H11v8H8.5c-.8 0-1.5.5-1.5.5s-.7-.5-1.5-.5H2V2z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" fill="none"/>
              <line x1="7" y1="3" x2="7" y2="10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-mono-tech" style={{ fontSize: 7.5, letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 2 }}>
              READING
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {reading}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
