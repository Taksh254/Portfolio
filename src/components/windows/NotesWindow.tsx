"use client";

import React, { useState } from "react";
import { BookOpen, Search, Clock, ArrowUpRight, Tag } from "lucide-react";
import { NOTES, Note } from "@/data/notes";
import { NoteDetail } from "./NoteDetail";

interface NotesWindowProps {
  selectedNoteId?: string | null;
  onSelectNote?: (id: string | null) => void;
  onClose?: () => void;
}

export function NotesWindow({ selectedNoteId, onSelectNote }: NotesWindowProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    selectedNoteId || null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeId = selectedNoteId !== undefined ? selectedNoteId : internalSelectedId;
  const setSelected = (id: string | null) => {
    setInternalSelectedId(id);
    if (onSelectNote) onSelectNote(id);
  };

  const selectedNote = NOTES.find((n) => n.id === activeId);

  const filteredNotes = NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedNote) {
    return (
      <NoteDetail
        note={selectedNote}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-[#EDEDED] pb-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202634] pb-4 font-mono-tech">
        <div>
          <div className="text-xs text-[#5D6475] uppercase tracking-wider">
            NOTEBOOK / ENGINEERING ESSAYS
          </div>
          <div className="text-lg font-bold text-[#FFFFFF] flex items-center gap-2 mt-0.5">
            <BookOpen className="w-4 h-4 text-[#E5484D]" />
            TABLE OF CONTENTS ({NOTES.length} ESSAYS)
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5D6475] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notebook..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#161B26] border border-[#202634] rounded-lg text-xs font-mono-tech text-[#EDEDED] placeholder:text-[#5D6475] focus:outline-none focus:border-[#E5484D]"
          />
        </div>
      </div>

      {/* Ruled Notebook Notes Grid */}
      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => setSelected(note.id)}
            data-cursor="READ ESSAY"
            className="p-5 bg-[#12151D] border border-[#202634] hover:border-[#E5484D]/60 hover:bg-[#151924] rounded-xl transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono-tech text-xs">
                <span className="text-[#5D6475]">{note.date}</span>
                <span className="text-[#5D6475]">•</span>
                <span className="text-[#E5484D] font-semibold">{note.category}</span>
                <span className="text-[#5D6475]">•</span>
                <span className="text-[#5D6475]">{note.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-[#FFFFFF] group-hover:text-[#E5484D] transition-colors leading-snug">
                {note.title}
              </h3>

              <p className="text-xs text-[#8E95A5] line-clamp-2 leading-relaxed max-w-2xl">
                {note.summary}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono-tech text-[#8E95A5] group-hover:text-[#E5484D] shrink-0 font-semibold">
              <span>Read Essay</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
