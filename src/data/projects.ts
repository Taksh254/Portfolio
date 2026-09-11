export interface ProjectArchitectureStep {
  id: string;
  label: string;
  sublabel?: string;
  type?: "input" | "process" | "storage" | "ai" | "output";
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  status: "live" | "building" | "operational" | "archived";
  summary: string;
  objective: string;
  architecture: {
    overview: string;
    flow: string[];
    steps: ProjectArchitectureStep[];
  };
  stack: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  terminalCommand?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "tatvam-chatbot",
    number: "01",
    title: "Tatvam Chatbot",
    category: "Conversational AI & Knowledge Retrieval",
    year: "2026",
    status: "live",
    summary: "Conversational AI system with memory & context",
    objective:
      "Build a conversational intelligence engine that maintains meaningful context across long-horizon dialogues while minimizing hallucination via hybrid lexical-semantic vector indexing.",
    architecture: {
      overview:
        "Bi-directional pipeline orchestrating semantic chunking, embedding generation, reranking, and streaming LLM token generation with optimistic client state.",
      flow: [
        "USER PROMPT",
        "CONTEXT RETRIEVER",
        "RERANKING ENGINE",
        "LLM INFERENCE",
        "STREAMING RESPONSE",
      ],
      steps: [
        { id: "s1", label: "USER INPUT", sublabel: "Next.js UI / WebSocket", type: "input" },
        { id: "s2", label: "API GATEWAY", sublabel: "FastAPI / Rate Limiting", type: "process" },
        { id: "s3", label: "HYBRID RETRIEVER", sublabel: "Supabase pgvector + BM25", type: "storage" },
        { id: "s4", label: "LLM ORCHESTRATOR", sublabel: "Llama 3.3 / Claude 3.5", type: "ai" },
        { id: "s5", label: "CLIENT RENDER", sublabel: "Markdown & LaTeX Stream", type: "output" },
      ],
    },
    stack: ["React 19", "Next.js", "Python", "FastAPI", "Supabase pgvector", "Anthropic API", "Tailwind CSS"],
    metrics: [
      { label: "TTFT (Time to First Token)", value: "180ms" },
      { label: "Retrieval Accuracy (Recall@5)", value: "94.2%" },
      { label: "Active Context Window", value: "32k Tokens" },
    ],
    highlights: [
      "Custom sliding-window memory buffer that persists user intent across conversational tangents.",
      "Optimized vector search with sub-50ms query latency using HNSW indexing in pgvector.",
      "Streaming markdown & code execution sandbox for mathematical and procedural answers.",
    ],
    githubUrl: "https://github.com/Taksh254/tatvam-chatbot",
    demoUrl: "https://tatvam.taksh.dev",
    terminalCommand: "run tatvam --mode=interactive",
  },
  {
    id: "autonomous-research-agent",
    number: "02",
    title: "Research Agent",
    category: "Autonomous Multi-Agent Systems",
    year: "2026",
    status: "building",
    summary: "Autonomous agent for web research & report generation",
    objective:
      "Automate literature reviews and technical deep-dives by coordinating specialized agents for scraping, critical analysis, claim verification, and synthesis.",
    architecture: {
      overview:
        "Hierarchical multi-agent coordinator using DAG execution paths with automated critique-and-refinement loops.",
      flow: [
        "TASK SPEC",
        "PLANNER AGENT",
        "WEB SCRAPING CLUSTER",
        "VERIFICATION AGENT",
        "MARKDOWN DOSSIER",
      ],
      steps: [
        { id: "r1", label: "RESEARCH GOAL", sublabel: "Natural Language Prompt", type: "input" },
        { id: "r2", label: "DAG PLANNER", sublabel: "LangGraph Topological Scheduler", type: "process" },
        { id: "r3", label: "PARALLEL CRAWLERS", sublabel: "Playwright Cluster / Firecrawl", type: "storage" },
        { id: "r4", label: "SYNTHESIS LLM", sublabel: "Context Aggregation & Citations", type: "ai" },
        { id: "r5", label: "OUTPUT DOSSIER", sublabel: "Structured Research Paper", type: "output" },
      ],
    },
    stack: ["Python 3.12", "LangGraph", "AsyncIO", "Playwright", "FastAPI", "PostgreSQL"],
    metrics: [
      { label: "DAG Parallel Speedup", value: "3.03x" },
      { label: "Citation Verification Rate", value: "99.1%" },
      { label: "Avg Synthesis Time", value: "31.2s" },
    ],
    highlights: [
      "Dynamic task decomposition breaking broad research prompts into directed acyclic dependency graphs.",
      "Strict schema verification preventing hallucinations in citations and empirical claims.",
      "Asynchronous parallel crawling yielding 3.03x speedup over sequential pipelines.",
    ],
    githubUrl: "https://github.com/Taksh254/research-agent-core",
    terminalCommand: "research --query='Attention mechanisms in modern transformers' --depth=deep",
  },
  {
    id: "smart-attendance",
    number: "03",
    title: "Attendance System",
    category: "Computer Vision & Edge Automation",
    year: "2025",
    status: "live",
    summary: "Automation system using WhatsApp & Google Sheets",
    objective:
      "Provide a zero-friction anti-spoofing facial recognition attendance pipeline running on edge SBC hardware with automated WhatsApp notifications and Google Sheets syncing.",
    architecture: {
      overview:
        "Edge video stream pipeline performing face detection, active/passive liveness validation, embedding extraction, and automated webhook dispatch.",
      flow: [
        "RTSP CAMERA STREAM",
        "FACE DETECTION",
        "ANTI-SPOOFING MODEL",
        "EMBEDDING MATCHING",
        "GOOGLE SHEETS SYNC",
      ],
      steps: [
        { id: "a1", label: "CAMERA FEED", sublabel: "1080p RTSP Stream", type: "input" },
        { id: "a2", label: "EDGE INFERENCE", sublabel: "YOLOv8-Face (ONNX Runtime)", type: "ai" },
        { id: "a3", label: "LIVENESS CHECK", sublabel: "3D Mesh Depth & Texture Analysis", type: "process" },
        { id: "a4", label: "VECTOR MATCHER", sublabel: "Cosine Sim Against 512d Registry", type: "storage" },
        { id: "a5", label: "SHEETS & WHATSAPP", sublabel: "Twilio API & Google Sheets API", type: "output" },
      ],
    },
    stack: ["Python", "C++", "OpenCV", "ONNX Runtime", "Google Sheets API", "WhatsApp Twilio API", "Raspberry Pi 5"],
    metrics: [
      { label: "Inference Latency", value: "34ms/frame" },
      { label: "Anti-Spoofing Accuracy", value: "99.4%" },
      { label: "Power Draw", value: "7.5 Watts" },
    ],
    highlights: [
      "Embedded ONNX runtime with INT8 quantization running locally on 7.5W edge hardware.",
      "Anti-spoofing mechanism combining passive optical texture analysis with 3D mesh depth verification.",
      "Instant automated notification dispatch via WhatsApp API with live Google Sheets ledger sync.",
    ],
    githubUrl: "https://github.com/Taksh254/attendance-cv-edge",
    terminalCommand: "attendance-daemon --camera=0 --fps=30",
  },
  {
    id: "google-automation",
    number: "04",
    title: "Google Automation",
    category: "Workflow Automation & Cloud Runtimes",
    year: "2025",
    status: "building",
    summary: "End-to-end automation for expenses & reporting",
    objective:
      "Automate end-to-end multi-platform workflows for expense reconciliation, receipt parsing, invoice OCR, and automated Google Workspace reporting.",
    architecture: {
      overview:
        "Serverless event-driven architecture orchestrating email attachments, OCR extraction, schema normalisation, and Google Apps Script triggers.",
      flow: [
        "EMAIL INVOICE",
        "OCR PARSER",
        "LLM EXTRACTOR",
        "GOOGLE SHEETS LEDGER",
        "AUTOMATED REPORT",
      ],
      steps: [
        { id: "g1", label: "GMAIL TRIGGER", sublabel: "Webhook on incoming receipt", type: "input" },
        { id: "g2", label: "DOCUMENT OCR", sublabel: "Tesseract / Vision API", type: "process" },
        { id: "g3", label: "STRUCTURED JSON", sublabel: "Schema Validation", type: "ai" },
        { id: "g4", label: "DRIVE & SHEETS", sublabel: "Google Apps Script API", type: "storage" },
        { id: "g5", label: "PDF DIGEST", sublabel: "Automated Monthly Summary", type: "output" },
      ],
    },
    stack: ["TypeScript", "Node.js", "Google Apps Script", "Google Drive API", "FastAPI", "Docker"],
    metrics: [
      { label: "Processing Latency", value: "1.4s" },
      { label: "Extraction Accuracy", value: "99.7%" },
      { label: "Manual Effort Saved", value: "95%" },
    ],
    highlights: [
      "Zero-touch receipt and invoice categorization with automatic currency conversion and taxonomy tagging.",
      "Automatic reconciliation against bank export CSVs with anomaly and duplicate detection.",
      "Automated summary generation formatted into executive PDF digests.",
    ],
    githubUrl: "https://github.com/Taksh254/crawler-mesh",
    terminalCommand: "automate-expenses --sync=all --format=sheets",
  },
];
