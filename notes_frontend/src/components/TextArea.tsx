"use client";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * TextArea: simple styled textarea component.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", rows = 8, ...props }, ref) => {
    const base =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    return <textarea ref={ref} rows={rows} className={`${base} ${className}`} {...props} />;
  }
);
TextArea.displayName = "TextArea";
