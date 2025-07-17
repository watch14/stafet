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
import { useSection } from "../../hooks/useSection";
import AboutEditor from "../../components/AboutEditor";

/**
 * About Page Component
 * Displays company information in a split layout format
 */
export default function AboutPage() {
  // Get about content from store
  const aboutContent = useEditorStore((s) => s.about);
  
  // Register this section for editing
  const { sectionRef, sectionProps } = useSection("about", {
    name: "About Page",
    description: "Company information and story",
    icon: "ℹ️"
  });

  return (
    <div className="min-h-screen max-w-[1440px] mx-auto">
      {/* Main Content - Split layout with text left, image right */}
      <div
        ref={sectionRef as any}
        {...sectionProps}
        className={`flex flex-col lg:flex-row min-h-screen relative ${sectionProps.className}`}
        style={{
          ...sectionProps.style,
        }}
      >
        {sectionProps['data-editable'] && (
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
          {aboutContent.image && aboutContent.image.trim() !== "" ? (
            <Image
              src={aboutContent.image}
              alt="Ocean research buoy"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-medium text-sm sm:text-base">About Image</p>
                <p className="text-xs sm:text-sm">
                  Upload an image to display here
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Content (50% width on desktop, full width on mobile) */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: aboutContent.bgColor }}
        >
          <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 max-w-full lg:max-w-3xl w-full">
            <h1
              className="font-normal mb-6 sm:mb-8"
              style={{
                color: aboutContent.titleColor,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: "1.1",
                fontWeight: "400",
              }}
            >
              {aboutContent.title}
            </h1>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {aboutContent.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="leading-relaxed"
                  style={{
                    color: aboutContent.textColor,
                    fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                    lineHeight: "1.7",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link href="/contact">
              <button
                className="px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 
                hover:scale-105 hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: aboutContent.ctaBgColor,
                  color: aboutContent.ctaTextColor,
                }}
              >
                {aboutContent.ctaText}
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
