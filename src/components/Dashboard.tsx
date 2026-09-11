"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { OSNavigation, OS_MODULES } from "./OSNavigation";
import { WorkspaceTopBar } from "./TopBar";
import { Notebook } from "./Notebook";
import { BookStand } from "./BookStand";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SIDEBAR_W = 64;   // px — matches OSNavigation width
const TOPBAR_H  = 32;   // px — matches WorkspaceTopBar height

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE PANEL
// ─────────────────────────────────────────────────────────────────────────────

function ProfilePanel({ lampBrightness }: { lampBrightness: number }) {
  const lb = lampBrightness;
  return (
    <div
      style={{
        width: 210,
        flexShrink: 0,
        background: "rgba(8,9,12,0.60)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 4,
        padding: "16px 14px 14px",
        position: "relative",
        overflow: "hidden",
        pointerEvents: "auto",
        boxShadow: "0 18px 48px rgba(0,0,0,0.88), 0 4px 12px rgba(0,0,0,0.6)",
      }}
    >
      {/* Lamp ambient bounce */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 5%, rgba(255,185,55,${(lb * 0.12).toFixed(3)}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle top-right corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 40,
          height: 1,
          background: "linear-gradient(to left, rgba(200,160,80,0.35), transparent)",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span
          className="font-mono-tech"
          style={{ fontSize: 7.5, color: "#4A5060", letterSpacing: "0.16em" }}
        >
          ENGINEER PROFILE
        </span>
        <span
          className="font-mono-tech"
          style={{ fontSize: 7.5, color: "#2E3540", letterSpacing: "0.10em" }}
        >
          01
        </span>
      </div>

      {/* Thin separator */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 12 }} />

      {/* Photo — polaroid style with atmospheric silhouette */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div
          style={{
            background: "#060709",
            padding: "4px 4px 14px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 2,
            transform: "rotate(-1.2deg)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.92), 0 2px 8px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              width: 108,
              height: 92,
              background: "#03040A",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Atmospheric background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 20%, rgba(28,42,68,0.7) 0%, rgba(3,4,10,0.99) 72%)",
              }}
            />
            {/* Workstation ambient shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "55%",
                background: "linear-gradient(to bottom, rgba(20,28,45,0.4) 0%, transparent 100%)",
              }}
            />
            {/* Engineer silhouette */}
            <svg
              style={{ position: "absolute", bottom: 0, width: "100%", display: "block" }}
              viewBox="0 0 108 80"
              fill="none"
            >
              {/* Body */}
              <path
                d="M 40,80 L 40,52 C 40,44 44,38 54,36 C 64,38 68,44 68,52 L 68,80 Z"
                fill="#020306"
              />
              {/* Head */}
              <ellipse cx="54" cy="28" rx="10" ry="12" fill="#020306" />
              {/* Shoulders */}
              <path d="M 30,80 L 35,58 C 36,53 40,50 40,52 L 68,52 C 68,50 72,53 73,58 L 78,80 Z" fill="#030408" />
            </svg>
            {/* Initials overlay */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -65%)",
                fontFamily: "Georgia, serif",
                fontSize: 11,
                fontWeight: 900,
                color: "rgba(200,160,80,0.35)",
                letterSpacing: "0.08em",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              T.S.
            </div>
            <div
              className="font-mono-tech"
              style={{ position: "absolute", bottom: 3, right: 4, fontSize: 6, color: "#2C3444", letterSpacing: "0.08em" }}
            >
              REF. #TS-001
            </div>
            {/* Warm amber overlay from lamp */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `rgba(255,178,52,${(lb * 0.08).toFixed(3)})`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Fields */}
      {[
        { label: "NAME",     value: "Taksh Sehrawat", color: "#CDC8BC", bold: true },
        { label: "ROLE",     value: "AI Engineer & Developer", color: "#8090A0", bold: false },
        { label: "LOCATION", value: "India", color: "#606878", bold: false },
      ].map(({ label, value, color, bold }) => (
        <div key={label} style={{ marginBottom: 8 }}>
          <div
            className="font-mono-tech"
            style={{ fontSize: 7, color: "#3C4454", letterSpacing: "0.14em", marginBottom: 2 }}
          >
            {label}
          </div>
          <div
            className="font-mono-tech"
            style={{ fontSize: bold ? 12 : 10, fontWeight: bold ? 700 : 400, color }}
          >
            {value}
          </div>
        </div>
      ))}

      {/* Status */}
      <div style={{ marginBottom: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 7, color: "#3C4454", letterSpacing: "0.14em", marginBottom: 4 }}
        >
          STATUS
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            className="status-dot-green"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2D8A5A",
              display: "inline-block",
            }}
          />
          <span
            className="font-mono-tech"
            style={{ fontSize: 8, color: "#2D8A5A", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>

      {/* CTA */}
      <a
        href="https://github.com/TakshSehrawat"
        target="_blank"
        rel="noreferrer"
        className="font-mono-tech"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          width: "100%",
          padding: "6px 0",
          background: "rgba(200,160,80,0.04)",
          border: "1px solid rgba(200,160,80,0.14)",
          borderRadius: 2,
          color: "#8090A0",
          fontSize: 8.5,
          letterSpacing: "0.08em",
          textDecoration: "none",
          cursor: "pointer",
          transition: "all 200ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#C8A050";
          e.currentTarget.style.borderColor = "rgba(200,160,80,0.35)";
          e.currentTarget.style.background = "rgba(200,160,80,0.07)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#8090A0";
          e.currentTarget.style.borderColor = "rgba(200,160,80,0.14)";
          e.currentTarget.style.background = "rgba(200,160,80,0.04)";
        }}
      >
        VIEW FULL PROFILE
        <ArrowUpRight size={10} strokeWidth={2} />
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO HEADER
// ─────────────────────────────────────────────────────────────────────────────

function HeroHeader() {
  return (
    <div
      style={{
        padding: "0 0 16px 0",
        pointerEvents: "auto",
      }}
    >
      {/* Breadcrumb */}
      <div
        className="font-mono-tech"
        style={{ fontSize: 8.5, color: "#4A5262", letterSpacing: "0.18em", marginBottom: 8 }}
      >
        &gt;_ / TAKSH.OS · WORKSPACE
      </div>

      {/* Large editorial display serif heading */}
      <h1
        className="font-serif-display"
        style={{
          fontSize: "clamp(34px, 4.4vw, 56px)",
          fontWeight: 800,
          fontStyle: "italic",
          color: "#E2DDD4",
          lineHeight: 0.94,
          margin: "0 0 14px",
          letterSpacing: "-0.025em",
          textShadow: "0 4px 28px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.85)",
        }}
      >
        TAKSH&apos;S
        <br />
        <span style={{ color: "#B8A88A" }}>ENGINEERING</span>
        <br />
        WORKSPACE
      </h1>

      {/* Understated system status line */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 10,
        }}
      >
        <StatusItem label="SYSTEM STATUS" value="ONLINE" valueColor="#2D8A5A" dot />
        <StatusDot />
        <StatusItem label="CURRENT FOCUS" value="AI SYSTEMS" valueColor="#8A9AB0" />
        <StatusDot />
        <StatusItem label="BUILD STATUS" value="ACTIVE" valueColor="#C8A050" />
      </div>
    </div>
  );
}

function StatusItem({
  label,
  value,
  valueColor,
  dot,
}: {
  label: string;
  value: string;
  valueColor: string;
  dot?: boolean;
}) {
  return (
    <div className="font-mono-tech" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8.5, letterSpacing: "0.08em" }}>
      <span style={{ color: "#454D5E" }}>{label}</span>
      <span style={{ color: "#252D3A" }}>·</span>
      {dot && (
        <span
          className="status-dot-green"
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: valueColor,
            boxShadow: `0 0 5px ${valueColor}77`,
            display: "inline-block",
          }}
        />
      )}
      <span style={{ color: valueColor, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function StatusDot() {
  return (
    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#252D3A", display: "inline-block", flexShrink: 0 }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED WORK
// ─────────────────────────────────────────────────────────────────────────────

interface ProjectEntry {
  num: string;
  name: string;
  sub: string;
  desc: string;
  tags: string[];
  accent: string;
  status: string;
  statusColor: string;
  link: string;
}

const FEATURED_PROJECTS: ProjectEntry[] = [
  {
    num: "01",
    name: "FINOVA",
    sub: "Autonomous AI Financial Operations Platform",
    desc: "AI-powered financial operations system covering accounting, payroll, treasury, and multi-agent RAG pipelines with audit-grade precision.",
    tags: ["AI SYSTEMS", "FINTECH", "AGENTS"],
    accent: "#C42020",
    status: "BUILDING",
    statusColor: "#C8A050",
    link: "https://github.com/TakshSehrawat",
  },
  {
    num: "02",
    name: "TATVAM CHATBOT",
    sub: "Hybrid RAG & Automation Suite",
    desc: "Hybrid sparse (BM25) + dense vector retrieval pipeline with streaming inference, sliding memory, and sub-200ms first-token latency.",
    tags: ["AI", "AUTOMATION", "BACKEND"],
    accent: "#2D8A5A",
    status: "LIVE DEMO",
    statusColor: "#2D8A5A",
    link: "https://github.com/TakshSehrawat",
  },
  {
    num: "03",
    name: "RESEARCH AGENT",
    sub: "Autonomous Research & Synthesis",
    desc: "Autonomous multi-agent system for deep web exploration, claim verification, and structured synthesis with 3.03× parallel speedup.",
    tags: ["AI", "RESEARCH", "LLM"],
    accent: "#C8A050",
    status: "OPERATIONAL",
    statusColor: "#C8A050",
    link: "https://github.com/TakshSehrawat",
  },
];

function FeaturedWork() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="archive-section"
      style={{
        padding: "0 0 70px 0",
        pointerEvents: "auto",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 16,
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="font-mono-tech" style={{ fontSize: 8.5, color: "#C8A050", letterSpacing: "0.16em" }}>
          02
        </span>
        <span className="font-mono-tech" style={{ fontSize: 8.5, color: "#2E3848", letterSpacing: "0.06em" }}>
          //
        </span>
        <h2
          className="font-mono-tech"
          style={{ fontSize: 10.5, fontWeight: 700, color: "#8E8898", letterSpacing: "0.14em", margin: 0 }}
        >
          FEATURED WORK &amp; CASE STUDIES
        </h2>
      </div>

      {/* 3 Project dossier cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {FEATURED_PROJECTS.map((p) => (
          <a
            key={p.num}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="project-card"
            onMouseEnter={() => setHovered(p.num)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "rgba(9,11,15,0.72)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: hovered === p.num ? "1px solid rgba(200,160,80,0.30)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 3,
              padding: "18px 18px 16px",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 220ms, transform 200ms, box-shadow 200ms",
              transform: hovered === p.num ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hovered === p.num ? "0 14px 36px rgba(0,0,0,0.85)" : "0 6px 18px rgba(0,0,0,0.60)",
            }}
          >
            {/* Top row */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span
                    className="font-mono-tech"
                    style={{ fontSize: 8.5, color: p.accent, letterSpacing: "0.12em", fontWeight: 700 }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-mono-tech"
                    style={{ fontSize: 13, fontWeight: 700, color: "#E0D8CC", letterSpacing: "0.06em" }}
                  >
                    {p.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: p.statusColor,
                      display: "inline-block",
                      boxShadow: `0 0 5px ${p.statusColor}88`,
                    }}
                  />
                  <span
                    className="font-mono-tech"
                    style={{ fontSize: 7.5, color: p.statusColor, letterSpacing: "0.08em", fontWeight: 700 }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <div
                className="font-mono-tech"
                style={{ fontSize: 8.5, color: "#667288", letterSpacing: "0.04em", marginBottom: 8 }}
              >
                {p.sub}
              </div>

              {/* Separator */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 10 }} />

              {/* Description */}
              <p style={{ fontSize: 11, lineHeight: 1.6, color: "#8E98A8", margin: "0 0 14px" }}>
                {p.desc}
              </p>
            </div>

            {/* Bottom: tags and action */}
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono-tech"
                    style={{
                      fontSize: 7.5,
                      padding: "2px 7px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 2,
                      color: "#5C6678",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span
                  className="font-mono-tech"
                  style={{
                    fontSize: 8.5,
                    color: hovered === p.num ? "#C8A050" : "#6E788A",
                    letterSpacing: "0.10em",
                    transition: "color 180ms",
                    fontWeight: 700,
                  }}
                >
                  VIEW CASE STUDY
                </span>
                <ArrowUpRight
                  size={12}
                  color={hovered === p.num ? "#C8A050" : "#6E788A"}
                  strokeWidth={2}
                  style={{
                    transform: hovered === p.num ? "translate(1px, -1px)" : "none",
                    transition: "transform 180ms, color 180ms",
                  }}
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MENU BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden font-mono-tech"
      style={{
        position: "fixed",
        top: 6,
        left: 10,
        zIndex: 46,
        background: "rgba(10,11,14,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        padding: "5px 8px",
        color: "#7A8090",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 9,
        letterSpacing: "0.08em",
      }}
    >
      <Menu size={13} strokeWidth={1.8} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD (Root Export)
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardProps {
  lampBrightness: number;
  onToggleLamp?: () => void;
}

export function Dashboard({ lampBrightness }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const scrollerRef = useRef<HTMLElement>(null);
  const isThrottled = useRef(false);

  const handleNavigate = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    if (scrollerRef.current && scrollerRef.current.scrollTop > 10) {
      scrollerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDiaryPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // ── Wheel Scroll = Physical Page Turn (0 to 7) ──
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (e: WheelEvent) => {
      if (scroller.scrollTop <= 15) {
        if (Math.abs(e.deltaY) < 18) return;

        if (e.deltaY > 0) {
          // Scrolling down: turn page forward if before final spread (7)
          if (currentPage < 7) {
            e.preventDefault();
            if (isThrottled.current) return;
            isThrottled.current = true;
            handleDiaryPageChange(currentPage + 1);
            setTimeout(() => {
              isThrottled.current = false;
            }, 500);
          }
        } else if (e.deltaY < 0) {
          // Scrolling up: turn page backward if after first spread (0)
          if (currentPage > 0 && scroller.scrollTop <= 5) {
            e.preventDefault();
            if (isThrottled.current) return;
            isThrottled.current = true;
            handleDiaryPageChange(currentPage - 1);
            setTimeout(() => {
              isThrottled.current = false;
            }, 500);
          }
        }
      }
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, [currentPage, handleDiaryPageChange]);

  // ── Touch Swipe for Mobile/Tablet (0 to 7) ──
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (scroller.scrollTop <= 12) {
        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;

        if (Math.abs(diff) > 42) {
          if (diff > 0 && currentPage < 7) {
            if (isThrottled.current) return;
            isThrottled.current = true;
            handleDiaryPageChange(currentPage + 1);
            setTimeout(() => {
              isThrottled.current = false;
            }, 500);
          } else if (diff < 0 && currentPage > 0 && scroller.scrollTop <= 5) {
            if (isThrottled.current) return;
            isThrottled.current = true;
            handleDiaryPageChange(currentPage - 1);
            setTimeout(() => {
              isThrottled.current = false;
            }, 500);
          }
        }
      }
    };

    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
    };
  }, [currentPage, handleDiaryPageChange]);

  return (
    <>
      {/* ── Left Navigation Rail (TAKSH.OS Module Dock) ── */}
      <OSNavigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* ── Mobile menu button ── */}
      <MobileMenuButton onClick={() => setMobileSidebarOpen(true)} />

      {/* ── Top system monitoring bar ── */}
      <WorkspaceTopBar />

      {/* ── Main scrollable workspace ── */}
      <main
        id="main-workspace-scroll"
        ref={scrollerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          overflowX: "hidden",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        {/* Constrained max-width container to prevent oversized sprawling layout */}
        <div
          style={{
            maxWidth: 1560,
            margin: "0 auto",
            paddingLeft: "clamp(74px, 6.5vw, 102px)",
            paddingRight: "clamp(20px, 3vw, 44px)",
            paddingTop: TOPBAR_H + 16,
          }}
        >
          {/* ── Hero section: upper ~30% ── */}
          <HeroHeader />

          {/* ── Main 3-part composition: 20% Nav | 55% Notebook on BookStand | 25% Profile ── */}
          <div
            style={{
              display: "flex",
              gap: "clamp(16px, 2.2vw, 36px)",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            {/* Center Anchor: DeskLamp spacing + Physical Book Stand holding the Open Diary */}
            <div
              style={{
                display: "flex",
                gap: "clamp(8px, 1.2vw, 20px)",
                alignItems: "flex-start",
                flex: "1 1 auto",
                minWidth: "min(100%, 640px)",
              }}
            >
              {/* Space reserved for physical DeskLamp positioned in page.tsx on the left */}
              <div
                aria-hidden="true"
                style={{
                  width: "clamp(90px, 7.5vw, 140px)",
                  flexShrink: 0,
                  pointerEvents: "none",
                }}
              />

              {/* Physical Book Stand with Engineering Diary */}
              <div style={{ flexShrink: 0, pointerEvents: "auto" }}>
                <BookStand lampBrightness={lampBrightness} width={630}>
                  <Notebook
                    lampBrightness={lampBrightness}
                    currentSpread={currentPage}
                    onSpreadChange={handleDiaryPageChange}
                  />
                </BookStand>
              </div>
            </div>

            {/* Right Column: Personal Engineer Profile Record */}
            <div
              style={{
                flexShrink: 0,
                pointerEvents: "auto",
              }}
            >
              <ProfilePanel lampBrightness={lampBrightness} />
            </div>
          </div>

          {/* ── Guidance bar: Scroll instruction & link to featured work below ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "8px 0 28px",
              padding: "0 10px",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              paddingTop: 12,
            }}
          >
            <div
              className="font-mono-tech"
              style={{
                fontSize: 8,
                color: "rgba(140,148,162,0.45)",
                letterSpacing: "0.14em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>SCROLL OR USE OS DOCK TO TURN DIARY PAGES</span>
              <span style={{ color: "#C8A050" }}>
                [ MODULE {currentPage + 1} / 08 · {OS_MODULES[currentPage]?.label || "HOME"} ]
              </span>
            </div>

            <a
              href="#archive-section"
              className="font-mono-tech"
              style={{
                fontSize: 8,
                color: "#C8A050",
                letterSpacing: "0.12em",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
                opacity: 0.85,
                transition: "opacity 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              <span>VIEW ALL CASE STUDIES</span>
              <span>↓</span>
            </a>
          </div>

          {/* ── Featured Work & Case Studies immediately below ── */}
          <FeaturedWork />

          {/* Footer clearance */}
          <div style={{ height: 40 }} />
        </div>
      </main>
    </>
  );
}

