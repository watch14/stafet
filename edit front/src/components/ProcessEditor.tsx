"use client";
import React, { useState, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ReturnToMainEditor from "./ReturnToMainEditor";
import ImageUploader from "./ImageUploader";

// Default process values for reset functionality
const defaultProcessValues = {
  processes: [
    {
      number: "01.",
      title: "WHAT",
      subtitle: "Calibrating your business targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#FFC6E7",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/WHAT.png",
    },
    {
      number: "02.",
      title: "WHY",
      subtitle: "Identifying why you haven't reached your potential",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#C6E7FF",
      bgColor: "#f5f5f5",
      textColor: "#000000",
      image: "/images/WHY.png",
    },
    {
      number: "03.",
      title: "HOW",
      subtitle: "Defining actions to reach your targets",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#C6FFC6",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/HOW.png",
    },
    {
      number: "04.",
      title: "ACTION",
      subtitle: "Making your vision a reality",
      description:
        "We are specialists at building solid end-to-end software solutions that help you reach your business targets. If your IP lies in commercial knowledge and processes you need software solutions sustaining these enabling you to scale your business.",
      titleBgColor: "#FFE5C6",
      bgColor: "#f5f5f5",
      textColor: "#000000",
      image: "/images/ACTION.png",
    },
  ],
};

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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setDraft(process);
    setHasChanges(false);
  }, [open, process]);

  // Check for changes whenever draft updates
  useEffect(() => {
    const changes = JSON.stringify(draft) !== JSON.stringify(process);
    setHasChanges(changes);
  }, [draft, process]);

  // Real-time preview - update store immediately for preview
  const updateProcessItem = (index: number, field: string, value: string) => {
    const updatedProcesses = [...draft.processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [field]: value };
    const newDraft = { processes: updatedProcesses };
    setDraft(newDraft);

    // Update store immediately for real-time preview
    setProcess(newDraft);
  };

  // Reset individual field to default
  const resetField = (index: number, field: string) => {
    const defaultProcess = defaultProcessValues.processes[index];
    if (
      defaultProcess &&
      defaultProcess[field as keyof typeof defaultProcess]
    ) {
      updateProcessItem(
        index,
        field,
        defaultProcess[field as keyof typeof defaultProcess] as string
      );
    }
  };

  // Reset entire process step to default
  const resetProcessStep = (index: number) => {
    const defaultProcess = defaultProcessValues.processes[index];
    if (defaultProcess) {
      const updatedProcesses = [...draft.processes];
      updatedProcesses[index] = { ...defaultProcess };
      const newDraft = { processes: updatedProcesses };
      setDraft(newDraft);
      setProcess(newDraft);
    }
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

    const newDraft = { processes: renumberedProcesses };
    setDraft(newDraft);
    setProcess(newDraft);
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
      image: "/images/WHAT.png",
    };

    const newDraft = { processes: [...draft.processes, newProcess] };
    setDraft(newDraft);
    setProcess(newDraft);
  };

  // Reset entire component to defaults
  const resetComponent = () => {
    if (
      confirm(
        "Are you sure you want to reset all processes to default values? This will overwrite all your changes."
      )
    ) {
      setDraft(defaultProcessValues);
      setProcess(defaultProcessValues);
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
      const shouldSave = confirm(
        "You have unsaved changes. Would you like to save them before closing?"
      );
      if (shouldSave) {
        handleSave();
        return;
      } else {
        // Revert changes
        setProcess(process);
        setDraft(process);
        setHasChanges(false);
      }
    }
    closeEditor();
    onClose();
  };

  // Reset button component
  const ResetButton = ({
    onClick,
    title,
  }: {
    onClick: () => void;
    title: string;
  }) => (
    <button
      onClick={onClick}
      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
      title={title}
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
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Process Section">
      <ReturnToMainEditor />
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Real-time Process Editor
          </h3>
          <p className="text-xs text-blue-800">
            Changes appear instantly on your website.{" "}
            {hasChanges && (
              <span className="font-medium text-orange-800">
                • Unsaved changes
              </span>
            )}
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
                {/* Reset entire step button */}
                {defaultProcessValues.processes[index] && (
                  <button
                    onClick={() => resetProcessStep(index)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reset this step to default"
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
                  </button>
                )}
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
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Step Number
                    </label>
                    <ResetButton
                      onClick={() => resetField(index, "number")}
                      title="Reset step number"
                    />
                  </div>
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
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Title
                    </label>
                    <ResetButton
                      onClick={() => resetField(index, "title")}
                      title="Reset title"
                    />
                  </div>
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
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Subtitle
                    </label>
                    <ResetButton
                      onClick={() => resetField(index, "subtitle")}
                      title="Reset subtitle"
                    />
                  </div>
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
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Description
                    </label>
                    <ResetButton
                      onClick={() => resetField(index, "description")}
                      title="Reset description"
                    />
                  </div>
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
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-900">
                    📸 Step Image
                  </label>
                  <ResetButton
                    onClick={() => resetField(index, "image")}
                    title="Reset image"
                  />
                </div>
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
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-800">
                        Background Color
                      </label>
                      <ResetButton
                        onClick={() => resetField(index, "bgColor")}
                        title="Reset background color"
                      />
                    </div>
                    <ColorPicker
                      color={item.bgColor}
                      onChange={(color) =>
                        updateProcessItem(index, "bgColor", color)
                      }
                      label="Background"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-800">
                        Text Color
                      </label>
                      <ResetButton
                        onClick={() => resetField(index, "textColor")}
                        title="Reset text color"
                      />
                    </div>
                    <ColorPicker
                      color={item.textColor}
                      onChange={(color) =>
                        updateProcessItem(index, "textColor", color)
                      }
                      label="Text"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-800">
                        Number Badge Color
                      </label>
                      <ResetButton
                        onClick={() => resetField(index, "titleBgColor")}
                        title="Reset badge color"
                      />
                    </div>
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

      {/* Reset Component Button */}
      <div className="bg-orange-50 p-4 mt-4 rounded-lg border border-orange-200">
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
          Reset All Processes to Default
        </button>
        <p className="text-xs text-orange-700 mt-2 text-center">
          This will restore all processes to their original state
        </p>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 bg-white p-6 mt-8">
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className={`w-full py-3 px-6 rounded-lg transition-colors font-medium text-sm shadow-sm flex items-center justify-center gap-2 ${
              hasChanges
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
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
            {hasChanges ? "Save Changes" : "No Changes to Save"}
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
            : "Changes are applied in real-time"}
        </p>
      </div>
    </SidePanel>
  );
}
