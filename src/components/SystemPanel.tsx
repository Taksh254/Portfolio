"use client";

import React, { useEffect, useRef, useState } from "react";

// Decorative system panel — CPU, MEM, NET readouts with a mini line graph
export function SystemPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated "fake" values
  const [cpu, setCpu] = useState(12);
  const [mem] = useState(4.2);
  const [netUp] = useState(12);
  const [netDown] = useState(8);

  // Mini graph history
  const graphData = useRef<number[]>([8, 11, 9, 14, 12, 16, 11, 13, 10, 12]);

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.max(6, Math.min(22, cpu + (Math.random() - 0.48) * 4));
      setCpu(Math.round(next));
      graphData.current = [...graphData.current.slice(1), next];
      drawGraph();
    }, 2200);
    drawGraph();
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpu]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const data = graphData.current;
    const max = 30;
    const step = width / (data.length - 1);

    // Grid lines
    ctx.strokeStyle = "rgba(160,140,100,0.12)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 3; i++) {
      const y = (i / 3) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Fill area
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = i * step;
      const y = height - (v / max) * height;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = "rgba(217, 47, 39, 0.08)";
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(217, 47, 39, 0.55)";
    ctx.lineWidth = 1.2;
    ctx.lineJoin = "round";
    data.forEach((v, i) => {
      const x = i * step;
      const y = height - (v / max) * height;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "14px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span className="font-mono-tech" style={{ fontSize: 8, letterSpacing: "0.16em", color: "var(--text-muted)" }}>
          SYSTEM
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="status-dot-green" style={{ width: 5, height: 5, borderRadius: "50%" }} />
          <span className="font-mono-tech" style={{ fontSize: 7, color: "var(--accent-green)", letterSpacing: "0.10em" }}>
            ONLINE
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <MetricRow label="CPU" value={`${cpu}%`} barPct={cpu / 100} />
        <MetricRow label="MEM" value={`${mem} GB`} barPct={mem / 16} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="font-mono-tech" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.10em", width: 28 }}>NET</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
              <span className="font-mono-tech" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.06em" }}>↑ {netUp} KB/s</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
              <span className="font-mono-tech" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.06em" }}>↓ {netDown} KB/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini graph */}
      <div style={{ marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
        <span className="font-mono-tech" style={{ fontSize: 7, color: "var(--text-muted)", letterSpacing: "0.12em" }}>
          CPU HISTORY
        </span>
        <canvas
          ref={canvasRef}
          width={160}
          height={32}
          style={{ display: "block", width: "100%", height: 32, marginTop: 6 }}
        />
      </div>
    </div>
  );
}

function MetricRow({ label, value, barPct }: { label: string; value: string; barPct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span className="font-mono-tech" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.10em", width: 28, flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.min(barPct * 100, 100)}%`,
            background: "var(--accent-red)",
            borderRadius: 1,
            transition: "width 0.8s ease",
          }}
        />
      </div>
      <span className="font-mono-tech" style={{ fontSize: 8, color: "var(--text-secondary)", letterSpacing: "0.06em", width: 44, textAlign: "right", flexShrink: 0 }}>
        {value}
      </span>
    </div>
  );
}
