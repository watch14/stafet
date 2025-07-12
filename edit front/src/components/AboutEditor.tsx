"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import SidePanel from "./SidePanel";
import ColorPicker from "./ColorPicker";
import ImageUploader from "./ImageUploader";

// Default about values for reset functionality
const defaultAboutValues = {
  title: "Solving business problems with solid software",
  subtitle: "",
  content: [
    "STAFET is a team of experienced entrepreneurs and engineers with experience from companies such as Microsoft, bp, consultancies and co-founded startups.",
    "We have had our hands dirty from working with many different organisations. Each is different in its own way. Meaning most organisations need tailored solutions to improve their business. Together with our passion for building great software with real impact.",
    "We empower you and your team to focus on your core business while we handle the technical side.",
    "If you are curious to know more about how we help optimizing our clients' budget, enhancing efficiency, and foster growth by unlocking the untapped potential.",
    "Feel free to reach out.",
  ],
  ctaText: "Get in contact",
  bgColor: "#ffffff",
  titleColor: "#000000",
  textColor: "#6b7280",
  ctaBgColor: "#fecaca",
  ctaTextColor: "#dc2626",
  image: "/images/About.png",
};

interface AboutEditorProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutEditor({ open, onClose }: AboutEditorProps) {
  const about = useEditorStore((s) => s.about);
  const setAbout = useEditorStore((s) => s.setAbout);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(about);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(about);
    setHasChanges(false);
  }, [open, about]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(about);
    setHasChanges(changes);
  }, [draft, about]);

  // Real-time preview - update store immediately
  const updateDraft = (updates: Partial<typeof draft>) => {
    const newDraft = { ...draft, ...updates };
    setDraft(newDraft);
    // Update store immediately for real-time preview
    setAbout(newDraft);
  };

  // Reset individual field to default
  const resetField = (field: string) => {
    const defaultValue = (defaultAboutValues as any)[field];
    if (defaultValue !== undefined) {
      updateDraft({ [field]: defaultValue });
    }
  };

  // Reset entire component to defaults
  const resetComponent = () => {
    if (confirm("Are you sure you want to reset the about section to default values? This will overwrite all your changes.")) {
      setDraft(defaultAboutValues);
      setAbout(defaultAboutValues);
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
      const shouldSave = confirm("You have unsaved changes. Would you like to save them before closing?");
      if (shouldSave) {
        handleSave();
        return;
      } else {
        // Revert changes
        setAbout(about);
        setDraft(about);
        setHasChanges(false);
      }
    }
    closeEditor();
    onClose();
  };

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...draft.content];
    newContent[index] = value;
    updateDraft({ content: newContent });
  };

  const addParagraph = () => {
    updateDraft({ content: [...draft.content, ""] });
  };

  const removeParagraph = (index: number) => {
    const newContent = draft.content.filter((_, i) => i !== index);
    updateDraft({ content: newContent });
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
    <SidePanel open={open} onClose={handleClose} title="Edit About Section">
      <div className="space-y-6 text-black">
        {/* Info Box */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Real-time About Editor
          </h3>
          <p className="text-xs text-blue-800">
            Changes appear instantly on your website. {hasChanges && (
              <span className="font-medium text-orange-800">• Unsaved changes</span>
            )}
          </p>
        </div>

        <div className="space-y-6">
            {/* About Content Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Content Settings
              </h3>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Title
                    </label>
                    <ResetButton 
                      onClick={() => resetField("title")} 
                      title="Reset title"
                    />
                  </div>
                  <textarea
                    value={draft.title}
                    onChange={(e) => updateDraft({ title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    rows={2}
                    placeholder="Enter main title..."
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Subtitle (Optional)
                    </label>
                    <ResetButton 
                      onClick={() => resetField("subtitle")} 
                      title="Reset subtitle"
                    />
                  </div>
                  <input
                    type="text"
                    value={draft.subtitle}
                    onChange={(e) => updateDraft({ subtitle: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter subtitle..."
                  />
                </div>

                {/* Content Paragraphs */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Content Paragraphs
                      </label>
                      <ResetButton 
                        onClick={() => resetField("content")} 
                        title="Reset all content paragraphs"
                      />
                    </div>
                    <button
                      onClick={addParagraph}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
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
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          rows={3}
                          placeholder={`Paragraph ${index + 1}...`}
                        />
                        {draft.content.length > 1 && (
                          <button
                            onClick={() => removeParagraph(index)}
                            className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Remove this paragraph"
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

                </div>

                {/* CTA Button */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Call-to-Action Button Text
                    </label>
                    <ResetButton 
                      onClick={() => resetField("ctaText")} 
                      title="Reset CTA button text"
                    />
                  </div>
                  <input
                    type="text"
                    value={draft.ctaText}
                    onChange={(e) => updateDraft({ ctaText: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter button text..."
                  />
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  📸 About Image
                </h3>
                <ResetButton 
                  onClick={() => resetField("image")} 
                  title="Reset image"
                />
              </div>
              <ImageUploader
                onImageSelect={(url: string) => updateDraft({ image: url })}
                currentImage={draft.image}
              />
            </div>

            {/* Style Settings */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                🎨 Color Settings
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {/* Background Color */}
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
                    onChange={(color) => updateDraft({ bgColor: color })}
                    label="Background"
                  />
                </div>

                {/* Title Color */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-900">
                      Title Color
                    </label>
                    <ResetButton 
                      onClick={() => resetField("titleColor")} 
                      title="Reset title color"
                    />
                  </div>
                  <ColorPicker
                    color={draft.titleColor}
                    onChange={(color) => updateDraft({ titleColor: color })}
                    label="Title"
                  />
                </div>

                {/* Text Color */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-900">
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

                {/* CTA Button Colors */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    CTA Button Colors
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Button Background Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("ctaBgColor")} 
                          title="Reset CTA background color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.ctaBgColor}
                        onChange={(color) => updateDraft({ ctaBgColor: color })}
                        label="CTA Background"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-800">
                          Button Text Color
                        </label>
                        <ResetButton 
                          onClick={() => resetField("ctaTextColor")} 
                          title="Reset CTA text color"
                        />
                      </div>
                      <ColorPicker
                        color={draft.ctaTextColor}
                        onChange={(color) => updateDraft({ ctaTextColor: color })}
                        label="CTA Text"
                      />
                    </div>
                  </div>
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
          Reset About Section to Default
        </button>
        <p className="text-xs text-orange-700 mt-2 text-center">
          This will restore the about section to its original state
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
