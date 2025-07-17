/**
 * RETURN TO MAIN EDITOR - Navigation Component
 * ============================================
 *
 * This component provides a "Return to Main Editor" button that can be
 * used in any specific editor to navigate back to the main editor overview.
 */

"use client";
import React from "react";
import { useEditorManager } from "../hooks/useEditorManager";

interface ReturnToMainEditorProps {
  className?: string;
}

export default function ReturnToMainEditor({
  className = "",
}: ReturnToMainEditorProps) {
  const { openMainEditor } = useEditorManager();

  return (
    <button
      onClick={openMainEditor}
      className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      title="Return to Main Editor"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span>Back to Main Editor</span>
    </button>
  );
}
