"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import SidePanel from "./SidePanel";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";

interface AboutEditorProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutEditor({ open, onClose }: AboutEditorProps) {
  const about = useEditorStore((s) => s.about);
  const setAbout = useEditorStore((s) => s.setAbout);
  const { closeEditor } = useEditorManager();
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [draft, setDraft] = useState(about);

  React.useEffect(() => {
    setDraft(about);
  }, [open]);

  const handleSave = () => {
    setAbout(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(about);
    closeEditor();
    onClose();
  };

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...draft.content];
    newContent[index] = value;
    setDraft({ ...draft, content: newContent });
  };

  const addParagraph = () => {
    setDraft({ ...draft, content: [...draft.content, ""] });
  };

  const removeParagraph = (index: number) => {
    const newContent = draft.content.filter((_, i) => i !== index);
    setDraft({ ...draft, content: newContent });
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit About Section">
      <div className="space-y-6 text-black">
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
                About Section
              </h4>
              <p className="text-sm text-blue-700">
                Customize your about section with image, title, content
                paragraphs, and call-to-action button.
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
            {/* Title */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <textarea
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="Enter main title..."
              />
            </div>

            {/* Subtitle */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={draft.subtitle}
                onChange={(e) =>
                  setDraft({ ...draft, subtitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subtitle..."
              />
            </div>

            {/* Content Paragraphs */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Content Paragraphs
                </label>
                <button
                  onClick={addParagraph}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
                  Add Paragraph
                </button>
              </div>
              <div className="space-y-3">
                {draft.content.map((paragraph, index) => (
                  <div key={index} className="relative">
                    <textarea
                      value={paragraph}
                      onChange={(e) =>
                        handleContentChange(index, e.target.value)
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder={`Paragraph ${index + 1}...`}
                    />
                    {draft.content.length > 1 && (
                      <button
                        onClick={() => removeParagraph(index)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Button Text
              </label>
              <input
                type="text"
                value={draft.ctaText}
                onChange={(e) =>
                  setDraft({ ...draft, ctaText: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter button text..."
              />
            </div>

            {/* Image */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Image
              </label>
              <ImageUploader
                onImageSelect={(url: string) =>
                  setDraft({ ...draft, image: url })
                }
                currentImage={draft.image}
              />
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Background Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <ColorPicker
                color={draft.bgColor}
                onChange={(color) => setDraft({ ...draft, bgColor: color })}
              />
            </div>

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

            {/* Text Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <ColorPicker
                color={draft.textColor}
                onChange={(color) => setDraft({ ...draft, textColor: color })}
              />
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
                    color={draft.ctaBgColor}
                    onChange={(color) =>
                      setDraft({ ...draft, ctaBgColor: color })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Text Color
                  </label>
                  <ColorPicker
                    color={draft.ctaTextColor}
                    onChange={(color) =>
                      setDraft({ ...draft, ctaTextColor: color })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save/Cancel Buttons */}
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
