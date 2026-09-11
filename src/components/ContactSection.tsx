"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/profile";
import { Copy, Check, Send } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [formData, setFormData] = useState({ callsign: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("taksh.sehrawat.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setTransmitted(true);
    setTimeout(() => {
      setTransmitted(false);
      setFormData({ callsign: "", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs" />
        <span className="text-[10.5px] font-mono-tech tracking-[0.2em] text-[#7A7770] uppercase font-semibold">
          // 08 &nbsp; CONTACT // TRANSMISSION TERMINAL
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-mono-tech">
        {/* Left: Direct Inquiry */}
        <div className="p-6 rounded-xl apple-glass-card space-y-5">
          <div className="space-y-1">
            <h3 className="font-serif-display text-2xl md:text-3xl text-[#111111] font-bold leading-tight">
              Have an idea worth building?
            </h3>
            <p className="font-serif-editorial text-lg text-[#66635D] italic">
              Let&apos;s talk.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">
              DIRECT FREQUENCY
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="mailto:taksh.sehrawat.dev@gmail.com"
                className="text-sm font-semibold text-[#111111] border-b border-dashed border-[#8C8476] hover:text-[#E6322A] transition-colors"
              >
                taksh.sehrawat.dev@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[10px] text-[#4A453C] hover:bg-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check style={{ width: 11, height: 11, color: "#315B50" }} />
                    <span className="text-[#315B50] font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy style={{ width: 11, height: 11 }} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Interfaces */}
          <div className="space-y-2 pt-2">
            <div className="text-[9px] text-[#7A7770] uppercase tracking-widest">
              PUBLIC INTERFACES
            </div>
            <div className="flex flex-wrap gap-2">
              {PROFILE.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs text-[#2C261E] hover:border-black/30 transition-colors flex items-center gap-1.5"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-[#7A7770]">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Message Dispatch Terminal */}
        <div className="p-6 rounded-xl apple-glass-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.08] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6322A]" />
              <span className="font-semibold text-[#111111] text-[11px] tracking-wider">
                TRANSMISSION PACKET
              </span>
            </div>
            <span className="text-[9px] text-[#7A7770]">PORT 443 // ENCRYPTED</span>
          </div>

          {transmitted ? (
            <div className="p-6 text-center rounded-xl bg-[#315B50]/10 border border-[#315B50]/30 space-y-1">
              <div className="text-xs font-bold text-[#315B50] tracking-wider">
                PACKET TRANSMITTED SUCCESSFULLY
              </div>
              <p className="font-sans text-xs text-[#555047]">
                Signal acknowledged. Expect a reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTransmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[9px] text-[#7A7770] uppercase tracking-widest mb-1">
                  CALLSIGN // NAME OR FREQUENCY
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / elena@systems.org"
                  value={formData.callsign}
                  onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white/50 text-[#111111] outline-none text-xs focus:border-black/30 focus:bg-white/80 transition-all"
                />
              </div>

              <div>
                <label className="block text-[9px] text-[#7A7770] uppercase tracking-widest mb-1">
                  PAYLOAD // MESSAGE
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe proposed systems architecture, research question, or collaborative opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white/50 text-[#111111] outline-none text-xs font-sans focus:border-black/30 focus:bg-white/80 transition-all resize-vertical"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#111111] text-[#FCFAF4] font-medium text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-[#262626] transition-colors cursor-pointer shadow-xs"
              >
                <span>SEND TRANSMISSION</span>
                <span>&rarr;</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
