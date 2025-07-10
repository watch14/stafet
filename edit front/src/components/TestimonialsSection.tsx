"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import TestimonialsEditor from "./TestimonialsEditor";

export default function TestimonialsSection() {
  const editMode = useEditorStore((s) => s.editMode);
  const testimonials = useEditorStore((s) => s.testimonials);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("testimonials");
    }
  };

  return (
    <>
      <TestimonialsEditor
        open={isEditorActive("testimonials")}
        onClose={() => {}}
      />
      <section
        className={`w-full py-16 relative ${editMode ? "cursor-pointer" : ""}`}
        style={{
          backgroundColor: testimonials.bgColor,
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
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="w-[32%]">
            <h2
              className="text-4xl md:text-4xl font-medium pb-8 leading-none"
              style={{ color: testimonials.textColor }}
            >
              {testimonials.title}
            </h2>
            <div className="max-w-3xl">
              <blockquote
                className="text-xl md:text-xl mb-6 leading-6"
                style={{ color: testimonials.textColor }}
              >
                "{testimonials.quote}"
              </blockquote>
              <cite
                className="text-sm font-regular not-italic"
                style={{ color: testimonials.textColor }}
              >
                {testimonials.author}
              </cite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
