"use client";

import React from "react";

interface BookStandProps {
  lampBrightness?: number;
  width?: number | string;
  children: React.ReactNode;
}

/**
 * BookStand: A physical wooden & bronze easel-style bookstand resting on the desk.
 *
 * Designed to look like a real physical furniture object:
 * - Material: Rich blackened walnut wood (#17120E, #221A14) with subtle grain and bevels
 * - Hardware: Aged bronze / brass hinges, rivets, and page-holder clips (#A67C38, #825C22)
 * - Structure:
 *   - Angled wooden back support cradling the open diary
 *   - Heavy weighted base resting on the desk
 *   - Retaining bottom shelf with front lip holding the open book
 *   - Left-to-right directional contact shadow cast on the wooden desk
 *   - Left warm rim lighting catching the desk lamp's rays
 */
export function BookStand({
  lampBrightness = 0.5,
  width = 630,
  children,
}: BookStandProps) {
  const lb = lampBrightness;

  return (
    <div
      style={{
        position: "relative",
        width,
        margin: "0 auto",
        perspective: "1600px",
        userSelect: "none",
      }}
    >
      {/* ── 1. Contact Shadow Cast Onto Desk (Soft directional drop shadow from lamp) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "5%",
          right: "-8%",
          bottom: -18,
          height: 38,
          background:
            "radial-gradient(ellipse at 42% 40%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0) 80%)",
          filter: "blur(9px)",
          transform: "rotate(0.8deg) skewX(-4deg)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── 2. Back Support Frame (Visible slightly behind the diary top & sides) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -12,
          left: "8%",
          right: "8%",
          bottom: 24,
          background:
            "linear-gradient(180deg, #1C1510 0%, #15100C 50%, #0E0B08 100%)",
          borderRadius: "4px 4px 0 0",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.06), 0 12px 35px rgba(0,0,0,0.85)",
          border: "1px solid rgba(80,60,40,0.25)",
          zIndex: 2,
        }}
      >
        {/* Top wood grain & beveled rim */}
        <div
          style={{
            height: 8,
            background:
              "linear-gradient(90deg, rgba(200,160,90,0.18) 0%, rgba(120,90,50,0.08) 35%, rgba(40,30,20,0.05) 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.6)",
          }}
        />

        {/* Central wooden strut / spine support */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 38,
            background:
              "linear-gradient(90deg, #18120D 0%, #241B13 50%, #16100B 100%)",
            boxShadow:
              "inset 1px 0 0 rgba(255,255,255,0.04), inset -1px 0 0 rgba(0,0,0,0.7)",
          }}
        >
          {/* Top brass fastener bolt */}
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              margin: "5px auto 0",
              background:
                "radial-gradient(circle at 35% 35%, #D4AF37 0%, #8A6820 60%, #403010 100%)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        {/* Left ambient highlight catching the desk lamp */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 3,
            background: `linear-gradient(to bottom, rgba(255,200,90,${(lb * 0.45).toFixed(3)}), rgba(255,170,50,${(lb * 0.15).toFixed(3)}))`,
          }}
        />
      </div>

      {/* ── 3. The Diary (Physically nested and resting on the stand) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          transform: "rotateX(2.5deg)",
          transformOrigin: "bottom center",
        }}
      >
        {children}
      </div>

      {/* ── 4. Front Shelf Ledge & Retaining Lip (The shelf that physically holds the book) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          marginTop: -6,
          height: 18,
          background:
            "linear-gradient(180deg, #2A1F17 0%, #1F1710 40%, #140E0A 100%)",
          borderRadius: "2px 2px 4px 4px",
          boxShadow:
            "0 6px 16px rgba(0,0,0,0.92), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.8)",
          border: "1px solid rgba(85,62,40,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 15,
        }}
      >
        {/* Left brass page-holder clip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Brass hinge/bracket */}
          <div
            style={{
              width: 14,
              height: 10,
              background:
                "linear-gradient(180deg, #C8A050 0%, #8A6820 60%, #4D3810 100%)",
              borderRadius: "2px 2px 1px 1px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.9)",
              border: "0.5px solid rgba(255,230,140,0.3)",
              position: "relative",
            }}
          >
            {/* Tiny rivet */}
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#2A1F10",
                margin: "3.5px auto",
              }}
            />
          </div>

          {/* Upright brass page retaining lip tab */}
          <div
            style={{
              width: 4,
              height: 14,
              background:
                "linear-gradient(90deg, #E0B858 0%, #9E7422 60%, #523B0F 100%)",
              borderRadius: "1px 1px 0 0",
              boxShadow: "0 0 4px rgba(0,0,0,0.8)",
              transform: "translateY(-3px)",
            }}
          />
        </div>

        {/* Center brass brand plaque: TAKSH.OS DRAFTING STAND */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#825C22",
            }}
          />
          <span
            className="font-mono-tech"
            style={{
              fontSize: 6.5,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "rgba(200,160,80,0.65)",
              textShadow: "0 1px 2px rgba(0,0,0,0.9)",
            }}
          >
            TAKSH.OS // WORKSTATION SPEC 01
          </span>
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#825C22",
            }}
          />
        </div>

        {/* Right brass page-holder clip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Upright brass tab */}
          <div
            style={{
              width: 4,
              height: 14,
              background:
                "linear-gradient(90deg, #BA9038 0%, #7A5618 60%, #3D2B0A 100%)",
              borderRadius: "1px 1px 0 0",
              boxShadow: "0 0 4px rgba(0,0,0,0.8)",
              transform: "translateY(-3px)",
            }}
          />
          {/* Brass bracket */}
          <div
            style={{
              width: 14,
              height: 10,
              background:
                "linear-gradient(180deg, #A88235 0%, #6E4F15 60%, #382508 100%)",
              borderRadius: "2px 2px 1px 1px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.9)",
              border: "0.5px solid rgba(255,230,140,0.15)",
            }}
          >
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#1E150A",
                margin: "3.5px auto",
              }}
            />
          </div>
        </div>

        {/* Left rim light from lamp across the bottom lip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 140,
            background: `linear-gradient(90deg, rgba(255,200,80,${(lb * 0.28).toFixed(3)}) 0%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── 5. Stand Desk Footing / Triangular Side Struts (Perspective depth) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          height: 8,
          margin: "0 28px",
          background:
            "linear-gradient(180deg, #100C08 0%, #0A0705 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.95)",
          borderBottom: "1px solid rgba(0,0,0,0.9)",
          zIndex: 14,
        }}
      />
    </div>
  );
}
