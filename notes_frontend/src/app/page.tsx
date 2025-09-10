"use client";
import React, { useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { AppHeader } from "@/components/AppHeader";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { Button } from "@/components/Button";
import type { Note } from "@/types/note";

export default function Home() {
  const { notes, status, error, add, remove, save, reload } = useNotes();
  const [filter, setFilter] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return notes;
    return notes.filter((n) => {
      const tags = (n.tags || []).join(" ").toLowerCase();
      return (
        n.title.toLowerCase().includes(f) ||
        (n.content || "").toLowerCase().includes(f) ||
        tags.includes(f)
      );
    });
  }, [notes, filter]);

  const onCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const onEdit = (note: Note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  const onDelete = async (id: string) => {
    // Confirm delete
    const ok = window.confirm("Delete this note? This action cannot be undone.");
    if (!ok) return;
    try {
      await remove(id);
    } catch {
      // noop, error handled in hook
    }
  };

  const onTogglePin = async (id: string, pinned: boolean) => {
    try {
      await save(id, { pinned });
    } catch {
      // handled in hook
    }
  };

  const onSaveEditor = async (data: { id?: string; title: string; content?: string; tags?: string[]; pinned?: boolean }) => {
    setSaving(true);
    try {
      if (data.id) {
        await save(data.id, { title: data.title, content: data.content, tags: data.tags, pinned: data.pinned });
      } else {
        await add({ title: data.title, content: data.content, tags: data.tags, pinned: data.pinned });
      }
      setEditorOpen(false);
      setEditing(null);
    } catch {
      // error toast could be added
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader filter={filter} setFilter={setFilter} onCreate={onCreate} />
      <main className="mx-auto max-w-6xl p-4">
        <div className="mb-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                {status === "loading" && <span className="text-blue-700">Loading…</span>}
                {status === "success" && <span className="text-green-700">Ready</span>}
                {status === "error" && <span className="text-rose-700">Error</span>}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => void reload()}>
                  Refresh
                </Button>
                <Button onClick={onCreate}>New Note</Button>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-800">
                  {error}
                </div>
              )}
              <NoteList notes={filtered} onEdit={onEdit} onDelete={onDelete} onTogglePin={onTogglePin} />
            </CardContent>
          </Card>
        </div>
      </main>
      <NoteEditor
        open={editorOpen}
        note={editing ?? undefined}
        onCancel={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSave={onSaveEditor}
        saving={saving}
      />
    </div>
  );
}
