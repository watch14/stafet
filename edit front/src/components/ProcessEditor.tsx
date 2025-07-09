"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import ColorPicker from "./ColorPicker";
import AppModal from "./AppModal";
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
  const [draft, setDraft] = useState(process);

  React.useEffect(() => {
    setDraft(process);
  }, [open]);

  const updateProcessItem = (index: number, field: string, value: string) => {
    const updatedProcesses = [...draft.processes];
    updatedProcesses[index] = { ...updatedProcesses[index], [field]: value };
    setDraft({ processes: updatedProcesses });
  };

  const handleSave = () => {
    setProcess(draft);
    onClose();
  };

  return (
    <AppModal open={open} onClose={onClose} title="Edit Process Section">
      <div className="space-y-6">
        {draft.processes.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-medium mb-4 text-sm">Process {index + 1}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Number</label>
                <input
                  type="text"
                  value={item.number}
                  onChange={(e) =>
                    updateProcessItem(index, "number", e.target.value)
                  }
                  className="w-full p-2 border rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    updateProcessItem(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={item.subtitle}
                onChange={(e) =>
                  updateProcessItem(index, "subtitle", e.target.value)
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium mb-1">
                Description
              </label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateProcessItem(index, "description", e.target.value)
                }
                className="w-full p-2 border rounded text-sm h-20"
              />
            </div>

            {/* Image Upload Section */}
            <div className="mt-4">
              <label className="block text-xs font-medium mb-1">
                Process Image
              </label>
              <div className="border rounded-lg p-4">
                <ImageUploader
                  onImageSelect={(imageUrl) =>
                    updateProcessItem(index, "image", imageUrl)
                  }
                  currentImage={item.image}
                />
                {item.image && (
                  <div className="mt-2">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium mb-1">
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
                <label className="block text-xs font-medium mb-1">
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
                <label className="block text-xs font-medium mb-1">
                  Title Background
                </label>
                <ColorPicker
                  color={item.titleBgColor}
                  onChange={(color) =>
                    updateProcessItem(index, "titleBgColor", color)
                  }
                  label="Title BG"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm"
        >
          Save Changes
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
}
