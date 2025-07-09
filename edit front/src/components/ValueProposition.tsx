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
        className={`w-full py-16 relative ${editMode ? "cursor-pointer" : ""}`}
        style={{ backgroundColor: valueProposition.bgColor }}
        onClick={handleSectionClick}
      >
        {editMode && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleSectionClick}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Edit Value Proposition
            </button>
          </div>
        )}
        <div className="max-w-[1440px] mx-auto px-8">
          <h2
            className="text-3xl md:text-5xl font-medium leading-tight whitespace-pre-line"
            style={{ color: valueProposition.textColor }}
          >
            {valueProposition.title}
          </h2>
        </div>
      </section>
    </>
  );
}
