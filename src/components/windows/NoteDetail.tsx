"use client";

import React from "react";
import { ArrowLeft, BookOpen, Clock, Tag } from "lucide-react";
import { Note } from "@/data/notes";

interface NoteDetailProps {
  note: Note;
  onBack: () => void;
}

export function NoteDetail({ note, onBack }: NoteDetailProps) {
  return (
    <article className="max-w-3xl mx-auto font-sans text-[#EDEDED] pb-10">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between border-b border-[#202634] pb-4 mb-8 font-mono-tech text-xs">
        <button
          onClick={onBack}
          data-cursor="BACK"
          className="flex items-center gap-1.5 text-[#8E95A5] hover:text-[#E5484D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO NOTEBOOK INDEX</span>
        </button>

        <div className="flex items-center gap-3 text-[#5D6475]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#E5484D]" />
            {note.readTime}
          </span>
          <span>•</span>
          <span>{note.date}</span>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#E5484D]">
          <Tag className="w-3 h-3" />
          <span>{note.category}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF] font-serif-editorial leading-tight">
          {note.title}
        </h1>

        <p className="text-base sm:text-lg text-[#8E95A5] font-serif-editorial italic leading-relaxed">
          {note.subtitle}
        </p>

        {/* Abstract */}
        <div className="p-4 bg-[#12151D] border-l-2 border-[#E5484D] border border-[#202634] rounded-lg text-xs sm:text-sm text-[#B0B7C6] leading-relaxed">
          <span className="font-mono-tech font-bold text-[#5D6475] mr-2 block mb-1 uppercase text-[10px]">
            ABSTRACT / SUMMARY:
          </span>
          {note.summary}
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm sm:text-base leading-relaxed">
        {note.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#202634] pb-2 font-mono-tech text-xs text-[#5D6475]">
              <span className="text-[#E5484D] font-bold">SECTION {sec.number || `0${idx + 1}`}</span>
              <span>//</span>
              <span className="text-[#FFFFFF] font-bold text-sm font-serif-editorial">{sec.heading}</span>
            </div>

            <div className="text-xs sm:text-sm text-[#B0B7C6] whitespace-pre-line leading-relaxed">
              {sec.body}
            </div>

            {/* ASCII / Diagram if any */}
            {sec.diagram && (
              <div className="my-4 p-4 bg-[#0B0D12] border border-[#202634] rounded-lg font-mono-tech text-[11px] text-[#8E95A5] space-y-2 overflow-x-auto shadow-inner">
                <div className="text-[9px] text-[#5D6475] uppercase tracking-wider">
                  DIAGRAM: {sec.diagram.caption}
                </div>
                {sec.diagram.ascii && (
                  <pre className="text-[#EDEDED] font-mono-tech leading-tight">
                    <code>{sec.diagram.ascii}</code>
                  </pre>
                )}
              </div>
            )}

            {/* Code Snippet if any */}
            {sec.codeSnippet && (
              <div className="my-4 p-4 bg-[#0B0D12] border border-[#202634] rounded-lg font-mono-tech text-xs overflow-x-auto text-[#EDEDED] shadow-inner space-y-2">
                <div className="text-[10px] text-[#5D6475] uppercase tracking-wider pb-1 border-b border-[#1C2230]">
                  LISTING: {sec.codeSnippet.language}
                </div>
                <pre>
                  <code>{sec.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}

        {/* Note Takeaway */}
        {note.takeaway && (
          <div className="p-4 bg-[#161B26] border border-[#232938] rounded-lg text-xs sm:text-sm font-mono-tech text-[#EDEDED] flex items-start gap-3 mt-6">
            <span className="text-[#E5484D] font-bold shrink-0">
              KEY TAKEAWAY:
            </span>
            <span className="leading-relaxed">{note.takeaway}</span>
          </div>
        )}
      </div>
    </article>
  );
}
