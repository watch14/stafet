"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";

export default function NavBarEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navbar = useEditorStore((s) => s.navbar);
  const setNavbar = useEditorStore((s) => s.setNavbar);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(navbar);

  React.useEffect(() => {
    setDraft(navbar);
  }, [open]);

  const handleSave = () => {
    setNavbar(draft);
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(navbar);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Navbar">
      <div className="mb-4">
        <label className="block text-xs mb-1">Logo Text</label>
        <div className="flex gap-2 items-center">
          <input
            className="border px-2 py-1 rounded flex-1 text-black bg-white"
            value={draft.logo}
            onChange={(e) => setDraft({ ...draft, logo: e.target.value })}
          />
          <ColorPicker
            color={draft.logoColor}
            onChange={(c) => setDraft({ ...draft, logoColor: c })}
            label="Color"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs mb-1">Nav Links</label>
        <div className="flex gap-2 items-center mb-2">
          <span className="text-xs">Link Color:</span>
          <ColorPicker
            color={draft.linkColor}
            onChange={(c) => setDraft({ ...draft, linkColor: c })}
            label="Color"
          />
        </div>
        {draft.links.map((link, i) => (
          <div key={i} className="flex gap-2 mb-1 items-center">
            <input
              className="border px-2 py-1 rounded text-xs flex-1 text-black bg-white"
              value={link.label}
              onChange={(e) => {
                const links = [...draft.links];
                links[i] = { ...links[i], label: e.target.value };
                setDraft({ ...draft, links });
              }}
              placeholder="Label"
            />
            <input
              className="border px-2 py-1 rounded text-xs flex-1 text-black bg-white"
              value={link.href}
              onChange={(e) => {
                const links = [...draft.links];
                links[i] = { ...links[i], href: e.target.value };
                setDraft({ ...draft, links });
              }}
              placeholder="Href"
            />
            <button
              className="text-xs text-red-500"
              onClick={() => {
                const links = draft.links.filter((_, idx) => idx !== i);
                setDraft({ ...draft, links });
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-xs underline mt-1"
          onClick={() =>
            setDraft({
              ...draft,
              links: [...draft.links, { label: "New", href: "#" }],
            })
          }
        >
          Add Link
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-xs mb-1">CTA Button</label>
        <input
          className="border px-2 py-1 rounded text-xs w-full mb-1 text-black bg-white"
          value={draft.cta.label}
          onChange={(e) =>
            setDraft({ ...draft, cta: { ...draft.cta, label: e.target.value } })
          }
          placeholder="Label"
        />
        <input
          className="border px-2 py-1 rounded text-xs w-full mb-1 text-black bg-white"
          value={draft.cta.href}
          onChange={(e) =>
            setDraft({ ...draft, cta: { ...draft.cta, href: e.target.value } })
          }
          placeholder="Href"
        />
        <div className="flex gap-2 items-center">
          <ColorPicker
            color={draft.cta.textColor}
            onChange={(c) =>
              setDraft({ ...draft, cta: { ...draft.cta, textColor: c } })
            }
            label="Text"
          />
          <ColorPicker
            color={draft.cta.bgColor}
            onChange={(c) =>
              setDraft({ ...draft, cta: { ...draft.cta, bgColor: c } })
            }
            label="BG"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold w-full"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold w-full"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </SidePanel>
  );
}
