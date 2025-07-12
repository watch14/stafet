/**
 * HERO EDITOR - Hero Section Editing Interface
 * =============================================
 *
 * This is the editing interface for the Hero section that appears in the side panel.
 * It provides controls for:
 *
 * CONTENT TAB:
 * - Headline text editing
 * - Subtitle tex                      placeholder="Enter hero subtitle..."
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Subtitle Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("subtitleColor")} 
                          title="Reset subtitle color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.subtitleColor}
                        onChange={(c) =>
                          updateDraft({ subtitleColor: c })
                        } * - Call-to-action button text and link
 *
 * STYLE TAB:
 * - Text colors (headline and subtitle)
 * - Button colors (text and background)
 * - Background type (color or image)
 * - Background color picker
 * - Background image upload
 *
 * Features a draft system - changes are saved to a draft first, then applied
 * when "Save Changes" is clicked, allowing users to preview before committing.
 */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

// Default hero values for reset functionality
const defaultHeroValues = {
  title: "More than a traditional\nsoftware agency",
  subtitle:
    "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
  titleColor: "#000000",
  subtitleColor: "#000000",
  button: {
    text: "Work with us",
    href: "/contact",
    textColor: "#000000",
    bgColor: "#FFCEE5",
  },
  bgType: "color" as const,
  bgColor: "#6366F1",
  bgImage: "",
};

/**
 * Hero Editor Component
 * Provides complete editing interface for the Hero section
 */
export default function HeroEditor({
  open,
  onClose,
}: {
  open: boolean; // Whether the editor panel is open
  onClose: () => void; // Function to close the editor
}) {
  // Get current hero content and update function from store
  const hero = useEditorStore((s) => s.hero);
  const setHero = useEditorStore((s) => s.setHero);
  const { closeEditor } = useEditorManager();

  // Local draft state for real-time preview
  const [draft, setDraft] = useState(hero);
  const [hasChanges, setHasChanges] = useState(false);
  // Reference for file input element
  const fileInput = useRef<HTMLInputElement>(null);

  // Update draft when editor opens with fresh data
  useEffect(() => {
    setDraft(hero);
    setHasChanges(false);
  }, [open, hero]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(hero);
    setHasChanges(changes);
  }, [draft, hero]);

  // Real-time preview - update store immediately
  const updateDraft = (updates: Partial<typeof draft>) => {
    const newDraft = { ...draft, ...updates };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setHero(newDraft);
  };

  // Update button properties
  const updateButton = (updates: Partial<typeof draft.button>) => {
    const newButton = { ...draft.button, ...updates };
    updateDraft({ button: newButton });
  };

  // Reset individual field to default
  const resetField = (field: string) => {
    if (field.startsWith('button.')) {
      const buttonField = field.replace('button.', '');
      const defaultValue = (defaultHeroValues.button as any)[buttonField];
      if (defaultValue !== undefined) {
        updateButton({ [buttonField]: defaultValue });
      }
    } else {
      const defaultValue = (defaultHeroValues as any)[field];
      if (defaultValue !== undefined) {
        updateDraft({ [field]: defaultValue });
      }
    }
  };

  // Handle background image file upload
  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateDraft({
          bgImage: ev.target?.result as string,
          bgType: "image", // Switch to image background type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image selection from image library
  const handleImageSelect = (imageUrl: string) => {
    updateDraft({
      bgImage: imageUrl,
      bgType: imageUrl ? "image" : "color", // Switch background type based on image
    });
  };

  // Reset entire component to defaults
  const resetComponent = () => {
    if (confirm("Are you sure you want to reset the hero section to default values? This will overwrite all your changes.")) {
      setDraft(defaultHeroValues);
      setHero(defaultHeroValues);
      setHasChanges(false);
    }
  };

  // Save draft changes to the actual hero content
  const handleSave = () => {
    setHasChanges(false);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    if (hasChanges) {
      const shouldSave = confirm("You have unsaved changes. Would you like to save them before closing?");
      if (shouldSave) {
        handleSave();
        return;
      } else {
        // Revert changes
        setHero(hero);
        setDraft(hero);
        setHasChanges(false);
      }
    }
    closeEditor();
    onClose();
  };

  // Reset button component
  const ResetButton = ({ onClick, title }: { onClick: () => void; title: string }) => (
    <button
      onClick={onClick}
      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
      title={title}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Hero Section">
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Real-time Hero Editor
          </h3>
          <p className="text-xs text-blue-800">
            Changes appear instantly on your website. {hasChanges && (
              <span className="font-medium text-orange-800">• Unsaved changes</span>
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <div className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
              Hero Content & Style
            </div>
          </nav>
        </div>

        <div className="space-y-6">
            {/* Content Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Content Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Hero Title
                    </label>
                    <ResetButton 
                      onClick={() => resetField("title")} 
                      title="Reset title"
                    />
                  </div>
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      value={draft.title}
                      onChange={(e) =>
                        updateDraft({ title: e.target.value })
                      }
                      rows={3}
                      placeholder="Enter hero title..."
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Title Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("titleColor")} 
                          title="Reset title color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.titleColor}
                        onChange={(c) => updateDraft({ titleColor: c })}
                        label="Title Color"
                      />
                    </div>
                  </div>
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
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      value={draft.subtitle}
                      onChange={(e) =>
                        updateDraft({ subtitle: e.target.value })
                      }
                      rows={4}
                      placeholder="Enter hero subtitle..."
                    />
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Subtitle Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("subtitleColor")} 
                          title="Reset subtitle color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.subtitleColor}
                        onChange={(c) =>
                          updateDraft({ subtitleColor: c })
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
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Button Text
                      </label>
                      <ResetButton 
                        onClick={() => resetField("button.text")} 
                        title="Reset button text"
                      />
                    </div>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={draft.button.text}
                      onChange={(e) =>
                        updateButton({ text: e.target.value })
                      }
                      placeholder="Button text"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Button Link
                      </label>
                      <ResetButton 
                        onClick={() => resetField("button.href")} 
                        title="Reset button link"
                      />
                    </div>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={draft.button.href}
                      onChange={(e) =>
                        updateButton({ href: e.target.value })
                      }
                      placeholder="Button URL"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Button Text Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("button.textColor")} 
                          title="Reset button text color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.button.textColor}
                        onChange={(c) =>
                          updateButton({ textColor: c })
                        }
                        label="Text Color"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Button Background Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("button.bgColor")} 
                          title="Reset button background color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.button.bgColor}
                        onChange={(c) =>
                          updateButton({ bgColor: c })
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
                      onClick={() => updateDraft({ bgType: "color" })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        draft.bgType === "color"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Color
                    </button>
                    <button
                      onClick={() => updateDraft({ bgType: "image" })}
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
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-900">
                        Background Color
                      </label>
                      <ResetButton 
                        onClick={() => resetField("bgColor")} 
                        title="Reset background color"
                      />
                    </div>
                    <ColorPicker
                      color={draft.bgColor}
                      onChange={(c) => updateDraft({ bgColor: c })}
                      label="Background"
                    />
                  </div>
                )}

                {draft.bgType === "image" && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-900">
                        📸 Background Image
                      </label>
                      <ResetButton 
                        onClick={() => resetField("bgImage")} 
                        title="Reset background image"
                      />
                    </div>
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
                            updateDraft({
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
        </div>

      {/* Reset Component Button */}
      <div className="bg-orange-50 p-4 mt-8 rounded-lg border border-orange-200">
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
          Reset Hero Section to Default
        </button>
        <p className="text-xs text-orange-700 mt-2 text-center">
          This will restore the hero section to its original state
        </p>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 bg-white p-6 mt-8">
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className={`w-full py-3 px-6 rounded-lg transition-colors font-medium text-sm shadow-sm flex items-center justify-center gap-2 ${
              hasChanges 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
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
            {hasChanges ? 'Save Changes' : 'No Changes to Save'}
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
            : "Changes are applied in real-time"
          }
        </p>
      </div>
    </SidePanel>
  );
}
