export const CONTACT_EMAIL = "takshsehrwat08@gmail.com";

/**
 * Builds a Gmail web-compose URL with the recipient prefilled, so the link
 * opens a real Gmail draft instead of relying on the visitor's local mail
 * client (which mailto: links depend on and often isn't configured).
 */
export function gmailComposeUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export interface ProfileData {
  name: string;
  version: string;
  focus: string[];
  location: string;
  availability: string;
  currently: {
    building: string;
    learning: string;
    exploring: string;
    status: string;
  };
  narrative: string[];
  mantra: string[];
  principles: {
    title: string;
    description: string;
  }[];
  toolchain: {
    category: string;
    items: string[];
  }[];
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
  links: {
    label: string;
    url: string;
    handle: string;
  }[];
}

export const PROFILE: ProfileData = {
  name: "Taksh Sehrawat",
  version: "1.1",
  focus: ["AI SYSTEMS", "BACKEND ARCHITECTURE", "AUTOMATION"],
  location: "Delhi, India / Remote",
  availability: "OPEN TO REMOTE INTERNSHIPS",
  currently: {
    building: "BloomDesk — offline-first app for play schools",
    learning: "Applied Machine Learning",
    exploring: "Local LLMs with Ollama",
    status: "ACTIVE",
  },
  narrative: [
    "I'm a B.Tech CSE (AI/ML) student at IILM University, Gurugram, and a backend intern at GrowNova, where I'm building GrowNova OS, a business operating system for Indian MSMEs, on NestJS, Prisma and PostgreSQL.",
    "Outside the internship I ship my own products end to end: BloomDesk, an offline-first Android app and website for play schools that is live on Vercel; a Viral Shorts Clipper that turns a YouTube video into ready-to-post Shorts; and Study Buddy, a local AI tutor that teaches from your own notes. Most of them run on local models through Ollama, so they stay free and private.",
    "Most of my learning happens at the workbench: I build, I break, I investigate, and I build again. The goal isn't simply to write more code, but to understand systems well enough to make things people actually use.",
  ],
  mantra: ["Think", "Build", "Break", "Understand", "Repeat"],
  principles: [
    {
      title: "First-Principles Deconstruction",
      description:
        "Understand what is really happening underneath (the database query, the network round-trip, the model's context window) before trusting an abstraction.",
    },
    {
      title: "Honest Experimentation",
      description:
        "Documenting failed experiments and dead-ends is just as valuable as celebrating the wins. My READMEs say plainly what works today and what is still a placeholder.",
    },
    {
      title: "Deterministic Boundaries for Stochastic Models",
      description:
        "Money, permissions and records stay in plain, tested code. AI suggests and enriches; it never does the arithmetic or decides who can see what.",
    },
    {
      title: "Offline-First, Privacy-First",
      description:
        "Software should keep working on a bad connection and keep people's data on their own device where it can. Local models over paid APIs whenever they're good enough.",
    },
  ],
  toolchain: [
    {
      category: "Languages",
      items: ["TypeScript", "Python", "JavaScript", "SQL", "Bash / Shell"],
    },
    {
      category: "Backend & Data",
      items: ["NestJS", "Node.js", "Prisma ORM", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "Flask", "Supabase"],
    },
    {
      category: "AI & Media",
      items: ["Ollama (Qwen3)", "Embeddings + Hybrid Search", "faster-whisper", "OpenCV", "ffmpeg", "Gemini / Genkit", "Claude API"],
    },
    {
      category: "Frontend, Mobile & Ops",
      items: ["Next.js", "React 19", "Tailwind CSS", "Capacitor (Android)", "Three.js / R3F", "Vercel", "Docker", "Linux (Fedora)", "Git / GitHub Actions"],
    },
  ],
  timeline: [
    {
      year: "2026",
      title: "Backend Intern — GrowNova (Remote)",
      description:
        "Aug 2026 – present. Building the GrowNova OS backend in NestJS 11, Prisma 7, PostgreSQL and Redis: JWT + refresh-token auth, RBAC and tenant scoping, a SHA-256 hash-chained audit log, WhatsApp-to-CRM leads, GST invoicing, inventory, POS with offline sync, and double-entry accounts.",
    },
    {
      year: "2026",
      title: "BloomDesk — live",
      description:
        "Offline-first Android staff app (Capacitor + IndexedDB) and Next.js website with a sync server, attendance, fees, homework and a community for schools. Deployed on Vercel with nightly encrypted database backups.",
    },
    {
      year: "2026",
      title: "Viral Shorts Clipper & Study Buddy",
      description:
        "Two local-AI tools on Ollama: one turns a YouTube video into captioned 9:16 Shorts and schedules them; the other is a study library with a tutor that cites your own notes.",
    },
    {
      year: "2026",
      title: "Automate India Hackathon (HackBriven)",
      description:
        "Built BeejMantra with my team, an AI assistant for Indian farmers in 5 languages, and presented it at Microsoft Office Noida.",
    },
    {
      year: "2024",
      title: "Started B.Tech CSE (AI/ML) — IILM University, Gurugram",
      description: "2024 – 2028 batch.",
    },
  ],
  links: [
    {
      label: "GitHub",
      url: "https://github.com/Taksh254",
      handle: "@Taksh254",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/taksh-sehrawat-6356bb2b9/",
      handle: "in/taksh-sehrawat",
    },
    {
      label: "Email",
      url: gmailComposeUrl(),
      handle: CONTACT_EMAIL,
    },
    {
      label: "X (Twitter)",
      url: "https://x.com/TSehrawat49611",
      handle: "@TSehrawat49611",
    },
  ],
};
