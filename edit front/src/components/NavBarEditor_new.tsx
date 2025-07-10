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
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  React.useEffect(() => {
    setDraft(navbar);
  }, [open]);

  const updateLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...draft.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setDraft({ ...draft, links: updatedLinks });
  };

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
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Navigation Bar
              </h4>
              <p className="text-sm text-blue-700">
                Customize your navigation bar including logo, menu links, and
                call-to-action button.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("content")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "content"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "style"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Style
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8 text-black">
          {activeTab === "content" && (
            <>
              {/* Logo Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Logo Settings
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Logo Text
                    </label>
                    <input
                      type="text"
                      value={draft.logo}
                      onChange={(e) =>
                        setDraft({ ...draft, logo: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter logo text..."
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Navigation Links
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      🔗 Menu Links
                    </label>
                    <div className="space-y-3">
                      {draft.links.map((link, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) =>
                              updateLink(index, "label", e.target.value)
                            }
                            placeholder="Link text"
                            className="p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) =>
                              updateLink(index, "href", e.target.value)
                            }
                            placeholder="Link URL"
                            className="p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Call-to-Action Button
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={draft.cta.label}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          cta: { ...draft.cta, label: e.target.value },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter CTA button text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Button URL
                    </label>
                    <input
                      type="text"
                      value={draft.cta.href}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          cta: { ...draft.cta, href: e.target.value },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter CTA button URL..."
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "style" && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Style Settings
                </h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    🎨 Color Customization
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Logo Color
                      </label>
                      <ColorPicker
                        color={draft.logoColor}
                        onChange={(color) =>
                          setDraft({ ...draft, logoColor: color })
                        }
                        label="Logo"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        Links Color
                      </label>
                      <ColorPicker
                        color={draft.linkColor}
                        onChange={(color) =>
                          setDraft({ ...draft, linkColor: color })
                        }
                        label="Links"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        CTA Text Color
                      </label>
                      <ColorPicker
                        color={draft.cta.textColor}
                        onChange={(color) =>
                          setDraft({
                            ...draft,
                            cta: { ...draft.cta, textColor: color },
                          })
                        }
                        label="CTA Text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
                        CTA Background Color
                      </label>
                      <ColorPicker
                        color={draft.cta.bgColor}
                        onChange={(color) =>
                          setDraft({
                            ...draft,
                            cta: { ...draft.cta, bgColor: color },
                          })
                        }
                        label="CTA Background"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
