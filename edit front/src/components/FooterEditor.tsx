"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ReturnToMainEditor from "./ReturnToMainEditor";

// Default values for resetting
const defaultFooterValues = {
  logo: "STAFF.",
  customerTitle: "Customer",
  customerLinks: [
    { label: "Returns & Refunds", href: "#" },
    { label: "Shipping & Delivery", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  contactTitle: "Contact",
  contactText: "Get in touch at",
  contactEmail: "hello@staffet.com",
  bgColor: "#FFFFFB",
  textColor: "#000000",
};

export default function FooterEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const footer = useEditorStore((s) => s.footer);
  const setFooter = useEditorStore((s) => s.setFooter);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(footer);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(footer);
    setHasChanges(false);
  }, [open, footer]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(footer);
    setHasChanges(changes);
  }, [draft, footer]);

  // Real-time preview - update store immediately for preview
  const updateFooterField = (field: keyof typeof footer, value: any) => {
    const newDraft = { ...draft, [field]: value };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setFooter(newDraft);
  };

  // Reset functions for individual fields
  const resetField = (field: keyof typeof defaultFooterValues) => {
    const defaultValue = defaultFooterValues[field];
    if (defaultValue !== undefined) {
      updateFooterField(field, defaultValue);
    }
  };

  const updateCustomerLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...draft.customerLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    const newDraft = { ...draft, customerLinks: updatedLinks };
    setDraft(newDraft);
    setFooter(newDraft);
  };

  const addCustomerLink = () => {
    const newLinks = [...draft.customerLinks, { label: "", href: "#" }];
    const newDraft = { ...draft, customerLinks: newLinks };
    setDraft(newDraft);
    setFooter(newDraft);
  };

  const removeCustomerLink = (index: number) => {
    const updatedLinks = draft.customerLinks.filter((_, i) => i !== index);
    const newDraft = { ...draft, customerLinks: updatedLinks };
    setDraft(newDraft);
    setFooter(newDraft);
  };

  // Reset entire component to default
  const resetComponent = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the entire footer? This action cannot be undone."
      )
    ) {
      const newDraft = { ...defaultFooterValues };
      setDraft(newDraft);
      setFooter(newDraft);
    }
  };

  const handleSave = () => {
    setFooter(draft);
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
        setDraft(footer);
        setFooter(footer);
        setHasChanges(false);
        closeEditor();
        onClose();
      }
    } else {
      closeEditor();
      onClose();
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
    <SidePanel open={open} onClose={handleClose} title="Edit Footer Section">
      <ReturnToMainEditor />
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            🦶 Real-time Footer Editor
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

        {/* Logo Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Logo Settings
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Footer Logo Text
                </label>
                <ResetButton
                  onClick={() => resetField("logo")}
                  title="Reset logo"
                />
              </div>
              <input
                type="text"
                value={draft.logo}
                onChange={(e) => updateFooterField("logo", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter footer logo text..."
              />
            </div>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Section
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Customer Title
                </label>
                <ResetButton
                  onClick={() => resetField("customerTitle")}
                  title="Reset customer title"
                />
              </div>
              <input
                type="text"
                value={draft.customerTitle}
                onChange={(e) =>
                  updateFooterField("customerTitle", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter customer section title..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">
                  Customer Links
                </label>
                <button
                  onClick={addCustomerLink}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Add new link"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                {draft.customerLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) =>
                          updateCustomerLink(index, "label", e.target.value)
                        }
                        placeholder="Link text"
                        className="p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) =>
                          updateCustomerLink(index, "href", e.target.value)
                        }
                        placeholder="Link URL"
                        className="p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => removeCustomerLink(index)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove link"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Settings
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact Title
                </label>
                <ResetButton
                  onClick={() => resetField("contactTitle")}
                  title="Reset contact title"
                />
              </div>
              <input
                type="text"
                value={draft.contactTitle}
                onChange={(e) =>
                  updateFooterField("contactTitle", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact section title..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact Text
                </label>
                <ResetButton
                  onClick={() => resetField("contactText")}
                  title="Reset contact text"
                />
              </div>
              <input
                type="text"
                value={draft.contactText}
                onChange={(e) =>
                  updateFooterField("contactText", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact description..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact Email
                </label>
                <ResetButton
                  onClick={() => resetField("contactEmail")}
                  title="Reset contact email"
                />
              </div>
              <input
                type="email"
                value={draft.contactEmail}
                onChange={(e) =>
                  updateFooterField("contactEmail", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact email..."
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
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Background Color
                </label>
                <ResetButton
                  onClick={() => resetField("bgColor")}
                  title="Reset background color"
                />
              </div>
              <ColorPicker
                color={draft.bgColor}
                onChange={(color) => updateFooterField("bgColor", color)}
                label="Background"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Text Color
                </label>
                <ResetButton
                  onClick={() => resetField("textColor")}
                  title="Reset text color"
                />
              </div>
              <ColorPicker
                color={draft.textColor}
                onChange={(color) => updateFooterField("textColor", color)}
                label="Text"
              />
            </div>
          </div>
        </div>

        {/* Reset All Section */}
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
            Reset All Footer to Default
          </button>
          <p className="text-xs text-orange-700 mt-2 text-center">
            This will restore the footer to its original state
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
