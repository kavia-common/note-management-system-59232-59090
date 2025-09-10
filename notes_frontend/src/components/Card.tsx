"use client";
import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card container component for grouping UI sections.
 */
export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => {
  return <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
};

/**
 * PUBLIC_INTERFACE
 * CardHeader for titles and actions.
 */
export const CardHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => {
  return <div className={`flex items-center justify-between border-b border-gray-200 p-4 ${className}`}>{children}</div>;
};

/**
 * PUBLIC_INTERFACE
 * CardContent for inner content.
 */
export const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
