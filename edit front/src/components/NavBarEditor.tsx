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
      <div className="space-y-8 text-black">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            🧭 Edit Navigation Bar
          </h3>
          <p className="text-xs text-blue-800">
            Customize your navigation bar including logo, menu links, and CTA
            button. Changes are saved when you click "Save Changes".
          </p>
        </div>

        {/* Logo Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Logo Settings
          </h3>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Logo Text
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={draft.logo}
                  onChange={(e) => setDraft({ ...draft, logo: e.target.value })}
                  placeholder="Enter logo text..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-800 mb-2">
                  Logo Color
                </label>
                <ColorPicker
                  color={draft.logoColor}
                  onChange={(c) => setDraft({ ...draft, logoColor: c })}
                  label="Logo Color"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🔗 Navigation Links
          </h3>

          <div className="space-y-4">
            {draft.links.map((link, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Link {index + 1}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Label
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={link.label}
                      onChange={(e) => {
                        const updatedLinks = [...draft.links];
                        updatedLinks[index] = {
                          ...link,
                          label: e.target.value,
                        };
                        setDraft({ ...draft, links: updatedLinks });
                      }}
                      placeholder="Link label"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      URL
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={link.href}
                      onChange={(e) => {
                        const updatedLinks = [...draft.links];
                        updatedLinks[index] = { ...link, href: e.target.value };
                        setDraft({ ...draft, links: updatedLinks });
                      }}
                      placeholder="Link URL"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <label className="block text-xs font-medium text-gray-800 mb-2">
                Links Color
              </label>
              <ColorPicker
                color={draft.linkColor}
                onChange={(c) => setDraft({ ...draft, linkColor: c })}
                label="Links Color"
              />
            </div>
          </div>
        </div>

        {/* CTA Button Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            🚀 Call-to-Action Button
          </h3>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Button Text
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={draft.cta.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      cta: { ...draft.cta, label: e.target.value },
                    })
                  }
                  placeholder="CTA button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Button URL
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={draft.cta.href}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      cta: { ...draft.cta, href: e.target.value },
                    })
                  }
                  placeholder="CTA button URL"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    Button Text Color
                  </label>
                  <ColorPicker
                    color={draft.cta.textColor}
                    onChange={(c) =>
                      setDraft({
                        ...draft,
                        cta: { ...draft.cta, textColor: c },
                      })
                    }
                    label="Text Color"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-2">
                    Button Background Color
                  </label>
                  <ColorPicker
                    color={draft.cta.bgColor}
                    onChange={(c) =>
                      setDraft({
                        ...draft,
                        cta: { ...draft.cta, bgColor: c },
                      })
                    }
                    label="Background Color"
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
