"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat1,
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  isExplicit?: boolean;
  coverUrl: string;
  duration: number; // in seconds
  audioSrc?: string;
}

const PLAYLIST: Track[] = [
  {
    id: "loser-dino-james",
    title: "Loser",
    artist: "Dino James",
    isExplicit: true,
    coverUrl: "/album-loser.jpg",
    duration: 264, // 4:24
    audioSrc: "/loser.mp3",
  },
  {
    id: "loser-beck",
    title: "Loser",
    artist: "Beck",
    isExplicit: true,
    coverUrl: "/album-loser.jpg",
    duration: 235, // 3:55
  },
  {
    id: "world-of-flowers",
    title: "The World of Flowers",
    artist: "Levon Tutundzhian",
    isExplicit: true,
    coverUrl: "/album-world-of-flowers.png",
    duration: 241,
  },
];

export function GlassMusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true); // Loop active by default
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(42); // start with nice aesthetic offset
  const [airplayActive, setAirplayActive] = useState(false);
  const [airplayMessage, setAirplayMessage] = useState(false);
  const [loopNotification, setLoopNotification] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ gainNode: GainNode } | null>(null);

  const track = PLAYLIST[currentTrackIndex];
  const duration = track.duration;

  // Real-time playback timer with seamless looping
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) {
              // Loop back to start seamlessly
              return 0;
            } else {
              setIsPlaying(false);
              return duration;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration, isLooping]);

  // Web Audio ambient lo-fi synthesizer loop fallback when audio file isn't present
  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!synthNodesRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Warm chord notes (D minor: D3, F3, A3, C4)
        const freqs = [146.83, 174.61, 220.0, 261.63];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const noteGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(480 + idx * 60, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.04 / freqs.length, ctx.currentTime);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
        });

        synthNodesRef.current = { gainNode: masterGain };
      } else {
        synthNodesRef.current.gainNode.gain.setTargetAtTime(isMuted ? 0 : 0.08, ctx.currentTime, 0.1);
      }
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const stopSynth = () => {
    if (synthNodesRef.current && audioCtxRef.current) {
      synthNodesRef.current.gainNode.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.15);
    }
  };

  const togglePlay = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (nextPlaying) {
      startSynth();
      if (audioRef.current && track.audioSrc) {
        audioRef.current.play().catch(() => {
          // Audio file play fallback to synth
        });
      }
    } else {
      stopSynth();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const toggleLoop = () => {
    setIsLooping((prev) => {
      const next = !prev;
      setLoopNotification(true);
      setTimeout(() => setLoopNotification(false), 2000);
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (synthNodesRef.current && audioCtxRef.current) {
        synthNodesRef.current.gainNode.gain.setTargetAtTime(next ? 0 : 0.08, audioCtxRef.current.currentTime, 0.05);
      }
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
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
    const seekTime = Math.floor(pct * duration);
    setCurrentTime(seekTime);
    if (audioRef.current && isFinite(audioRef.current.duration)) {
      audioRef.current.currentTime = seekTime;
    }
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
      {/* Hidden audio element for MP3 playback */}
      {track.audioSrc && (
        <audio
          ref={audioRef}
          src={track.audioSrc}
          loop={isLooping}
          muted={isMuted}
          onEnded={() => {
            if (isLooping) {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
              }
            } else {
              setIsPlaying(false);
            }
          }}
        />
      )}

      {/* AirPlay Feedback Notification Pill */}
      {airplayMessage && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-white font-mono-tech text-[9px] tracking-wider whitespace-nowrap shadow-md z-30 transition-all animate-fade-in">
          {airplayActive ? "AirPlay: TAKSH.OS Connected" : "AirPlay: Disconnected"}
        </div>
      )}

      {/* Loop Notification Pill */}
      {loopNotification && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#E6322A]/90 backdrop-blur-md text-white font-mono-tech text-[9px] font-bold tracking-wider whitespace-nowrap shadow-md z-30 transition-all animate-fade-in">
          {isLooping ? "🔁 Loop Enabled: Loser on Repeat" : "Loop Disabled"}
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
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-[0_3px_10px_rgba(0,0,0,0.14)] border border-black/[0.08] bg-[#FAF5E6]">
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
              <h4 className="font-sans font-bold text-[12.5px] sm:text-[13px] text-[#111111] truncate tracking-tight">
                {track.title}
              </h4>
              {track.isExplicit && (
                <span className="shrink-0 px-1 py-[0.5px] text-[7px] font-mono-tech font-bold rounded-[3px] bg-black/10 text-[#2C261E] border border-black/20 leading-none">
                  E
                </span>
              )}
              {isLooping && (
                <span
                  title="Loop Active"
                  className="shrink-0 px-1 py-[0.5px] text-[6.5px] font-mono-tech font-bold rounded-[3px] bg-[#E6322A]/10 text-[#E6322A] border border-[#E6322A]/25 leading-none"
                >
                  LOOP
                </span>
              )}
            </div>
            <p className="font-sans text-[10.5px] text-[#66635D] font-normal truncate mt-0.5">
              {track.artist}
            </p>
          </div>

          {/* Equalizer Waveform Animation */}
          <div
            className="flex items-end gap-[2px] h-4 shrink-0 pl-1 cursor-pointer"
            onClick={togglePlay}
            title={isPlaying ? "Playing audio — Click to pause" : "Paused — Click to play"}
          >
            {[
              { h: "60%", dur: "0.8s", delay: "0.1s" },
              { h: "100%", dur: "0.65s", delay: "0.3s" },
              { h: "45%", dur: "0.9s", delay: "0.2s" },
              { h: "85%", dur: "0.75s", delay: "0.4s" },
            ].map((bar, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full inline-block transition-all"
                style={{
                  height: isPlaying ? bar.h : "30%",
                  backgroundColor: isPlaying ? "#E6322A" : "rgba(17, 17, 17, 0.6)",
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
          {/* Left: Volume & Repeat Loop Controls */}
          <div className="flex items-center gap-2 text-[#8C8476]">
            {/* Volume toggle */}
            <button
              onClick={toggleMute}
              type="button"
              title={isMuted ? "Unmute" : "Mute"}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-[#E6322A]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
              )}
            </button>

            {/* Loop Toggle Button */}
            <button
              onClick={toggleLoop}
              type="button"
              title={isLooping ? "Repeat One Track (Loop On)" : "Repeat Off"}
              className={`p-0.5 rounded transition-all cursor-pointer relative ${
                isLooping ? "text-[#E6322A]" : "text-[#8C8476] opacity-60 hover:opacity-100"
              }`}
            >
              <Repeat1 className="w-3.5 h-3.5" />
              {isLooping && (
                <span className="w-1 h-1 rounded-full bg-[#E6322A] absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
              )}
            </button>
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
              {/* Apple AirPlay Icon */}
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
