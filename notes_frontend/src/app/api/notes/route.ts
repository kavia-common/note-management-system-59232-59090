import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/types/note";

// In-memory store for demo only (resets on server restart)
let memory: Note[] = [];

function newId() {
  return Math.random().toString(36).slice(2);
}

function nowISO() {
  return new Date().toISOString();
}

/**
 * GET /api/notes - list notes
 * POST /api/notes - create note
 */
export async function GET() {
  return NextResponse.json(memory);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const note: Note = {
    id: newId(),
    title: body.title,
    content: body.content || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    pinned: Boolean(body.pinned),
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };
  memory = [note, ...memory];
  return NextResponse.json(note, { status: 201 });
}
