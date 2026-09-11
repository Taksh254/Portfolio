"use client";

import React, { useEffect, useRef } from "react";

interface LeafPalette {
  top: string;
  topSecondary: string;
  underside: string;
  vein: string;
  stem: string;
}

const LEAF_PALETTES: LeafPalette[] = [
  {
    // Lush Oak Green (dominant canopy shade)
    top: "#3F6E2B",
    topSecondary: "#528537",
    underside: "#89AD6A",
    vein: "#284A1A",
    stem: "#233E17",
  },
  {
    // Deep Forest Olive
    top: "#2F5422",
    topSecondary: "#416F30",
    underside: "#739958",
    vein: "#1E3914",
    stem: "#193010",
  },
  {
    // Sunlit Chartreuse
    top: "#649432",
    topSecondary: "#7CAE3F",
    underside: "#A5C77A",
    vein: "#42671E",
    stem: "#3A5619",
  },
  {
    // Golden Moss / Early Turn
    top: "#86A030",
    topSecondary: "#9EBA3E",
    underside: "#BDD175",
    vein: "#5C7020",
    stem: "#4E5E1A",
  },
  {
    // Autumn Honey Accent
    top: "#BA8E2A",
    topSecondary: "#CDA238",
    underside: "#DFBF75",
    vein: "#826116",
    stem: "#6C4F11",
  },
  {
    // Russet Amber Accent
    top: "#A65824",
    topSecondary: "#BF6E34",
    underside: "#D8956A",
    vein: "#723812",
    stem: "#5C2C0D",
  },
];

interface Leaf {
  x: number;
  y: number;
  z: number; // 0: background (behind frosted glass), 1: foreground (above glass)
  size: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  flipX: boolean;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
  velocityY: number;
  velocityX: number;
  palette: LeafPalette;
  leafType: number; // 0: Lobed Oak, 1: Pointed Blade, 2: Curled Fluttering, 3: Small Leaflet
  time: number;
}

export function LiveFallingLeaves() {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    lastX: number;
    lastY: number;
  }>({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;

    const bgCtx = bgCanvas.getContext("2d", { alpha: true });
    const fgCtx = fgCanvas.getContext("2d", { alpha: true });
    if (!bgCtx || !fgCtx) return;

    let width = (bgCanvas.width = fgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = fgCanvas.height = window.innerHeight);

    const handleResize = () => {
      if (!bgCanvas || !fgCanvas) return;
      width = bgCanvas.width = fgCanvas.width = window.innerWidth;
      height = bgCanvas.height = fgCanvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = (e.clientX - mouse.lastX) * 0.25;
      mouse.vy = (e.clientY - mouse.lastY) * 0.25;
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // High-performance static offscreen canvas for crisp pixel-grid quantization
    const offCanvas = document.createElement("canvas");
    offCanvas.width = 64;
    offCanvas.height = 64;
    const offCtx = offCanvas.getContext("2d", { alpha: true });

    const TOTAL_BG_LEAVES = 36;
    const TOTAL_FG_LEAVES = 8;
    const leaves: Leaf[] = [];

    const createLeaf = (initialSpawn = false, forceForeground = false): Leaf => {
      const isForeground = forceForeground;

      // Canopy spawn origin: predominantly sheds from upper-left oak boughs
      const spawnX = initialSpawn
        ? Math.random() * (width * 1.1) - 40
        : Math.random() < 0.78
        ? Math.random() * Math.min(width * 0.45, 520) - 30
        : Math.random() * (width * 0.75) - 20;

      const spawnY = initialSpawn
        ? Math.random() * (height + 80) - 40
        : -25 - Math.random() * 80;

      // Botanically balanced dimensions (oak leaf ~22-30px, small leaflet ~16-20px)
      const baseSize = isForeground
        ? 24 + Math.random() * 8
        : 18 + Math.random() * 8;

      const palIdx = Math.floor(Math.random() * LEAF_PALETTES.length);
      const leafType = Math.floor(Math.random() * 4);

      return {
        x: spawnX,
        y: spawnY,
        z: isForeground ? 1 : 0,
        size: baseSize,
        opacity: isForeground ? 0.94 + Math.random() * 0.06 : 0.85 + Math.random() * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.024,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: 0.018 + Math.random() * 0.028,
        flipX: Math.random() > 0.5,
        swayAmp: 1.4 + Math.random() * 2.2,
        swaySpeed: 0.012 + Math.random() * 0.018,
        phase: Math.random() * Math.PI * 2,
        velocityY: 0.65 + Math.random() * 0.95,
        velocityX: 0.35 + Math.random() * 0.65, // Gentle rightward breeze drift
        palette: LEAF_PALETTES[palIdx],
        leafType,
        time: Math.random() * 1000,
      };
    };

    // Populate initial leaves
    for (let i = 0; i < TOTAL_BG_LEAVES; i++) {
      leaves.push(createLeaf(true, false));
    }
    for (let i = 0; i < TOTAL_FG_LEAVES; i++) {
      leaves.push(createLeaf(true, true));
    }

    // =========================================================================
    // BOTANICALLY ACCURATE LEAF RENDERING PROCEDURES (DRAWN TO OFFSCREEN BUFFER)
    // =========================================================================

    // 1. Classic Lobed Oak Leaf (Quercus robur / alba)
    const drawOakLeaf = (
      ctx: CanvasRenderingContext2D,
      size: number,
      palette: LeafPalette,
      flipProgress: number,
      flipX: boolean
    ) => {
      const L = size;
      const W = size * 0.54;
      const isUnderside = flipProgress < 0;
      const flipScale = Math.max(0.1, Math.abs(flipProgress));
      const dirX = flipX ? -1 : 1;

      ctx.save();
      ctx.scale(dirX, flipScale);

      // Delicate curved petiole (stem)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-1.2, L * 0.1, 0, L * 0.2);
      ctx.strokeStyle = isUnderside ? palette.underside : palette.stem;
      ctx.lineWidth = Math.max(1.1, L * 0.055);
      ctx.lineCap = "round";
      ctx.stroke();

      // Organic sinuous 3-lobed leaf blade outline
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);

      // Right lobes (base -> middle -> top -> terminal apex)
      ctx.bezierCurveTo(W * 0.42, L * 0.22, W * 0.72, L * 0.29, W * 0.68, L * 0.38); // basal lobe
      ctx.bezierCurveTo(W * 0.48, L * 0.43, W * 0.54, L * 0.5, W * 0.94, L * 0.58);  // central sinus & lobe
      ctx.bezierCurveTo(W * 1.04, L * 0.66, W * 0.82, L * 0.73, W * 0.64, L * 0.77); // upper sinus
      ctx.bezierCurveTo(W * 0.82, L * 0.82, W * 0.68, L * 0.91, 0, L);               // subapical lobe & tip

      // Left lobes (tip -> top -> middle -> base)
      ctx.bezierCurveTo(-W * 0.68, L * 0.91, -W * 0.82, L * 0.82, -W * 0.64, L * 0.77);
      ctx.bezierCurveTo(-W * 0.82, L * 0.73, -W * 1.04, L * 0.66, -W * 0.94, L * 0.58);
      ctx.bezierCurveTo(-W * 0.54, L * 0.5, -W * 0.48, L * 0.43, -W * 0.68, L * 0.38);
      ctx.bezierCurveTo(-W * 0.72, L * 0.29, -W * 0.42, L * 0.22, 0, L * 0.18);
      ctx.closePath();

      // Blade fill with natural highlight & curvature
      const grad = ctx.createLinearGradient(-W * 0.3, L * 0.18, W * 0.3, L);
      if (!isUnderside) {
        grad.addColorStop(0, palette.top);
        grad.addColorStop(0.55, palette.topSecondary);
        grad.addColorStop(1, palette.top);
      } else {
        grad.addColorStop(0, palette.underside);
        grad.addColorStop(0.7, palette.underside);
        grad.addColorStop(1, palette.topSecondary);
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Fine edge boundary
      ctx.strokeStyle = isUnderside ? palette.topSecondary : palette.vein;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Central midrib vein
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);
      ctx.quadraticCurveTo(W * 0.03, L * 0.55, 0, L * 0.96);
      ctx.strokeStyle = isUnderside ? "rgba(255,255,255,0.45)" : palette.vein;
      ctx.lineWidth = Math.max(0.8, L * 0.035);
      ctx.stroke();

      // Lateral secondary branching veins
      const lateralVeins = [
        [0.37, 0.41, W * 0.48],
        [0.56, 0.61, W * 0.66],
        [0.75, 0.79, W * 0.45],
      ];
      ctx.lineWidth = Math.max(0.5, L * 0.02);
      lateralVeins.forEach(([yStart, yEnd, xSpan]) => {
        // Right branch
        ctx.beginPath();
        ctx.moveTo(0, L * yStart);
        ctx.quadraticCurveTo(xSpan * 0.45, L * (yStart + 0.035), xSpan, L * yEnd);
        ctx.stroke();
        // Left branch
        ctx.beginPath();
        ctx.moveTo(0, L * yStart);
        ctx.quadraticCurveTo(-xSpan * 0.45, L * (yStart + 0.035), -xSpan, L * yEnd);
        ctx.stroke();
      });

      ctx.restore();
    };

    // 2. Pointed Ovate / Deciduous Blade Leaf
    const drawOvateLeaf = (
      ctx: CanvasRenderingContext2D,
      size: number,
      palette: LeafPalette,
      flipProgress: number,
      flipX: boolean
    ) => {
      const L = size;
      const W = size * 0.46;
      const isUnderside = flipProgress < 0;
      const flipScale = Math.max(0.1, Math.abs(flipProgress));
      const dirX = flipX ? -1 : 1;

      ctx.save();
      ctx.scale(dirX, flipScale);

      // Stem
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(1, L * 0.1, 0, L * 0.2);
      ctx.strokeStyle = isUnderside ? palette.underside : palette.stem;
      ctx.lineWidth = Math.max(1, L * 0.05);
      ctx.lineCap = "round";
      ctx.stroke();

      // Smooth teardrop / ovate blade with pointed apex
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);
      ctx.bezierCurveTo(W * 0.85, L * 0.3, W * 1.05, L * 0.58, 0, L);
      ctx.bezierCurveTo(-W * 1.05, L * 0.58, -W * 0.85, L * 0.3, 0, L * 0.18);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-W * 0.4, L * 0.2, W * 0.4, L);
      if (!isUnderside) {
        grad.addColorStop(0, palette.top);
        grad.addColorStop(1, palette.topSecondary);
      } else {
        grad.addColorStop(0, palette.underside);
        grad.addColorStop(1, palette.topSecondary);
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Midrib
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);
      ctx.lineTo(0, L * 0.95);
      ctx.strokeStyle = isUnderside ? "rgba(255,255,255,0.4)" : palette.vein;
      ctx.lineWidth = Math.max(0.75, L * 0.03);
      ctx.stroke();

      // Parallel secondary veins
      [0.34, 0.48, 0.62, 0.76].forEach((ratio) => {
        const vW = W * (1 - ratio * 0.65);
        ctx.beginPath();
        ctx.moveTo(0, L * ratio);
        ctx.lineTo(vW * 0.9, L * (ratio + 0.07));
        ctx.moveTo(0, L * ratio);
        ctx.lineTo(-vW * 0.9, L * (ratio + 0.07));
        ctx.strokeStyle = isUnderside ? "rgba(255,255,255,0.3)" : palette.vein;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      });

      ctx.restore();
    };

    // 3. Curled Fluttering Leaf (Aerodynamic wind curvature)
    const drawCurvedLeaf = (
      ctx: CanvasRenderingContext2D,
      size: number,
      palette: LeafPalette,
      flipProgress: number,
      flipX: boolean
    ) => {
      const L = size;
      const W = size * 0.42;
      const isUnderside = flipProgress < 0;
      const flipScale = Math.max(0.1, Math.abs(flipProgress));
      const dirX = flipX ? -1 : 1;

      ctx.save();
      ctx.scale(dirX, flipScale);

      // Petiole
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-1.5, L * 0.1, 0, L * 0.2);
      ctx.strokeStyle = isUnderside ? palette.underside : palette.stem;
      ctx.lineWidth = Math.max(1, L * 0.05);
      ctx.stroke();

      // Asymmetric wind-swept curl
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);
      ctx.bezierCurveTo(W * 0.9, L * 0.35, W * 0.8, L * 0.68, W * 0.35, L);
      ctx.bezierCurveTo(-W * 0.55, L * 0.72, -W * 0.7, L * 0.35, 0, L * 0.18);
      ctx.closePath();

      ctx.fillStyle = isUnderside ? palette.underside : palette.top;
      ctx.fill();

      // Curving midrib
      ctx.beginPath();
      ctx.moveTo(0, L * 0.18);
      ctx.quadraticCurveTo(W * 0.1, L * 0.58, W * 0.32, L * 0.96);
      ctx.strokeStyle = isUnderside ? "rgba(255,255,255,0.4)" : palette.vein;
      ctx.lineWidth = Math.max(0.75, L * 0.03);
      ctx.stroke();

      ctx.restore();
    };

    // 4. Small Paired Leaflet
    const drawLeafletPair = (
      ctx: CanvasRenderingContext2D,
      size: number,
      palette: LeafPalette,
      flipProgress: number,
      flipX: boolean
    ) => {
      const L = size * 0.85;
      const flipScale = Math.max(0.1, Math.abs(flipProgress));

      ctx.save();
      ctx.scale(flipX ? -1 : 1, flipScale);

      // Tiny twig
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, L * 0.35);
      ctx.strokeStyle = palette.stem;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Main leaf
      ctx.save();
      ctx.translate(0, L * 0.2);
      ctx.rotate(0.25);
      drawOvateLeaf(ctx, L * 0.8, palette, flipProgress, false);
      ctx.restore();

      // Smaller companion leaf
      ctx.save();
      ctx.translate(-2, L * 0.12);
      ctx.rotate(-0.55);
      drawOvateLeaf(ctx, L * 0.55, palette, -flipProgress, true);
      ctx.restore();

      ctx.restore();
    };

    // =========================================================================
    // PIXELATED ACCURATE LEAF DISPATCHER
    // =========================================================================
    // Uses a ~1.85px - 2.1px artisanal pixel quantization grid matching the 4K oak tree
    const renderLeaf = (ctx: CanvasRenderingContext2D, leaf: Leaf) => {
      if (!offCtx) return;

      // Subtle pixel grid scale factor (1.8px gives crisp pixel art edges while preserving clear leaf anatomy)
      const pixelGrid = leaf.z === 1 ? 1.75 : 2.05;
      const pad = 6;
      const boxW = Math.ceil(leaf.size + pad * 2);
      const boxH = Math.ceil(leaf.size + pad * 2);

      const lowW = Math.max(4, Math.round(boxW / pixelGrid));
      const lowH = Math.max(4, Math.round(boxH / pixelGrid));

      offCtx.clearRect(0, 0, lowW, lowH);

      offCtx.save();
      offCtx.scale(lowW / boxW, lowH / boxH);
      offCtx.translate(boxW / 2, pad);

      const flipProgress = Math.cos(leaf.flipAngle);

      switch (leaf.leafType) {
        case 0:
          drawOakLeaf(offCtx, leaf.size, leaf.palette, flipProgress, leaf.flipX);
          break;
        case 1:
          drawOvateLeaf(offCtx, leaf.size, leaf.palette, flipProgress, leaf.flipX);
          break;
        case 2:
          drawCurvedLeaf(offCtx, leaf.size, leaf.palette, flipProgress, leaf.flipX);
          break;
        case 3:
        default:
          drawLeafletPair(offCtx, leaf.size, leaf.palette, flipProgress, leaf.flipX);
          break;
      }

      offCtx.restore();

      // Render the pixelated leaf onto target canvas
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;

      // Subtle atmospheric shadow for foreground leaves
      if (leaf.z === 1) {
        ctx.shadowColor = "rgba(45, 35, 20, 0.14)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 2;
      }

      // Crisp pixelated rendering (disable anti-aliasing interpolation for stepped pixel art look)
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        offCanvas,
        0, 0, lowW, lowH,
        -boxW / 2, -boxH / 2, boxW, boxH
      );

      ctx.restore();
    };

    let animId: number;
    let isTabActive = true;

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // =========================================================================
    // MAIN AERODYNAMIC FLUTTER SIMULATION LOOP
    // =========================================================================
    const render = () => {
      if (!isTabActive) {
        animId = requestAnimationFrame(render);
        return;
      }

      bgCtx.clearRect(0, 0, width, height);
      fgCtx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.time += 1;

        // Aerodynamic pendulum oscillation & harmonic mountain breeze
        const globalBreeze =
          Math.sin(leaf.time * 0.016 + leaf.phase * 0.5) * 0.45;
        const sway =
          Math.sin(leaf.time * leaf.swaySpeed + leaf.phase) * leaf.swayAmp;

        // Tumble angle dictates aerodynamic horizontal drift
        const aerodynamicTilt = Math.sin(leaf.flipAngle) * 0.35;

        leaf.x += leaf.velocityX + globalBreeze + sway * 0.4 + aerodynamicTilt;
        leaf.y += leaf.velocityY;

        // Pitch (tumbling end-over-end) & Yaw (planar spin)
        leaf.rotation += leaf.rotSpeed;
        leaf.flipAngle += leaf.flipSpeed;

        // Interactive mouse air-displacement wake
        const dx = leaf.x - mouse.x;
        const dy = leaf.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const radius = 135;
        if (distSq < radius * radius && distSq > 4) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 2.2;
          leaf.x += (dx / dist) * force + mouse.vx * 0.45;
          leaf.y += (dy / dist) * force + mouse.vy * 0.45;
          leaf.rotation += 0.035;
          leaf.flipAngle += 0.04;
        }

        // Natural loop wrap: reset once leaf exits viewport bottom or right edge
        if (leaf.y > height + 45 || leaf.x > width + 65) {
          leaves[i] = createLeaf(false, leaf.z === 1);
          continue;
        }

        // Draw to corresponding plane (background behind glass, foreground above glass)
        if (leaf.z === 0) {
          renderLeaf(bgCtx, leaf);
        } else {
          renderLeaf(fgCtx, leaf);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* ── Background Leaf Canvas (Drifting behind frosted glass cards) ── */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1]"
        style={{ mixBlendMode: "multiply" }}
        aria-hidden="true"
      />

      {/* ── Foreground Leaf Canvas (Crisp tactile parallax depth) ── */}
      <canvas
        ref={fgCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-[25]"
        style={{ mixBlendMode: "multiply" }}
        aria-hidden="true"
      />
    </>
  );
}
