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
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  terminalCommand?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "finova",
    number: "01",
    title: "Finova",
    category: "FinTech / Reconciliation Engine",
    year: "2026",
    status: "building",
    summary: "Deterministic payout reconciliation platform for finance controllers",
    objective:
      "Build a finance-operations platform anchored on Payout Truth — a deterministic engine that reconciles payment-gateway payouts against bank settlements, surfaces every mismatch, and keeps a human controller in the approval loop before anything is booked.",
    architecture: {
      overview:
        "Next.js App Router marketing site backed by a persisted PostgreSQL/Prisma reconciliation engine and a multi-stage Controller Workbench state machine for exception handling — no LLM ever touches the reconciliation arithmetic.",
      flow: [
        "PAYOUT INGEST",
        "RECONCILIATION ENGINE",
        "EXCEPTION QUEUE",
        "CONTROLLER WORKBENCH",
        "AUDIT TRAIL",
      ],
      steps: [
        { id: "f1", label: "PAYOUT INGEST", sublabel: "Gateway + Bank Settlement Data", type: "input" },
        { id: "f2", label: "RECONCILIATION ENGINE", sublabel: "Gross − Fees − Refunds − Taxes ± Adj", type: "process" },
        { id: "f3", label: "POSTGRES + PRISMA", sublabel: "WorkbenchRun / PayoutAuditLog", type: "storage" },
        { id: "f4", label: "CONTROLLER WORKBENCH", sublabel: "Investigate → Correct → Policy → Close", type: "process" },
        { id: "f5", label: "AUDIT LOG", sublabel: "Immutable WorkbenchAuditEvent Trail", type: "output" },
      ],
    },
    stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma ORM", "Recharts", "CSS Modules"],
    metrics: [
      { label: "Reconciliation Logic", value: "100% Deterministic" },
      { label: "Core Modules Live", value: "5 of 15 Routes" },
      { label: "Audit Trail", value: "Immutable Event Log" },
    ],
    highlights: [
      "Deterministic reconciliation engine computing Expected Net Payout = Gross − Fees − Refunds − Taxes ± Adjustments, with real arithmetic against Postgres-backed state.",
      "Multi-stage Controller Workbench state machine — Exception Queue → Investigation → Correction → Policy → Close Run → Audit — with every action persisted, not simulated.",
      "The README tracks feature status honestly: reconciliation, Payout Truth, Workbench, and Exceptions run against real data; remaining modules are explicitly marked as placeholders.",
    ],
    image: "/projects/finova.png",
    githubUrl: "https://github.com/Taksh254/Finova-",
    terminalCommand: "npm run db:push && npm run dev  # /payout-truth",
  },
  {
    id: "oryn",
    number: "02",
    title: "Oryn",
    category: "3D Data Visualization / Systems Tooling",
    year: "2026",
    status: "live",
    summary: "Local filesystem rendered as an explorable 3D cosmic universe",
    objective:
      "Turn a local filesystem into a navigable, cinematic 3D universe — folders become galaxy clusters and files become particles — driven by a live filesystem watcher instead of a static directory snapshot.",
    architecture: {
      overview:
        "A React Three Fiber front-end renders GPU-instanced particle clusters, backed by a Node.js server that watches the real filesystem and streams changes to the client in real time.",
      flow: [
        "LIVE FILE WATCH",
        "FILESYSTEM SERVICE",
        "PARTICLE RENDERER",
        "CAMERA ENGINE",
        "COSMIC UNIVERSE UI",
      ],
      steps: [
        { id: "o1", label: "LIVE FILE WATCH", sublabel: "WatcherService (Node fs.watch)", type: "input" },
        { id: "o2", label: "FILESYSTEM SERVICE", sublabel: "Directory Tree → Cluster Graph", type: "process" },
        { id: "o3", label: "PARTICLE RENDERER", sublabel: "React Three Fiber + Three.js", type: "storage" },
        { id: "o4", label: "CAMERA ENGINE", sublabel: "Cinematic Transitions & Minimap Sync", type: "process" },
        { id: "o5", label: "HOLO SIDEBAR", sublabel: "NeuralMinimap + Selection UI", type: "output" },
      ],
    },
    stack: ["React 19", "Three.js", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing", "Node.js", "Vite"],
    metrics: [
      { label: "Rendering Engine", value: "React Three Fiber" },
      { label: "Filesystem Sync", value: "Live fs.watch Stream" },
      { label: "Scene Modes", value: "Universe / Cluster / Galaxy" },
    ],
    highlights: [
      "Custom particle pipeline (ParticleRenderer, FileParticleSystem) maps real directory structures onto galaxy and globular clusters in 3D space.",
      "A dedicated Node backend (FilesystemService + WatcherService) keeps the 3D scene synced to live filesystem changes rather than a one-time import.",
      "Cinematic camera system (CameraEngine, TransitionManager, MinimapSync) paired with a neural minimap for orientation across large directory universes.",
    ],
    image: "/projects/oryn.png",
    githubUrl: "https://github.com/Taksh254/visual-file-manager",
    demoUrl: "https://oryn-puce.vercel.app",
    terminalCommand: "npm run server && npm run dev",
  },
  {
    id: "tiny-mind-play-school",
    number: "03",
    title: "Tiny Mind Play School",
    category: "Full-Stack Web Platform / EdTech",
    year: "2026",
    status: "live",
    summary: "Preschool website with role-based admin & parent dashboards",
    objective:
      "Build a full-featured preschool marketing site plus operational dashboards, so admins can manage students, fees, and announcements while parents track attendance and billing in real time.",
    architecture: {
      overview:
        "Next.js App Router site with Supabase-backed PostgreSQL (RLS + Auth) serving a public marketing site and two role-scoped dashboards behind middleware route protection.",
      flow: [
        "PUBLIC SITE",
        "SUPABASE AUTH",
        "ROLE MIDDLEWARE",
        "POSTGRES + RLS",
        "ADMIN / PARENT DASHBOARD",
      ],
      steps: [
        { id: "t1", label: "PUBLIC PAGES", sublabel: "Home, Programs, Admissions, Gallery", type: "input" },
        { id: "t2", label: "SUPABASE AUTH", sublabel: "Login / Signup + Demo Bypass", type: "process" },
        { id: "t3", label: "ROLE MIDDLEWARE", sublabel: "Admin vs Parent Route Guards", type: "process" },
        { id: "t4", label: "POSTGRES + RLS", sublabel: "8 Tables / 20 RLS Policies", type: "storage" },
        { id: "t5", label: "DASHBOARDS", sublabel: "Fees, Attendance, Announcements", type: "output" },
      ],
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase (Postgres + Auth + RLS)", "Framer Motion", "Radix UI"],
    metrics: [
      { label: "Database Tables", value: "8 w/ RLS" },
      { label: "RLS Policies", value: "20" },
      { label: "Source Size", value: "~8,900 LOC" },
    ],
    highlights: [
      "Role-based admin and parent dashboards sit behind middleware route protection, both reading and writing the same Supabase Postgres tables under 20 row-level-security policies.",
      "A dual-storage data layer falls back to seeded localStorage data when Supabase isn't configured, so the dashboards stay demoable offline.",
      "Printable fee receipts, a sortable/searchable DataTable, and a gesture-driven 3D dome gallery built with Framer Motion.",
    ],
    image: "/projects/school-web.png",
    githubUrl: "https://github.com/Taksh254/School-web",
    demoUrl: "https://school-web-ebon.vercel.app/",
    terminalCommand: "npm run dev  # /dashboard/admin",
  },
  {
    id: "edith-ai",
    number: "04",
    title: "EDITH AI",
    category: "Personal AI Assistant / Desktop Automation",
    year: "2026",
    status: "building",
    summary: "Local voice-driven AI assistant with a Stark-Industries-style HUD",
    objective:
      "Build a local, voice-controlled AI assistant — EDITH, 'Even Dead, I'm The Hero' — that runs system commands, holds conversational memory, and talks back through synthesized voice, fronted by a Stark-Industries-inspired HUD.",
    architecture: {
      overview:
        "A Python entry point orchestrates an Ollama-backed brain, speech I/O, and OS-level command execution, while a separate JS/HTML HUD renders live telemetry on top of it.",
      flow: [
        "VOICE INPUT",
        "OLLAMA BRAIN",
        "MEMORY STORE",
        "SYSTEM COMMANDS",
        "HUD + VOICE OUTPUT",
      ],
      steps: [
        { id: "e1", label: "VOICE INPUT", sublabel: "voice.py Speech Handling", type: "input" },
        { id: "e2", label: "OLLAMA BRAIN", sublabel: "brain.py Local LLM Integration", type: "ai" },
        { id: "e3", label: "MEMORY", sublabel: "memory.py Conversation History", type: "storage" },
        { id: "e4", label: "EDITH COMMANDS", sublabel: "edith_commands.py System Actions", type: "process" },
        { id: "e5", label: "STARK HUD", sublabel: "Telemetry + Synthesized Voice", type: "output" },
      ],
    },
    stack: ["Python", "Ollama", "JavaScript", "HTML/CSS", "Supabase"],
    metrics: [
      { label: "LLM Runtime", value: "Local via Ollama" },
      { label: "Interface", value: "Voice + HUD" },
    ],
    highlights: [
      "Runs entirely against a local Ollama model rather than a hosted API, keeping conversation and command execution on-device.",
      "Modular structure (brain, voice, memory, commands) separates LLM reasoning from speech I/O and OS-level actions.",
      "A Stark-Industries-styled HUD front-end layers on top of the assistant for live telemetry — the hosted web build shown here doesn't mount without its local backend running, so the card links to source rather than a live demo.",
    ],
    image: "/projects/edith-ai.png",
    githubUrl: "https://github.com/Taksh254/Edith-ai",
    terminalCommand: "python main.py",
  },
  {
    id: "beejmantra",
    number: "05",
    title: "BeejMantra",
    category: "AgriTech / AI Assistant (Team Fork)",
    year: "2026",
    status: "building",
    summary: "AI assistant for Indian farmers — crop diagnosis, market prices, schemes",
    objective:
      "Give Indian farmers one AI-powered assistant for crop-disease diagnosis, real-time mandi price analysis, government scheme navigation, and weather guidance, accessible in five Indian languages including Hindi, Kannada, Bengali, and Bhojpuri.",
    architecture: {
      overview:
        "Next.js App Router frontend with a Supabase-backed auth/data layer and Genkit-orchestrated Gemini flows powering the chatbot, crop-disease vision model, and market-price analysis.",
      flow: [
        "FARMER INPUT",
        "GENKIT AI FLOWS",
        "GEMINI 2.0 FLASH",
        "SUPABASE",
        "MULTILINGUAL DASHBOARD",
      ],
      steps: [
        { id: "b1", label: "FARMER INPUT", sublabel: "Voice, Photo, or Text Query", type: "input" },
        { id: "b2", label: "GENKIT AI FLOWS", sublabel: "Crop Doctor / Market Analyst / Schemes", type: "ai" },
        { id: "b3", label: "GEMINI 2.0 FLASH", sublabel: "Vision + Language Reasoning", type: "process" },
        { id: "b4", label: "SUPABASE", sublabel: "Auth + Postgres Profiles/Transactions", type: "storage" },
        { id: "b5", label: "5-LANGUAGE DASHBOARD", sublabel: "EN / HI / KN / BN / BHO", type: "output" },
      ],
    },
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Google Gemini AI", "Genkit"],
    metrics: [
      { label: "Languages Supported", value: "5" },
      { label: "Genkit AI Flows", value: "7+" },
      { label: "Dashboard Modules", value: "9" },
    ],
    highlights: [
      "Annapurna, a voice-and-text AI chatbot built on Genkit + Gemini, uses intent recognition to navigate the app on the farmer's behalf.",
      "Crop Doctor performs image-based disease diagnosis and returns localized treatment guidance rather than generic advice.",
      "Forked from Uppal-harsh/BeejMantra as part of a team build — run locally here for this screenshot since the project never got its own public deployment.",
    ],
    image: "/projects/beejmantra.png",
    githubUrl: "https://github.com/Taksh254/BeejMantra",
    terminalCommand: "npm run dev && npm run genkit:dev",
  },
];
