"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import type { Note } from "@/types/note";

export interface NoteEditorProps {
  open: boolean;
  note?: Note | null;
  onCancel: () => void;
  onSave: (data: { id?: string; title: string; content?: string; tags?: string[]; pinned?: boolean }) => Promise<void> | void;
  saving?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * NoteEditor: Create/Edit note form.
 */
export const NoteEditor: React.FC<NoteEditorProps> = ({ open, note, onCancel, onSave, saving }) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [tagsText, setTagsText] = useState(note?.tags?.join(", ") ?? "");
  const [pinned, setPinned] = useState<boolean>(note?.pinned ?? false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setTagsText(note?.tags?.join(", ") ?? "");
    setPinned(note?.pinned ?? false);
  }, [note, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => titleRef.current?.focus(), 10);
    }
  }, [open]);

  const tags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsText]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/20 backdrop-blur-[1px] p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={note ? "Edit note" : "Create note"}
    >
      <div className="w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl bg-white shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-medium text-gray-900">{note ? "Edit note" : "Create a new note"}</h2>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
              />
              Pinned
            </label>
            <Button variant="ghost" onClick={onCancel} aria-label="Close editor">
              ✕
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-700">Title</label>
            <TextInput ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Content</label>
            <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note..." rows={10} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-700">Tags (comma separated)</label>
            <TextInput value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="e.g. work, personal" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-gray-200 p-4">
          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave({ id: note?.id, title: title.trim(), content: content.trim(), tags, pinned })}
            disabled={!title.trim() || saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
