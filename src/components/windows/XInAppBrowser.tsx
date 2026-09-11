"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  Search,
  ExternalLink,
  Sparkles,
  Check,
  Code2,
} from "lucide-react";
import { XIcon } from "@/components/Icons";

interface Tweet {
  id: string;
  author: string;
  handle: string;
  date: string;
  content: string;
  codeSnippet?: string;
  likes: number;
  reposts: number;
  replies: number;
  views: string;
}

const TWEETS: Tweet[] = [
  {
    id: "tw-1",
    author: "Taksh Sehrawat",
    handle: "@TSehrawat49611",
    date: "Aug 29",
    content:
      "Just benchmarked our parallel DAG agent scheduler. Decomposing research queries into asynchronous sub-tasks dropped execution time from 94s to 31s (3.03x speedup).\n\nKey lesson: worker isolation + strict AST schema verification on worker output prevents context drift.",
    likes: 142,
    reposts: 38,
    replies: 14,
    views: "4.8K",
  },
  {
    id: "tw-2",
    author: "Taksh Sehrawat",
    handle: "@TSehrawat49611",
    date: "Aug 24",
    content:
      "Why transformer inference bottlenecks on memory bandwidth rather than compute:\n\nDuring autoregressive single-token decoding, every past KV tensor must be fetched from HBM. Arithmetic intensity plummets. Inference is a memory subsystem problem disguised as a math problem.",
    likes: 284,
    reposts: 67,
    replies: 29,
    views: "9.2K",
  },
  {
    id: "tw-3",
    author: "Taksh Sehrawat",
    handle: "@TSehrawat49611",
    date: "Aug 18",
    content:
      "Anti-spoofing edge facial recognition test: passive optical texture analysis + 3D mesh blink verification completely blocked 2D high-res photo bypass on a 7.5W Raspberry Pi 5. 34ms per frame inference.",
    likes: 98,
    reposts: 21,
    replies: 8,
    views: "3.1K",
  },
];

export function XInAppBrowser() {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likesState, setLikesState] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "highlights">("posts");

  const toggleLike = (id: string) => {
    setLikesState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full h-full bg-[#000000] text-[#E7E9EA] font-sans flex flex-col overflow-y-auto">
      {/* Top Header */}
      <div className="bg-[#000000]/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-2 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold">
            <XIcon className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              Taksh Sehrawat
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0]" />
            </h1>
            <span className="text-[11px] text-[#71767b]">48 Posts • Live Profile</span>
          </div>
        </div>

        <a
          href="https://x.com/TSehrawat49611"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-white hover:bg-[#eff3f4] text-black text-xs font-bold rounded-full transition-colors flex items-center gap-1"
        >
          <span>Open on 𝕏.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-0 sm:p-4">
        {/* Main Feed Column (8 Cols) */}
        <div className="md:col-span-8 border-x border-[#2f3336] min-h-full">
          {/* Profile Banner */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-[#16181c] via-[#202327] to-[#2f3336] relative p-4 flex items-end justify-end">
            <span className="text-[11px] font-mono text-[#71767b] bg-black/40 px-2 py-0.5 rounded">
              ENGINEER&apos;S LOGS &amp; SYSTEMS
            </span>
          </div>

          {/* Profile Header Info */}
          <div className="p-4 relative">
            <div className="-mt-16 sm:-mt-20 mb-3 flex items-end justify-between">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black bg-[#16181c] text-white flex items-center justify-center font-bold text-2xl shadow-lg font-mono">
                TS
              </div>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isFollowing
                    ? "bg-transparent border border-[#536471] text-white hover:border-[#f4212e] hover:text-[#f4212e]"
                    : "bg-white hover:bg-[#eff3f4] text-black"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                Taksh Sehrawat
              </h2>
              <div className="text-xs text-[#71767b] font-mono">
                @TSehrawat49611
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#e7e9ea] mt-3 leading-relaxed">
              Building autonomous AI architectures, optimizing low-latency neural runtimes &amp; exploring robotic state machines. Systems developer @ TAKSH.OS.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#71767b] mt-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5" />
                <a href="https://taksh.dev" className="text-[#1d9bf0] hover:underline">
                  taksh.dev
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Joined 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs mt-3 pt-3 border-t border-[#2f3336]">
              <div>
                <span className="font-bold text-white">142</span>{" "}
                <span className="text-[#71767b]">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">380</span>{" "}
                <span className="text-[#71767b]">Followers</span>
              </div>
            </div>
          </div>

          {/* Feed Tabs */}
          <div className="flex items-center border-b border-[#2f3336] text-xs font-bold text-[#71767b]">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer hover:bg-[#16181c] relative ${
                activeTab === "posts" ? "text-white font-bold" : ""
              }`}
            >
              <span>Posts</span>
              {activeTab === "posts" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1d9bf0] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("replies")}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer hover:bg-[#16181c] relative ${
                activeTab === "replies" ? "text-white font-bold" : ""
              }`}
            >
              <span>Replies</span>
            </button>
            <button
              onClick={() => setActiveTab("highlights")}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer hover:bg-[#16181c] relative ${
                activeTab === "highlights" ? "text-white font-bold" : ""
              }`}
            >
              <span>Highlights</span>
            </button>
          </div>

          {/* Posts Feed */}
          <div className="divide-y divide-[#2f3336]">
            {TWEETS.map((tweet) => {
              const isLiked = likesState[tweet.id];
              const likesCount = tweet.likes + (isLiked ? 1 : 0);

              return (
                <article key={tweet.id} className="p-4 hover:bg-[#080808] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#16181c] border border-[#2f3336] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      TS
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="font-bold text-white">{tweet.author}</span>
                          <span className="text-[#71767b] font-mono">{tweet.handle}</span>
                          <span className="text-[#71767b]">·</span>
                          <span className="text-[#71767b]">{tweet.date}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#e7e9ea] whitespace-pre-line leading-relaxed">
                        {tweet.content}
                      </p>

                      {/* Interactive Tweet Metrics Bar */}
                      <div className="flex items-center justify-between text-xs text-[#71767b] pt-2 max-w-md">
                        <button className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{tweet.replies}</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-[#00ba7c] transition-colors cursor-pointer">
                          <Repeat2 className="w-3.5 h-3.5" />
                          <span>{tweet.reposts}</span>
                        </button>
                        <button
                          onClick={() => toggleLike(tweet.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isLiked ? "text-[#f91880]" : "hover:text-[#f91880]"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                          <span>{likesCount}</span>
                        </button>
                        <span className="text-[11px]">{tweet.views}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar (4 Cols) */}
        <div className="hidden md:block md:col-span-4 p-4 space-y-4 text-xs">
          <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-white text-sm">What&apos;s happening</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[11px] text-[#71767b]">Technology • Trending</div>
                <div className="font-bold text-white">#MultiAgentSystems</div>
                <div className="text-[11px] text-[#71767b]">14.2K posts</div>
              </div>
              <div>
                <div className="text-[11px] text-[#71767b]">AI Research • Trending</div>
                <div className="font-bold text-white">#PagedAttention</div>
                <div className="text-[11px] text-[#71767b]">8.4K posts</div>
              </div>
              <div>
                <div className="text-[11px] text-[#71767b]">Computer Vision</div>
                <div className="font-bold text-white">#EdgeInference</div>
                <div className="text-[11px] text-[#71767b]">5.1K posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
