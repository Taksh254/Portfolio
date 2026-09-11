"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  isExplicit?: boolean;
  coverUrl: string;
  duration: number; // in seconds, e.g. 241s = 4:01 (0:50 elapsed, 3:11 remaining)
}

const PLAYLIST: Track[] = [
  {
    id: "world-of-flowers",
    title: "The World of Flowers",
    artist: "Levon Tutundzhian",
    isExplicit: true,
    coverUrl: "/album-world-of-flowers.png",
    duration: 241, // 0:50 elapsed + 3:11 remaining = 4:01
  },
  {
    id: "midnight-synapses",
    title: "Midnight Synapses",
    artist: "Taksh S. // Kernel Beats",
    isExplicit: false,
    coverUrl: "/album-world-of-flowers.png",
    duration: 198,
  },
  {
    id: "gotham-rain",
    title: "Atmospheric Lo-Fi",
    artist: "Wayne Tower Audio",
    isExplicit: false,
    coverUrl: "/album-world-of-flowers.png",
    duration: 275,
  },
];

export function GlassMusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(50); // initial 0:50
  const [airplayActive, setAirplayActive] = useState(false);
  const [airplayMessage, setAirplayMessage] = useState(false);

  const track = PLAYLIST[currentTrackIndex];
  const duration = track.duration;

  // Real-time playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
    setCurrentTime(0);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === PLAYLIST.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(Math.floor(pct * duration));
  };

  const handleAirPlay = () => {
    setAirplayActive((prev) => !prev);
    setAirplayMessage(true);
    setTimeout(() => setAirplayMessage(false), 2400);
  };

  // Format seconds to M:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const remainingTime = Math.max(0, duration - currentTime);
  const progressPercent = Math.min(100, (currentTime / duration) * 100);

  return (
    <div className="relative w-full max-w-[285px] select-none">
      {/* AirPlay Feedback Notification Pill */}
      {airplayMessage && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-white font-mono-tech text-[9px] tracking-wider whitespace-nowrap shadow-md z-30 transition-all animate-fade-in">
          {airplayActive ? "AirPlay: TAKSH.OS Connected" : "AirPlay: Disconnected"}
        </div>
      )}

      {/* ── Apple Liquid Frosted Glass Capsule ── */}
      <div
        className="relative overflow-hidden rounded-[26px] p-3.5 sm:p-4 text-[#111111] transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(250, 247, 238, 0.45) 100%)",
          backdropFilter: "blur(28px) saturate(190%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%)",
          border: "1px solid rgba(255, 255, 255, 0.75)",
          boxShadow:
            "0 12px 32px -4px rgba(0, 0, 0, 0.07), 0 4px 12px -2px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 1px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Specular Top Glare Accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
        />

        {/* ── 1. Top Section: Album Artwork + Title/Artist + Equalizer ── */}
        <div className="flex items-center gap-2.5">
          {/* Album Artwork */}
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-[0_3px_10px_rgba(0,0,0,0.12)] border border-black/[0.08] bg-[#FAF5E6]">
            <img
              src={track.coverUrl}
              alt={`${track.title} cover`}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
            />
          </div>

          {/* Title & Artist Info */}
          <div className="flex-1 min-w-0 pr-0.5">
            <div className="flex items-center gap-1.5 leading-tight">
              <h4 className="font-sans font-bold text-[12px] sm:text-[12.5px] text-[#111111] truncate tracking-tight">
                {track.title}
              </h4>
              {track.isExplicit && (
                <span className="shrink-0 px-1 py-[0.5px] text-[7px] font-mono-tech font-bold rounded-[3px] bg-black/10 text-[#2C261E] border border-black/20 leading-none">
                  E
                </span>
              )}
            </div>
            <p className="font-sans text-[10.5px] text-[#66635D] font-normal truncate mt-0.5">
              {track.artist}
            </p>
          </div>

          {/* Equalizer Waveform Animation */}
          <div
            className="flex items-end gap-[2px] h-4 shrink-0 pl-1"
            title={isPlaying ? "Playing audio" : "Paused"}
          >
            {[
              { h: "60%", dur: "0.8s", delay: "0.1s" },
              { h: "100%", dur: "0.65s", delay: "0.3s" },
              { h: "45%", dur: "0.9s", delay: "0.2s" },
              { h: "85%", dur: "0.75s", delay: "0.4s" },
            ].map((bar, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-[#111111]/80 inline-block transition-all"
                style={{
                  height: isPlaying ? bar.h : "30%",
                  animation: isPlaying
                    ? `equalizer-pulse ${bar.dur} ease-in-out infinite alternate ${bar.delay}`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── 2. Middle Section: Scrubber & Timers ── */}
        <div className="mt-3">
          {/* Progress Bar Track */}
          <div
            onClick={handleSeek}
            className="relative w-full h-1.5 rounded-full bg-black/[0.09] hover:bg-black/[0.14] transition-colors cursor-pointer group flex items-center"
          >
            <div
              className="h-full rounded-full bg-[#111111] transition-[width] duration-200 relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Scrub thumb handle visible on hover */}
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#111111] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Timestamps */}
          <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#7A7770] mt-1 font-medium tracking-tight">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* ── 3. Bottom Section: Playback Controls ── */}
        <div className="flex items-center justify-between mt-1 pt-0.5">
          {/* Subtle volume hint / spacer */}
          <div className="w-5 flex items-center justify-start text-[#8C8476]">
            <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-4">
            {/* Previous */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous track"
              className="text-[#2C261E] hover:text-black hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-8 h-8 rounded-full bg-[#111111] text-[#FCFAF4] flex items-center justify-center hover:bg-[#262626] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next track"
              className="text-[#2C261E] hover:text-black hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Right: AirPlay / Audio Output Button */}
          <div className="w-5 flex items-center justify-end">
            <button
              onClick={handleAirPlay}
              type="button"
              title="AirPlay Audio Output"
              aria-label="AirPlay Audio Output"
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                airplayActive
                  ? "text-[#0071E3] bg-[#0071E3]/10"
                  : "text-[#66635D] hover:text-black hover:bg-black/[0.04]"
              }`}
            >
              {/* Apple AirPlay Icon: Concentric audio arcs over triangular output arrow */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                <polygon points="12 15 17 21 7 21 12 15" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
