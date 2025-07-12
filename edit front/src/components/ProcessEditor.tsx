"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

export default function ProcessEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const process = useEditorStore((s) => s.process);
  const setProcess = useEditorStore((s) => s.setProcess);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(process);

  React.useEffect(() => {
    setDraft(process);
  }, [open]);

  const updateProcessItem = (index: number, field: string, value: string) => {
    const updatedProcesses = [...draft.processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [field]: value };
    setDraft({ processes: updatedProcesses });
  };

  const removeProcess = (index: number) => {
    if (draft.processes.length <= 1) {
      alert("You must have at least one process step.");
      return;
    }

    const updatedProcesses = draft.processes.filter((_, i) => i !== index);
    // Renumber the remaining processes
    const renumberedProcesses = updatedProcesses.map((process, i) => ({
      ...process,
      number: (i + 1).toString().padStart(2, "0") + ".",
    }));

    setDraft({ processes: renumberedProcesses });
  };

  const addProcess = () => {
    const newProcessNumber =
      (draft.processes.length + 1).toString().padStart(2, "0") + ".";
    const newProcess = {
      number: newProcessNumber,
      title: "NEW",
      subtitle: "Enter your process subtitle",
      description:
        "Enter your process description here. This should explain what happens in this step of your process.",
      titleBgColor: "#E5E7EB",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/WHAT.png", // Default image
    };

    setDraft({ processes: [...draft.processes, newProcess] });
  };

  const handleSave = () => {
    setProcess(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(process); // Reset to original state
    closeEditor();
    onClose();
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Process Section">
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Edit Process Steps
          </h3>
          <p className="text-xs text-blue-800">
            Customize each step in your process flow. You can add, remove, and
            reorder steps. Changes are saved when you click "Save Changes".
          </p>
        </div>

        {draft.processes.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Step {index + 1}
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                  {item.number}
                </div>
                {draft.processes.length > 1 && (
                  <button
                    onClick={() => removeProcess(index)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete this process step"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Step Number
                  </label>
                  <input
                    type="text"
                    value={item.number}
                    onChange={(e) =>
                      updateProcessItem(index, "number", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., 01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateProcessItem(index, "title", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter step title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(e) =>
                      updateProcessItem(index, "subtitle", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter step subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateProcessItem(index, "description", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    rows={4}
                    placeholder="Describe this step in detail..."
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  📸 Step Image
                </label>
                <ImageUploader
                  onImageSelect={(imageUrl) =>
                    updateProcessItem(index, "image", imageUrl)
                  }
                  currentImage={item.image}
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
                      color={item.bgColor}
                      onChange={(color) =>
                        updateProcessItem(index, "bgColor", color)
                      }
                      label="Background"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Text Color
                    </label>
                    <ColorPicker
                      color={item.textColor}
                      onChange={(color) =>
                        updateProcessItem(index, "textColor", color)
                      }
                      label="Text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Number Badge Color
                    </label>
                    <ColorPicker
                      color={item.titleBgColor}
                      onChange={(color) =>
                        updateProcessItem(index, "titleBgColor", color)
                      }
                      label="Number Badge"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Process Button */}
      <div className="bg-green-50 p-4 mt-8 rounded-lg border border-green-200">
        <button
          onClick={addProcess}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
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
          Add New Process Step
        </button>
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
