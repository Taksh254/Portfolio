"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { RedPencilUnderline, RedPencilCircle, TechnicalCrosshair } from "./TechnicalDrawings";
import { ArrowUpRight, CheckCircle2, Terminal, Cpu, Database, Network, Shield, ExternalLink, Code2, FlaskConical, BookOpen, Boxes, GitBranch, User, Send } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & PROPS
// ─────────────────────────────────────────────────────────────────────────────

type PageSide = "left" | "right";

export interface NotebookProps {
  lampBrightness?: number;
  currentSpread?: number;
  onSpreadChange?: (spread: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PAPER WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function PagePaper({
  side,
  children,
  pageNum,
  lampBrightness = 0.5,
}: {
  side: PageSide;
  children: React.ReactNode;
  pageNum: number;
  lampBrightness?: number;
}) {
  const lb = lampBrightness;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: side === "left" ? "#EDE4CC" : "#E5DAC0",
        backgroundImage:
          "linear-gradient(rgba(110,80,45,0.065) 1px, transparent 1px)",
        backgroundSize: "100% 21px",
        padding: "16px 18px 14px",
        position: "relative",
        overflow: "hidden",
        userSelect: "text",
        boxShadow:
          side === "left"
            ? "inset -8px 0 16px rgba(0,0,0,0.10)"
            : "inset 8px 0 16px rgba(0,0,0,0.12)",
      }}
    >
      {/* Red margin rule (left page only) */}
      {side === "left" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 44,
            width: 1,
            background: "rgba(180,55,35,0.24)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Warm lamp wash on left page, cooler ambient on right page */}
      {side === "left" ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 10% 40%, rgba(255,190,70,${(lb * 0.16).toFixed(3)}) 0%, transparent 80%)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent 60%, rgba(10,14,22,0.12) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>

      {/* Page number */}
      <div
        className="font-mono-tech"
        style={{
          position: "absolute",
          bottom: 6,
          [side === "left" ? "left" : "right"]: 12,
          fontSize: 8,
          color: "#8A7050",
          letterSpacing: "0.08em",
          zIndex: 3,
        }}
      >
        P. {String(pageNum).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8 SPREADS (16 PAGES)
// ─────────────────────────────────────────────────────────────────────────────

const FOCUS_TAGS = ["AI SYSTEMS", "SOFTWARE", "AUTOMATION", "RESEARCH"];

/** ── SPREAD 0: 01 HOME ── */
function S0HomeLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={1} lampBrightness={lb}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingLeft: 12,
        }}
      >
        <div>
          <div
            className="font-mono-tech"
            style={{ fontSize: 7.5, color: "#8A7058", letterSpacing: "0.14em" }}
          >
            ENGINEER&apos;S DIARY
          </div>
          <div
            className="font-mono-tech"
            style={{
              fontSize: 7,
              color: "#A09070",
              letterSpacing: "0.12em",
              marginTop: 3,
            }}
          >
            TAKSH.OS · VOL. 01 — 2026
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 50,
              fontWeight: 900,
              color: "#1E1608",
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.04em",
            }}
          >
            T.S.
          </div>
          <div
            style={{
              width: 42,
              height: 1.5,
              background: "#C8A050",
              margin: "10px auto",
            }}
          />
          <div
            className="font-mono-tech"
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              color: "#6A5838",
              letterSpacing: "0.18em",
              marginTop: 6,
            }}
          >
            TAKSH SEHRAWAT
          </div>
          <div
            className="font-mono-tech"
            style={{
              fontSize: 7,
              color: "#9A8060",
              letterSpacing: "0.12em",
              marginTop: 4,
            }}
          >
            AI ENGINEER & DEVELOPER
          </div>
          <div
            className="font-handwritten"
            style={{
              fontSize: 13,
              color: "#7A6040",
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            Build. Break. Understand. Repeat.
          </div>
        </div>

        <div
          className="font-mono-tech"
          style={{ fontSize: 6.5, color: "#B0A080", letterSpacing: "0.10em" }}
        >
          WORKSTATION SPEC · TS-01
          <br />
          TECHNICAL NOTEBOOK &amp; SYSTEM OS
        </div>
      </div>
    </PagePaper>
  );
}

function S0HomeRight({ lb, onExplore }: { lb: number; onExplore?: () => void }) {
  const [activeTag, setActiveTag] = useState(FOCUS_TAGS[0]);

  return (
    <PagePaper side="right" pageNum={2} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{
          fontSize: 8,
          color: "#5A4828",
          letterSpacing: "0.14em",
          marginBottom: 8,
        }}
      >
        &gt;_ / 01 INTRODUCTION
      </div>

      <div
        className="font-mono-tech"
        style={{
          fontSize: 8,
          color: "#6A5030",
          letterSpacing: "0.14em",
          marginBottom: 3,
        }}
      >
        HELLO, I&apos;M
      </div>

      <div style={{ marginBottom: 4 }}>
        <div
          style={{
            fontSize: 23,
            fontWeight: 900,
            color: "#120C04",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontFamily: "Georgia, serif",
          }}
        >
          Taksh Sehrawat
        </div>
        <RedPencilUnderline
          className="w-full text-[#C42020]"
          style={{ height: 8, marginTop: 1 }}
        />
      </div>

      <div
        className="font-mono-tech"
        style={{
          fontSize: 8.5,
          color: "#1E1408",
          fontWeight: 700,
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        AI ENGINEER & DEVELOPER
      </div>

      <p
        style={{
          fontSize: 9.5,
          color: "#3E3020",
          lineHeight: 1.6,
          marginBottom: 10,
        }}
      >
        I build intelligent systems, software products, automation tools and experiments.
      </p>

      <div
        className="font-mono-tech"
        style={{
          fontSize: 7,
          color: "#6A5030",
          letterSpacing: "0.14em",
          marginBottom: 5,
        }}
      >
        FOCUS AREAS
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {FOCUS_TAGS.map((tag) => {
          const on = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="font-mono-tech"
              style={{
                padding: "2px 7px",
                fontSize: 7,
                fontWeight: 700,
                letterSpacing: "0.04em",
                background: on ? "#120C04" : "rgba(18,12,4,0.07)",
                color: on ? "#EDE4CC" : "#3E3020",
                border: on ? "1px solid #120C04" : "1px solid rgba(110,80,45,0.3)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 130ms",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <button
        onClick={onExplore}
        className="font-mono-tech"
        style={{
          padding: "6px 14px",
          background: "#120C04",
          color: "#EDE4CC",
          border: "1px solid #2A1A08",
          borderRadius: 3,
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 7,
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
      >
        <span style={{ color: "#C42020" }}>EXPLORE WORK</span>
        <span>→</span>
      </button>
    </PagePaper>
  );
}

/** ── SPREAD 1: 02 WORK (FINOVA CASE STUDY) ── */
function S1WorkLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={3} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#C42020", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          02 // FEATURED WORK
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 900,
            fontFamily: "Georgia, serif",
            color: "#181008",
            lineHeight: 1.05,
            marginBottom: 6,
          }}
        >
          FINOVA
        </div>
        <div
          className="font-mono-tech"
          style={{ fontSize: 7.5, color: "#6A5030", letterSpacing: "0.08em", marginBottom: 8 }}
        >
          AI-POWERED FINANCIAL OPERATIONS PLATFORM
        </div>

        <p style={{ fontSize: 9.5, color: "#3A2A1A", lineHeight: 1.5, marginBottom: 8 }}>
          <strong>The Problem:</strong> Financial close, multi-currency ledger reconciliation, and treasury compliance require audit-grade precision. Traditional LLMs hallucinate numbers and lack deterministic verification gates.
        </p>

        <p style={{ fontSize: 9.5, color: "#3A2A1A", lineHeight: 1.5, marginBottom: 8 }}>
          <strong>The Solution:</strong> An autonomous multi-agent operational platform with a deterministic policy engine, double-entry invariance checker, and automated discrepancy resolution.
        </p>

        {/* Benchmarks */}
        <div
          style={{
            background: "rgba(196,32,32,0.06)",
            border: "1px solid rgba(196,32,32,0.22)",
            borderRadius: 3,
            padding: "5px 8px",
          }}
        >
          <div className="font-mono-tech" style={{ fontSize: 7, color: "#C42020", fontWeight: 700 }}>
            AUDIT BENCHMARKS:
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <div>
              <div className="font-mono-tech" style={{ fontSize: 11, fontWeight: 800, color: "#1E1208" }}>99.8%</div>
              <div className="font-mono-tech" style={{ fontSize: 6.5, color: "#6E5840" }}>PRECISION</div>
            </div>
            <div>
              <div className="font-mono-tech" style={{ fontSize: 11, fontWeight: 800, color: "#1E1208" }}>&lt;48ms</div>
              <div className="font-mono-tech" style={{ fontSize: 6.5, color: "#6E5840" }}>LATENCY</div>
            </div>
            <div>
              <div className="font-mono-tech" style={{ fontSize: 11, fontWeight: 800, color: "#1E1208" }}>100%</div>
              <div className="font-mono-tech" style={{ fontSize: 6.5, color: "#6E5840" }}>AUDIT TRAIL</div>
            </div>
          </div>
        </div>
      </div>
    </PagePaper>
  );
}

function S1WorkRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={4} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / ARCHITECTURE &amp; STACK
      </div>

      {/* Architecture diagram */}
      <div
        style={{
          border: "1px dashed rgba(110,80,45,0.45)",
          background: "rgba(255,255,255,0.45)",
          borderRadius: 3,
          padding: "6px 8px",
          marginBottom: 8,
        }}
      >
        <div className="font-mono-tech" style={{ fontSize: 7, color: "#8A6030", marginBottom: 4 }}>
          SYSTEM FLOW:
        </div>
        <div
          className="font-mono-tech"
          style={{ fontSize: 7, color: "#2E2010", lineHeight: 1.4 }}
        >
          Inbound Statements → OCR/Parser → LangGraph Controller → Policy Engine → Double-Entry Ledger → Verification Gate
        </div>
      </div>

      <div
        className="font-mono-tech"
        style={{ fontSize: 7, color: "#6A5030", letterSpacing: "0.10em", marginBottom: 4 }}
      >
        TECHNOLOGY STACK:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 8 }}>
        {["Python", "FastAPI", "LangGraph", "PostgreSQL", "Next.js", "Docker", "Prisma"].map((t) => (
          <span
            key={t}
            className="font-mono-tech"
            style={{
              fontSize: 6.5,
              background: "#1E1408",
              color: "#EDE4CC",
              padding: "2px 5px",
              borderRadius: 2,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#9A3020", marginBottom: 8 }}>
        * Deterministic verification wraps stochastic LLM outputs.
      </div>

      <a
        href="https://github.com/TakshSehrawat"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono-tech"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 8,
          fontWeight: 700,
          color: "#181008",
          textDecoration: "underline",
        }}
      >
        VIEW REPOSITORY ON GITHUB ↗
      </a>
    </PagePaper>
  );
}

/** ── SPREAD 2: 03 LAB (EXPERIMENTS) ── */
function S2LabLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={5} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#2D8A5A", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          03 // ENGINEERING LAB
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            color: "#181008",
            marginBottom: 6,
          }}
        >
          Active Experiments
        </div>

        {/* Experiment 021 */}
        <div
          style={{
            border: "1px solid rgba(120,90,50,0.3)",
            background: "rgba(255,255,255,0.4)",
            borderRadius: 3,
            padding: "6px 8px",
            marginBottom: 7,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="font-mono-tech" style={{ fontSize: 7.5, fontWeight: 700, color: "#2D8A5A" }}>
              #021 // CONCURRENT DAG EXECUTION
            </span>
            <span className="font-mono-tech" style={{ fontSize: 6.5, color: "#8A7050" }}>[ IN PROGRESS ]</span>
          </div>
          <p style={{ fontSize: 8.5, color: "#2E2010", marginTop: 3, lineHeight: 1.4 }}>
            Decomposing complex queries into parallel DAG sub-tasks via topological sort scheduler. Result: 67% latency reduction (94s → 31s).
          </p>
        </div>

        {/* Experiment 020 */}
        <div
          style={{
            border: "1px solid rgba(120,90,50,0.3)",
            background: "rgba(255,255,255,0.4)",
            borderRadius: 3,
            padding: "6px 8px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="font-mono-tech" style={{ fontSize: 7.5, fontWeight: 700, color: "#C8A050" }}>
              #020 // ZERO-LATENCY AUDIO BUFFERING
            </span>
            <span className="font-mono-tech" style={{ fontSize: 6.5, color: "#2D8A5A" }}>[ COMPLETED ]</span>
          </div>
          <p style={{ fontSize: 8.5, color: "#2E2010", marginTop: 3, lineHeight: 1.4 }}>
            Chunking inbound PCM audio into 80ms sliding windows with Silero-VAD barge-in interruption. Latency dropped to 118ms.
          </p>
        </div>
      </div>
    </PagePaper>
  );
}

function S2LabRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={6} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / LAB OBSERVATIONS
      </div>

      {/* Experiment 019 */}
      <div
        style={{
          border: "1px solid rgba(120,90,50,0.3)",
          background: "rgba(255,255,255,0.4)",
          borderRadius: 3,
          padding: "6px 8px",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="font-mono-tech" style={{ fontSize: 7.5, fontWeight: 700, color: "#C42020" }}>
            #019 // HYBRID BM25 + PGVECTOR
          </span>
          <span className="font-mono-tech" style={{ fontSize: 6.5, color: "#2D8A5A" }}>[ VERIFIED ]</span>
        </div>
        <p style={{ fontSize: 8.5, color: "#2E2010", marginTop: 3, lineHeight: 1.4 }}>
          Dense vectors fail on exact serial codes &amp; part numbers. Combining BM25 keyword matching with pgvector via reciprocal rank fusion yielded 98.4% domain recall.
        </p>
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#8A5820", marginBottom: 10 }}>
        * &quot;I treat software as an empirical science: formulating hypotheses, profiling allocations, and logging breakthroughs and dead-ends.&quot;
      </div>

      <div
        className="font-mono-tech"
        style={{ fontSize: 7, color: "#6A5030", letterSpacing: "0.08em" }}
      >
        STATUS: ACTIVELY EXPERIMENTING &amp; SHIPPING
      </div>
    </PagePaper>
  );
}

/** ── SPREAD 3: 04 NOTES (ENGINEERING JOURNAL) ── */
function S3NotesLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={7} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#8A6820", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          04 // ENGINEERING NOTES
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            color: "#181008",
            marginBottom: 6,
          }}
        >
          Attention &amp; KV Cache Mechanics
        </div>
        <div
          className="font-mono-tech"
          style={{ fontSize: 7, color: "#8A7050", marginBottom: 8 }}
        >
          MEMORY BANDWIDTH VS. COMPUTE THROUGHPUT
        </div>

        <p style={{ fontSize: 9, color: "#3A2A1A", lineHeight: 1.5, marginBottom: 7 }}>
          During the Prefill phase, all prompt tokens are processed concurrently via parallel GEMM, saturating GPU tensor cores.
        </p>
        <p style={{ fontSize: 9, color: "#3A2A1A", lineHeight: 1.5, marginBottom: 8 }}>
          During Decoding, tokens are generated one by one. Query is a single vector, while Key/Value projections of all previous tokens must be repeatedly fetched from HBM. The system becomes <strong>memory bandwidth bound</strong>.
        </p>

        <div
          style={{
            background: "rgba(0,0,0,0.05)",
            padding: "5px 7px",
            borderLeft: "2px solid #C8A050",
            fontSize: 7.5,
            fontFamily: "monospace",
            color: "#2E2010",
          }}
        >
          Memory_KV = 2 × batch × seq × layers × heads × dim
        </div>
      </div>
    </PagePaper>
  );
}

function S3NotesRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={8} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / CODE ARCHITECTURE
      </div>

      {/* Code Snippet */}
      <div
        style={{
          background: "#16120C",
          borderRadius: 3,
          padding: "7px 8px",
          color: "#EDE4CC",
          fontFamily: "monospace",
          fontSize: 7.5,
          lineHeight: 1.45,
          marginBottom: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ color: "#8A7050", fontSize: 6.5, marginBottom: 3 }}># KV Cache Forward Step</div>
        <div><span style={{ color: "#C8A050" }}>def</span> forward_step(q_t, k_cache, v_cache):</div>
        <div>&nbsp;&nbsp;k_cache.append(new_k)</div>
        <div>&nbsp;&nbsp;scores = (q_t @ k_cache.T) / sqrt(d)</div>
        <div>&nbsp;&nbsp;<span style={{ color: "#C8A050" }}>return</span> softmax(scores) @ v_cache</div>
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#C42020", marginBottom: 8 }}>
        * Key takeaway: Paged attention eliminates 96% of memory fragmentation.
      </div>

      <p style={{ fontSize: 8.5, color: "#3A2A1A", lineHeight: 1.45 }}>
        Understanding the physical hardware realities under the hood distinguishes genuine systems engineers from superficial wrapper builders.
      </p>
    </PagePaper>
  );
}

/** ── SPREAD 4: 05 STACK (TECHNICAL MATRIX) ── */
function S4StackLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={9} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          05 // TECHNICAL STACK
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            color: "#181008",
            marginBottom: 8,
          }}
        >
          Languages &amp; AI Core
        </div>

        {/* Languages */}
        <div style={{ marginBottom: 9 }}>
          <div className="font-mono-tech" style={{ fontSize: 7, color: "#8A6820", letterSpacing: "0.10em", marginBottom: 4 }}>
            LANGUAGES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {["Python", "TypeScript", "JavaScript", "SQL"].map((lang) => (
              <span
                key={lang}
                className="font-mono-tech"
                style={{
                  fontSize: 7,
                  background: "#1E1408",
                  color: "#EDE4CC",
                  padding: "2px 6px",
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* AI & ML */}
        <div>
          <div className="font-mono-tech" style={{ fontSize: 7, color: "#8A6820", letterSpacing: "0.10em", marginBottom: 4 }}>
            AI &amp; MACHINE LEARNING
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {["LLMs", "AI Agents", "RAG Pipelines", "PyTorch", "LangGraph", "FastAPI", "Ollama"].map((item) => (
              <span
                key={item}
                className="font-mono-tech"
                style={{
                  fontSize: 7,
                  background: "rgba(18,12,4,0.09)",
                  color: "#181008",
                  border: "1px solid rgba(110,80,45,0.3)",
                  padding: "2px 6px",
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PagePaper>
  );
}

function S4StackRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={10} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / FRAMEWORKS &amp; INFRASTRUCTURE
      </div>

      {/* Frameworks */}
      <div style={{ marginBottom: 9 }}>
        <div className="font-mono-tech" style={{ fontSize: 7, color: "#8A6820", letterSpacing: "0.10em", marginBottom: 4 }}>
          FRAMEWORKS &amp; RUNTIMES
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {["Next.js (App Router)", "React 19", "FastAPI", "Node.js", "Tailwind CSS"].map((f) => (
            <span
              key={f}
              className="font-mono-tech"
              style={{
                fontSize: 7,
                background: "#1E1408",
                color: "#EDE4CC",
                padding: "2px 6px",
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Infrastructure */}
      <div style={{ marginBottom: 10 }}>
        <div className="font-mono-tech" style={{ fontSize: 7, color: "#8A6820", letterSpacing: "0.10em", marginBottom: 4 }}>
          INFRASTRUCTURE &amp; DATA
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {["PostgreSQL", "Prisma", "Docker", "Git", "Redis", "Linux"].map((infra) => (
            <span
              key={infra}
              className="font-mono-tech"
              style={{
                fontSize: 7,
                background: "rgba(18,12,4,0.09)",
                color: "#181008",
                border: "1px solid rgba(110,80,45,0.3)",
                padding: "2px 6px",
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              {infra}
            </span>
          ))}
        </div>
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#7A5030" }}>
        * Tools are verified in production. No invented expertise.
      </div>
    </PagePaper>
  );
}

/** ── SPREAD 5: 06 JOURNEY (MILESTONES) ── */
function S5JourneyLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={11} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          06 // JOURNEY
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            color: "#181008",
            marginBottom: 8,
          }}
        >
          Engineering Progression
        </div>

        {/* Milestones */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ borderLeft: "2px solid #C8A050", paddingLeft: 7 }}>
            <div className="font-mono-tech" style={{ fontSize: 8, fontWeight: 700, color: "#181008" }}>
              2026 // TAKSH.OS &amp; AUTONOMOUS ARCHITECTURES
            </div>
            <p style={{ fontSize: 8, color: "#4A3820", marginTop: 2, lineHeight: 1.4 }}>
              Designed tactile engineering notebook OS; developed multi-agent DAG scheduler and zero-latency audio streaming barge-in.
            </p>
          </div>

          <div style={{ borderLeft: "2px solid #2D8A5A", paddingLeft: 7 }}>
            <div className="font-mono-tech" style={{ fontSize: 8, fontWeight: 700, color: "#181008" }}>
              2026 // TATVAM CHATBOT &amp; EDGE AI
            </div>
            <p style={{ fontSize: 8, color: "#4A3820", marginTop: 2, lineHeight: 1.4 }}>
              Shipped production hybrid BM25+vector RAG engine with sub-200ms latency and edge CV attendance verification.
            </p>
          </div>
        </div>
      </div>
    </PagePaper>
  );
}

function S5JourneyRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={12} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / INFLECTION POINTS
      </div>

      <div style={{ borderLeft: "2px solid #C42020", paddingLeft: 7, marginBottom: 8 }}>
        <div className="font-mono-tech" style={{ fontSize: 8, fontWeight: 700, color: "#181008" }}>
          2025 // SYSTEMS FOUNDATIONS &amp; APIS
        </div>
        <p style={{ fontSize: 8, color: "#4A3820", marginTop: 2, lineHeight: 1.4 }}>
          Deepened focus into memory bandwidth bottlenecks, asynchronous event loops, PostgreSQL indexing, and full-stack TypeScript.
        </p>
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#9A3020", marginBottom: 8 }}>
        * Progression is measured in depth of understanding, not buzzwords.
      </div>

      <p style={{ fontSize: 8.5, color: "#3E3020", lineHeight: 1.5 }}>
        Every project represents an empirical iteration: from toy scripts to robust, fault-tolerant production architectures.
      </p>
    </PagePaper>
  );
}

/** ── SPREAD 6: 07 ABOUT (PHILOSOPHY) ── */
function S6AboutLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={13} lampBrightness={lb}>
      <div style={{ paddingLeft: 12 }}>
        <div
          className="font-mono-tech"
          style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 3 }}
        >
          07 // ABOUT
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Georgia, serif",
            color: "#181008",
            marginBottom: 8,
          }}
        >
          Personal Statement
        </div>

        <p style={{ fontSize: 9.5, color: "#2E2010", lineHeight: 1.6, marginBottom: 8 }}>
          <strong>I build things.</strong>
        </p>
        <p style={{ fontSize: 9, color: "#3A2A1A", lineHeight: 1.55, marginBottom: 8 }}>
          I like understanding how systems work, breaking them apart, and rebuilding them better.
        </p>
        <p style={{ fontSize: 9, color: "#3A2A1A", lineHeight: 1.55 }}>
          My focus is mechanical sympathy — understanding memory bandwidth, computation graphs, and OS syscalls before accepting superficial abstractions.
        </p>
      </div>
    </PagePaper>
  );
}

function S6AboutRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={14} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / CORE PRINCIPLES
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
        {[
          { title: "First-Principles Deconstruction", desc: "Understand hardware & mathematical realities before abstractions." },
          { title: "Honest Experimentation", desc: "Logging failed dead-ends is as valuable as celebrating benchmarks." },
          { title: "Deterministic Boundaries", desc: "Enclose stochastic models within strict typed state machines." },
          { title: "Minimalism & Tactile Craft", desc: "Every byte and UI element must serve an explicit engineering purpose." },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              borderLeft: "2px solid #C8A050",
              paddingLeft: 6,
              background: "rgba(255,255,255,0.3)",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <div className="font-mono-tech" style={{ fontSize: 7.5, fontWeight: 700, color: "#181008" }}>
              {item.title}
            </div>
            <div style={{ fontSize: 6.8, color: "#6A5030" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </PagePaper>
  );
}

/** ── SPREAD 7: 08 CONTACT (TRANSMISSION) ── */
function S7ContactLeft({ lb }: { lb: number }) {
  return (
    <PagePaper side="left" pageNum={15} lampBrightness={lb}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingLeft: 12,
        }}
      >
        <div>
          <div
            className="font-mono-tech"
            style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 3 }}
          >
            08 // CONTACT
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              fontFamily: "Georgia, serif",
              color: "#181008",
              marginBottom: 8,
            }}
          >
            LET&apos;S BUILD.
          </div>
          <p style={{ fontSize: 9.5, color: "#3A2A1A", lineHeight: 1.6 }}>
            Available for high-impact AI engineering roles, technical architecture, and autonomous systems development.
          </p>
        </div>

        <div>
          <div
            className="font-mono-tech"
            style={{ fontSize: 7, color: "#8A6030", letterSpacing: "0.10em" }}
          >
            VERIFIED TRANSMISSION:
          </div>
          <div
            className="font-mono-tech"
            style={{ fontSize: 8, fontWeight: 700, color: "#181008", marginTop: 2 }}
          >
            TS-ENGINEERING // ACTIVE
          </div>
          <div
            className="font-mono-tech"
            style={{ fontSize: 6.5, color: "#B0A080", marginTop: 2 }}
          >
            TAKSH.OS · WORKSTATION SESSION 2026
          </div>
        </div>
      </div>
    </PagePaper>
  );
}

function S7ContactRight({ lb }: { lb: number }) {
  return (
    <PagePaper side="right" pageNum={16} lampBrightness={lb}>
      <div
        className="font-mono-tech"
        style={{ fontSize: 8, color: "#6A5030", letterSpacing: "0.14em", marginBottom: 6 }}
      >
        &gt;_ / DIRECT CHANNELS
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
        <a
          href="https://github.com/TakshSehrawat"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-tech"
          style={{
            padding: "6px 10px",
            background: "#1E1408",
            color: "#EDE4CC",
            fontSize: 8,
            fontWeight: 700,
            textDecoration: "none",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>GITHUB</span>
          <span>github.com/TakshSehrawat ↗</span>
        </a>

        <a
          href="https://linkedin.com/in/takshsehrawat"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-tech"
          style={{
            padding: "6px 10px",
            background: "#1E1408",
            color: "#EDE4CC",
            fontSize: 8,
            fontWeight: 700,
            textDecoration: "none",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>LINKEDIN</span>
          <span>linkedin.com/in/takshsehrawat ↗</span>
        </a>

        <div
          className="font-mono-tech"
          style={{
            padding: "6px 10px",
            background: "rgba(18,12,4,0.08)",
            color: "#1E1408",
            fontSize: 8,
            fontWeight: 700,
            borderRadius: 2,
            border: "1px dashed rgba(110,80,45,0.4)",
          }}
        >
          LOCATION: INDIA · REMOTE GLOBAL
        </div>
      </div>

      <div className="font-handwritten" style={{ fontSize: 13, color: "#7A5030" }}>
        * Send messages or project briefs via GitHub / LinkedIn.
      </div>
    </PagePaper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIARY ROOT EXPORT (8 SPREADS)
// ─────────────────────────────────────────────────────────────────────────────

const SPREAD_COUNT = 8;
const PAGE_W = 295;
const BINDING_W = 24;
const NB_W = PAGE_W * 2 + BINDING_W; // 614px
const NB_H = 415;

export function Notebook({
  lampBrightness = 0.5,
  currentSpread: controlledSpread,
  onSpreadChange,
}: NotebookProps) {
  const [internalSpread, setInternalSpread] = useState(0);
  const spread = controlledSpread !== undefined ? controlledSpread : internalSpread;

  const [flipping, setFlipping] = useState<"forward" | "backward" | null>(null);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (targetSpread: number) => {
      const next = Math.max(0, Math.min(SPREAD_COUNT - 1, targetSpread));
      if (next === spread) return;

      const dir = next > spread ? "forward" : "backward";
      setFlipping(dir);

      if (flipTimer.current) clearTimeout(flipTimer.current);
      flipTimer.current = setTimeout(() => {
        setInternalSpread(next);
        onSpreadChange?.(next);
        setFlipping(null);
      }, 480);
    },
    [spread, onSpreadChange]
  );

  useEffect(() => {
    return () => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, []);

  const lb = lampBrightness;

  // 8 Spreads mapping to 8 OS Modules
  const spreads = [
    { left: <S0HomeLeft lb={lb} />, right: <S0HomeRight lb={lb} onExplore={() => go(1)} /> },
    { left: <S1WorkLeft lb={lb} />, right: <S1WorkRight lb={lb} /> },
    { left: <S2LabLeft lb={lb} />, right: <S2LabRight lb={lb} /> },
    { left: <S3NotesLeft lb={lb} />, right: <S3NotesRight lb={lb} /> },
    { left: <S4StackLeft lb={lb} />, right: <S4StackRight lb={lb} /> },
    { left: <S5JourneyLeft lb={lb} />, right: <S5JourneyRight lb={lb} /> },
    { left: <S6AboutLeft lb={lb} />, right: <S6AboutRight lb={lb} /> },
    { left: <S7ContactLeft lb={lb} />, right: <S7ContactRight lb={lb} /> },
  ];

  return (
    <div
      style={{
        width: NB_W,
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* ── Outer Physical Book Construction (Leather cover rim & page stack edges) ── */}
      <div
        style={{
          width: NB_W,
          height: NB_H,
          position: "relative",
          display: "flex",
          borderRadius: 4,
          background: "#14100D",
          padding: 3,
          boxShadow:
            "0 22px 50px rgba(0,0,0,0.92), 0 8px 20px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Left Page Stack ── */}
        <div
          style={{
            width: PAGE_W,
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "3px 0 0 3px",
          }}
        >
          {/* Stacked page edges on the left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 3,
              bottom: 3,
              display: "flex",
              gap: 1,
              zIndex: 20,
            }}
          >
            <div style={{ width: 1.5, background: "#B4A060", opacity: 0.35 }} />
            <div style={{ width: 1.5, background: "#C0B070", opacity: 0.6 }} />
            <div style={{ width: 1.5, background: "#CEC08A", opacity: 0.9 }} />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
            className={flipping === "backward" ? "page-flip-backward" : undefined}
          >
            {spreads[spread].left}
          </div>
        </div>

        {/* ── Center Spine / Spiral Binding ── */}
        <div
          style={{
            width: BINDING_W,
            height: "100%",
            background:
              "linear-gradient(90deg, #18120B 0%, #2A1E14 45%, #18120B 100%)",
            boxShadow:
              "inset -3px 0 8px rgba(0,0,0,0.7), inset 3px 0 8px rgba(0,0,0,0.7)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            zIndex: 25,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 7,
                borderRadius: 4,
                background:
                  "linear-gradient(180deg, #B58A38 0%, #5E4014 60%, #1A1005 100%)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.85)",
                border: "0.5px solid rgba(255,230,120,0.25)",
              }}
            />
          ))}
        </div>

        {/* ── Right Page Stack ── */}
        <div
          style={{
            width: PAGE_W,
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "0 3px 3px 0",
          }}
        >
          {/* Stacked page edges on the right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 0,
              top: 3,
              bottom: 3,
              display: "flex",
              gap: 1,
              zIndex: 20,
            }}
          >
            <div style={{ width: 1.5, background: "#CEC08A", opacity: 0.9 }} />
            <div style={{ width: 1.5, background: "#C0B070", opacity: 0.6 }} />
            <div style={{ width: 1.5, background: "#B4A060", opacity: 0.35 }} />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
            }}
            className={flipping === "forward" ? "page-flip-forward" : undefined}
          >
            {spreads[spread].right}
          </div>
        </div>
      </div>

      {/* ── Bottom Spread Navigator ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 8,
        }}
      >
        <button
          onClick={() => go(spread - 1)}
          disabled={spread === 0 || flipping !== null}
          aria-label="Previous page"
          style={{
            background: "none",
            border: "none",
            cursor: spread > 0 ? "pointer" : "not-allowed",
            color: spread > 0 ? "rgba(200,160,80,0.85)" : "rgba(100,80,40,0.35)",
            fontSize: 16,
            lineHeight: 1,
            padding: "2px 8px",
            transition: "color 150ms",
          }}
        >
          ←
        </button>

        <div
          className="font-mono-tech"
          style={{
            fontSize: 8.5,
            color: "rgba(150,130,95,0.75)",
            letterSpacing: "0.12em",
          }}
        >
          SECTION {String(spread + 1).padStart(2, "0")} / 08 · P. {String(spread * 2 + 1).padStart(2, "0")}–{String(spread * 2 + 2).padStart(2, "0")}
        </div>

        <button
          onClick={() => go(spread + 1)}
          disabled={spread >= SPREAD_COUNT - 1 || flipping !== null}
          aria-label="Next page"
          style={{
            background: "none",
            border: "none",
            cursor: spread < SPREAD_COUNT - 1 ? "pointer" : "not-allowed",
            color:
              spread < SPREAD_COUNT - 1
                ? "rgba(200,160,80,0.85)"
                : "rgba(100,80,40,0.35)",
            fontSize: 16,
            lineHeight: 1,
            padding: "2px 8px",
            transition: "color 150ms",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
