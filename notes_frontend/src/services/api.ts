import { Note } from "@/types/note";

/**
 * Simple REST client targeting /api/notes.
 * Replace basePath if integrating with a different backend origin.
 */
const basePath = "/api/notes";

// Helper for JSON fetch with error handling
async function jsonFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json() as Promise<T>;
}

// PUBLIC_INTERFACE
export async function listNotes(): Promise<Note[]> {
  /** Fetch all notes ordered by pinned and updatedAt desc */
  return jsonFetch<Note[]>(`${basePath}`);
}

// PUBLIC_INTERFACE
export async function getNote(id: string): Promise<Note> {
  /** Fetch a single note by id */
  return jsonFetch<Note>(`${basePath}/${encodeURIComponent(id)}`);
}

export interface CreateNoteInput {
  title: string;
  content?: string;
  tags?: string[];
  pinned?: boolean;
}

// PUBLIC_INTERFACE
export async function createNote(input: CreateNoteInput): Promise<Note> {
  /** Create a new note */
  return jsonFetch<Note>(`${basePath}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
  pinned?: boolean;
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, input: UpdateNoteInput): Promise<Note> {
  /** Update an existing note */
  return jsonFetch<Note>(`${basePath}/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<{ success: boolean }> {
  /** Delete a note by id */
  return jsonFetch<{ success: boolean }>(`${basePath}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
