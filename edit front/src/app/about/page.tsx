/**
 * ABOUT PAGE - Company Information Page
 * =====================================
 *
 * This is a dedicated About page that provides detailed information about the company.
 * Features:
 * - Split layout with text content on left and image on right
 * - Editable content when admin is logged in
 * - Responsive design that stacks on mobile
 * - Call-to-action button
 *
 * The content for this page is managed through the About Editor when edit mode is enabled.
 */

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEditorStore } from "../../store/editorStore";
import { useEditorManager } from "../../hooks/useEditorManager";
import { useAuth } from "../../contexts/AuthContext";
import AboutEditor from "../../components/AboutEditor";

/**
 * About Page Component
 * Displays company information in a split layout format
 */
export default function AboutPage() {
  // Get current edit mode and about content from store
  const editMode = useEditorStore((s) => s.editMode);
  const about = useEditorStore((s) => s.about);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive } = useEditorManager();

  // Only allow edit interactions if user is authenticated
  const canEdit = editMode && isAuthenticated;

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto">
      {/* About Editor Panel - opens when admin clicks to edit */}
      <AboutEditor open={isEditorActive("about")} onClose={() => {}} />

      {/* Main Content - Split layout with text left, image right */}
      <div
        className={`flex flex-col lg:flex-row min-h-screen relative ${
          canEdit ? "cursor-pointer" : ""
        }`}
        style={{
          outline: canEdit ? "2px dashed #2563eb" : undefined, // Blue dashed border in edit mode
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

        {/* Left side - Image (50% width on desktop, full width on mobile) */}
        <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 lg:h-auto">
          <Image
            src={about.image}
            alt="Ocean research buoy"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side - Content (50% width on desktop, full width on mobile) */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: about.bgColor }}
        >
          <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 max-w-full lg:max-w-3xl w-full">
            <h1
              className="font-normal mb-6 sm:mb-8"
              style={{
                color: about.titleColor,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: "1.1",
                fontWeight: "400",
              }}
            >
              {about.title}
            </h1>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {about.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="leading-relaxed"
                  style={{
                    color: about.textColor,
                    fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                    lineHeight: "1.7",
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
