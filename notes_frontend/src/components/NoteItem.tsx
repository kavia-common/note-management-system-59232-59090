"use client";
import React, { useMemo } from "react";
import { Note } from "@/types/note";
import { Badge } from "./Badge";
import { Button } from "./Button";

export interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
}

/**
 * PUBLIC_INTERFACE
 * Renders a single note item card in the list.
 */
export const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete, onTogglePin }) => {
  const updated = useMemo(() => new Date(note.updatedAt).toLocaleString(), [note.updatedAt]);
  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-gray-900 truncate">{note.title || "Untitled"}</h3>
          {note.content ? (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2 whitespace-pre-wrap">{note.content}</p>
          ) : (
            <p className="mt-1 text-sm text-gray-400 italic">No content</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {note.tags?.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            <span className="text-xs text-gray-400 ml-auto">Updated {updated}</span>
          </div>
        </div>
        <div className="flex flex-none items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <Button variant="ghost" aria-label={note.pinned ? "Unpin note" : "Pin note"} onClick={() => onTogglePin(note.id, !note.pinned)}>
            {note.pinned ? "📌" : "📍"}
          </Button>
          <Button variant="secondary" onClick={() => onEdit(note)} aria-label="Edit note">
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(note.id)} aria-label="Delete note">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
