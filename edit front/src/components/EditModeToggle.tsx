/**
 * EDIT MODE TOGGLE - Admin Control Panel
 * ======================================
 *
 * This is the main admin control panel that appears in the bottom-right corner
 * when an admin is logged in. It provides:
 *
 * - Edit Mode Toggle: Switch between viewing and editing modes
 * - Save/Load Manager: Backup and restore website content
 * - Logout Button: Exit admin session
 *
 * The component only appears for authenticated admins and provides quick access
 * to all editing functionality. It's positioned as a floating panel that doesn't
 * interfere with the main content.
 */

"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useAuth } from "../contexts/AuthContext";
import { useEditorManager } from "../hooks/useEditorManager";
import SaveLoadManager from "./SaveLoadManager";
import MainEditor from "./MainEditor";

/**
 * Edit Mode Toggle Component
 * Main admin control panel with edit mode and save/load controls
 */
export default function EditModeToggle() {
  // Get edit mode state and controls from store
  const editMode = useEditorStore((s) => s.editMode);
  const setEditMode = useEditorStore((s) => s.setEditMode);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [showMainEditor, setShowMainEditor] = useState(false);
  const { isAuthenticated, logout, requireAuth } = useAuth();
  const { isEditorActive, openMainEditor, closeEditor } = useEditorManager();

  // Check if main editor should be open
  useEffect(() => {
    setShowMainEditor(isEditorActive("main"));
  }, [isEditorActive]);

  // Handle edit mode toggle and open main editor
  const handleEditModeToggle = () => {
    if (!editMode) {
      setEditMode(true);
      openMainEditor(); // Open main editor when enabling edit mode
    } else {
      setEditMode(false);
      closeEditor(); // Close any open editors when disabling edit mode
    }
  };

  // Handle admin logout with enhanced security cleanup
  const handleLogout = () => {
    setEditMode(false); // Exit edit mode first
    logout(); // Clear authentication with secure cleanup
    window.location.href = "/"; // Force page reload to clear any cached state
  };

  // Remove the handleLoginRedirect function since login button is no longer shown

  // Only show the admin panel if user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Floating Admin Control Panel - Only visible to authenticated admins */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Save/Load Button - Only shown when in edit mode */}
          {editMode && (
            <button
              onClick={() => setShowSaveLoad(true)}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm transition hover:bg-green-700 order-2 sm:order-1"
              title="Save or Load Website Content"
            >
              <span className="hidden sm:inline">Save / Load</span>
              <span className="sm:hidden">💾</span>
            </button>
          )}

          {/* Edit Mode Toggle Button */}
          <button
            className={`px-3 sm:px-4 py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm transition border order-1 sm:order-2 ${
              editMode ? "bg-blue-600 text-white" : "bg-white text-blue-600"
            }`}
            onClick={handleEditModeToggle}
            aria-pressed={editMode}
            title={editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
          >
            <span className="hidden sm:inline">
              {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            </span>
            <span className="sm:hidden">{editMode ? "✕" : "✎"}</span>
          </button>

          {/* Admin logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg font-medium text-xs sm:text-sm transition hover:bg-red-700"
            title="Logout from admin"
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">🚪</span>
          </button>
        </div>
      </div>

      <SaveLoadManager
        isOpen={showSaveLoad}
        onClose={() => setShowSaveLoad(false)}
      />

      <MainEditor
        open={showMainEditor}
        onClose={() => setShowMainEditor(false)}
      />
    </>
  );
}
