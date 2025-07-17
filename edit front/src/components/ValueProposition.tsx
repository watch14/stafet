"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";
import { useSection } from "../hooks/useSection";
import ValuePropositionEditor from "./ValuePropositionEditor";

export default function ValueProposition() {
  const valueProposition = useEditorStore((s) => s.valueProposition);
  
  // Register this section for editing
  const { sectionRef, sectionProps } = useSection("valueProposition", {
    name: "Value Proposition",
    description: "Key value statement and company benefits", 
    icon: "💎"
  });

  return (
    <>
      <section
        ref={sectionRef}
        {...sectionProps}
        className={`w-full py-8 sm:py-12 md:py-16 relative ${sectionProps.className}`}
        style={{
          backgroundColor: valueProposition.bgColor,
          ...sectionProps.style,
        }}
      >
        {sectionProps['data-editable'] && (
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
