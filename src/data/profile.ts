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
  version: "1.0",
  focus: ["AI SYSTEMS", "SOFTWARE ARCHITECTURE", "AUTOMATION"],
  location: "India / Remote",
  availability: "AVAILABLE FOR HIGH-IMPACT COLLABORATION",
  currently: {
    building: "Research Agent & Autonomous DAGs",
    learning: "Transformer Kernel Optimization (NEON/AVX)",
    exploring: "Multi-Agent Statecharts & Robotics SLAM",
    status: "ACTIVE",
  },
  narrative: [
    "I am a software engineer obsessed with how complex systems behave under the hood. My work spans artificial intelligence, low-latency software architecture, computer vision, and autonomous agent orchestration.",
    "I treat software development as an empirical engineering science: formulating hypotheses, running reproducible benchmarks, profiling memory allocations, and documenting both breakthroughs and failures in my technical logs.",
    "Rather than treating machine learning models as black boxes or glueing together fragile prompts, I focus on mechanical sympathy — understanding the memory bandwidth, graph execution, and hardware constraints that make modern systems fast and reliable.",
  ],
  principles: [
    {
      title: "First-Principles Deconstruction",
      description:
        "Understand the underlying mathematical and hardware realities (memory bandwidth, computation graphs, OS syscalls) before accepting layer abstractions.",
    },
    {
      title: "Honest Experimentation",
      description:
        "Documenting failed experiments and dead-ends is just as valuable as celebrating successful benchmarks. The engineering notebook is a record of reasoning.",
    },
    {
      title: "Deterministic Boundaries for Stochastic Models",
      description:
        "AI agents must be enclosed inside strict finite state machines, typed schemas, and automated verification loops to be production-ready.",
    },
    {
      title: "Minimalism & Tactile Craft",
      description:
        "Every byte, millisecond, and UI element should have an explicit purpose. Software should feel crisp, responsive, and calm.",
    },
  ],
  toolchain: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "C++20", "Go (Golang)", "SQL", "Bash / Shell"],
    },
    {
      category: "AI & Machine Learning",
      items: ["PyTorch", "LangGraph", "FastAPI", "OpenCV", "pgvector", "Ollama / DeepSeek", "Hugging Face"],
    },
    {
      category: "Web & Runtime",
      items: ["Next.js (App Router)", "React 19", "Node.js", "Tailwind CSS", "Framer Motion", "WebSockets"],
    },
    {
      category: "Systems & Infrastructure",
      items: ["Linux (Debian/Arch)", "Docker", "Git", "PostgreSQL", "Redis", "DuckDB", "Raspberry Pi / Embedded"],
    },
  ],
  timeline: [
    {
      year: "2026",
      title: "TAKSH.OS & Autonomous Research Architectures",
      description:
        "Built the Engineer's Notebook OS environment; implemented multi-agent DAG execution scheduler and real-time streaming audio pipeline.",
    },
    {
      year: "2026",
      title: "Tatvam Chatbot & Edge CV Attendance",
      description:
        "Deployed hybrid lexical-semantic RAG system with sub-180ms TTFT; engineered anti-spoofing edge facial recognition pipeline on low-power SBCs.",
    },
    {
      year: "2025",
      title: "Edge Tensor Engine & Quantization Kernels",
      description:
        "Wrote custom C++ 4-bit quantization memory allocator and SIMD dot product kernels for transformer inference on ARM64.",
    },
    {
      year: "2025",
      title: "Distributed Crawler Mesh",
      description:
        "Engineered fault-tolerant web crawler cluster using Go, consistent hash ring domain partitioning, and Kafka streams.",
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
      url: "mailto:taksh.sehrawat.dev@gmail.com",
      handle: "taksh.sehrawat.dev@gmail.com",
    },
    {
      label: "X (Twitter)",
      url: "https://x.com/TSehrawat49611",
      handle: "@TSehrawat49611",
    },
  ],
};
