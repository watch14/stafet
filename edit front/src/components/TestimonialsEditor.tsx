"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ReturnToMainEditor from "./ReturnToMainEditor";

// Default testimonials values for reset functionality
const defaultTestimonialsValues = {
  title: "What our clients say",
  quote:
    "Our process starts by diving into your business, customers, and objectives. From there, we create a strategy rooted in our findings",
  author: "- Marcus, 29, HeadHunter",
  bgColor: "#ffffff",
  textColor: "#000000",
};

export default function TestimonialsEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const testimonials = useEditorStore((s) => s.testimonials);
  const setTestimonials = useEditorStore((s) => s.setTestimonials);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(testimonials);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(testimonials);
    setHasChanges(false);
  }, [open, testimonials]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(testimonials);
    setHasChanges(changes);
  }, [draft, testimonials]);

  // Real-time preview - update store immediately
  const updateDraft = (updates: Partial<typeof draft>) => {
    const newDraft = { ...draft, ...updates };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setTestimonials(newDraft);
  };

  // Reset individual field to default
  const resetField = (field: string) => {
    const defaultValue = (defaultTestimonialsValues as any)[field];
    if (defaultValue !== undefined) {
      updateDraft({ [field]: defaultValue });
    }
  };

  // Reset entire component to defaults
  const resetComponent = () => {
    if (
      confirm(
        "Are you sure you want to reset the testimonials section to default values? This will overwrite all your changes."
      )
    ) {
      setDraft(defaultTestimonialsValues);
      setTestimonials(defaultTestimonialsValues);
      setHasChanges(false);
    }
  };

  const handleSave = () => {
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
        return;
      } else {
        // Revert changes
        setTestimonials(testimonials);
        setDraft(testimonials);
        setHasChanges(false);
      }
    }
    closeEditor();
    onClose();
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
      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
      title={title}
    >
      <svg
        className="w-3 h-3"
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

  return (
    <SidePanel
      open={open}
      onClose={handleClose}
      title="Edit Testimonials Section"
    >
      <ReturnToMainEditor />
      <div className="space-y-8 text-black">
        {/* Info Box */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💬 Real-time Testimonials Editor
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
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Testimonial Content
          </h3>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Section Title
                </label>
                <ResetButton
                  onClick={() => resetField("title")}
                  title="Reset title"
                />
              </div>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => updateDraft({ title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the section title..."
              />
            </div>

            {/* Quote */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Testimonial Quote
                </label>
                <ResetButton
                  onClick={() => resetField("quote")}
                  title="Reset quote"
                />
              </div>
              <textarea
                value={draft.quote}
                onChange={(e) => updateDraft({ quote: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                rows={4}
                placeholder="Enter the testimonial quote..."
              />
            </div>

            {/* Author */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Author Information
                </label>
                <ResetButton
                  onClick={() => resetField("author")}
                  title="Reset author"
                />
              </div>
              <input
                type="text"
                value={draft.author}
                onChange={(e) => updateDraft({ author: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter the author information..."
              />
            </div>
          </div>
        </div>

        {/* Style Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🎨 Style Settings
          </h3>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Color Customization
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-800">
                      Background Color
                    </label>
                    <ResetButton
                      onClick={() => resetField("bgColor")}
                      title="Reset background color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.bgColor}
                    onChange={(color) => updateDraft({ bgColor: color })}
                    label="Background"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-800">
                      Text Color
                    </label>
                    <ResetButton
                      onClick={() => resetField("textColor")}
                      title="Reset text color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.textColor}
                    onChange={(color) => updateDraft({ textColor: color })}
                    label="Text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Component Button */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <button
            onClick={resetComponent}
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
            Reset Testimonials to Default
          </button>
          <p className="text-xs text-orange-700 mt-2 text-center">
            This will restore the testimonials section to its original state
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
