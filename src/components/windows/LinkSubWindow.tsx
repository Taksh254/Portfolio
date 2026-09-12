"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  ExternalLink,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Shield,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/Icons";
import { CONTACT_EMAIL, gmailComposeUrl } from "@/data/profile";
import { GitHubInAppBrowser } from "./GitHubInAppBrowser";
import { LinkedInInAppBrowser } from "./LinkedInInAppBrowser";
import { XInAppBrowser } from "./XInAppBrowser";

export type LinkTarget = "github" | "linkedin" | "x" | "email";

export interface LinkSubWindowProps {
  target: LinkTarget | null;
  onClose: () => void;
  zIndex?: number;
}

export function LinkSubWindow({
  target,
  onClose,
  zIndex = 50,
}: LinkSubWindowProps) {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);

  if (!target) return null;

  const getTargetMeta = (t: LinkTarget) => {
    switch (t) {
      case "github":
        return {
          title: "GITHUB.COM / TAKSH254",
          url: "https://github.com/Taksh254",
          icon: GithubIcon,
        };
      case "linkedin":
        return {
          title: "LINKEDIN.COM / IN / TAKSH-SEHRAWAT",
          url: "https://www.linkedin.com/in/taksh-sehrawat-6356bb2b9/",
          icon: LinkedinIcon,
        };
      case "x":
        return {
          title: "X.COM / TSEHRAWAT49611",
          url: "https://x.com/TSehrawat49611",
          icon: XIcon,
        };
      case "email":
        return {
          title: `GMAIL / ${CONTACT_EMAIL.toUpperCase()}`,
          url: gmailComposeUrl(),
          icon: Send,
        };
    }
  };

  const meta = getTargetMeta(target);
  const Icon = meta.icon;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(meta.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(gmailComposeUrl(emailSubject, emailBody), "_blank", "noopener,noreferrer");
    setEmailSent(true);
  };

  return (
    <>
      {/* Minimized Docked Badge */}
      {isMinimized && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-16 right-6 z-[9999] pointer-events-auto bg-[#161b22] border border-[#30363d] text-[#e6edf3] px-3 py-2 rounded-md shadow-lg flex items-center gap-3 font-mono text-xs select-none"
        >
          <div
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 cursor-pointer hover:text-[#f78166]"
          >
            <Icon className="w-3.5 h-3.5 text-[#f78166]" />
            <span className="font-semibold">{meta.title}</span>
            <span className="text-[10px] text-[#7d8590]">[MINIMIZED]</span>
          </div>

          <div className="flex items-center gap-1 border-l border-[#30363d] pl-2">
            <button
              onClick={() => setIsMinimized(false)}
              title="Restore Window"
              className="p-1 hover:bg-[#21262d] rounded text-[#7d8590] hover:text-white cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="p-1 hover:bg-[#21262d] rounded text-[#7d8590] hover:text-[#f78166] cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Sub-Window */}
      {!isMinimized && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 pt-12 pb-16 overflow-hidden">
          <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            dragElastic={0.05}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ zIndex }}
            className={`pointer-events-auto flex flex-col bg-[#0d1117] border border-[#30363d] shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${
              isMaximized
                ? "w-full h-full rounded-none inset-0 fixed top-10 bottom-16 left-0 right-0 max-w-none max-h-none"
                : "w-full max-w-5xl h-[85vh] rounded-sm"
            }`}
          >
            {/* Sub-Window Header / Browser Navigation Bar */}
            <div className="h-10 px-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between select-none shrink-0 text-[#e6edf3]">
              <div className="flex items-center gap-2 font-mono text-xs truncate mr-2">
                <Icon className="w-3.5 h-3.5 text-[#f78166]" />
                <span className="font-bold tracking-wider uppercase truncate">
                  {meta.title}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new external tab"
                  className="p-1 text-[#7d8590] hover:text-white hover:bg-[#21262d] rounded transition-colors flex items-center gap-1 text-[10px] font-mono px-2 border border-[#30363d]"
                >
                  <span>NEW TAB</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize Window"
                  className="p-1 text-[#7d8590] hover:text-white hover:bg-[#21262d] rounded transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Maximize/Restore Button */}
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? "Restore Window" : "Maximize Window"}
                  className="p-1 text-[#7d8590] hover:text-white hover:bg-[#21262d] rounded transition-colors cursor-pointer"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  title="Close window"
                  className="p-1 text-[#7d8590] hover:text-[#f78166] hover:bg-[#21262d] rounded transition-colors cursor-pointer ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Address Bar Toolbar */}
            <div className="h-9 px-3 bg-[#0d1117] border-b border-[#30363d] flex items-center gap-2 text-xs font-mono text-[#7d8590] select-none shrink-0">
              <div className="flex items-center gap-1 text-[#484f58]">
                <ArrowLeft className="w-3.5 h-3.5" />
                <ArrowRight className="w-3.5 h-3.5" />
                <RotateCw className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              </div>

              <div className="flex-1 flex items-center justify-between px-2.5 py-1 bg-[#161b22] border border-[#30363d] rounded-xs text-[11px] text-[#e6edf3] truncate">
                <div className="flex items-center gap-1.5 truncate">
                  <Shield className="w-3 h-3 text-[#3fb950] shrink-0" />
                  <span className="truncate select-all">{meta.url}</span>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="text-[#7d8590] hover:text-white ml-2 shrink-0 cursor-pointer"
                  title="Copy URL"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-[#3fb950]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            {/* Sub-Window Body: In-App Browser Clients */}
            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#0d1117] flex flex-col">
              {/* GITHUB TARGET -> Live In-App GitHub Browser */}
              {target === "github" && <GitHubInAppBrowser />}

              {/* LINKEDIN TARGET -> Live In-App LinkedIn Browser */}
              {target === "linkedin" && <LinkedInInAppBrowser />}

              {/* X (TWITTER) TARGET -> Live In-App X Browser */}
              {target === "x" && <XInAppBrowser />}

              {/* EMAIL TARGET -> In-App Mail Client */}
              {target === "email" && (
                <div className="p-6 max-w-xl mx-auto space-y-4 font-mono text-xs text-[#e6edf3] my-auto">
                  <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-md space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#30363d] pb-2 text-xs">
                      <span className="text-[#7d8590]">TO:</span>
                      <span className="text-white font-bold">
                        {CONTACT_EMAIL}
                      </span>
                    </div>

                    {emailSent ? (
                      <div className="p-6 bg-[#0d1117] border border-[#238636] rounded-md text-center space-y-2">
                        <div className="text-[#3fb950] font-bold">
                          GMAIL DRAFT OPENED IN NEW TAB ✓
                        </div>
                        <p className="text-[#7d8590]">
                          Recipient is already filled in — just review and hit send.
                        </p>
                        <button
                          onClick={() => setEmailSent(false)}
                          className="mt-2 px-3 py-1 bg-[#21262d] text-white rounded-md text-[11px] cursor-pointer"
                        >
                          [ Compose Another ]
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSendEmail} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-[#7d8590] uppercase">
                            Subject
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Collaboration / Engineering Query"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="w-full p-2 bg-[#0d1117] border border-[#30363d] rounded-md text-xs text-white focus:outline-none focus:border-[#2f81f7]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-[#7d8590] uppercase">
                            Message Body
                          </label>
                          <textarea
                            required
                            rows={5}
                            placeholder="Write your message..."
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            className="w-full p-2 bg-[#0d1117] border border-[#30363d] rounded-md text-xs text-white focus:outline-none focus:border-[#2f81f7] resize-none font-sans"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={handleCopyUrl}
                            className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#8b949e] text-[#7d8590] hover:text-white rounded-md text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copied ? "Copied" : "Copy Email"}</span>
                          </button>

                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Open in Gmail →</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Window Footer */}
            <div className="h-6 px-3 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between text-[10px] font-mono text-[#7d8590] select-none shrink-0">
              <span>TAKSH.OS IN-APP NETWORK VIEWER</span>
              <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1 truncate max-w-sm"
              >
                <span className="truncate">{meta.url}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
