"use client";
import React, { useState, useRef } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

export default function HeroEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const hero = useEditorStore((s) => s.hero);
  const setHero = useEditorStore((s) => s.setHero);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(hero);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const fileInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDraft(hero);
  }, [open]);

  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDraft({
          ...draft,
          bgImage: ev.target?.result as string,
          bgType: "image",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setDraft({
      ...draft,
      bgImage: imageUrl,
      bgType: imageUrl ? "image" : "color",
    });
  };

  const handleSave = () => {
    setHero(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(hero);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Hero Section">
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
                Hero Section
              </h4>
              <p className="text-sm text-blue-700">
                Customize your hero section with title, subtitle, background,
                and call-to-action button.
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

        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Content Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Content Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Hero Title
                  </label>
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      value={draft.title}
                      onChange={(e) =>
                        setDraft({ ...draft, title: e.target.value })
                      }
                      rows={3}
                      placeholder="Enter hero title..."
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Title Color
                      </label>
                      <ColorPicker
                        color={draft.titleColor}
                        onChange={(c) => setDraft({ ...draft, titleColor: c })}
                        label="Title Color"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Subtitle
                  </label>
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      value={draft.subtitle}
                      onChange={(e) =>
                        setDraft({ ...draft, subtitle: e.target.value })
                      }
                      rows={4}
                      placeholder="Enter hero subtitle..."
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Subtitle Color
                      </label>
                      <ColorPicker
                        color={draft.subtitleColor}
                        onChange={(c) =>
                          setDraft({ ...draft, subtitleColor: c })
                        }
                        label="Subtitle Color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                🔘 Call-to-Action Button
              </h3>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={draft.button.text}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          button: { ...draft.button, text: e.target.value },
                        })
                      }
                      placeholder="Button text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={draft.button.href}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          button: { ...draft.button, href: e.target.value },
                        })
                      }
                      placeholder="Button URL"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Button Text Color
                      </label>
                      <ColorPicker
                        color={draft.button.textColor}
                        onChange={(c) =>
                          setDraft({
                            ...draft,
                            button: { ...draft.button, textColor: c },
                          })
                        }
                        label="Text Color"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Button Background Color
                      </label>
                      <ColorPicker
                        color={draft.button.bgColor}
                        onChange={(c) =>
                          setDraft({
                            ...draft,
                            button: { ...draft.button, bgColor: c },
                          })
                        }
                        label="Background Color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                🎨 Background Settings
              </h3>

              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Background Type
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDraft({ ...draft, bgType: "color" })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        draft.bgType === "color"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Color
                    </button>
                    <button
                      onClick={() => setDraft({ ...draft, bgType: "image" })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        draft.bgType === "image"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Image
                    </button>
                  </div>
                </div>

                {draft.bgType === "color" && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Background Color
                    </label>
                    <ColorPicker
                      color={draft.bgColor}
                      onChange={(c) => setDraft({ ...draft, bgColor: c })}
                      label="Background"
                    />
                  </div>
                )}

                {draft.bgType === "image" && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      📸 Background Image
                    </label>
                    <div className="space-y-3">
                      <ImageUploader
                        onImageSelect={handleImageSelect}
                        currentImage={draft.bgImage}
                      />
                      <div>
                        <label className="block text-xs font-medium text-gray-800 mb-2">
                          Or enter image URL manually:
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste image URL"
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={draft.bgType === "image" ? draft.bgImage : ""}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              bgImage: e.target.value,
                              bgType: "image",
                            })
                          }
                        />
                      </div>
                      {draft.bgImage && (
                        <div className="relative">
                          <img
                            src={draft.bgImage}
                            alt="Background preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => handleImageSelect("")}
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
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Title Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Color
              </label>
              <ColorPicker
                color={draft.titleColor}
                onChange={(color) => setDraft({ ...draft, titleColor: color })}
              />
            </div>

            {/* Subtitle Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle Color
              </label>
              <ColorPicker
                color={draft.subtitleColor}
                onChange={(color) =>
                  setDraft({ ...draft, subtitleColor: color })
                }
              />
            </div>

            {/* Background Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Background Settings
              </label>
              <div className="space-y-4">
                {draft.bgType === "color" && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Background Color
                    </label>
                    <ColorPicker
                      color={draft.bgColor}
                      onChange={(color) =>
                        setDraft({ ...draft, bgColor: color })
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button Colors */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Call-to-Action Button
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Background Color
                  </label>
                  <ColorPicker
                    color={draft.button.bgColor}
                    onChange={(color) =>
                      setDraft({
                        ...draft,
                        button: { ...draft.button, bgColor: color },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Text Color
                  </label>
                  <ColorPicker
                    color={draft.button.textColor}
                    onChange={(color) =>
                      setDraft({
                        ...draft,
                        button: { ...draft.button, textColor: color },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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
