"use client";
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * PUBLIC_INTERFACE
 * Button component with variants.
 */
export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-9 px-3";
  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400 border border-gray-300",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300",
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
};
