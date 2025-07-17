/**
 * MAIN EDITOR - Overview of All Editable Sections
 * ================================================
 *
 * This component provides a comprehensive overview of all editable sections
 * when the admin clicks "Enable Edit". It shows:
 *
 * - List of all editable components
 * - Quick access buttons to open specific editors
 * - Visual status of each section
 * - Direct navigation to edit any component
 */

"use client";
import React from "react";
import { useEditorManager } from "../hooks/useEditorManager";
import SidePanel from "./SidePanel";

interface MainEditorProps {
  open: boolean;
  onClose: () => void;
}

interface EditableSection {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function MainEditor({ open, onClose }: MainEditorProps) {
  const { openEditor } = useEditorManager();

  // List of all editable sections
  const editableSections: EditableSection[] = [
    {
      id: "hero",
      name: "Hero Section",
      description:
        "Main banner with headline, subtitle, and call-to-action button",
      icon: "🎯",
    },
    {
      id: "navbar",
      name: "Navigation Bar",
      description: "Top navigation with logo, menu links, and CTA button",
      icon: "🧭",
    },
    {
      id: "clientLogos",
      name: "Client Logos",
      description: "Showcase of client and partner logos",
      icon: "🏢",
    },
    {
      id: "testimonials",
      name: "Testimonials",
      description: "Customer testimonials and reviews",
      icon: "💬",
    },
    {
      id: "valueProposition",
      name: "Value Proposition",
      description: "Key value statement and company benefits",
      icon: "💎",
    },
    {
      id: "process",
      name: "Process Section",
      description: "Step-by-step process explanation with images",
      icon: "🔄",
    },
    {
      id: "about",
      name: "About Page",
      description: "Company information and story",
      icon: "ℹ️",
    },
    {
      id: "contact",
      name: "Contact Page",
      description: "Contact form and company details",
      icon: "📞",
    },
    {
      id: "footer",
      name: "Footer",
      description: "Bottom section with links and contact information",
      icon: "🦶",
    },
  ];

  const handleEditSection = (sectionId: string) => {
    openEditor(sectionId);
    // Don't close the main editor to prevent layout jump
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

        {/* Editable Sections Grid */}
        <div className="space-y-3">
          {editableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleEditSection(section.id)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {section.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                    {section.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
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

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span>
            Editing Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Click directly on sections while in edit mode to edit them
            </li>
            <li>• Use Save/Load to backup your changes</li>
            <li>• Changes are auto-saved as you edit</li>
            <li>• Exit edit mode to see the final result</li>
          </ul>
        </div>
      </div>
    </SidePanel>
  );
}
