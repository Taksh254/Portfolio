"use client";

import React, { useState } from "react";
import { Send, Check, Copy, Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/Icons";
import { LinkSubWindow, LinkTarget } from "./LinkSubWindow";

interface ContactWindowProps {
  onOpenSubWindow?: (target: LinkTarget) => void;
  onClose?: () => void;
}

export function ContactWindow({ onOpenSubWindow }: ContactWindowProps) {
  const [senderName, setSenderName] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmissionReceipt, setTransmissionReceipt] = useState<string | null>(null);
  const [activeSubWindow, setActiveSubWindow] = useState<LinkTarget | null>(null);

  const handleOpenLink = (target: LinkTarget) => {
    if (onOpenSubWindow) {
      onOpenSubWindow(target);
    } else {
      setActiveSubWindow(target);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsTransmitting(true);
    const packetId = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionReceipt(packetId);
      setSenderName("");
      setSenderEmail("");
      setMessage("");
    }, 900);
  };

  return (
    <div className="max-w-2xl mx-auto font-mono-tech text-xs text-[#EDEDED] space-y-6 pb-8">
      {/* Sub-Window Viewer */}
      {activeSubWindow && (
        <LinkSubWindow
          target={activeSubWindow}
          onClose={() => setActiveSubWindow(null)}
        />
      )}

      {/* Header */}
      <header className="border-b border-[#202634] pb-4 space-y-2">
        <div className="text-[10px] text-[#5D6475] uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-[#E5484D] animate-pulse" />
          <span>COMMUNICATION CHANNEL / TRANSMISSION TERMINAL</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">
          Direct Packet Transmission
        </h1>
        <p className="text-xs text-[#8E95A5] leading-relaxed">
          Send a structured packet directly to my terminal inbox or connect via verified networks below.
        </p>
      </header>

      {/* Network Quick Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* GITHUB */}
        <button
          onClick={() => handleOpenLink("github")}
          data-cursor="INSPECT GITHUB"
          className="p-3.5 bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl flex items-center justify-between transition-all group text-left cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#161B26] rounded-lg group-hover:text-[#E5484D] transition-colors border border-[#252C3D]">
              <GithubIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] text-[#5D6475]">GITHUB</div>
              <div className="text-xs font-bold text-[#EDEDED] group-hover:text-[#E5484D] truncate">
                @Taksh254
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#5D6475] group-hover:text-[#E5484D] font-bold">
            OPEN ↗
          </span>
        </button>

        {/* LINKEDIN */}
        <button
          onClick={() => handleOpenLink("linkedin")}
          data-cursor="VIEW LINKEDIN"
          className="p-3.5 bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl flex items-center justify-between transition-all group text-left cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#161B26] rounded-lg group-hover:text-[#E5484D] transition-colors border border-[#252C3D]">
              <LinkedinIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] text-[#5D6475]">LINKEDIN</div>
              <div className="text-xs font-bold text-[#EDEDED] group-hover:text-[#E5484D] truncate">
                in/taksh-sehrawat
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#5D6475] group-hover:text-[#E5484D] font-bold">
            OPEN ↗
          </span>
        </button>

        {/* X / TWITTER */}
        <button
          onClick={() => handleOpenLink("x")}
          data-cursor="VIEW 𝕏"
          className="p-3.5 bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl flex items-center justify-between transition-all group text-left cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#161B26] rounded-lg group-hover:text-[#E5484D] transition-colors border border-[#252C3D]">
              <XIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] text-[#5D6475]">𝕏 (TWITTER)</div>
              <div className="text-xs font-bold text-[#EDEDED] group-hover:text-[#E5484D] truncate">
                @TSehrawat49611
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#5D6475] group-hover:text-[#E5484D] font-bold">
            OPEN ↗
          </span>
        </button>
      </div>

      {/* Direct Transmission Terminal Form */}
      <div className="p-5 bg-[#12151D] border border-[#202634] rounded-xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#1C2230] pb-2 text-[10px] text-[#5D6475]">
          <span>PACKET DISPATCH TERMINAL</span>
          <span className="text-[#30A46C]">STATUS: READY</span>
        </div>

        {transmissionReceipt ? (
          <div className="p-6 bg-[#0B0D12] border border-[#224431] rounded-lg text-center space-y-2 font-mono-tech">
            <div className="text-[#30A46C] font-bold text-sm">
              PACKET DISPATCHED SUCCESSFULLY ✓
            </div>
            <p className="text-xs text-[#8E95A5]">
              Receipt Packet ID: <span className="text-[#EDEDED] font-bold">{transmissionReceipt}</span>
            </p>
            <p className="text-[11px] text-[#5D6475]">
              Transmission logged to local terminal queue. Direct reply will follow shortly.
            </p>
            <button
              onClick={() => setTransmissionReceipt(null)}
              className="mt-3 px-4 py-1.5 bg-[#161B26] hover:bg-[#202634] text-[#EDEDED] border border-[#232938] rounded-lg text-xs cursor-pointer"
            >
              [ TRANSMIT ANOTHER PACKET ]
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-[#5D6475] uppercase tracking-wider">
                  SENDER_NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Vance"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full p-2.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs text-[#EDEDED] focus:outline-none focus:border-[#E5484D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#5D6475] uppercase tracking-wider">
                  RETURN_EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@lab.dev"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs text-[#EDEDED] focus:outline-none focus:border-[#E5484D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#5D6475] uppercase tracking-wider">
                TRANSMISSION_PAYLOAD
              </label>
              <textarea
                required
                rows={4}
                placeholder="State project details, problem parameters, or engineering query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs text-[#EDEDED] focus:outline-none focus:border-[#E5484D] resize-none font-mono-tech"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] text-[#5D6475]">
                DIRECT TO: taksh.sehrawat.dev@gmail.com
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className="px-5 py-2.5 bg-[#E5484D] hover:bg-[#F0565B] disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTransmitting ? "TRANSMITTING..." : "[ TRANSMIT PACKET → ]"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
