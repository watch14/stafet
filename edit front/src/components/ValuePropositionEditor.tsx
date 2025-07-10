"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";

export default function ValuePropositionEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const valueProposition = useEditorStore((s) => s.valueProposition);
  const setValueProposition = useEditorStore((s) => s.setValueProposition);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(valueProposition);

  React.useEffect(() => {
    setDraft(valueProposition);
  }, [open]);

  const handleSave = () => {
    setValueProposition(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(valueProposition);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel
      open={open}
      onClose={handleClose}
      title="Edit Value Proposition Section"
    >
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Edit Value Proposition
          </h3>
          <p className="text-xs text-blue-800">
            Customize your value proposition content and styling. Changes are
            saved automatically when you click "Save Changes".
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Content Settings
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Title
              </label>
              <textarea
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                rows={4}
                placeholder="Enter the value proposition title..."
              />
            </div>

            {/* Color Customization */}
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
                    onChange={(color) => setDraft({ ...draft, bgColor: color })}
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
