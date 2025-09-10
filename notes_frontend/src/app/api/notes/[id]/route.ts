import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/types/note";

// This file relies on the module scope in ../route.ts not being shared.
// To keep functionality in this route, we re-create a tiny store for demo export builds.
// In a real deployment, replace these routes with a true backend.
let store: Note[] = [];

function getStore() {
  // Use local 'store'. This is a fallback mock for standalone usage.
  return store;
}
function setStore(data: Note[]) {
  store = data;
}

function nowISO() {
  return new Date().toISOString();
}

export async function GET(_: NextRequest, ctx) {
  const id = ctx?.params?.id ?? "";
  const notes = getStore();
  const found = notes.find((n) => n.id === id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, ctx) {
  const id = ctx?.params?.id ?? "";
  const body = (await req.json().catch(() => ({}))) as Partial<
    Pick<Note, "title" | "content" | "tags" | "pinned">
  >;
  const notes = getStore();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated: Note = {
    ...notes[idx],
    ...("title" in body ? { title: body.title ?? "" } : {}),
    ...("content" in body ? { content: body.content ?? "" } : {}),
    ...("tags" in body ? { tags: Array.isArray(body.tags) ? body.tags : [] } : {}),
    ...("pinned" in body ? { pinned: Boolean(body.pinned) } : {}),
    updatedAt: nowISO(),
  };
  const next = [...notes];
  next[idx] = updated;
  setStore(next);
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, ctx) {
  const id = ctx?.params?.id ?? "";
  const notes = getStore();
  const exists = notes.some((n) => n.id === id);
  if (!exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  setStore(notes.filter((n) => n.id !== id));
  return NextResponse.json({ success: true });
}
