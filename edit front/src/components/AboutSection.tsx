"use client";
import React from "react";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import { useAuth } from "../contexts/AuthContext";
import AboutEditor from "./AboutEditor";

export default function AboutSection() {
  const editMode = useEditorStore((s) => s.editMode);
  const about = useEditorStore((s) => s.about);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive } = useEditorManager();

  // Only allow edit interactions if authenticated
  const canEdit = editMode && isAuthenticated;

  return (
    <>
      <AboutEditor open={isEditorActive("about")} onClose={() => {}} />
      <section
        className={`w-full relative max-w-[1440px] mx-auto ${
          canEdit ? "cursor-pointer" : ""
        }`}
        style={{
          backgroundColor: about.bgColor,
          outline: canEdit ? "2px dashed #2563eb" : undefined,
        }}
        onClick={() => canEdit && openEditor("about")}
        tabIndex={canEdit ? 0 : -1}
      >
        {canEdit && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
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

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left side - Image (responsive sizing) */}
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 lg:h-auto">
            <Image
              src={about.image}
              alt="About us"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Content (responsive padding and typography) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 max-w-full lg:max-w-3xl w-full">
              <h1
                className="font-normal leading-tight mb-6 lg:mb-8"
                style={{ 
                  color: about.titleColor,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: '1.1',
                  fontWeight: '400'
                }}
              >
                {about.title}
              </h1>

              <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
                {about.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="leading-relaxed"
                    style={{ 
                      color: about.textColor,
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      lineHeight: '1.7',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <button
                className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                style={{
                  backgroundColor: about.ctaBgColor,
                  color: about.ctaTextColor,
                }}
              >
                {about.ctaText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
