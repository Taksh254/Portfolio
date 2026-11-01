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
    hackathonName: "Automate India Hackathon 2026 (HackBriven)",
    projectName: "BeejMantra",
    year: "2026",
    description: "AI assistant for Indian farmers — crop diagnosis, market insights, and government schemes in 5 languages. Presented at Microsoft Office Noida.",
    image: "/projects/beejmantra.png",
    githubUrl: "https://github.com/Taksh254/BeejMantra",
  },
];
