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
        style={{ backgroundColor: testimonials.bgColor }}
        onClick={handleSectionClick}
      >
        {editMode && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleSectionClick}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Edit Testimonials
            </button>
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
