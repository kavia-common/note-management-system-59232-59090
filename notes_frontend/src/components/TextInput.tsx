"use client";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * TextInput: simple styled input component.
 */
export const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    const base =
      "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    return <input ref={ref} className={`${base} ${className}`} {...props} />;
  }
);
TextInput.displayName = "TextInput";
