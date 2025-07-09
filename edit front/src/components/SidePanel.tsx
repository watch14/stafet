"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SidePanel({
  open,
  onClose,
  title,
  children,
}: SidePanelProps) {
  const setIsEditorOpen = useEditorStore((state) => state.setIsEditorOpen);

  React.useEffect(() => {
    setIsEditorOpen(open);
  }, [open, setIsEditorOpen]);

  const handleClose = () => {
    setIsEditorOpen(false);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Side Panel */}
      <div className="fixed top-0 left-0 h-full w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-200"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">{children}</div>
        </div>
      </div>
    </>
  );
}
