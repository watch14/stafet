"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ReturnToMainEditor from "./ReturnToMainEditor";

// Default navbar values for reset functionality
const defaultNavbarValues = {
  logo: "STAFET.",
  logoColor: "#000000",
  links: [
    { label: "Cases", href: "#" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
  ],
  linkColor: "#000000",
  cta: {
    label: "Work with us",
    href: "/contact",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
};

export default function NavBarEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navbar = useEditorStore((s) => s.navbar);
  const setNavbar = useEditorStore((s) => s.setNavbar);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(navbar);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(navbar);
    setHasChanges(false);
  }, [open, navbar]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(navbar);
    setHasChanges(changes);
  }, [draft, navbar]);

  // Real-time preview - update store immediately for preview
  const updateNavbarField = (field: string, value: any) => {
    const newDraft = { ...draft, [field]: value };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setNavbar(newDraft);
  };

  // Update CTA properties
  const updateCta = (field: string, value: string) => {
    const newCta = { ...draft.cta, [field]: value };
    updateNavbarField("cta", newCta);
  };

  // Reset individual field to default
  const resetField = (field: string) => {
    const defaultValue =
      defaultNavbarValues[field as keyof typeof defaultNavbarValues];
    if (defaultValue !== undefined) {
      updateNavbarField(field, defaultValue);
    }
  };

  // Reset CTA field to default
  const resetCtaField = (field: string) => {
    const defaultCta = defaultNavbarValues.cta;
    const defaultValue = defaultCta[field as keyof typeof defaultCta];
    if (defaultValue !== undefined) {
      updateCta(field, defaultValue);
    }
  };

  // Link management functions
  const addLink = () => {
    const newLink = { label: "New Link", href: "#" };
    const newLinks = [...draft.links, newLink];
    updateNavbarField("links", newLinks);
  };

  const removeLink = (index: number) => {
    if (draft.links.length <= 1) {
      alert("You must have at least one navigation link.");
      return;
    }
    const newLinks = draft.links.filter((_, i) => i !== index);
    updateNavbarField("links", newLinks);
  };

  const updateLink = (
    index: number,
    field: "label" | "href",
    value: string
  ) => {
    const newLinks = draft.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    updateNavbarField("links", newLinks);
  };

  // Reset entire component to default
  const resetComponent = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the entire navbar? This action cannot be undone."
      )
    ) {
      setDraft(defaultNavbarValues);
      setNavbar(defaultNavbarValues);
    }
  };

  const handleSave = () => {
    setNavbar(draft);
    setHasChanges(false);
    onClose();
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to cancel?"
        )
      ) {
        setDraft(navbar);
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
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
        setNavbar(navbar);
        setDraft(navbar);
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
    <SidePanel open={open} onClose={handleClose} title="Edit Navigation Bar">
      <ReturnToMainEditor />
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Real-time Navbar Editor
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
                  Logo Text
                </label>
                <ResetButton
                  onClick={() => resetField("logo")}
                  title="Reset logo text"
                />
              </div>
              <input
                type="text"
                value={draft.logo}
                onChange={(e) => updateNavbarField("logo", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter logo text..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">
                  Logo Color
                </label>
                <ResetButton
                  onClick={() => resetField("logoColor")}
                  title="Reset logo color"
                />
              </div>
              <ColorPicker
                color={draft.logoColor}
                onChange={(color) => updateNavbarField("logoColor", color)}
                label="Logo Color"
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        {draft.links.map((link, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Link {index + 1}
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                  {link.label}
                </div>
                {/* Reset entire link button */}
                {defaultNavbarValues.links[index] && (
                  <button
                    onClick={() => {
                      const defaultLink = defaultNavbarValues.links[index];
                      if (defaultLink) {
                        updateLink(index, "label", defaultLink.label);
                        updateLink(index, "href", defaultLink.href);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reset this link to default"
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
                )}
                {draft.links.length > 1 && (
                  <button
                    onClick={() => removeLink(index)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete this navigation link"
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
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Link Text
                    </label>
                    <ResetButton
                      onClick={() => {
                        const defaultLink = defaultNavbarValues.links[index];
                        if (defaultLink) {
                          updateLink(index, "label", defaultLink.label);
                        }
                      }}
                      title="Reset link text"
                    />
                  </div>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(index, "label", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter link text"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Link URL
                    </label>
                    <ResetButton
                      onClick={() => {
                        const defaultLink = defaultNavbarValues.links[index];
                        if (defaultLink) {
                          updateLink(index, "href", defaultLink.href);
                        }
                      }}
                      title="Reset link URL"
                    />
                  </div>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateLink(index, "href", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter link URL"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Link */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <button
            onClick={addLink}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
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
            Add New Link
          </button>
        </div>

        {/* CTA Button */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Call-to-Action Button
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Button Text
                </label>
                <ResetButton
                  onClick={() => resetCtaField("label")}
                  title="Reset button text"
                />
              </div>
              <input
                type="text"
                value={draft.cta.label}
                onChange={(e) => updateCta("label", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter CTA button text..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Button URL
                </label>
                <ResetButton
                  onClick={() => resetCtaField("href")}
                  title="Reset button URL"
                />
              </div>
              <input
                type="text"
                value={draft.cta.href}
                onChange={(e) => updateCta("href", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter button URL..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-900">
                  Button Color
                </label>
                <ResetButton
                  onClick={() => resetCtaField("bgColor")}
                  title="Reset button color"
                />
              </div>
              <ColorPicker
                color={draft.cta.bgColor}
                onChange={(color) => updateCta("bgColor", color)}
                label="CTA Button Color"
              />
            </div>
          </div>
        </div>

        {/* Component Reset */}
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
            Reset All Navbar to Default
          </button>
          <p className="text-xs text-orange-700 mt-2 text-center">
            This will restore the navbar to its original state
          </p>
        </div>
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
    </SidePanel>
  );
}
