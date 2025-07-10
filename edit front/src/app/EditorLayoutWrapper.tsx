/**
 * EDITOR LAYOUT WRAPPER - Admin Controls Container
 * ================================================
 *
 * This component wraps all page content and provides:
 * - Global admin controls that appear on every page when logged in
 * - Layout adjustments when the editor panel is open
 * - Smooth transitions when the editor panel opens/closes
 *
 * The wrapper automatically moves content to the right when the
 * editor panel is open so it doesn't overlap the main content.
 */

"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";
import EditModeToggle from "../components/EditModeToggle";
import AutoSave from "../components/AutoSave";

interface EditorLayoutWrapperProps {
  children: React.ReactNode; // The main page content
}

/**
 * Editor Layout Wrapper Component
 * Provides global admin controls and layout management
 */
export default function EditorLayoutWrapper({
  children,
}: EditorLayoutWrapperProps) {
  // Check if the editor panel is currently open
  const isEditorOpen = useEditorStore((state) => state.isEditorOpen);

  return (
    <div className="min-h-screen">
      {/* Main content area - shifts right when editor panel is open */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isEditorOpen ? "ml-[400px]" : "ml-0"
        }`}
      >
        {children}
      </div>
      {/* Global admin controls - visible on all pages when admin is logged in */}
      <EditModeToggle /> {/* Button to enter/exit edit mode */}
      <AutoSave /> {/* Auto-save indicator and controls */}
    </div>
  );
}
