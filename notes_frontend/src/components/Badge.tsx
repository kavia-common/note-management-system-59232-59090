"use client";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * Badge: small pill for tags.
 */
export const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => {
  return (
    <span className={`inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 ${className}`}>
      {children}
    </span>
  );
};
