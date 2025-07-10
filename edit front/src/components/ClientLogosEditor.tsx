"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

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

  React.useEffect(() => {
    setDraft(clientLogos);
  }, [open]);

  const updateLogo = (index: number, field: string, value: string) => {
    const updatedLogos = [...draft.logos];
    updatedLogos[index] = { ...updatedLogos[index], [field]: value };
    setDraft({ ...draft, logos: updatedLogos });
  };

  const addLogo = () => {
    const newLogo = { name: "", logo: "", alt: "" };
    setDraft({ ...draft, logos: [...draft.logos, newLogo] });
  };

  const removeLogo = (index: number) => {
    if (draft.logos.length > 1) {
      const updatedLogos = draft.logos.filter((_, i) => i !== index);
      setDraft({ ...draft, logos: updatedLogos });
    }
  };

  const handleSave = () => {
    setClientLogos(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(clientLogos);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel
      open={open}
      onClose={handleClose}
      title="Edit Client Logos Section"
    >
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            🏢 Edit Client Logos
          </h3>
          <p className="text-xs text-blue-800">
            Customize your client logos section. Upload images or enter URLs for
            each logo. Changes are saved when you click "Save Changes".
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Section Settings
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter the section title..."
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Client Logos
            </h3>
            <button
              onClick={addLogo}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
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
              Add Logo
            </button>
          </div>

          <div className="space-y-6">
            {draft.logos.map((logo, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Logo {index + 1}
                  </h4>
                  {draft.logos.length > 1 && (
                    <button
                      onClick={() => removeLogo(index)}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
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
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={logo.name}
                      onChange={(e) =>
                        updateLogo(index, "name", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Company name"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      📸 Logo Image
                    </label>
                    <div className="space-y-3">
                      <ImageUploader
                        currentImage={logo.logo}
                        onImageSelect={(imageUrl) =>
                          updateLogo(index, "logo", imageUrl)
                        }
                      />
                      <div>
                        <label className="block text-xs font-medium text-gray-800 mb-2">
                          Or enter image URL manually:
                        </label>
                        <input
                          type="text"
                          value={logo.logo}
                          onChange={(e) =>
                            updateLogo(index, "logo", e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="/images/logo.png or https://..."
                        />
                      </div>
                      {logo.logo && (
                        <div className="relative">
                          <img
                            src={logo.logo}
                            alt={logo.alt || logo.name}
                            className="w-full h-24 object-contain rounded-lg border border-gray-200 bg-white p-2"
                          />
                          <button
                            onClick={() => updateLogo(index, "logo", "")}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
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
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={logo.alt}
                      onChange={(e) => updateLogo(index, "alt", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Logo alt text for accessibility"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🎨 Color Customization
          </h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Background Color
                </label>
                <ColorPicker
                  color={draft.bgColor}
                  onChange={(color) => setDraft({ ...draft, bgColor: color })}
                  label="Background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Text Color
                </label>
                <ColorPicker
                  color={draft.textColor}
                  onChange={(color) => setDraft({ ...draft, textColor: color })}
                  label="Text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 bg-white p-6 mt-8">
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm flex items-center justify-center gap-2"
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
            Save Changes
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
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          Changes will be applied to your live website
        </p>
      </div>
    </SidePanel>
  );
}
