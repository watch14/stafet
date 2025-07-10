"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";
import ImageUploader from "./ImageUploader";

export default function ClientLogosEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const clientLogos = useEditorStore((s) => s.clientLogos);
  const setClientLogos = useEditorStore((s) => s.setClientLogos);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(clientLogos);

  React.useEffect(() => {
    setDraft(clientLogos);
  }, [open]);

  const updateLogo = (index: number, field: string, value: string) => {
    const updatedLogos = [...draft.logos];
    updatedLogos[index] = { ...updatedLogos[index], [field]: value };
    setDraft({ ...draft, logos: updatedLogos });
  };

  const handleSave = () => {
    setClientLogos(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(clientLogos);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel
      open={open}
      onClose={handleClose}
      title="Edit Client Logos Section"
    >
      <div className="space-y-6 text-black">
        <div>
          <label className="block text-xs font-medium mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full p-2 border rounded text-sm"
            placeholder="Enter the section title..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-medium">Client Logos</label>
          {draft.logos.map((logo, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3 text-sm">Logo {index + 1}</h4>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={logo.name}
                    onChange={(e) => updateLogo(index, "name", e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">
                    Logo Image Path
                  </label>
                  <input
                    type="text"
                    value={logo.logo}
                    onChange={(e) => updateLogo(index, "logo", e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="/images/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={logo.alt}
                    onChange={(e) => updateLogo(index, "alt", e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Logo alt text"
                  />
                </div>
              </div>
            </div>
          ))}
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
