"use client";

import React, { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  Share2,
  Check,
  Send,
  MessageSquare,
  Building,
  Calendar,
  Sparkles,
  Search,
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { gmailComposeUrl, PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";

export function LinkedInInAppBrowser() {
  const [activeTab, setActiveTab] = useState<"about" | "experience" | "projects" | "skills">("about");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://www.linkedin.com/in/taksh-sehrawat-6356bb2b9/");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#F3F2EE] text-[#191919] font-sans flex flex-col overflow-y-auto">
      {/* LinkedIn Top Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E0DFDC] px-4 py-2 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#0a66c2] text-white flex items-center justify-center font-bold text-lg">
            in
          </div>
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 text-[#717171] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value="Taksh Sehrawat"
              className="pl-8 pr-3 py-1 bg-[#EDF3F8] rounded text-xs text-[#191919] w-48 border-none focus:outline-none"
            />
          </div>
          <span className="text-xs text-[#717171] font-mono hidden md:inline">
            [LINKEDIN IN-APP PROFILE]
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1 text-xs text-[#717171] hover:text-[#191919] hover:bg-[#EBEBEB] rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#057642]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "Copied" : "Share"}</span>
          </button>
          <a
            href="https://www.linkedin.com/in/taksh-sehrawat-6356bb2b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Open on LinkedIn.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-5xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Hero Profile Card */}
          <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg overflow-hidden shadow-xs relative">
            {/* Banner Background */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-[#004182] via-[#0a66c2] to-[#378fe9] relative p-4 flex items-end justify-end">
              <span className="text-[11px] font-mono text-white/80 bg-black/20 px-2 py-0.5 rounded backdrop-blur-xs">
                AI SYSTEMS • SOFTWARE • AUTOMATION
              </span>
            </div>

            {/* Profile Info */}
            <div className="p-4 sm:p-6 relative pt-0">
              <div className="-mt-16 sm:-mt-20 mb-4 flex flex-wrap items-end justify-between gap-3">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-[#004182] text-white flex items-center justify-center font-bold text-3xl shadow-md font-mono">
                  TS
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsConnected(!isConnected)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isConnected
                        ? "bg-[#EBEBEB] text-[#191919] border border-[#D0D0D0]"
                        : "bg-[#0a66c2] hover:bg-[#004182] text-white"
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#057642]" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <a
                    href={gmailComposeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#0a66c2] border border-[#0a66c2] hover:bg-[#EBF4FD] transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-[#191919] flex items-center gap-2">
                  Taksh Sehrawat
                  <span className="text-[11px] font-normal text-[#057642] bg-[#E8F5E9] border border-[#C8E6C9] px-2 py-0.5 rounded-full font-sans">
                    ● Open to Remote Internships
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#474747] font-medium leading-snug">
                  B.Tech CSE (AI/ML) @ IILM University • Backend Intern @ GrowNova • NestJS, PostgreSQL &amp; Local LLMs
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#717171] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#717171]" />
                    Delhi, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-2 flex items-center gap-2 text-xs font-semibold">
            {[
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Featured Projects" },
              { id: "skills", label: "Skills & Stack" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#0a66c2] text-white"
                    : "text-[#474747] hover:bg-[#F3F2EE]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* About Section */}
          {(activeTab === "about" || activeTab === "experience") && (
            <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-5 sm:p-6 space-y-3 shadow-xs">
              <h2 className="text-base font-bold text-[#191919] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0a66c2]" />
                About
              </h2>
              <p className="text-xs sm:text-sm text-[#474747] leading-relaxed">
                {PROFILE.narrative[0]}
              </p>
              <p className="text-xs sm:text-sm text-[#474747] leading-relaxed">
                {PROFILE.narrative[1]}
              </p>
            </div>
          )}

          {/* Experience & Education (driven by PROFILE.timeline) */}
          {(activeTab === "experience" || activeTab === "about") && (
            <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-5 sm:p-6 space-y-5 shadow-xs">
              <h2 className="text-base font-bold text-[#191919] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0a66c2]" />
                Experience &amp; Education
              </h2>

              <div className="space-y-4">
                {PROFILE.timeline.map((entry, i) => (
                  <div
                    key={entry.title}
                    className={`flex items-start gap-3 ${i < PROFILE.timeline.length - 1 ? "pb-4 border-b border-[#E8E8E8]" : ""}`}
                  >
                    <div className="w-10 h-10 rounded bg-[#EBF4FD] text-[#0a66c2] flex items-center justify-center shrink-0 font-bold font-mono text-[11px]">
                      {entry.year.slice(2)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-bold text-sm text-[#191919]">{entry.title}</h3>
                      <div className="text-xs text-[#717171]">{entry.year}</div>
                      <p className="text-xs text-[#474747] leading-relaxed pt-1">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Featured Projects */}
          {(activeTab === "projects" || activeTab === "about") && (
            <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-5 sm:p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-[#191919] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0a66c2]" />
                Featured Engineering Artifacts
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECTS.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 bg-[#F9F9F8] border border-[#E0DFDC] rounded-md space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#0a66c2]">{p.title}</div>
                      <p className="text-[11px] text-[#474747] line-clamp-2 mt-1">
                        {p.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#717171] pt-2 border-t border-[#E8E8E8]">
                      <span>{p.stack.slice(0, 2).join(", ")}</span>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0a66c2] font-semibold flex items-center gap-0.5 hover:underline"
                      >
                        <span>Code</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {(activeTab === "skills" || activeTab === "about") && (
            <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-5 sm:p-6 space-y-3 shadow-xs">
              <h2 className="text-base font-bold text-[#191919]">Skills &amp; Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {PROFILE.toolchain
                  .flatMap((c) => c.items)
                  .slice(0, 16)
                  .map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#EDF3F8] text-[#0a66c2] rounded-full text-xs font-semibold border border-[#D0E2EC]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-4 space-y-3 shadow-xs text-xs">
            <h3 className="font-bold text-[#191919]">Public Profile &amp; Contact</h3>
            <p className="text-[#717171] text-[11px] leading-relaxed">
              Direct link to this profile on LinkedIn:
            </p>
            <div className="p-2 bg-[#F3F2EE] rounded text-[11px] font-mono text-[#0a66c2] truncate">
              linkedin.com/in/taksh-sehrawat-6356bb2b9/
            </div>
            <a
              href="https://www.linkedin.com/in/taksh-sehrawat-6356bb2b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>Connect on LinkedIn ↗</span>
            </a>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E0DFDC] rounded-lg p-4 space-y-2.5 shadow-xs text-xs text-[#474747]">
            <h3 className="font-bold text-[#191919]">Education</h3>
            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-4 h-4 text-[#0a66c2] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#191919]">Computer Science &amp; Engineering</div>
                <div className="text-[11px] text-[#717171]">Systems, Machine Learning &amp; Software Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
