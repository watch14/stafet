"use client";
import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ColorPicker from "./ColorPicker";
import SidePanel from "./SidePanel";

export default function FooterEditor({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const footer = useEditorStore((s) => s.footer);
  const setFooter = useEditorStore((s) => s.setFooter);
  const { closeEditor } = useEditorManager();
  const [draft, setDraft] = useState(footer);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

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
    closeEditor();
    onClose();
  };

  const handleClose = () => {
    setDraft(footer);
    closeEditor();
    onClose();
  };

  return (
    <SidePanel open={open} onClose={handleClose} title="Edit Footer Section">
      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Footer Section</h4>
              <p className="text-sm text-blue-700">
                Customize your footer content including logo, links, contact information, and styling.
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
                    Logo Section
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Footer Logo Text
                    </label>
                    <input
                      type="text"
                      value={draft.logo}
                      onChange={(e) =>
                        setDraft({ ...draft, logo: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter footer logo text..."
                    />
                  </div>
                </div>
              </div>

              {/* Customer Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customer Section
                  </h3>
                </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Customer Title
              </label>
              <input
                type="text"
                value={draft.customerTitle}
                onChange={(e) =>
                  setDraft({ ...draft, customerTitle: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter customer section title..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                🔗 Customer Links
              </label>
              <div className="space-y-3">
                {draft.customerLinks.map((link, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) =>
                        updateCustomerLink(index, "label", e.target.value)
                      }
                      placeholder="Link text"
                      className="p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) =>
                        updateCustomerLink(index, "href", e.target.value)
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

              {/* Contact Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Section
                  </h3>
                </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Contact Title
              </label>
              <input
                type="text"
                value={draft.contactTitle}
                onChange={(e) =>
                  setDraft({ ...draft, contactTitle: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact section title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Contact Text
              </label>
              <input
                type="text"
                value={draft.contactText}
                onChange={(e) =>
                  setDraft({ ...draft, contactText: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={draft.contactEmail}
                onChange={(e) =>
                  setDraft({ ...draft, contactEmail: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter contact email..."
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
                        Background Color
                      </label>
                      <ColorPicker
                        color={draft.bgColor}
                        onChange={(color) => setDraft({ ...draft, bgColor: color })}
                        label="Background"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-2">
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
