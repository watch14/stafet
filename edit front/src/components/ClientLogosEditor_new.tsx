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
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

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
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Client Logos Section
              </h4>
              <p className="text-sm text-blue-700">
                Customize your client logos section with images and company
                names to showcase partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("content")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "content"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "style"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Style
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8 text-black">
          {activeTab === "content" && (
            <>
              {/* Section Settings */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Section Settings
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) =>
                        setDraft({ ...draft, title: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter the section title..."
                    />
                  </div>
                </div>
              </div>

              {/* Client Logos */}
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

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Logo Image
                          </label>
                          <ImageUploader
                            currentImage={logo.logo}
                            onImageSelect={(imageUrl) =>
                              updateLogo(index, "logo", imageUrl)
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={logo.alt}
                            onChange={(e) =>
                              updateLogo(index, "alt", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Logo alt text for accessibility"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "style" && (
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
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Background Color
                      </label>
                      <ColorPicker
                        color={draft.bgColor}
                        onChange={(color) =>
                          setDraft({ ...draft, bgColor: color })
                        }
                        label="Background"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Text Color
                      </label>
                      <ColorPicker
                        color={draft.textColor}
                        onChange={(color) =>
                          setDraft({ ...draft, textColor: color })
                        }
                        label="Text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
