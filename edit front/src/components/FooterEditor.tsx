"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import ColorPicker from "./ColorPicker";
import AppModal from "./AppModal";

export default function FooterEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const footer = useEditorStore((s) => s.footer);
  const setFooter = useEditorStore((s) => s.setFooter);
  const [draft, setDraft] = useState(footer);

  React.useEffect(() => {
    setDraft(footer);
  }, [open]);

  const updateCustomerLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...draft.customerLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setDraft({ ...draft, customerLinks: updatedLinks });
  };

  const handleSave = () => {
    setFooter(draft);
    onClose();
  };

  return (
    <AppModal open={open} onClose={onClose} title="Edit Footer Section">
      <div className="space-y-6">
        {/* Customer Section */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-4 text-sm">Customer Section</h3>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1">
              Customer Title
            </label>
            <input
              type="text"
              value={draft.customerTitle}
              onChange={(e) =>
                setDraft({ ...draft, customerTitle: e.target.value })
              }
              className="w-full p-2 border rounded text-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium">Customer Links</label>
            {draft.customerLinks.map((link, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) =>
                    updateCustomerLink(index, "label", e.target.value)
                  }
                  placeholder="Link text"
                  className="p-2 border rounded text-sm"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) =>
                    updateCustomerLink(index, "href", e.target.value)
                  }
                  placeholder="Link URL"
                  className="p-2 border rounded text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-4 text-sm">Contact Section</h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">
                Contact Title
              </label>
              <input
                type="text"
                value={draft.contactTitle}
                onChange={(e) =>
                  setDraft({ ...draft, contactTitle: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Contact Text
              </label>
              <input
                type="text"
                value={draft.contactText}
                onChange={(e) =>
                  setDraft({ ...draft, contactText: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={draft.contactEmail}
                onChange={(e) =>
                  setDraft({ ...draft, contactEmail: e.target.value })
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-4 text-sm">Colors</h3>

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
              <label className="block text-xs font-medium mb-1">
                Text Color
              </label>
              <ColorPicker
                color={draft.textColor}
                onChange={(color) => setDraft({ ...draft, textColor: color })}
                label="Text"
              />
            </div>
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
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
}
