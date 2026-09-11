"use client";

import React, { useState, useEffect } from "react";

interface TypewriterHeaderProps {
  phrases: string[];
  showAccentBar?: boolean;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  initialDelay?: number;
}

export function TypewriterHeader({
  phrases,
  showAccentBar = true,
  className = "",
  typingSpeed = 55,
  deletingSpeed = 25,
  pauseMs = 2800,
  initialDelay = 0,
}: TypewriterHeaderProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(initialDelay === 0);

  // Handle initial delay for natural staggered typing across sections
  useEffect(() => {
    if (initialDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, initialDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [initialDelay]);

  useEffect(() => {
    if (!hasStarted || phrases.length === 0) return;

    const targetPhrase = phrases[phraseIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === targetPhrase) {
      // Pause at full text
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayText === "") {
      // Advance to next phrase
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
      timeout = setTimeout(() => {}, 350);
    } else {
      // Type or delete characters
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? targetPhrase.substring(0, prev.length - 1)
            : targetPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIdx, phrases, hasStarted, pauseMs, typingSpeed, deletingSpeed]);

  return (
    <div className={`flex items-center gap-2 min-h-[22px] ${className}`}>
      {showAccentBar && (
        <span className="w-1 h-3.5 bg-[#E6322A] inline-block rounded-2xs shrink-0" />
      )}
      <span className="text-[9.5px] sm:text-[10px] font-mono-tech tracking-wider text-[#7A7770] uppercase font-semibold truncate">
        {displayText}
      </span>
      <span className="inline-block w-1.5 h-3 bg-[#E6322A] animate-pulse shrink-0 ml-0.5" />
    </div>
  );
}
