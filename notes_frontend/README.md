# Notes Frontend

A Next.js frontend for a simple notes application. Users can create, edit, delete, pin, and search notes.

## Features
- Display notes in a responsive grid
- Create and edit notes via a modal editor
- Delete notes with confirmation
- Pin/unpin notes (pinned notes appear first)
- Search by title, content, or tags
- Optimistic UI updates and refresh

## Development
Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Backend Integration

This app uses a placeholder REST client pointing to `/api/notes`. Replace it with your backend origin if needed.

Expected endpoints:
- GET `/api/notes` -> `Note[]`
- POST `/api/notes` body: `{ title, content?, tags?, pinned? }` -> `Note`
- PUT `/api/notes/:id` body: `{ title?, content?, tags?, pinned? }` -> `Note`
- DELETE `/api/notes/:id` -> `{ success: boolean }`

Note shape:
```ts
type Note = {
  id: string;
  title: string;
  content?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  tags?: string[];
  pinned?: boolean;
};
```

To point to another base URL, update `src/services/api.ts` `basePath`.

## Notes
- This project uses Tailwind CSS v4 via the default PostCSS plugin (already configured).
- No environment variables are required for the frontend.
- The UI uses minimal custom components under `src/components/*`.
