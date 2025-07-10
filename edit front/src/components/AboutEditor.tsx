"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
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
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...about.content];
    newContent[index] = value;
    setAbout({ content: newContent });
  };

  const addParagraph = () => {
    setAbout({ content: [...about.content, ""] });
  };

  const removeParagraph = (index: number) => {
    const newContent = about.content.filter((_, i) => i !== index);
    setAbout({ content: newContent });
  };

  return (
    <SidePanel open={open} onClose={onClose} title="Edit About Section">
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
                value={about.title}
                onChange={(e) => setAbout({ title: e.target.value })}
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
                value={about.subtitle}
                onChange={(e) => setAbout({ subtitle: e.target.value })}
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
                {about.content.map((paragraph, index) => (
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
                    {about.content.length > 1 && (
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
                value={about.ctaText}
                onChange={(e) => setAbout({ ctaText: e.target.value })}
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
                onImageSelect={(url: string) => setAbout({ image: url })}
                currentImage={about.image}
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
                color={about.bgColor}
                onChange={(color) => setAbout({ bgColor: color })}
              />
            </div>

            {/* Title Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Color
              </label>
              <ColorPicker
                color={about.titleColor}
                onChange={(color) => setAbout({ titleColor: color })}
              />
            </div>

            {/* Text Color */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <ColorPicker
                color={about.textColor}
                onChange={(color) => setAbout({ textColor: color })}
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
                    color={about.ctaBgColor}
                    onChange={(color) => setAbout({ ctaBgColor: color })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Text Color
                  </label>
                  <ColorPicker
                    color={about.ctaTextColor}
                    onChange={(color) => setAbout({ ctaTextColor: color })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidePanel>
  );
}
