"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState<string>("");
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);

  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

  useEffect(() => {
    // Check if device is touch-primary
    const checkTouch = () => {
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouch(isTouchDevice);
    };

    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check target element cursor metadata
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      const clickableEl = target.closest("button, a, input, textarea, [role='button']");

      if (cursorEl) {
        setCursorText(cursorEl.getAttribute("data-cursor") || "");
        setIsPointer(true);
      } else if (clickableEl) {
        setCursorText("");
        setIsPointer(true);
      } else {
        setCursorText("");
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Outer subtle ring */}
      <motion.div
        animate={{
          scale: cursorText ? 1.6 : isPointer ? 1.3 : 1,
          borderColor: cursorText ? "#A62B2B" : "#1A1A18",
          backgroundColor: cursorText ? "rgba(166, 43, 43, 0.04)" : "transparent",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-8 h-8 rounded-full border border-[#1A1A18]/30 flex items-center justify-center"
      >
        {/* Inner center dot */}
        <motion.div
          animate={{
            scale: cursorText ? 0 : 1,
            backgroundColor: isPointer ? "#A62B2B" : "#1A1A18",
          }}
          className="w-1.5 h-1.5 rounded-full"
        />
      </motion.div>

      {/* Contextual Tag Label */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute left-10 top-0 whitespace-nowrap bg-[#161614] text-[#F7F5EE] px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#30302E]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A62B2B]" />
          {cursorText}
        </motion.div>
      )}
    </motion.div>
  );
}
