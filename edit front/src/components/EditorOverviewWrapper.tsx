/**
 * EDITOR OVERVIEW WRAPPER - Integration Component
 * ==============================================
 *
 * This wrapper component connects the EditorOverview to the EditContext
 * and provides the necessary props for opening/closing the main editor.
 */

"use client";
import React from "react";
import { useEditContext } from "../contexts/EditContext";
import EditorOverview from "./EditorOverview";

/**
 * Editor Overview Wrapper Component
 * Provides context integration for the main editor overview
 */
export default function EditorOverviewWrapper() {
  const { isMainEditorOpen, closeMainEditor } = useEditContext();
  
  return (
    <EditorOverview
      open={isMainEditorOpen}
      onClose={closeMainEditor}
    />
  );
}
