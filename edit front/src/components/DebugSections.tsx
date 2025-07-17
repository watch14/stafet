/**
 * DEBUG SECTIONS - Temporary debugging component
 * ============================================
 *
 * This component provides debug information about registered sections.
 * Only shows when in development mode.
 */

"use client";
import React from "react";
import { useEditContext } from "../contexts/EditContext";

export default function DebugSections() {
  const { getRegisteredSections, openMainEditor } = useEditContext();
  
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  
  const sections = getRegisteredSections();
  
  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">Debug: Registered Sections</div>
      <div className="mb-2">Count: {sections.length}</div>
      {sections.length > 0 && (
        <div className="space-y-1">
          {sections.map(({ id, info }) => (
            <div key={id} className="text-green-300">
              • {id}: {info.name}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={openMainEditor}
        className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-xs"
      >
        Open Main Editor
      </button>
    </div>
  );
}
