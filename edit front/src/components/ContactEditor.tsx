/**
 * CONTACT EDITOR - Contact Section Editing Interface
 * ==================================================
 *
 * This is the editing interface for the Contact section that appears in the side panel.
 * It provides controls for:
 *
 * CONTENT TAB:
 * - Page title editing
 * - Subtitle/description editing
 * - Form configuration
 *
 * STYLE TAB:
 * - Text colors (title and content)
 * - Background color
 * - Button colors (text and background)
 * - Contact page image upload
 *
 * Features a draft system - changes are saved to a draft first, then applied
 * when "Save Changes" is clicked, allowing users to preview before committing.
 */

"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

/**
 * Contact Editor Component
 * Provides complete editing interface for the Contact section
 */
export default function ContactEditor({
  open,
  onClose,
}: {
  open: boolean; // Whether the editor panel is open
  onClose: () => void; // Function to close the editor
}) {
  // Get current contact content and update function from store
  const contact = useEditorStore((s) => s.contact);
  const setContact = useEditorStore((s) => s.setContact);
  const { closeEditor } = useEditorManager();

  // Local draft state for preview before saving
  const [draft, setDraft] = useState(contact);
  // Tab switching between content and style editing
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  // Update draft when editor opens with fresh data
  React.useEffect(() => {
    setDraft(contact);
  }, [open, contact]);

  // Handle image selection from image library
  const handleImageSelect = (imageUrl: string) => {
    setDraft({
      ...draft,
      image: imageUrl,
    });
  };

  // Save draft changes to the actual contact content
  const handleSave = () => {
    setContact(draft);
    closeEditor();
  };

  // Cancel changes and close editor
  const handleCancel = () => {
    setDraft(contact); // Reset to original
    closeEditor();
  };

  // Reset to default values
  const handleReset = () => {
    const defaultContact = {
      title: "Want to work with us?",
      subtitle:
        "Every good collaboration starts with a meaningful conversation. Answer these questions to start our dialogue and we will be in touch shortly.",
      bgColor: "#ffffff",
      titleColor: "#000000",
      textColor: "#000000",
      buttonBgColor: "#FFCEE5",
      buttonTextColor: "#000000",
      image: "/images/Work.png",
    };
    setDraft(defaultContact);
  };

  return (
    <SidePanel open={open} onClose={onClose} title="Edit Contact Page">
      <div className="flex-1 overflow-y-auto">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 m-6">
          <p className="text-sm text-blue-800">
            📝 <strong>Contact Page Editor</strong>
            <br />
            Customize the "Work with us" contact form page including title,
            description, styling, and contact image.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mx-6">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "content"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "style"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("style")}
          >
            Style
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6">
          {activeTab === "content" && (
            <>
              {/* Page Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Want to work with us?"
                />
              </div>

              {/* Subtitle/Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={draft.subtitle}
                  onChange={(e) =>
                    setDraft({ ...draft, subtitle: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Every good collaboration starts with a meaningful conversation..."
                />
              </div>
            </>
          )}

          {activeTab === "style" && (
            <>
              {/* Colors Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Colors
                </h3>
                <div className="space-y-3">
                  {/* Background Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Background</span>
                    <ColorPicker
                      color={draft.bgColor}
                      onChange={(color) =>
                        setDraft({ ...draft, bgColor: color })
                      }
                    />
                  </div>

                  {/* Title Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Title Color</span>
                    <ColorPicker
                      color={draft.titleColor}
                      onChange={(color) =>
                        setDraft({ ...draft, titleColor: color })
                      }
                    />
                  </div>

                  {/* Text Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Text Color</span>
                    <ColorPicker
                      color={draft.textColor}
                      onChange={(color) =>
                        setDraft({ ...draft, textColor: color })
                      }
                    />
                  </div>

                  {/* Button Background Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Button Background
                    </span>
                    <ColorPicker
                      color={draft.buttonBgColor}
                      onChange={(color) =>
                        setDraft({ ...draft, buttonBgColor: color })
                      }
                    />
                  </div>

                  {/* Button Text Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Button Text</span>
                    <ColorPicker
                      color={draft.buttonTextColor}
                      onChange={(color) =>
                        setDraft({ ...draft, buttonTextColor: color })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Contact Image
                </h3>
                <ImageUploader
                  currentImage={draft.image}
                  onImageSelect={handleImageSelect}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-6 space-y-3">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </SidePanel>
  );
}
