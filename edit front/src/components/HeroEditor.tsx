"use client";
import React, { useState, useRef } from "react";
import { useEditorStore } from "../store/editorStore";
import ColorPicker from "./ColorPicker";
import AppModal from "./AppModal";
import ImageUploader from "./ImageUploader";

export default function HeroEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const hero = useEditorStore((s) => s.hero);
  const setHero = useEditorStore((s) => s.setHero);
  const [draft, setDraft] = useState(hero);
  const fileInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDraft(hero);
  }, [open]);

  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDraft({
          ...draft,
          bgImage: ev.target?.result as string,
          bgType: "image",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setDraft({
      ...draft,
      bgImage: imageUrl,
      bgType: imageUrl ? "image" : "color",
    });
  };

  return (
    <AppModal open={open} onClose={onClose} title="Edit Hero Section">
      <div className="mb-4">
        <label className="block text-xs sm:text-sm mb-1 font-medium">
          Title
        </label>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mb-3">
          <textarea
            className="border border-gray-300 px-3 py-2 rounded-lg flex-1 text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            rows={2}
            placeholder="Enter hero title..."
          />
          <div className="w-full sm:w-auto">
            <ColorPicker
              color={draft.titleColor}
              onChange={(c) => setDraft({ ...draft, titleColor: c })}
              label="Color"
            />
          </div>
        </div>
        <label className="block text-xs sm:text-sm mb-1 font-medium">
          Subtitle
        </label>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end mb-4">
          <textarea
            className="border border-gray-300 px-3 py-2 rounded-lg flex-1 text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={draft.subtitle}
            onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
            rows={3}
            placeholder="Enter hero subtitle..."
          />
          <div className="w-full sm:w-auto">
            <ColorPicker
              color={draft.subtitleColor}
              onChange={(c) => setDraft({ ...draft, subtitleColor: c })}
              label="Color"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm mb-2 font-medium">
          Button Settings
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1 text-gray-600">
              Button Text
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded-lg w-full text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={draft.button.text}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  button: { ...draft.button, text: e.target.value },
                })
              }
              placeholder="Enter button text..."
            />
          </div>
          <div>
            <label className="block text-xs mb-1 text-gray-600">
              Button Link
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded-lg w-full text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={draft.button.href}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  button: { ...draft.button, href: e.target.value },
                })
              }
              placeholder="Enter link URL..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <ColorPicker
                color={draft.button.textColor}
                onChange={(c) =>
                  setDraft({
                    ...draft,
                    button: { ...draft.button, textColor: c },
                  })
                }
                label="Text Color"
              />
            </div>
            <div>
              <ColorPicker
                color={draft.button.bgColor}
                onChange={(c) =>
                  setDraft({
                    ...draft,
                    button: { ...draft.button, bgColor: c },
                  })
                }
                label="Background"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-xs sm:text-sm mb-2 font-medium">
          Background
        </label>
        <div className="space-y-3">
          <div>
            <ColorPicker
              color={draft.bgColor}
              onChange={(c) =>
                setDraft({ ...draft, bgColor: c, bgType: "color" })
              }
              label="Background Color"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 text-gray-600">
              Background Image
            </label>
            <ImageUploader
              onImageSelect={handleImageSelect}
              currentImage={
                draft.bgType === "image" ? draft.bgImage : undefined
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Or paste image URL"
              className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={draft.bgType === "image" ? draft.bgImage : ""}
              onChange={(e) =>
                setDraft({ ...draft, bgImage: e.target.value, bgType: "image" })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium w-full hover:bg-blue-700 transition-colors text-sm sm:text-base"
          onClick={() => {
            setHero(draft);
            console.log("[SAVE HERO]", draft);
            onClose();
          }}
        >
          Save Changes
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium w-full hover:bg-gray-300 transition-colors text-sm sm:text-base"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
}
