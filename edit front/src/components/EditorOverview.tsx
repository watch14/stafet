/**
 * EDITOR OVERVIEW - Main Section Selection Panel
 * =============================================
 *
 * This component shows when the main edit button is clicked and provides
 * an overview of all editable sections. Users can click any section to
 * start editing it in the left panel.
 *
 * Features:
 * - Shows all registered sections
 * - Quick access to any editor
 * - Section status and information
 * - Smooth integration with LeftEditorSlider
 */

"use client";
import React from "react";
import { useEditContext } from "../contexts/EditContext";
import SidePanel from "./SidePanel";

interface EditorOverviewProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Editor Overview Component
 * Main dashboard for selecting sections to edit
 */
export default function EditorOverview({ open, onClose }: EditorOverviewProps) {
  const { getRegisteredSections, openEditor, scrollToSection } = useEditContext();
  const registeredSections = getRegisteredSections();
  
  const handleSectionSelect = (sectionId: string) => {
    // Close this overview panel
    onClose();
    
    // Open the specific editor
    openEditor(sectionId as any);
    
    // Scroll to the section
    setTimeout(() => {
      scrollToSection(sectionId as any);
    }, 100);
  };
  
  return (
    <SidePanel open={open} onClose={onClose} title="Website Editor">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Select a section to edit
          </h3>
          <p className="text-sm text-gray-600">
            Click on any section below to open its editor
          </p>
        </div>

        {/* Registered Sections */}
        {registeredSections.length > 0 ? (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-3">
              Found {registeredSections.length} editable sections:
            </div>
            {registeredSections.map(({ id, info }) => (
              <button
                key={id}
                onClick={() => handleSectionSelect(id)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {info.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-900">
                      {info.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {info.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No sections registered yet.</p>
            <p className="text-sm mt-1">Sections will appear here as the page loads.</p>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-left text-sm">
              <p className="font-medium text-yellow-800">Debug Info:</p>
              <p className="text-yellow-700">
                This means the sections aren't calling useSection() hook yet.
                Expected sections: Hero, Navbar, ClientLogos, Testimonials, ValueProposition, Process, Footer
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span>
            Editing Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click directly on sections while in edit mode to edit them</li>
            <li>• Changes are auto-saved as you edit</li>
            <li>• Use keyboard shortcuts for faster editing</li>
            <li>• Press ESC to close any editor panel</li>
          </ul>
        </div>
      </div>
    </SidePanel>
  );
}
