"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  Search,
  BookOpen,
  Users,
  MapPin,
  Link as LinkIcon,
  Calendar,
  RotateCw,
  Code2,
  Check,
  Copy,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  visibility: string;
  default_branch: string;
}

const FALLBACK_USER: GitHubUser = {
  login: "Taksh254",
  avatar_url: "https://avatars.githubusercontent.com/u/147492160?v=4",
  html_url: "https://github.com/Taksh254",
  name: "Taksh Sehrawat",
  company: null,
  blog: "https://taksh.dev",
  location: "India",
  bio: "Software Engineer & AI Systems Developer. Exploring Autonomous Agents, Low-Latency Runtimes & Computer Vision.",
  public_repos: 8,
  followers: 12,
  following: 15,
  created_at: "2023-10-10T00:00:00Z",
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "tatvam-chatbot",
    full_name: "Taksh254/tatvam-chatbot",
    html_url: "https://github.com/Taksh254/tatvam-chatbot",
    description: "High-context conversational AI agent with episodic memory and hybrid semantic retrieval.",
    language: "Python",
    stargazers_count: 14,
    forks_count: 3,
    updated_at: new Date().toISOString(),
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 2,
    name: "research-agent-core",
    full_name: "Taksh254/research-agent-core",
    html_url: "https://github.com/Taksh254/research-agent-core",
    description: "Autonomous multi-agent research coordinator with DAG task scheduling and automated synthesis.",
    language: "Python",
    stargazers_count: 28,
    forks_count: 5,
    updated_at: new Date().toISOString(),
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 3,
    name: "attendance-cv-edge",
    full_name: "Taksh254/attendance-cv-edge",
    html_url: "https://github.com/Taksh254/attendance-cv-edge",
    description: "Anti-spoofing facial recognition pipeline optimized for low-power edge SBCs and offline validation.",
    language: "C++",
    stargazers_count: 9,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 4,
    name: "edge-tensor-engine",
    full_name: "Taksh254/edge-tensor-engine",
    html_url: "https://github.com/Taksh254/edge-tensor-engine",
    description: "Lightweight 4-bit quantized tensor engine and unified memory allocator for ARM NEON.",
    language: "C++",
    stargazers_count: 42,
    forks_count: 7,
    updated_at: new Date().toISOString(),
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 5,
    name: "crawler-mesh",
    full_name: "Taksh254/crawler-mesh",
    html_url: "https://github.com/Taksh254/crawler-mesh",
    description: "Distributed crawling cluster with consistent hashing domain partitioning and Redis streams.",
    language: "Go",
    stargazers_count: 19,
    forks_count: 4,
    updated_at: new Date().toISOString(),
    visibility: "public",
    default_branch: "main",
  },
];

export function GitHubInAppBrowser() {
  const [user, setUser] = useState<GitHubUser>(FALLBACK_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "repositories">("overview");
  const [copiedClone, setCopiedClone] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      // Fetch live GitHub profile
      const userRes = await fetch("https://api.github.com/users/Taksh254");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      // Fetch live repositories
      const reposRes = await fetch(
        "https://api.github.com/users/Taksh254/repos?sort=updated&per_page=30"
      );
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData) && reposData.length > 0) {
          setRepos(reposData);
        }
      }
    } catch {
      // Fallback data is preserved
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.language && r.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyClone = (repoName: string) => {
    navigator.clipboard.writeText(`git clone https://github.com/Taksh254/${repoName}.git`);
    setCopiedClone(repoName);
    setTimeout(() => setCopiedClone(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#0d1117] text-[#e6edf3] font-sans flex flex-col overflow-y-auto">
      {/* GitHub Top Navigation Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-full bg-white text-[#0d1117]">
            <GithubIcon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-white">
            github.com / {user.login}
          </span>
          <span className="text-xs text-[#7d8590] hidden sm:inline">
            [LIVE IN-APP REPO VIEWER]
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchGitHubData}
            title="Refresh Live GitHub Data"
            className="p-1.5 hover:bg-[#21262d] rounded text-[#7d8590] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#2f81f7]" : ""}`} />
          </button>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Follow</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Profile & Tabs Container */}
      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar: User Details */}
        <div className="w-full md:w-64 shrink-0 space-y-4">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 md:w-48 md:h-48 rounded-full border border-[#30363d] shadow-md bg-[#21262d]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://avatars.githubusercontent.com/u/147492160?v=4";
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                {user.name || user.login}
              </h1>
              <div className="text-sm text-[#7d8590] font-mono">
                {user.login}
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#e6edf3] leading-relaxed">
            {user.bio || "Software Engineer & AI Systems Developer."}
          </p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open on GitHub.com</span>
            <ExternalLink className="w-3 h-3 text-[#7d8590]" />
          </a>

          {/* Social Stats */}
          <div className="flex items-center gap-3 text-xs text-[#7d8590] pt-2 border-t border-[#21262d]">
            <div className="flex items-center gap-1 hover:text-[#2f81f7] cursor-pointer">
              <Users className="w-3.5 h-3.5" />
              <span className="font-semibold text-white">{user.followers}</span> followers
            </div>
            <span>·</span>
            <div className="hover:text-[#2f81f7] cursor-pointer">
              <span className="font-semibold text-white">{user.following}</span> following
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-1.5 text-xs text-[#7d8590]">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <LinkIcon className="w-3.5 h-3.5 shrink-0" />
              <a href="https://taksh.dev" className="text-[#2f81f7] hover:underline truncate">
                taksh.dev
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Joined GitHub</span>
            </div>
          </div>
        </div>

        {/* Right Area: Pinned Repos & Full Repositories List */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#30363d] pb-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                activeTab === "overview"
                  ? "bg-[#21262d] text-white border-b-2 border-[#f78166]"
                  : "text-[#7d8590] hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("repositories")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                activeTab === "repositories"
                  ? "bg-[#21262d] text-white border-b-2 border-[#f78166]"
                  : "text-[#7d8590] hover:text-white"
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Repositories</span>
              <span className="px-1.5 py-0.2 bg-[#30363d] rounded-full text-[10px]">
                {repos.length}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7d8590] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find a repository..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#0d1117] border border-[#30363d] rounded-md text-xs text-white placeholder:text-[#7d8590] focus:outline-none focus:border-[#2f81f7] focus:ring-1 focus:ring-[#2f81f7]"
            />
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] p-3.5 rounded-md flex flex-col justify-between space-y-3 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#2f81f7] hover:underline flex items-center gap-1.5 truncate"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-[#7d8590] shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </a>
                    <span className="text-[10px] text-[#7d8590] border border-[#30363d] px-1.5 py-0.2 rounded-full uppercase">
                      {repo.visibility}
                    </span>
                  </div>

                  <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#21262d]">
                  <div className="flex items-center justify-between text-xs text-[#7d8590]">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-[#f1e05a]" />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-0.5 text-[11px]">
                        <Star className="w-3 h-3 text-[#7d8590]" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[11px]">
                        <GitFork className="w-3 h-3 text-[#7d8590]" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyClone(repo.name)}
                      title="Copy git clone command"
                      className="hover:text-white p-1 rounded hover:bg-[#21262d] transition-colors flex items-center gap-1 text-[10px] cursor-pointer"
                    >
                      {copiedClone === repo.name ? (
                        <>
                          <Check className="w-3 h-3 text-[#3fb950]" />
                          <span className="text-[#3fb950]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Code2 className="w-3 h-3" />
                          <span>Clone</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredRepos.length === 0 && (
              <div className="col-span-2 p-8 text-center border border-dashed border-[#30363d] rounded-md text-xs text-[#7d8590]">
                No repositories found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
