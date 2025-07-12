"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";
import SidePanel from "./SidePanel";

// Default client logos values for reset functionality
const defaultClientLogosValues = {
  title: "Trusted by leading companies",
  bgColor: "#FFFFFF",
  textColor: "#000000",
  logos: [
    { name: "Company 1", logo: "/images/logo.png", alt: "Company 1" },
    { name: "Company 2", logo: "/images/logo-2.png", alt: "Company 2" },
  ],
};

export default function ClientLogosEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const clientLogos = useEditorStore((s) => s.clientLogos);
  const setClientLogos = useEditorStore((s) => s.setClientLogos);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(clientLogos);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(clientLogos);
    setHasChanges(false);
  }, [open, clientLogos]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(clientLogos);
    setHasChanges(changes);
  }, [draft, clientLogos]);

  // Real-time preview - update store immediately
  const updateDraft = (updates: Partial<typeof draft>) => {
    const newDraft = { ...draft, ...updates };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setClientLogos(newDraft);
  };

  // Update a specific logo
  const updateLogo = (
    index: number,
    updates: Partial<(typeof draft.logos)[0]>
  ) => {
    const newLogos = [...draft.logos];
    newLogos[index] = { ...newLogos[index], ...updates };
    updateDraft({ logos: newLogos });
  };

  // Add a new logo
  const addLogo = () => {
    const newLogo = {
      name: `Company ${draft.logos.length + 1}`,
      logo: "/images/logo.png",
      alt: `Company ${draft.logos.length + 1}`,
    };
    updateDraft({ logos: [...draft.logos, newLogo] });
  };

  // Remove a logo
  const removeLogo = (index: number) => {
    if (draft.logos.length > 1) {
      const newLogos = draft.logos.filter((_, i) => i !== index);
      updateDraft({ logos: newLogos });
    }
  };

  // Reset individual field to default
  const resetField = (field: string) => {
    const defaultValue = (defaultClientLogosValues as any)[field];
    if (defaultValue !== undefined) {
      updateDraft({ [field]: defaultValue });
    }
  };

  // Reset individual logo to default
  const resetLogo = (index: number) => {
    if (index < defaultClientLogosValues.logos.length) {
      updateLogo(index, defaultClientLogosValues.logos[index]);
    }
  };

  // Reset entire component to defaults
  const resetComponent = () => {
    if (
      confirm(
        "Are you sure you want to reset the client logos section to default values? This will overwrite all your changes."
      )
    ) {
      setDraft(defaultClientLogosValues);
      setClientLogos(defaultClientLogosValues);
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
        setClientLogos(clientLogos);
        setDraft(clientLogos);
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
      title="Edit Client Logos Section"
    >
      <div className="space-y-8 text-black">
        {/* Info Box */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Real-time Client Logos Editor
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
            Content Settings
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

            {/* Logos */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Client Logos
                </label>
                <button
                  onClick={addLogo}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium flex items-center gap-1"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Logo
                </button>
              </div>

              <div className="space-y-4">
                {draft.logos.map((logo, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Logo {index + 1}
                      </h4>
                      <div className="flex items-center gap-2">
                        <ResetButton
                          onClick={() => resetLogo(index)}
                          title="Reset this logo"
                        />
                        {draft.logos.length > 1 && (
                          <button
                            onClick={() => removeLogo(index)}
                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Remove this logo"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-800 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={logo.name}
                          onChange={(e) =>
                            updateLogo(index, {
                              name: e.target.value,
                              alt: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter company name..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-800 mb-1">
                          Logo Image
                        </label>
                        <ImageUploader
                          currentImage={logo.logo}
                          onImageSelect={(newLogo) =>
                            updateLogo(index, { logo: newLogo })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
            Reset Client Logos to Default
          </button>
          <p className="text-xs text-orange-700 mt-2 text-center">
            This will restore the client logos section to its original state
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
