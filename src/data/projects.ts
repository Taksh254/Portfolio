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
    id: "bloomdesk",
    number: "01",
    title: "BloomDesk",
    category: "SaaS / Offline-First Mobile + Web",
    year: "2026",
    status: "live",
    summary: "Offline-first school app and website for play schools and daycares in India",
    objective:
      "Give small play schools, preschools and daycares one simple tool for attendance, children's records, fees and parent updates, built to keep working on a phone with patchy internet and to sync when it's back.",
    architecture: {
      overview:
        "A Capacitor Android staff app stores everything on the phone in IndexedDB and syncs through a hidden API on the Next.js website, which also runs the landing page, sign-up and Neighbours, a community where schools post and message each other.",
      flow: [
        "STAFF APP (OFFLINE)",
        "INDEXEDDB QUEUE",
        "SYNC API",
        "POSTGRES + PRISMA",
        "WEBSITE + NEIGHBOURS",
      ],
      steps: [
        { id: "bd1", label: "STAFF APP", sublabel: "Capacitor 8 + React 19 + Vite", type: "input" },
        { id: "bd2", label: "LOCAL STORE", sublabel: "IndexedDB, works offline", type: "storage" },
        { id: "bd3", label: "SYNC SERVER", sublabel: "/api/app login · school · changes · staff", type: "process" },
        { id: "bd4", label: "POSTGRES + PRISMA 7", sublabel: "Every table scoped by schoolId", type: "storage" },
        { id: "bd5", label: "WEBSITE", sublabel: "Landing, sign-up, Neighbours community", type: "output" },
      ],
    },
    stack: ["Next.js 16", "React 19", "Capacitor 8", "PostgreSQL", "Prisma 7", "Tailwind CSS v4", "Sentry", "Resend"],
    metrics: [
      { label: "Works Offline", value: "Phone-first sync" },
      { label: "Roles", value: "Owner / Admin / Teacher" },
      { label: "Backups", value: "Nightly, GPG-encrypted" },
    ],
    highlights: [
      "Offline-first staff app: attendance (P / A / L), children's profiles with Call and WhatsApp, fees with WhatsApp receipts, expenses, classes, homework and staff management, all saved on the phone and synced later.",
      "Own sign-in (bcrypt + database sessions) and strict school scoping in app code: another school's record always behaves as 'not found'.",
      "Shipped like a real product: Vercel deploys on every push with migrations on build, Sentry for errors, Resend for email, and a GitHub Actions job that dumps, encrypts and keeps the database for 30 days every night.",
    ],
    image: "/projects/bloomdesk.png",
    demoUrl: "https://bloom-desk-fl6l.vercel.app",
    terminalCommand: "npm run db:start && npm run dev",
  },
  {
    id: "grownova-os",
    number: "02",
    title: "GrowNova OS",
    category: "Internship / Backend Architecture",
    year: "2026",
    status: "building",
    summary: "Backend for a business operating system for Indian MSMEs (internship)",
    objective:
      "As a backend intern at GrowNova, build the API behind GrowNova OS, one system for an Indian small business's sales, CRM, GST invoicing, inventory, POS and accounts, phase by phase from an empty NestJS project.",
    architecture: {
      overview:
        "A NestJS 11 modular monolith on Prisma 7 and PostgreSQL, with Redis for refresh-token sessions and BullMQ jobs, Socket.IO for live events, shared Zod contracts with the React front end, and a tamper-evident audit log.",
      flow: [
        "API GATEWAY",
        "AUTH + RBAC",
        "DOMAIN MODULES",
        "POSTGRES + REDIS",
        "AUDIT CHAIN",
      ],
      steps: [
        { id: "g1", label: "NESTJS 11 API", sublabel: "Zod contracts + ValidationPipe + rate limits", type: "input" },
        { id: "g2", label: "AUTH + RBAC", sublabel: "JWT, Redis refresh tokens, tenant scoping", type: "process" },
        { id: "g3", label: "DOMAIN MODULES", sublabel: "CRM · GST invoices · Inventory · POS · Ledger", type: "process" },
        { id: "g4", label: "POSTGRES + REDIS", sublabel: "Prisma 7 · BullMQ · Socket.IO", type: "storage" },
        { id: "g5", label: "AUDIT LOG", sublabel: "SHA-256 hash chain, tamper detection", type: "output" },
      ],
    },
    stack: ["NestJS 11", "TypeScript", "Prisma 7", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "Zod"],
    metrics: [
      { label: "Phases Shipped", value: "0 → 12" },
      { label: "Audit Log", value: "SHA-256 hash chain" },
      { label: "My Branch", value: "40 commits" },
    ],
    highlights: [
      "Security foundation: JWT auth with Redis-backed refresh tokens and logout/revocation, a RolesGuard with tenant-scoped business APIs, global exception filter and rate limiting.",
      "Tamper-evident audit log where every entry carries the SHA-256 hash of the one before it, plus legacy data import from Excel and Tally XML for MSMEs moving off spreadsheets.",
      "Business modules: WhatsApp webhook → CRM leads with rule-based scoring and pipeline rules, per-financial-year GST invoice numbering, inventory with stock ledger, batches and expiry, POS with UPI and offline sync, and double-entry accounts that auto-post from sales.",
    ],
    image: "/projects/grownova.png",
    githubUrl: "https://github.com/kaniskoChakraborty/Grownova-0.1/tree/Taksh",
    terminalCommand: "docker compose up -d && npm run start:dev",
  },
  {
    id: "viral-shorts-clipper",
    number: "03",
    title: "Viral Shorts Clipper",
    category: "AI Video Pipeline / Local LLM",
    year: "2026",
    status: "operational",
    summary: "One YouTube link in, several captioned 9:16 Shorts out, picked by a local AI",
    objective:
      "Turn a long YouTube video into ready-to-post vertical Shorts of its best moments, with animated captions, titles and hashtags, and post or schedule them, all running free on a laptop.",
    architecture: {
      overview:
        "A Python pipeline reads YouTube's timed captions (or transcribes locally with Whisper), asks a local Qwen3 model through Ollama to score self-contained moments, downloads only those seconds, reframes to 9:16 and burns in captions with ffmpeg. A Flask web UI drives it and uploads through the YouTube API.",
      flow: [
        "YOUTUBE LINK",
        "TRANSCRIPT",
        "LLM MOMENT PICKER",
        "REFRAME + CAPTIONS",
        "POST / SCHEDULE",
      ],
      steps: [
        { id: "v1", label: "TRANSCRIPT", sublabel: "YouTube captions or faster-whisper", type: "input" },
        { id: "v2", label: "MOMENT PICKER", sublabel: "Qwen3 via Ollama, scored 1–10", type: "ai" },
        { id: "v3", label: "CLIP FETCH", sublabel: "yt-dlp, only the chosen seconds", type: "process" },
        { id: "v4", label: "RENDER", sublabel: "OpenCV face crop + ffmpeg captions", type: "process" },
        { id: "v5", label: "PUBLISH", sublabel: "YouTube Data API, multi-channel slots", type: "output" },
      ],
    },
    stack: ["Python", "Ollama (Qwen3)", "faster-whisper", "OpenCV", "ffmpeg", "yt-dlp", "Flask", "YouTube Data API"],
    metrics: [
      { label: "Cost to Run", value: "Free, local model" },
      { label: "Output", value: "Up to 4K, 60fps" },
      { label: "Clips per Video", value: "3–15, no overlaps" },
    ],
    highlights: [
      "Small local models only looked at the first minute when given a whole transcript, so the video is read in ~2.5-minute parts and the best moment of each is picked, keeping clips spread out and fast on a laptop CPU.",
      "Cut points snap to word boundaries; the frame follows a visible face or falls back to a blurred-background layout, and captions pop word by word with a 3-second hook banner.",
      "Web UI with live progress, editable titles and hashtags, several connected YouTube channels and scheduled posting slots. Claude is an optional paid upgrade.",
    ],
    image: "/projects/clipper.png",
    githubUrl: "https://github.com/Taksh254/Clipper-",
    terminalCommand: "./start.sh  # http://127.0.0.1:8000",
  },
  {
    id: "finova",
    number: "04",
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
    demoUrl: "https://finova-vert-alpha.vercel.app",
    terminalCommand: "npm run db:push && npm run dev  # /payout-truth",
  },
  {
    id: "oryn",
    number: "05",
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
    number: "06",
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
    id: "study-buddy",
    number: "07",
    title: "Study Buddy",
    category: "Local AI Tutor / RAG",
    year: "2026",
    status: "operational",
    summary: "Your study material library with a built-in tutor, offline and free",
    objective:
      "Keep all of a semester's PDFs, slides, notebooks and notes in one place, sorted automatically, and learn from them with a tutor that only teaches from your own material and says so when it can't find the answer.",
    architecture: {
      overview:
        "A Flask app stores files on disk and metadata in SQLite. A local Qwen3 model through Ollama sorts and summarizes each file, passages are embedded with nomic-embed-text, and the tutor answers from hybrid (meaning + keyword) search with page-level citations.",
      flow: [
        "UPLOAD",
        "AUTO-SORT + SUMMARY",
        "EMBEDDINGS",
        "HYBRID SEARCH",
        "TUTOR WITH CITATIONS",
      ],
      steps: [
        { id: "s1", label: "UPLOAD", sublabel: "PDF, DOCX, PPTX, notebooks, code", type: "input" },
        { id: "s2", label: "AUTO-SORT", sublabel: "Subject · type · unit · topics", type: "ai" },
        { id: "s3", label: "INDEX", sublabel: "nomic-embed-text + SQLite", type: "storage" },
        { id: "s4", label: "HYBRID SEARCH", sublabel: "Meaning + exact keywords", type: "process" },
        { id: "s5", label: "TUTOR", sublabel: "Answers cite file + page", type: "output" },
      ],
    },
    stack: ["Python", "Flask", "Ollama (Qwen3)", "nomic-embed-text", "SQLite", "JavaScript"],
    metrics: [
      { label: "Runs", value: "Offline, on-device" },
      { label: "Answers", value: "Cited to page/slide" },
    ],
    highlights: [
      "Every file is split into passages that remember their page or slide, so tutor answers carry [1], [2] citations you can click to read in context.",
      "If nothing in your material covers the question, the tutor says so first and labels any general explanation as beyond your notes.",
      "Lesson, quiz, simplify and exam-revision modes per file, per subject or across the whole library, plus a dashboard with study streaks.",
    ],
    image: "/projects/study-buddy.png",
    githubUrl: "https://github.com/Taksh254/Study_Buddy",
    terminalCommand: "./start.sh  # http://127.0.0.1:8001",
  },
  {
    id: "edith-ai",
    number: "08",
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
    number: "09",
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
