"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Note } from "@/types/note";
import { createNote, deleteNote, listNotes, updateNote } from "@/services/api";

type Status = "idle" | "loading" | "success" | "error";

export interface UseNotesResult {
  notes: Note[];
  status: Status;
  error?: string;
  reload: () => Promise<void>;
  add: (input: { title: string; content?: string; tags?: string[]; pinned?: boolean }) => Promise<void>;
  remove: (id: string) => Promise<void>;
  save: (id: string, changes: Partial<Pick<Note, "title" | "content" | "tags" | "pinned">>) => Promise<void>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to manage notes state and CRUD operations with optimistic updates.
 */
export function useNotes(): UseNotesResult {
  const [notes, setNotes] = useState<Note[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | undefined>(undefined);

  const sortNotes = useCallback((list: Note[]) => {
    return [...list].sort((a, b) => {
      // pinned first then updatedAt desc
      if ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) !== 0) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, []);

  const reload = useCallback(async () => {
    setStatus("loading");
    setError(undefined);
    try {
      const data = await listNotes();
      setNotes(sortNotes(data));
      setStatus("success");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load notes";
      setError(message);
      setStatus("error");
    }
  }, [sortNotes]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const add = useCallback(
    async (input: { title: string; content?: string; tags?: string[]; pinned?: boolean }) => {
      const optimistic: Note = {
        id: `temp-${Date.now()}`,
        title: input.title,
        content: input.content,
        tags: input.tags,
        pinned: input.pinned,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes((prev) => sortNotes([optimistic, ...prev]));
      try {
        const created = await createNote(input);
        setNotes((prev) => {
          const withoutTemp = prev.filter((n) => n.id !== optimistic.id);
          return sortNotes([created, ...withoutTemp]);
        });
      } catch (e: unknown) {
        // revert optimistic
        setNotes((prev) => prev.filter((n) => n.id !== optimistic.id));
        const message = e instanceof Error ? e.message : "Failed to create note";
        setError(message);
        throw e;
      }
    },
    [sortNotes]
  );

  const remove = useCallback(async (id: string) => {
    const backup = notes;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNote(id);
    } catch (e: unknown) {
      setNotes(backup);
      const message = e instanceof Error ? e.message : "Failed to delete note";
      setError(message);
      throw e;
    }
  }, [notes]);

  const save = useCallback(
    async (id: string, changes: Partial<Pick<Note, "title" | "content" | "tags" | "pinned">>) => {
      const backup = notes;
      const updatedList = notes.map((n) =>
        n.id === id ? { ...n, ...changes, updatedAt: new Date().toISOString() } : n
      );
      setNotes(sortNotes(updatedList));
      try {
        const saved = await updateNote(id, changes);
        setNotes((prev) => sortNotes(prev.map((n) => (n.id === id ? saved : n))));
      } catch (e: unknown) {
        setNotes(backup);
        const message = e instanceof Error ? e.message : "Failed to update note";
        setError(message);
        throw e;
      }
    },
    [notes, sortNotes]
  );

  return useMemo(
    () => ({ notes, status, error, reload, add, remove, save }),
    [notes, status, error, reload, add, remove, save]
  );
}
