"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { WindowId } from "@/types/os";

interface OSWindowProps {
  id: WindowId;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isActive: boolean;
  zIndex?: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export function OSWindow({
  id,
  title,
  subtitle,
  isOpen,
  isMinimized,
  isActive,
  zIndex = 30,
  onClose,
  onMinimize,
  onFocus,
  children,
  width = "max-w-4xl",
  height = "max-h-[85vh]",
}: OSWindowProps) {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center p-2 sm:p-6 md:p-10 pt-14 pb-20 overflow-hidden"
    >
      <AnimatePresence>
        <motion.div
          drag={!isMobile && !isMaximized}
          dragMomentum={false}
          dragElastic={0.05}
          onPointerDown={onFocus}
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ zIndex }}
          className={`pointer-events-auto flex flex-col bg-[#12151D] border transition-shadow duration-200 ${
            isActive
              ? "border-[#E5484D]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              : "border-[#202634] shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          } ${
            isMobile || isMaximized
              ? "w-full h-full rounded-none md:rounded-lg inset-0 fixed top-10 bottom-16 left-0 right-0 max-w-none max-h-none"
              : `w-full ${width} ${height} rounded-xl overflow-hidden`
          }`}
        >
          {/* Window Header Bar */}
          <div
            className={`h-10 px-3 sm:px-4 bg-[#161B26] border-b border-[#202634] flex items-center justify-between select-none shrink-0 ${
              !isMobile && !isMaximized ? "cursor-grab active:cursor-grabbing" : ""
            }`}
          >
            {/* Title & Path */}
            <div className="flex items-center gap-2 font-mono-tech text-xs truncate mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D]" />
              <span className="font-bold tracking-wider text-[#EDEDED] uppercase truncate">
                {title}
              </span>
              {subtitle && (
                <span className="text-[#5D6475] text-[11px] hidden sm:inline truncate">
                  / {subtitle}
                </span>
              )}
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                data-cursor="MINIMIZE"
                title="Minimize Window"
                className="p-1 text-[#8E95A5] hover:text-[#EDEDED] hover:bg-[#1E2433] rounded transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {!isMobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMaximized(!isMaximized);
                  }}
                  data-cursor={isMaximized ? "RESTORE" : "MAXIMIZE"}
                  title={isMaximized ? "Restore Window" : "Maximize Window"}
                  className="p-1 text-[#8E95A5] hover:text-[#EDEDED] hover:bg-[#1E2433] rounded transition-colors cursor-pointer"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                data-cursor="CLOSE"
                title="Close Window (Esc)"
                className="p-1 text-[#8E95A5] hover:text-[#E5484D] hover:bg-[#1E2433] rounded transition-colors cursor-pointer ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Window Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 bg-[#0E1118] text-[#EDEDED]">
            {children}
          </div>

          {/* Window Footer Status Bar */}
          <div className="h-6 px-3 bg-[#161B26] border-t border-[#202634] flex items-center justify-between text-[10px] font-mono-tech text-[#8E95A5] select-none shrink-0">
            <div className="flex items-center gap-3 truncate">
              <span>DOC: {id.toUpperCase()}.SYS</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">PERMISSIONS: READ / EXEC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30A46C]" />
              <span>UTF-8</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
