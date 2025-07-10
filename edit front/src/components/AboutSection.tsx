"use client";
import React from "react";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import AboutEditor from "./AboutEditor";

export default function AboutSection() {
  const editMode = useEditorStore((s) => s.editMode);
  const about = useEditorStore((s) => s.about);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("about");
    }
  };

  return (
    <>
      <AboutEditor open={isEditorActive("about")} onClose={() => {}} />
      <section
        className={`w-full py-8 sm:py-12 lg:py-16 relative ${
          editMode ? "cursor-pointer" : ""
        }`}
        style={{
          backgroundColor: about.bgColor,
          outline: editMode ? "2px dashed #2563eb" : undefined,
        }}
        onClick={handleSectionClick}
        tabIndex={editMode ? 0 : -1}
      >
        {editMode && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
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
            <span className="hidden sm:inline">Click to edit</span>
            <span className="sm:hidden">Edit</span>
          </div>
        )}

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left side - Image */}
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative w-full max-w-md lg:max-w-lg mx-auto aspect-[4/5]">
                <Image
                  src={about.image}
                  alt="About us"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight mb-6 sm:mb-8"
                style={{ color: about.titleColor }}
              >
                {about.title}
              </h1>

              {about.subtitle && (
                <h2
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-6"
                  style={{ color: about.titleColor }}
                >
                  {about.subtitle}
                </h2>
              )}

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {about.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: about.textColor }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <button
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition hover:opacity-90"
                style={{
                  backgroundColor: about.ctaBgColor,
                  color: about.ctaTextColor,
                }}
              >
                {about.ctaText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
