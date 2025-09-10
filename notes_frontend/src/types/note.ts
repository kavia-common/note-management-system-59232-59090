export type NoteID = string;

// PUBLIC_INTERFACE
export interface Note {
  /** Unique identifier for the note */
  id: NoteID;
  /** Title of the note */
  title: string;
  /** Optional note content (markdown/plain text) */
  content?: string;
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last update */
  updatedAt: string;
  /** Optional tags for organization */
  tags?: string[];
  /** Whether note is pinned to the top */
  pinned?: boolean;
}
