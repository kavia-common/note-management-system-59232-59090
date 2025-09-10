"use client";
import React from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

/**
 * PUBLIC_INTERFACE
 * AppHeader: Top bar with title, search, and create button.
 */
export const AppHeader: React.FC<{
  filter: string;
  setFilter: (v: string) => void;
  onCreate: () => void;
}> = ({ filter, setFilter, onCreate }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-auto">
          <span className="text-xl">📝</span>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Notes</h1>
        </div>
        <div className="hidden sm:block w-80">
          <TextInput
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
        <Button onClick={onCreate} aria-label="Create new note">
          New Note
        </Button>
      </div>
      <div className="sm:hidden px-4 pb-3">
        <TextInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
    </header>
  );
};
