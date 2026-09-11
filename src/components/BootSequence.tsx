"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Check, CornerDownLeft, FastForward } from "lucide-react";

interface BootSequenceProps {
  onComplete: () => void;
  forceShow?: boolean;
}

interface BootStep {
  id: string;
  label: string;
  detail: string;
}

const BOOT_STEPS: BootStep[] = [
  { id: "projects", label: "PROJECTS", detail: "Loaded 5 workspace definitions" },
  { id: "experiments", label: "EXPERIMENTS", detail: "Indexed 6 lab telemetry records" },
  { id: "notebook", label: "NOTEBOOK", detail: "Mounted 4 engineering logs" },
  { id: "system", label: "SYSTEM", detail: "ARM64 / V8 JIT kernel verified" },
];

export function BootSequence({ onComplete, forceShow = false }: BootSequenceProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  useEffect(() => {
    // Check if session has already booted and not forced
    if (!forceShow && typeof window !== "undefined") {
      const hasBooted = sessionStorage.getItem("taksh_os_booted");
      if (hasBooted === "true") {
        onComplete();
        return;
      }
    }

    // Step-by-step timed progression
    const intervals: NodeJS.Timeout[] = [];

    BOOT_STEPS.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setCurrentStepIndex(idx + 1);
        if (idx === BOOT_STEPS.length - 1) {
          setTimeout(() => {
            setIsReady(true);
          }, 300);
        }
      }, 350 + idx * 300);
      intervals.push(timer);
    });

    return () => {
      intervals.forEach((t) => clearTimeout(t));
    };
  }, [onComplete, forceShow]);

  const handleEnter = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("taksh_os_booted", "true");
    }
    setIsSkipped(true);
    setTimeout(onComplete, 200);
  };

  // Keyboard Enter listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-[#0B0D12] flex flex-col justify-between p-6 sm:p-12 font-mono-tech text-[#EDEDED] select-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between text-xs text-[#8E95A5] border-b border-[#202634] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
              <span className="tracking-widest font-semibold text-[#FFFFFF]">TAKSH.OS</span>
              <span className="text-[#5D6475]">/ BOOT_SEQUENCE</span>
            </div>
            <button
              onClick={handleEnter}
              className="flex items-center gap-1 text-[#8E95A5] hover:text-[#E5484D] transition-colors cursor-pointer px-2 py-1 rounded hover:bg-[#161B26]"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>SKIP [ESC]</span>
            </button>
          </div>

          {/* Main Boot Telemetry Console */}
          <div className="max-w-xl mx-auto w-full my-auto space-y-6">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] flex items-center gap-3">
                <Terminal className="w-6 h-6 text-[#E5484D]" />
                TAKSH.OS
              </div>
              <p className="text-xs text-[#8E95A5] tracking-wider uppercase">
                Engineer&apos;s Workspace &amp; System Telemetry v1.0.0
              </p>
            </div>

            <div className="border border-[#202634] bg-[#12151D] p-5 sm:p-6 rounded-xl space-y-4 shadow-lg">
              <div className="text-xs text-[#5D6475] tracking-wider uppercase border-b border-[#1C2230] pb-2">
                INITIALIZING WORKSPACE COMPONENTS...
              </div>

              <div className="space-y-2.5">
                {BOOT_STEPS.map((step, idx) => {
                  const isDone = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center justify-between text-xs transition-opacity duration-200 ${
                        isDone || isCurrent ? "opacity-100" : "opacity-25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-24 sm:w-28 text-[#FFFFFF] font-semibold tracking-wider">
                          {step.label}
                        </span>
                        <span className="text-[#8E95A5] hidden sm:inline text-[11px]">
                          {step.detail}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <span className="text-[#30A46C] text-[11px] font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            OK
                          </span>
                        ) : isCurrent ? (
                          <span className="text-[#E5484D] text-[11px] font-semibold animate-pulse">
                            LOAD...
                          </span>
                        ) : (
                          <span className="text-[#5D6475] text-[11px]">WAIT</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-[#1C2230] rounded-full overflow-hidden mt-4">
                <motion.div
                  className="h-full bg-[#E5484D]"
                  animate={{
                    width: `${(currentStepIndex / BOOT_STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Ready State CTA Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleEnter}
                disabled={!isReady}
                className={`px-6 py-2.5 rounded-lg text-xs font-mono-tech font-bold transition-all duration-200 flex items-center gap-2 mx-auto cursor-pointer shadow-md ${
                  isReady
                    ? "bg-[#E5484D] hover:bg-[#F0565B] text-white animate-pulse-subtle"
                    : "bg-[#161B26] text-[#5D6475] border border-[#202634] opacity-50 cursor-not-allowed"
                }`}
              >
                <span>[ ENTER TAKSH.OS WORKSPACE ]</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-[11px] text-[#5D6475] border-t border-[#202634] pt-4">
            <div>NODE: TAKSH-SEHRAWAT-DEV</div>
            <div>STATUS: {isReady ? "READY" : "BOOTING"}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
