"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ValuePropositionEditor from "./ValuePropositionEditor";

export default function ValueProposition() {
  const editMode = useEditorStore((s) => s.editMode);
  const valueProposition = useEditorStore((s) => s.valueProposition);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("valueProposition");
    }
  };

  return (
    <>
      <ValuePropositionEditor
        open={isEditorActive("valueProposition")}
        onClose={() => {}}
      />
      <section
        className={`w-full py-8 sm:py-12 md:py-16 relative ${
          editMode ? "cursor-pointer" : ""
        }`}
        style={{
          backgroundColor: valueProposition.bgColor,
          outline: editMode ? "2px dashed #2563eb" : undefined,
        }}
        onClick={handleSectionClick}
        tabIndex={editMode ? 0 : -1}
      >
        {editMode && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Click to edit
          </div>
        )}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight whitespace-pre-line"
            style={{ color: valueProposition.textColor }}
          >
            {valueProposition.title}
          </h2>
        </div>
      </section>
    </>
  );
}
