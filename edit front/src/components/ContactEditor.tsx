"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

// Default values for resetting
const defaultContactValues = {
  title: "Want to work with us?",
  subtitle: "Get in touch with our team",
  bgColor: "#ffffff",
  titleColor: "#000000",
  textColor: "#000000",
  buttonBgColor: "#000000",
  buttonTextColor: "#ffffff",
  image: "/images/contact-default.jpg",
};

export default function ContactEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const contact = useEditorStore((s) => s.contact);
  const setContact = useEditorStore((s) => s.setContact);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(contact);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(contact);
    setHasChanges(false);
  }, [open, contact]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(contact);
    setHasChanges(changes);
  }, [draft, contact]);

  // Real-time preview - update store immediately for preview
  const updateContactField = (field: keyof typeof contact, value: any) => {
    const newDraft = { ...draft, [field]: value };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setContact(newDraft);
  };

  // Reset individual field to default value
  const resetField = (field: keyof typeof contact) => {
    const defaultValue =
      defaultContactValues[field as keyof typeof defaultContactValues];
    if (defaultValue !== undefined) {
      updateContactField(field, defaultValue);
    }
  };

  // Reset button component
  const ResetButton = ({
    onClick,
    title,
  }: {
    onClick: () => void;
    title: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
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
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );

  const handleSave = () => {
    setContact(draft);
    setHasChanges(false);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    if (hasChanges) {
      const shouldSave = confirm(
        "You have unsaved changes. Would you like to save them before closing?"
      );
      if (shouldSave) {
        handleSave();
      } else {
        setDraft(contact);
        setContact(contact);
        setHasChanges(false);
        closeEditor();
        onClose();
      }
    } else {
      closeEditor();
      onClose();
    }
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Contact Section">
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💬 Real-time Contact Editor
          </h3>
          <p className="text-xs text-blue-800">
            Changes appear instantly on your website.{" "}
            {hasChanges && (
              <span className="font-medium text-orange-800">
                • Unsaved changes
              </span>
            )}
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Content Settings
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Page Title
                </label>
                <ResetButton
                  onClick={() => resetField("title")}
                  title="Reset title"
                />
              </div>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => updateContactField("title", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the main title..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Subtitle
                </label>
                <ResetButton
                  onClick={() => resetField("subtitle")}
                  title="Reset subtitle"
                />
              </div>
              <input
                type="text"
                value={draft.subtitle}
                onChange={(e) => updateContactField("subtitle", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter subtitle..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact Image
                </label>
                <ResetButton
                  onClick={() => resetField("image")}
                  title="Reset image"
                />
              </div>
              <ImageUploader
                currentImage={draft.image}
                onImageSelect={(imageUrl) =>
                  updateContactField("image", imageUrl)
                }
              />
            </div>
          </div>
        </div>

        {/* Style Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Style Settings
            </h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                🎨 Color Customization
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Background Color
                    </label>
                    <ResetButton
                      onClick={() => resetField("bgColor")}
                      title="Reset background color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.bgColor}
                    onChange={(color) => updateContactField("bgColor", color)}
                    label="Background"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Title Color
                    </label>
                    <ResetButton
                      onClick={() => resetField("titleColor")}
                      title="Reset title color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.titleColor}
                    onChange={(color) =>
                      updateContactField("titleColor", color)
                    }
                    label="Title"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Text Color
                    </label>
                    <ResetButton
                      onClick={() => resetField("textColor")}
                      title="Reset text color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.textColor}
                    onChange={(color) => updateContactField("textColor", color)}
                    label="Text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    Button Background Color
                  </label>
                  <ColorPicker
                    color={draft.buttonBgColor}
                    onChange={(color) =>
                      updateContactField("buttonBgColor", color)
                    }
                    label="Button Background"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    Button Text Color
                  </label>
                  <ColorPicker
                    color={draft.buttonTextColor}
                    onChange={(color) =>
                      updateContactField("buttonTextColor", color)
                    }
                    label="Button Text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset All Section */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to reset the entire contact section? This action cannot be undone."
                )
              ) {
                const newDraft = { ...defaultContactValues };
                setDraft(newDraft);
                setContact(newDraft);
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium text-sm"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset All Contact Section to Default
          </button>
          <p className="text-xs text-orange-700 mt-2 text-center">
            This will restore the contact section to its original state
          </p>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 bg-white p-6 mt-8">
          <div className="space-y-3">
            <button
              onClick={handleSave}
              className={`w-full py-3 px-6 rounded-lg transition-colors font-medium text-sm shadow-sm flex items-center justify-center gap-2 ${
                hasChanges
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!hasChanges}
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {hasChanges ? "Save Changes" : "No Changes to Save"}
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm flex items-center justify-center gap-2"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Editor
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center">
            {hasChanges
              ? "⚠️ You have unsaved changes"
              : "Changes are applied in real-time"}
          </p>
        </div>
      </div>
    </SidePanel>
  );
}
