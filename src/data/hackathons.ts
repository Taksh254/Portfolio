export interface Hackathon {
  id: string;
  hackathonName: string;
  projectName: string;
  year: string;
  description: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

export const HACKATHONS: Hackathon[] = [
  {
    id: "hackathon-01",
    hackathonName: "TBD",
    projectName: "TBD",
    year: "2026",
    description: "Awaiting details — name the hackathon and what you built.",
    image: "/hackathons/hack_1.jpg",
  },
  {
    id: "hackathon-02",
    hackathonName: "Automate India Hackathon 2026 (HackBriven)",
    projectName: "BeejMantra",
    year: "2026",
    description: "AI assistant for Indian farmers — crop diagnosis, market insights, and government schemes in 5 languages. Presented at Microsoft Office Noida.",
    image: "/projects/beejmantra.png",
    githubUrl: "https://github.com/Taksh254/BeejMantra",
  },
  {
    id: "hackathon-03",
    hackathonName: "TBD",
    projectName: "TBD",
    year: "2026",
    description: "Awaiting details — name the hackathon and what you built.",
    image: "/hackathons/hack_3.jpg",
  },
  {
    id: "hackathon-04",
    hackathonName: "TBD",
    projectName: "TBD",
    year: "2026",
    description: "Awaiting details — name the hackathon and what you built.",
    image: "/hackathons/hack_4.jpg",
  },
];
