/**
 * SIDE PANEL - Universal Editor Interface
 * =======================================
 *
 * This is the main editing interface that slides in from the left side.
 * It's used by ALL editor components (Hero, About, Process, etc.) to provide
 * a consistent editing experience.
 *
 * Features:
 * - Slides in/out from the left side
 * - Fixed width (400px) with scroll for long content
 * - Consistent header with title and close button
 * - Automatically adjusts the main page layout when open
 * - Universal container for all editing controls
 */

"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";

interface SidePanelProps {
  open: boolean; // Whether the panel is open or closed
  onClose: () => void; // Function to call when panel is closed
  title: string; // Title to display in the panel header
  children: React.ReactNode; // The editor controls and content
}

/**
 * Side Panel Component
 * Universal sliding panel for all editor interfaces
 */
export default function SidePanel({
  open,
  onClose,
  title,
  children,
}: SidePanelProps) {
  // Update global state when panel opens/closes
  const setIsEditorOpen = useEditorStore((state) => state.setIsEditorOpen);

  // Notify the layout when panel state changes
  React.useEffect(() => {
    setIsEditorOpen(open);
  }, [open, setIsEditorOpen]);

  // Handle closing the panel
  const handleClose = () => {
    setIsEditorOpen(false);
    onClose();
  };

  // Don't render anything if panel is closed
  if (!open) return null;

  return (
    <>
      {/* Side Panel - Fixed position sliding from left */}
      <div className="fixed top-0 left-0 h-full w-full sm:w-[90%] md:w-[500px] lg:w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header - Title and close button */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
              title="Close Editor"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
