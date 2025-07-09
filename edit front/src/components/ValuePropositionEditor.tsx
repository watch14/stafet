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
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium mb-1">Title</label>
          <textarea
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full p-2 border rounded text-sm h-20"
            placeholder="Enter the value proposition title..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">
              Background Color
            </label>
            <ColorPicker
              color={draft.bgColor}
              onChange={(color) => setDraft({ ...draft, bgColor: color })}
              label="Background"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Text Color</label>
            <ColorPicker
              color={draft.textColor}
              onChange={(color) => setDraft({ ...draft, textColor: color })}
              label="Text"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm"
        >
          Save Changes
        </button>
        <button
          onClick={handleClose}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </SidePanel>
  );
}
