"use client";

import React from "react";

// HandwrittenAnnotation — A Caveat-font sticky note with optional tape
interface AnnotationProps {
  children: React.ReactNode;
  rotate?: number;         // degrees (default: 0)
  color?: string;          // background color
  tape?: boolean;          // show washi tape strip
  tapeColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function HandwrittenAnnotation({
  children,
  rotate = 0,
  color = "rgba(255, 250, 220, 0.85)",
  tape = false,
  tapeColor = "rgba(240, 215, 160, 0.55)",
  style,
  className = "",
}: AnnotationProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        transform: `rotate(${rotate}deg)`,
        display: "inline-block",
        ...style,
      }}
    >
      {/* Tape strip */}
      {tape && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 12,
            background: tapeColor,
            border: "1px solid rgba(200, 175, 110, 0.5)",
            borderRadius: 2,
            opacity: 0.8,
            zIndex: 1,
          }}
        />
      )}

      <div
        style={{
          background: color,
          border: "1px solid rgba(200, 185, 140, 0.35)",
          borderRadius: 2,
          padding: "10px 14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="font-handwriting"
          style={{
            fontSize: 15,
            lineHeight: 1.45,
            color: "#3A3020",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// InlineAnnotation — smaller inline handwriting text, no box
export function InlineAnnotation({
  children,
  style,
  fontSize = 13,
  color = "#6B5A3A",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  fontSize?: number;
  color?: string;
}) {
  return (
    <span
      className="font-handwriting"
      style={{ fontSize, color, lineHeight: 1.35, ...style }}
    >
      {children}
    </span>
  );
}
