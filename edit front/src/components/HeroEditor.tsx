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
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            🎯 Edit Hero Section
          </h3>
          <p className="text-xs text-blue-800">
            Customize your main hero section including title, subtitle, button,
            and background. Changes are saved when you click "Save Changes".
          </p>
        </div>

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
                    onChange={(c) => setDraft({ ...draft, subtitleColor: c })}
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
