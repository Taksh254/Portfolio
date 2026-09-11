"use client";

import React, { useState, useEffect } from "react";
import { OSTopBar } from "./OSTopBar";
import { HeroSection } from "./HeroSection";
import { FeaturedProjects } from "./FeaturedProjects";
import { HackathonsSection } from "./HackathonsSection";
import { LabExperiments } from "./LabExperiments";
import { SystemsSkills } from "./SystemsSkills";
import { GitContributor } from "./GitContributor";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { OSFloatingDock } from "./OSFloatingDock";
import { CommandPalette } from "./CommandPalette";
import { OSWindow } from "./OSWindow";
import { WorkWindow } from "./windows/WorkWindow";
import { LabWindow } from "./windows/LabWindow";
import { NotesWindow } from "./windows/NotesWindow";
import { AboutWindow } from "./windows/AboutWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { LiveFallingLeaves } from "./LiveFallingLeaves";
import { WindowId } from "@/types/os";

const SECTIONS = ["home", "projects", "lab", "notes", "about", "contact"];

export function OSWorkspace() {
  const [activeSection, setActiveSection] = useState("home");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"paper" | "dark">("paper");

  // Interactive Modal Window states
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // Natural scroll-spy tracking active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }
      const scrollPos = window.scrollY + 250;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const id = SECTIONS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        if (activeWindow) setActiveWindow(null);
        if (isCommandOpen) setIsCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindow, isCommandOpen]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleTheme = () => {
    setActiveTheme((prev) => (prev === "paper" ? "dark" : "paper"));
  };

  return (
    <div
      className={`min-h-screen paper-grid text-[#111111] flex flex-col relative font-sans select-text pb-20 ${
        activeTheme === "paper" ? "bg-[#F5F2E9]" : "bg-[#0D1017] text-[#EDEDED]"
      }`}
      style={{
        backgroundColor: activeTheme === "paper" ? "var(--bg-primary, #F5F2E9)" : "#0D1017",
      }}
    >
      {/* ── 1. Top System Bar (Pinned) ── */}
      <OSTopBar
        onCommandOpen={() => setIsCommandOpen(true)}
        activeTheme={activeTheme}
        onToggleTheme={handleToggleTheme}
      />

      {/* ── Atmospheric 4K Oak Tree Artwork Layer (Fixed Left Flank) ── */}
      <div className="hidden lg:block fixed -left-8 -top-3 h-[105vh] w-auto pointer-events-none select-none z-0 overflow-visible">
        <img
          src="/tree-4k-whole.png"
          alt="4K Ancient Oak Tree Backdrop"
          className="h-full w-auto max-w-none object-contain object-left-top mix-blend-multiply opacity-95 tree-branches-breeze scale-[1.03] origin-left"
        />
      </div>

      {/* ── Live Atmospheric Falling Leaves (Continuous Loop) ── */}
      <LiveFallingLeaves />

      {/* ── 2. Main Open Editorial Canvas ── */}
      <main className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 md:px-8 lg:pl-[300px] xl:pl-[340px] lg:pr-6 xl:pr-8 flex flex-col gap-6 pb-24 relative z-10">
        {/* ── Section 01: Hero (Welcome + Polaroid + Currently) ── */}
        <HeroSection
          onExploreClick={() => scrollToSection("projects")}
          onDiaryClick={() => scrollToSection("notes")}
        />

        {/* ── Section 02: Featured Projects & Engineer's Diary ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-stretch relative">
          {/* Featured Projects */}
          <div
            id="projects"
            className="lg:col-span-7 apple-glass-section p-4 sm:p-5 md:p-6 overflow-visible relative flex flex-col justify-between"
          >
            <FeaturedProjects
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                setActiveWindow("work");
              }}
              onViewAll={() => setActiveWindow("work")}
            />
          </div>

          {/* Hackathons */}
          <div
            id="notes"
            className="lg:col-span-5 apple-glass-section p-4 sm:p-5 md:p-6 overflow-visible relative flex flex-col justify-between"
          >
            <HackathonsSection />
          </div>
        </div>

        {/* ── Section 03: Lab Experiments ── */}
        <section id="lab" className="apple-glass-section p-5 sm:p-7 md:p-8 relative z-10">
          <LabExperiments
            onSelectExperiment={(id) => {
              setSelectedExpId(id);
              setActiveWindow("lab");
            }}
            onViewAll={() => setActiveWindow("lab")}
          />
        </section>

        {/* ── Section 04: Systems & Skills + Git Contributor ── */}
        <div id="skills" className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
          {/* Left Side: Skills / Engineering Modules (Square) */}
          <div className="lg:col-span-5 apple-glass-section p-4 sm:p-5 md:p-6 flex flex-col justify-between">
            <SystemsSkills />
          </div>

          {/* Right Side: Git Contributor Matrix */}
          <div className="lg:col-span-7 apple-glass-section p-4 sm:p-5 md:p-6 flex flex-col justify-between">
            <GitContributor onOpenGitHub={() => window.open("https://github.com/Taksh254", "_blank")} />
          </div>
        </div>

        {/* ── Section 05: About Specification Sheet ── */}
        <section id="about" className="apple-glass-section p-5 sm:p-7 md:p-8 relative z-10">
          <AboutSection />
        </section>

        {/* ── Section 06: Transmission & Contact Terminal ── */}
        <section id="contact" className="apple-glass-section p-5 sm:p-7 md:p-8 relative z-10">
          <ContactSection />
        </section>
      </main>

      {/* ── 4. Primary Floating Island Navigation (Bottom Center) ── */}
      <OSFloatingDock
        activeSection={activeSection}
        onSelect={scrollToSection}
      />

      {/* ── 5. Command Palette (⌘K) ── */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenWindow={(winId) => {
          setActiveWindow(winId);
          setActiveSection(winId === "work" ? "projects" : winId);
        }}
        onSelectProject={(id) => {
          setSelectedProjectId(id);
          setActiveWindow("work");
        }}
        onSelectExperiment={(id) => {
          setSelectedExpId(id);
          setActiveWindow("lab");
        }}
        onSelectNote={(id) => {
          setSelectedNoteId(id);
          setActiveWindow("notes");
        }}
        onReboot={() => {
          setActiveWindow(null);
          window.location.reload();
        }}
      />

      {/* ── 6. Interactive Modal Windows ── */}
      <OSWindow
        id="work"
        title="PROJECTS // ARCHITECTURAL REPOSITORY"
        subtitle="Active Engineering & Research Builds"
        isOpen={activeWindow === "work"}
        isMinimized={false}
        isActive={true}
        onClose={() => setActiveWindow(null)}
        onMinimize={() => setActiveWindow(null)}
        onFocus={() => {}}
      >
        <WorkWindow
          selectedProjectId={selectedProjectId}
          onSelectProject={(id: string | null) => setSelectedProjectId(id)}
          onClose={() => setActiveWindow(null)}
        />
      </OSWindow>

      <OSWindow
        id="lab"
        title="LAB // EXPERIMENTAL BENCHMARKS & TELEMETRY"
        subtitle="Ablations, Profiling & Kernel Research"
        isOpen={activeWindow === "lab"}
        isMinimized={false}
        isActive={true}
        onClose={() => setActiveWindow(null)}
        onMinimize={() => setActiveWindow(null)}
        onFocus={() => {}}
      >
        <LabWindow
          selectedExpId={selectedExpId}
          onSelectExp={(id: string | null) => setSelectedExpId(id)}
          onClose={() => setActiveWindow(null)}
        />
      </OSWindow>

      <OSWindow
        id="notes"
        title="DIARY // ENGINEERING NOTEBOOK"
        subtitle="Deep Learning, Systems & Philosophy"
        isOpen={activeWindow === "notes"}
        isMinimized={false}
        isActive={true}
        onClose={() => setActiveWindow(null)}
        onMinimize={() => setActiveWindow(null)}
        onFocus={() => {}}
      >
        <NotesWindow
          selectedNoteId={selectedNoteId}
          onSelectNote={(id: string | null) => setSelectedNoteId(id)}
          onClose={() => setActiveWindow(null)}
        />
      </OSWindow>

      <OSWindow
        id="about"
        title="ABOUT // PROFILE SPECIFICATION"
        subtitle="Background, Focus & Technical Philosophy"
        isOpen={activeWindow === "about"}
        isMinimized={false}
        isActive={true}
        onClose={() => setActiveWindow(null)}
        onMinimize={() => setActiveWindow(null)}
        onFocus={() => {}}
      >
        <AboutWindow onClose={() => setActiveWindow(null)} />
      </OSWindow>

      <OSWindow
        id="contact"
        title="CONTACT // TRANSMISSION TERMINAL"
        subtitle="Direct Frequency & Packet Dispatch"
        isOpen={activeWindow === "contact"}
        isMinimized={false}
        isActive={true}
        onClose={() => setActiveWindow(null)}
        onMinimize={() => setActiveWindow(null)}
        onFocus={() => {}}
      >
        <ContactWindow onClose={() => setActiveWindow(null)} />
      </OSWindow>
    </div>
  );
}
