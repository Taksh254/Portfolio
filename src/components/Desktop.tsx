"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FolderGit2, FlaskConical, BookOpen, User, Send,
  ArrowUpRight, Command, ChevronDown, Cpu, Activity,
  Code2, Compass, Wrench, Search, Check, Home, FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/Icons";
import { WindowId } from "@/types/os";
import { PROJECTS } from "@/data/projects";
import { EXPERIMENTS } from "@/data/experiments";
import { NOTES } from "@/data/notes";
import { PROFILE, CONTACT_EMAIL, gmailComposeUrl } from "@/data/profile";
import { OSWindow } from "./OSWindow";
import { WorkWindow } from "./windows/WorkWindow";
import { LabWindow } from "./windows/LabWindow";
import { NotesWindow } from "./windows/NotesWindow";
import { AboutWindow } from "./windows/AboutWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { BatEmblem, GothamSkyline } from "./BatEmblem";
import { EngineeringNotebook } from "./EngineeringNotebook";

export type OSTheme = "dark" | "paper" | "blueprint";

interface DesktopProps {
  openWindows: Record<WindowId, boolean>;
  minimizedWindows: Record<WindowId, boolean>;
  activeWindow: WindowId | null;
  onOpenWindow: (id: WindowId) => void;
  onCloseWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  onFocusWindow: (id: WindowId) => void;
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  selectedExpId: string | null;
  onSelectExp: (id: string | null) => void;
  selectedNoteId: string | null;
  onSelectNote: (id: string | null) => void;
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { id: "home",     label: "HOME",     Icon: Home,       section: "hero" },
  { id: "projects", label: "PROJECTS", Icon: FolderGit2, section: "featured-work" },
  { id: "research", label: "RESEARCH", Icon: FlaskConical,section: "about-section" },
  { id: "skills",   label: "SKILLS",   Icon: Cpu,        section: "skills-section" },
  { id: "essays",   label: "ESSAYS",   Icon: BookOpen,   section: "essays-section" },
  { id: "tools",    label: "TOOLS",    Icon: Wrench,     section: "tools-section" },
  { id: "journal",  label: "JOURNAL",  Icon: FileText,   section: "contact-section" },
] as const;

/* reusable dark panel style */
const panel = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "#0D1015",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "14px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.75)",
  ...extra,
});

/* ============================================================ */
export function Desktop({
  openWindows, minimizedWindows, activeWindow,
  onOpenWindow, onCloseWindow, onMinimizeWindow, onFocusWindow,
  selectedProjectId, onSelectProject,
  selectedExpId, onSelectExp,
  selectedNoteId, onSelectNote,
  onOpenCommandPalette,
}: DesktopProps) {

  const [activeNav, setActiveNav] = useState("home");
  const [timeStr, setTimeStr] = useState("00:00:00");
  const [dateStr, setDateStr] = useState("");
  const [theme, setTheme] = useState<OSTheme>("dark");
  const [themeMenu, setThemeMenu] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);

  /* clock */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTimeStr(n.toLocaleTimeString("en-US", { hour12: false }));
      setDateStr(n.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" }).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* theme persistence */
  useEffect(() => {
    const saved = (localStorage.getItem("taksh_os_theme") as OSTheme) || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const applyTheme = (t: OSTheme) => {
    setTheme(t); setThemeMenu(false);
    localStorage.setItem("taksh_os_theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  const scrollTo = useCallback((id: string) => {
    if (id === "hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSending(true);
    setTimeout(() => {
      setReceipt(`#PKT-${Math.floor(1000 + Math.random() * 9000)}`);
      setSending(false);
      setMsg(""); setName(""); setEmail("");
    }, 600);
  };

  /* ============================================================ */
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#07090A", display: "flex", flexDirection: "column" }}>

      {/* ================================================================ */}
      {/* TOP SYSTEM BAR                                                   */}
      {/* ================================================================ */}
      <header
        className="font-mono-tech"
        style={{
          height: "44px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          background: "rgba(5,7,8,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BatEmblem className="w-5 h-3 text-[#C8A050]" />
            <span style={{ fontWeight: "700", color: "#FFFFFF", letterSpacing: "0.08em", fontSize: "13px" }}>TAKSH.OS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3A4050", borderLeft: "1px solid #181E28", paddingLeft: "12px" }}>
            <span>v1.0.0</span>
            <span style={{ borderLeft: "1px solid #181E28", paddingLeft: "10px" }}>
              CONTEXT: <span style={{ color: "#C42020", fontWeight: "700" }}>PORTFOLIO</span>
            </span>
            <span style={{ borderLeft: "1px solid #181E28", paddingLeft: "10px" }} className="hidden md:inline">
              SYS_LOAD: 0.18
            </span>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px" }}>

          {/* Search */}
          <button
            onClick={onOpenCommandPalette}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "4px 10px", background: "#0D1015",
              border: "1px solid #181E28", borderRadius: "6px",
              color: "#4A5060", cursor: "pointer",
            }}
          >
            <Search style={{ width: "12px", height: "12px" }} />
            <span className="hidden sm:inline">Search…</span>
            <span style={{ padding: "1px 5px", background: "#161B22", border: "1px solid #252E3A", borderRadius: "3px", fontSize: "9px", color: "#7C828A" }}>
              ⌘K
            </span>
          </button>

          {/* Theme */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setThemeMenu(!themeMenu)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "4px 8px", background: "#0D1015",
                border: "1px solid #181E28", borderRadius: "6px",
                color: "#E2DDD6", cursor: "pointer",
              }}
            >
              <BatEmblem className="w-4 h-2.5 text-[#C8A050]" />
              <ChevronDown style={{ width: "12px", height: "12px", color: "#4A5060" }} />
            </button>
            {themeMenu && (
              <div
                style={{
                  position: "absolute", right: 0, top: "calc(100% + 6px)", width: "148px",
                  background: "#0D1015", border: "1px solid #181E28", borderRadius: "10px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.92)", zIndex: 100, padding: "4px 0",
                }}
              >
                {(["dark", "paper", "blueprint"] as OSTheme[]).map((t) => (
                  <button key={t} onClick={() => applyTheme(t)}
                    style={{
                      width: "100%", padding: "7px 12px", display: "flex", alignItems: "center",
                      justifyContent: "space-between", cursor: "pointer", background: "none", border: "none",
                      color: theme === t ? "#C42020" : "#E2DDD6", fontWeight: theme === t ? "700" : "400",
                      fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px",
                    }}
                  >
                    <span style={{ textTransform: "uppercase" }}>{t}</span>
                    {theme === t && <Check style={{ width: "13px", height: "13px" }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Online */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #181E28", paddingLeft: "10px", color: "#E2DDD6", fontWeight: "600" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D8A5A", animation: "pulse 2s infinite" }} />
            <span className="hidden sm:inline">ONLINE</span>
          </div>

          {/* Time */}
          <div className="hidden md:block" style={{ color: "#4A5060" }}>
            <span>{dateStr}</span>
            <span style={{ marginLeft: "8px", color: "#7C828A", fontWeight: "700" }}>{timeStr}</span>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* LAYOUT: SIDEBAR + MAIN                                           */}
      {/* ================================================================ */}
      <div style={{ display: "flex", flex: 1, minWidth: 0 }}>

        {/* ============================================================ */}
        {/* DARK SIDEBAR — Batcomputer navigation console                 */}
        {/* ============================================================ */}
        <aside
          className="hidden lg:flex font-mono-tech"
          style={{
            width: "196px",
            flexShrink: 0,
            background: "#06080A",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "sticky",
            top: "44px",
            height: "calc(100vh - 44px)",
            userSelect: "none",
            padding: "16px",
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <BatEmblem className="w-5 h-3 text-[#C8A050]" />
                <span style={{ fontWeight: "700", fontSize: "13px", color: "#FFFFFF", letterSpacing: "0.08em" }}>TAKSH.OS</span>
              </div>
              <div style={{ fontSize: "7px", color: "#252B38", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                BUILD · BREAK · UNDERSTAND · REPEAT
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {NAV_ITEMS.map(({ id, label, Icon, section }) => {
                const active = activeNav === id;
                return (
                  <button
                    key={id}
                    onClick={() => { setActiveNav(id); scrollTo(section); }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: active ? "#111518" : "transparent",
                      border: active ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      color: active ? "#E2DDD6" : "#4A5060",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "11px",
                      fontWeight: active ? "700" : "500",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {active && <div style={{ width: "2px", height: "14px", background: "#C42020", borderRadius: "1px", flexShrink: 0 }} />}
                    <Icon style={{ width: "14px", height: "14px", flexShrink: 0, color: active ? "#C42020" : "#2A3040" }} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Status */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#252B38", borderTop: "1px solid #131820", paddingTop: "8px" }}>
              <span>v1.0.0</span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#E2DDD6" }}>
                TAKSH.OS: ACTIVE
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2D8A5A", display: "inline-block" }} />
              </span>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* MAIN CONTENT                                                  */}
        {/* ============================================================ */}
        <main style={{ flex: 1, minWidth: 0, paddingBottom: "80px" }}>

          {/* ========================================================== */}
          {/* ██ HERO SECTION — Full-viewport Gotham workstation canvas   */}
          {/* ========================================================== */}
          <section
            id="hero"
            style={{
              position: "relative",
              height: "calc(100vh - 44px)",
              minHeight: "580px",
              overflow: "hidden",
            }}
          >

            {/* ———————————————————————————————————————————————————————— */}
            {/* LAYER 0: Full-bleed video background                      */}
            {/* ———————————————————————————————————————————————————————— */}
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
              }}
            >
              <source src="/bg-video.mp4" type="video/mp4" />
            </video>

            {/* Dark cinematic overlay — preserves Gotham atmosphere */}
            <div
              style={{
                position: "absolute", inset: 0,
                background: "rgba(4,6,10,0.55)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Subtle rain streaks on glass — atmospheric texture */}
            <div
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  172deg,
                  transparent 0px, transparent 2px,
                  rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px,
                  transparent 3px, transparent 15px
                )`,
                backgroundSize: "10px 90px",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* ———————————————————————————————————————————————————————— */}
            {/* LAYER 2: Desk surface gradient — lower ~45%              */}
            {/* ———————————————————————————————————————————————————————— */}
            <div
              style={{
                position: "absolute",
                top: "55%", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to bottom, rgba(9,9,13,0.82) 0%, rgba(12,14,18,0.93) 50%, rgba(10,12,16,0.97) 100%)",
                borderTop: "1px solid rgba(255,255,255,0.035)",
                zIndex: 3,
              }}
            />

            {/* Desk lamp — warm radial pool of light over the notebook */}
            <div
              style={{
                position: "absolute",
                pointerEvents: "none",
                top: "28%", left: "18%",
                width: "650px", height: "600px",
                background: "radial-gradient(ellipse at center top, rgba(255,205,110,0.065) 0%, transparent 58%)",
                borderRadius: "50%",
                zIndex: 4,
              }}
            />

            {/* Deep vignette around edges */}
            <div
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.72) 100%)",
                zIndex: 4,
              }}
            />

            {/* ———————————————————————————————————————————————————————— */}
            {/* LAYER 3: DETECTIVE EVIDENCE BOARD — upper-right wall area */}
            {/* ———————————————————————————————————————————————————————— */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", top: "10px", right: "20px", width: "240px", height: "50%", pointerEvents: "none", zIndex: 5 }}
            >
              {/* Evidence photo 1 — Gotham cityscape shot */}
              <div
                style={{
                  position: "absolute", top: "12px", right: "140px",
                  width: "82px", background: "#050608",
                  padding: "5px", paddingBottom: "18px",
                  transform: "rotate(-3deg)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.95)",
                  border: "1px solid #141820", zIndex: 2,
                }}
              >
                <div style={{ width: "100%", height: "64px", background: "#020305", position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 72 60" style={{ width: "100%", position: "absolute", bottom: 0 }} fill="#0A1428">
                    <path d="M0 60 L0 44 L6 44 L6 34 L9 22 L10 22 L11 34 L13 34 L13 44 L20 44 L20 32 L23 32 L25 18 L26 18 L27 32 L30 32 L30 44 L38 44 L38 28 L41 28 L43 12 L44 12 L45 28 L48 28 L48 44 L56 44 L56 30 L59 30 L61 14 L62 14 L63 30 L66 30 L66 44 L72 44 L72 60 Z" />
                  </svg>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "20px", background: "linear-gradient(to top, rgba(255,140,40,0.1), transparent)" }} />
                </div>
                <div className="font-mono-tech" style={{ fontSize: "6px", color: "#403830", textAlign: "center", paddingTop: "3px", letterSpacing: "0.1em" }}>GOTHAM 02:47</div>
              </div>

              {/* Red pushpin */}
              <div style={{ position: "absolute", top: "6px", right: "185px", width: "7px", height: "7px", borderRadius: "50%", background: "#C42020", boxShadow: "0 2px 6px rgba(0,0,0,0.9)", zIndex: 5 }} />

              {/* Classified file card */}
              <div
                style={{
                  position: "absolute", top: "8px", right: "20px",
                  width: "115px", background: "#08090C",
                  border: "1px solid rgba(255,255,255,0.055)",
                  padding: "8px", transform: "rotate(1.8deg)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.9)", zIndex: 2,
                }}
              >
                <div className="font-mono-tech" style={{ fontSize: "8px", color: "#C42020", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "5px" }}>▌ CLASSIFIED</div>
                <div className="font-mono-tech" style={{ fontSize: "9px", color: "#4A5060", lineHeight: "1.6" }}>
                  SUBJECT:<br /><span style={{ color: "#D0CBC2" }}>T. SEHRAWAT</span><br />
                  CLEARANCE:<br /><span style={{ color: "#2D8A5A" }}>LEVEL 04</span><br />
                  STATUS:<br /><span style={{ color: "#C42020" }}>ACTIVE</span>
                </div>
              </div>

              {/* Gold pushpin */}
              <div style={{ position: "absolute", top: "2px", right: "67px", width: "6px", height: "6px", borderRadius: "50%", background: "#C8A050", boxShadow: "0 2px 4px rgba(0,0,0,0.8)", zIndex: 5 }} />

              {/* Technical schematic */}
              <div
                style={{
                  position: "absolute", top: "145px", right: "10px",
                  width: "140px", background: "#050608",
                  border: "1px solid rgba(255,255,255,0.04)",
                  padding: "8px", transform: "rotate(-1.2deg)",
                  boxShadow: "0 5px 16px rgba(0,0,0,0.85)", zIndex: 2,
                }}
              >
                <svg viewBox="0 0 128 78" fill="none" stroke="#162030" strokeWidth="0.85" style={{ width: "100%", height: "68px" }}>
                  <rect x="8" y="8" width="28" height="18" rx="2" />
                  <rect x="92" y="8" width="28" height="18" rx="2" />
                  <line x1="36" y1="17" x2="92" y2="17" />
                  <circle cx="64" cy="17" r="5" />
                  <line x1="64" y1="22" x2="64" y2="38" />
                  <rect x="44" y="38" width="40" height="24" rx="2" />
                  <text x="54" y="54" fontSize="8" fontFamily="monospace" fill="#1E3050">CORE</text>
                  <line x1="8" y1="26" x2="8" y2="68" />
                  <line x1="120" y1="26" x2="120" y2="68" />
                  <line x1="8" y1="68" x2="44" y2="68" strokeDasharray="3 2" />
                  <line x1="84" y1="68" x2="120" y2="68" strokeDasharray="3 2" />
                </svg>
                <div className="font-mono-tech" style={{ fontSize: "7px", color: "#253040", textAlign: "center" }}>NEURAL ARCH. v2.1</div>
              </div>

              {/* Red string connecting evidence */}
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
                viewBox="0 0 240 300"
                fill="none"
              >
                <path
                  d="M55 18 Q80 60 100 30"
                  stroke="rgba(196,32,32,0.35)"
                  strokeWidth="0.8"
                  strokeDasharray="none"
                />
              </svg>
            </div>

            {/* ———————————————————————————————————————————————————————— */}
            {/* LAYER 4: OBJECTS ON DESK — notebook + profile            */}
            {/* ———————————————————————————————————————————————————————— */}
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "0 20px 24px",
                display: "flex",
                alignItems: "flex-end",
                gap: "16px",
                zIndex: 10,
              }}
            >
              {/* ── THE PHYSICAL NOTEBOOK ── */}
              <div
                style={{
                  width: "min(460px, 48%)",
                  flexShrink: 0,
                  transform: "rotate(-1.3deg)",
                  filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.99)) drop-shadow(0 14px 28px rgba(0,0,0,0.92)) drop-shadow(0 6px 12px rgba(0,0,0,0.8))",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <EngineeringNotebook
                  onExploreWork={() => scrollTo("featured-work")}
                  onScrollDown={() => scrollTo("featured-work")}
                />
              </div>

              {/* ── ENGINEER PROFILE DOSSIER ── */}
              <div
                className="font-mono-tech"
                style={{
                  width: "220px",
                  flexShrink: 0,
                  height: "310px",
                  background: "#0B0E12",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 24px 56px rgba(0,0,0,0.95), 0 10px 24px rgba(0,0,0,0.8)",
                  zIndex: 10,
                  position: "relative",
                }}
              >
                {/* Header */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "10px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "#FFFFFF", letterSpacing: "0.08em" }}>ENGINEER PROFILE</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#C42020" }}>01</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "10px" }}>
                    {[
                      { label: "NAME",     value: "Taksh Sehrawat", big: true },
                      { label: "ROLE",     value: "AI Engineer\n& Developer" },
                      { label: "LOCATION", value: "India" },
                    ].map(({ label, value, big }) => (
                      <div key={label}>
                        <div style={{ fontSize: "8px", color: "#3A4050", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: "600", marginBottom: "1px" }}>{label}</div>
                        <div style={{ fontSize: big ? "12px" : "10px", color: big ? "#FFFFFF" : "#C8C0B8", fontWeight: big ? "700" : "500", lineHeight: "1.35", whiteSpace: "pre-line" }}>{value}</div>
                      </div>
                    ))}

                    <div>
                      <div style={{ fontSize: "8px", color: "#3A4050", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: "600", marginBottom: "2px" }}>STATUS</div>
                      <div style={{ fontSize: "10px", color: "#2D8A5A", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2D8A5A", display: "inline-block", flexShrink: 0 }} />
                        AVAILABLE FOR WORK
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dark polaroid photo */}
                <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                  {/* Tape */}
                  <div
                    style={{
                      position: "absolute", top: "-7px", left: "50%",
                      transform: "translateX(-50%) rotate(-2deg)",
                      width: "44px", height: "15px",
                      background: "rgba(220,208,175,0.55)",
                      border: "1px solid rgba(200,188,148,0.65)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                      borderRadius: "1px", zIndex: 10,
                    }}
                  />
                  <div
                    style={{
                      width: "106px",
                      background: "#07080A",
                      padding: "5px", paddingBottom: "18px",
                      boxShadow: "0 8px 22px rgba(0,0,0,0.9)",
                      border: "1px solid #141820",
                      borderRadius: "1px",
                      transform: "rotate(2.5deg)",
                      position: "relative",
                    }}
                  >
                    <div style={{ width: "100%", height: "82px", background: "#040506", position: "relative", overflow: "hidden" }}>
                      <img
                        src="/taksh-profile.png"
                        alt="Taksh Sehrawat"
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.2)", opacity: 0.72 }}
                        onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "rgba(255,255,255,0.25)", fontWeight: "700" }}>TS</div>
                    </div>
                    <div className="font-mono-tech" style={{ fontSize: "6px", color: "#504040", textAlign: "center", paddingTop: "3px", letterSpacing: "0.1em" }}>ENG. PROFILE REF.</div>

                    {/* Red handwritten note beside photo */}
                    <div
                      className="font-handwriting"
                      style={{
                        position: "absolute", right: "-36px", top: "10px",
                        fontSize: "8px", color: "#C42020",
                        transform: "rotate(90deg)", transformOrigin: "top right",
                        whiteSpace: "nowrap",
                      }}
                    >
                      same mindset. different city.
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenWindow("about")}
                  style={{
                    width: "100%", padding: "8px",
                    background: "#111518",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "7px",
                    color: "#E2DDD6",
                    fontSize: "10px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontWeight: "700",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  VIEW FULL PROFILE <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                </button>
              </div>

              {/* ── Right atmospheric space (dark wall / background shows) ── */}
              {/* intentionally empty — the Gotham background fills this */}
            </div>

            {/* Small red system indicator — bottom right overlay */}
            <div
              className="font-mono-tech"
              style={{
                position: "absolute", bottom: "8px", right: "16px",
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "9px", color: "#2A3040",
                zIndex: 20,
              }}
            >
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C42020", display: "inline-block" }} />
              GOTHAM WORKSTATION ACTIVE
            </div>
          </section>

          {/* ========================================================== */}
          {/* §02 — FEATURED WORK                                         */}
          {/* ========================================================== */}
          <section id="featured-work" style={{ padding: "40px 20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FolderGit2 style={{ width: "16px", height: "16px", color: "#C42020" }} />
                <span className="font-mono-tech" style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.06em" }}>
                  02 // FEATURED WORK &amp; CASE STUDIES
                </span>
              </div>
              <button
                onClick={() => onOpenWindow("work")}
                className="font-mono-tech"
                style={{ display: "flex", alignItems: "center", gap: "4px", color: "#4A5060", background: "none", border: "none", cursor: "pointer", fontSize: "11px" }}
              >
                VIEW ALL ({PROJECTS.length}) <ArrowUpRight style={{ width: "14px", height: "14px" }} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { num: "01", id: "tatvam-chatbot", title: "Tatvam Chatbot", desc: "Hybrid RAG system for intelligent knowledge retrieval with sliding-window memory.", status: "LIVE DEMO", sc: "#2D8A5A", sb: "#0A1E14", meta: "HYBRID_RAG", detail: "180ms TTFT" },
                { num: "02", id: "autonomous-research-agent", title: "Automation Suite", desc: "Workflow automation tools for developer productivity and research pipelines.", status: "IN DEV", sc: "#C8A050", sb: "#1A1508", meta: "LANGGRAPH DAG", detail: "3.03x SPEEDUP" },
                { num: "03", id: "autonomous-research-agent", title: "Research Agent", desc: "Autonomous agent for deep internet exploration, claim verification, and synthesis.", status: "OPERATIONAL", sc: "#2D8A5A", sb: "#0A1E14", meta: "MULTI-AGENT", detail: "VERIFIED" },
              ].map((p) => (
                <div
                  key={p.num}
                  onClick={() => { onSelectProject(p.id); onOpenWindow("work"); }}
                  style={{ ...panel({ padding: "18px", cursor: "pointer", transition: "border-color 180ms, transform 180ms" }) }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,32,32,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#C42020" }}>{p.num}</span>
                    <span style={{ fontSize: "9px", fontWeight: "700", color: p.sc, background: p.sb, border: `1px solid ${p.sc}30`, padding: "2px 8px", borderRadius: "3px" }}>● {p.status}</span>
                  </div>
                  <div style={{ height: "72px", background: "#08090C", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", marginBottom: "12px", padding: "10px" }}>
                    <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", color: "#3A4050", marginBottom: "8px" }}>
                      <span>{p.meta}</span><span>{p.detail}</span>
                    </div>
                    <div style={{ width: "68%", height: "5px", borderRadius: "2px", background: "rgba(196,32,32,0.3)", marginBottom: "5px" }} />
                    <div style={{ width: "44%", height: "5px", borderRadius: "2px", background: "rgba(45,100,180,0.28)" }} />
                  </div>
                  <h4 style={{ fontWeight: "700", fontSize: "15px", color: "#FFFFFF", marginBottom: "5px" }}>{p.title}</h4>
                  <p style={{ fontSize: "11px", color: "#7C828A", lineHeight: "1.55" }}>{p.desc}</p>
                  <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "10px" }}>
                    <span style={{ color: "#3A4050" }}>YEAR: 2026</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#C42020", fontWeight: "700" }}>CASE STUDY <ArrowUpRight style={{ width: "13px", height: "13px" }} /></span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================== */}
          {/* §03 + §03b — ABOUT + CURRENTLY                             */}
          {/* ========================================================== */}
          <section id="about-section" style={{ padding: "40px 20px 0", display: "grid", gridTemplateColumns: "1fr", gap: "16px" }} className="lg:grid-cols-12-auto">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {/* About */}
              <div style={panel({ padding: "24px" })}>
                <div className="font-mono-tech" style={{ fontSize: "10px", fontWeight: "700", color: "#C42020", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>03 // ABOUT THE ENGINEER</div>
                <h2 style={{ fontSize: "clamp(17px, 2vw, 22px)", fontWeight: "700", color: "#FFFFFF", lineHeight: "1.35", marginBottom: "10px" }}>I like understanding systems from the inside out.</h2>
                <p style={{ fontSize: "12px", color: "#7C828A", lineHeight: "1.65", marginBottom: "8px" }}>I build software, experiment with AI, automate repetitive workflows, and explore how intelligent systems can interact with the real world.</p>
                <p style={{ fontSize: "12px", color: "#7C828A", lineHeight: "1.65" }}>Rather than treating AI models as black boxes, my engineering philosophy revolves around understanding memory bandwidth, cache paging, and hardware constraints.</p>
                <div className="font-mono-tech" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "10px" }}>
                  <div><div style={{ fontSize: "8px", color: "#3A4050", fontWeight: "700", textTransform: "uppercase", marginBottom: "3px" }}>CORE FOCUS</div><div style={{ color: "#C0BBC2" }}>AI · Automation · Software · Robotics</div></div>
                  <div><div style={{ fontSize: "8px", color: "#3A4050", fontWeight: "700", textTransform: "uppercase", marginBottom: "3px" }}>APPROACH</div><div style={{ color: "#C42020", fontWeight: "600" }}>Build → Break → Understand → Iterate</div></div>
                </div>
              </div>

              {/* Currently */}
              <div style={panel({ padding: "20px" })}>
                <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <Activity style={{ width: "14px", height: "14px", color: "#C42020" }} />
                    <span style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "11px" }}>CURRENTLY / 2026</span>
                  </div>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2D8A5A", display: "inline-block" }} />
                </div>
                {[
                  { Icon: Code2,   label: "BUILDING",   value: "Research Agent v2", color: "#C42020" },
                  { Icon: BookOpen,label: "LEARNING",   value: "Transformers & Diffusion Models", color: "#2D8A5A" },
                  { Icon: Compass, label: "EXPLORING",  value: "Multi-Agent Systems & Robotics", color: "#C8A050" },
                ].map(({ Icon, label, value, color }) => (
                  <div key={label} style={{ padding: "10px", background: "#080B0E", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", marginBottom: "8px" }}>
                    <div className="font-mono-tech" style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "9px", color, fontWeight: "700", marginBottom: "3px" }}><Icon style={{ width: "11px", height: "11px" }} />[ {label} ]</div>
                    <div style={{ fontSize: "11px", color: "#E2DDD6", fontWeight: "600" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/* §04 — EXPERIMENTS                                           */}
          {/* ========================================================== */}
          <section id="skills-section" style={{ padding: "40px 20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FlaskConical style={{ width: "15px", height: "15px", color: "#C42020" }} />
                <span className="font-mono-tech" style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "13px" }}>04 // EXPERIMENT LOG &amp; EMPIRICAL TRIALS</span>
              </div>
              <button onClick={() => onOpenWindow("lab")} className="font-mono-tech" style={{ color: "#4A5060", background: "none", border: "none", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
                VIEW FULL LAB ({EXPERIMENTS.length}) <ArrowUpRight style={{ width: "13px", height: "13px" }} />
              </button>
            </div>
            {EXPERIMENTS.slice(0, 4).map((exp) => (
              <div
                key={exp.id}
                onClick={() => { onSelectExp(exp.id); onOpenWindow("lab"); }}
                style={{ ...panel({ padding: "13px 18px", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", cursor: "pointer", transition: "border-color 150ms" }) }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,32,32,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
                  <span className="font-mono-tech" style={{ fontWeight: "700", fontSize: "15px", color: "#C42020", flexShrink: 0 }}>{exp.number}</span>
                  <div style={{ minWidth: 0 }}>
                    <h4 className="font-sans" style={{ fontWeight: "700", fontSize: "13px", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.title}</h4>
                    <p className="font-mono-tech" style={{ fontSize: "10px", color: "#4A5060", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ color: "#3A4050" }}>HYP: </span>{exp.hypothesis}</p>
                  </div>
                </div>
                <span
                  className="font-mono-tech"
                  style={{
                    padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: "700", flexShrink: 0, textTransform: "uppercase",
                    color: exp.status === "completed" ? "#2D8A5A" : exp.status === "failed" ? "#C42020" : "#C8A050",
                    background: exp.status === "completed" ? "#0A1E14" : exp.status === "failed" ? "#1A0808" : "#1A1508",
                    border: `1px solid ${exp.status === "completed" ? "#1A4028" : exp.status === "failed" ? "#3A1010" : "#3A2808"}`,
                  }}
                >
                  {exp.status}
                </span>
              </div>
            ))}
          </section>

          {/* ========================================================== */}
          {/* §05 — ESSAYS                                                */}
          {/* ========================================================== */}
          <section id="essays-section" style={{ padding: "40px 20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen style={{ width: "15px", height: "15px", color: "#C42020" }} />
                <span className="font-mono-tech" style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "13px" }}>05 // ESSAYS &amp; FIELD NOTES</span>
              </div>
              <button onClick={() => onOpenWindow("notes")} className="font-mono-tech" style={{ color: "#4A5060", background: "none", border: "none", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
                READ ALL ({NOTES.length}) <ArrowUpRight style={{ width: "13px", height: "13px" }} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
              {NOTES.slice(0, 4).map((note, i) => (
                <div
                  key={note.id}
                  onClick={() => { onSelectNote(note.id); onOpenWindow("notes"); }}
                  style={{ ...panel({ padding: "18px", cursor: "pointer", transition: "border-color 160ms, transform 160ms" }) }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,32,32,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", marginBottom: "8px" }}>
                    <span style={{ color: "#C42020", fontWeight: "700" }}>0{i+1} // {note.category}</span>
                    <span style={{ color: "#4A5060" }}>{note.readTime}</span>
                  </div>
                  <h4 className="font-serif-editorial" style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF", lineHeight: "1.35", marginBottom: "6px" }}>{note.title}</h4>
                  <p style={{ fontSize: "11px", color: "#7C828A", lineHeight: "1.55", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{note.summary}</p>
                  <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "9px" }}>
                    <span style={{ color: "#3A4050" }}>{note.date}</span>
                    <span style={{ color: "#C42020", fontWeight: "700", display: "flex", alignItems: "center", gap: "3px" }}>READ <ArrowUpRight style={{ width: "12px", height: "12px" }} /></span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================== */}
          {/* §06 — ARSENAL                                               */}
          {/* ========================================================== */}
          <section id="tools-section" style={{ padding: "40px 20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "16px" }}>
              <Cpu style={{ width: "15px", height: "15px", color: "#C42020" }} />
              <span className="font-mono-tech" style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "13px" }}>06 // TACTICAL ARSENAL</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {PROFILE.toolchain.map((cat) => (
                <div key={cat.category} style={panel({ padding: "14px" })}>
                  <div className="font-mono-tech" style={{ fontWeight: "700", fontSize: "10px", color: "#C42020", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: "8px", marginBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{cat.category}</div>
                  {cat.items.map((item) => (
                    <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", background: "#07090C", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "4px", marginBottom: "4px" }}>
                      <span className="font-mono-tech" style={{ fontSize: "10px", color: "#C0BBC2" }}>{item}</span>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2D8A5A", opacity: 0.55 }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================== */}
          {/* §07 — CONTACT + LOGS                                        */}
          {/* ========================================================== */}
          <section id="contact-section" style={{ padding: "40px 20px 0", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>

            {/* Transmission terminal */}
            <div style={panel({ padding: "24px" })}>
              <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <Send style={{ width: "14px", height: "14px", color: "#C42020" }} />
                  <span style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "11px" }}>07 // TRANSMISSION TERMINAL</span>
                </div>
                <span style={{ fontSize: "9px", color: "#2D8A5A", fontWeight: "600" }}>ENCRYPTED ●</span>
              </div>
              <p style={{ fontSize: "12px", color: "#7C828A", lineHeight: "1.6", marginBottom: "14px" }}>Have an idea worth building? Send a direct packet to the workstation.</p>
              {receipt ? (
                <div style={{ padding: "20px", background: "#080B0E", border: "1px solid #1A4028", borderRadius: "10px", textAlign: "center" }}>
                  <div className="font-mono-tech" style={{ fontSize: "12px", fontWeight: "700", color: "#2D8A5A", marginBottom: "6px" }}>TRANSMISSION DISPATCHED ✓</div>
                  <p className="font-mono-tech" style={{ fontSize: "10px", color: "#4A5060" }}>Receipt: <span style={{ color: "#FFFFFF", fontWeight: "700" }}>{receipt}</span></p>
                  <button onClick={() => setReceipt(null)} style={{ marginTop: "10px", padding: "6px 12px", background: "#111518", color: "#E2DDD6", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", fontSize: "10px", fontFamily: "var(--font-geist-mono), monospace", cursor: "pointer" }}>[ TRANSMIT ANOTHER ]</button>
                </div>
              ) : (
                <form onSubmit={handleTransmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input type="text" required placeholder="Name / Call-sign" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "9px", background: "#07090C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#E2DDD6", fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace", outline: "none" }} />
                    <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "9px", background: "#07090C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#E2DDD6", fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace", outline: "none" }} />
                  </div>
                  <textarea rows={3} required placeholder="Project details, engineering query, or collaboration idea…" value={msg} onChange={(e) => setMsg(e.target.value)} style={{ padding: "9px", background: "#07090C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#E2DDD6", fontSize: "11px", fontFamily: "var(--font-geist-mono), monospace", outline: "none", resize: "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <a
                      href={gmailComposeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-tech"
                      style={{ fontSize: "9px", color: "#3A4050" }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <button type="submit" disabled={sending} style={{ padding: "8px 16px", background: "#C42020", color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "10px", fontFamily: "var(--font-geist-mono), monospace", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", opacity: sending ? 0.6 : 1 }}>
                      <Send style={{ width: "12px", height: "12px" }} /> {sending ? "TRANSMITTING…" : "SEND PACKET →"}
                    </button>
                  </div>
                </form>
              )}
              {/* Social links */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[{ Icon: GithubIcon, label: "GITHUB" }, { Icon: LinkedinIcon, label: "LINKEDIN" }, { Icon: XIcon, label: "X" }].map(({ Icon, label }) => (
                  <button key={label} onClick={() => onOpenWindow("contact")} className="font-mono-tech" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", background: "#07090C", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#7C828A", fontSize: "9px", fontWeight: "700", cursor: "pointer" }}>
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Batcomputer diagnostics + quote */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={panel({ padding: "18px", flex: 1 })}>
                <div className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <BatEmblem className="w-4 h-2 text-[#C8A050]" />
                    <span style={{ fontWeight: "700", color: "#FFFFFF", fontSize: "11px" }}>BATCOMPUTER // DIAGNOSTICS</span>
                  </div>
                  <span style={{ fontSize: "9px", color: "#2D8A5A", fontWeight: "600" }}>ONLINE ●</span>
                </div>
                <div style={{ padding: "10px", background: "#07090C", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                  {[
                    ["CORE BOOT", "#2D8A5A", "[ OK ]"],
                    ["GOTHAM SURVEILLANCE", "#2D8A5A", "[ ACTIVE ]"],
                    ["PROJECTS LOADED", "#2D8A5A", `[ 0${PROJECTS.length} ]`],
                    ["LAB EXPERIMENTS", "#2D8A5A", `[ ${EXPERIMENTS.length} ]`],
                    ["SYSTEM STABLE", "#2D8A5A", "[ ✓ ]"],
                  ].map(([label, color, val]) => (
                    <div key={label} className="font-mono-tech" style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#3A4050", marginBottom: "4px" }}>
                      <span>{label}</span><span style={{ color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className="font-mono-tech"
            style={{
              padding: "24px 20px",
              marginTop: "40px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              fontSize: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <BatEmblem className="w-5 h-3 text-[#C8A050]" />
              <span style={{ fontWeight: "700", color: "#E2DDD6" }}>TAKSH.OS</span>
              <span style={{ color: "#3A4050" }}>© 2026 Taksh Sehrawat</span>
            </div>
            <span className="font-serif-editorial" style={{ color: "#4A5060", fontStyle: "italic" }}>Build. Break. Understand. Repeat.</span>
            <span style={{ color: "#2D8A5A", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2D8A5A", display: "inline-block" }} />
              GOTHAM: OPERATIONAL
            </span>
          </footer>
        </main>
      </div>

      {/* ================================================================ */}
      {/* MOBILE FLOATING NAV                                              */}
      {/* ================================================================ */}
      <div className="lg:hidden" style={{ position: "fixed", bottom: "16px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 50, padding: "0 16px", pointerEvents: "none" }}>
        <nav
          style={{
            pointerEvents: "auto",
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px",
            background: "rgba(6,8,10,0.97)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "999px",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.92)",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono-tech"
            style={{ width: "34px", height: "26px", background: "#C42020", color: "white", border: "none", borderRadius: "999px", fontSize: "10px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            &gt;_
          </button>
          {[FolderGit2, FlaskConical, BookOpen, User, Send, Command].map((Icon, i) => (
            <button
              key={i}
              onClick={() => {
                const actions = [
                  () => onOpenWindow("work"), () => onOpenWindow("lab"),
                  () => onOpenWindow("notes"), () => onOpenWindow("about"),
                  () => onOpenWindow("contact"), onOpenCommandPalette,
                ];
                actions[i]();
              }}
              style={{ padding: "6px", color: "#4A5060", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon style={{ width: "16px", height: "16px" }} />
            </button>
          ))}
        </nav>
      </div>

      {/* ================================================================ */}
      {/* WINDOW MODALS                                                    */}
      {/* ================================================================ */}
      {openWindows.work && (
        <OSWindow id="work" title="WORK & PROJECTS // ARCHITECTURES" isOpen={openWindows.work} isMinimized={minimizedWindows.work} isActive={activeWindow === "work"} onClose={() => onCloseWindow("work")} onMinimize={() => onMinimizeWindow("work")} onFocus={() => onFocusWindow("work")} width="max-w-5xl" height="h-[85vh]">
          <WorkWindow selectedProjectId={selectedProjectId} onSelectProject={onSelectProject} onClose={() => onCloseWindow("work")} />
        </OSWindow>
      )}
      {openWindows.lab && (
        <OSWindow id="lab" title="LAB & R&D // HYPOTHESES & TELEMETRY" isOpen={openWindows.lab} isMinimized={minimizedWindows.lab} isActive={activeWindow === "lab"} onClose={() => onCloseWindow("lab")} onMinimize={() => onMinimizeWindow("lab")} onFocus={() => onFocusWindow("lab")} width="max-w-5xl" height="h-[85vh]">
          <LabWindow selectedExpId={selectedExpId} onSelectExp={onSelectExp} onClose={() => onCloseWindow("lab")} />
        </OSWindow>
      )}
      {openWindows.notes && (
        <OSWindow id="notes" title="NOTES // ENGINEERING NOTEBOOK" isOpen={openWindows.notes} isMinimized={minimizedWindows.notes} isActive={activeWindow === "notes"} onClose={() => onCloseWindow("notes")} onMinimize={() => onMinimizeWindow("notes")} onFocus={() => onFocusWindow("notes")} width="max-w-4xl" height="h-[85vh]">
          <NotesWindow selectedNoteId={selectedNoteId} onSelectNote={onSelectNote} onClose={() => onCloseWindow("notes")} />
        </OSWindow>
      )}
      {openWindows.about && (
        <OSWindow id="about" title="ABOUT // PROFILE & PHILOSOPHY" isOpen={openWindows.about} isMinimized={minimizedWindows.about} isActive={activeWindow === "about"} onClose={() => onCloseWindow("about")} onMinimize={() => onMinimizeWindow("about")} onFocus={() => onFocusWindow("about")} width="max-w-4xl" height="h-[85vh]">
          <AboutWindow onClose={() => onCloseWindow("about")} />
        </OSWindow>
      )}
      {openWindows.contact && (
        <OSWindow id="contact" title="CONTACT // TRANSMISSION TERMINAL" isOpen={openWindows.contact} isMinimized={minimizedWindows.contact} isActive={activeWindow === "contact"} onClose={() => onCloseWindow("contact")} onMinimize={() => onMinimizeWindow("contact")} onFocus={() => onFocusWindow("contact")} width="max-w-3xl" height="h-[80vh]">
          <ContactWindow onClose={() => onCloseWindow("contact")} />
        </OSWindow>
      )}
    </div>
  );
}
