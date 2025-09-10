"use client";
import React from "react";
import { Note } from "@/types/note";
import { NoteItem } from "./NoteItem";

/**
 * PUBLIC_INTERFACE
 * NoteList: grid list of notes.
 */
export const NoteList: React.FC<{
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
}> = ({ notes, onEdit, onDelete, onTogglePin }) => {
  if (!notes.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No notes yet. Create your first note!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} onTogglePin={onTogglePin} />
      ))}
    </div>
  );
};
