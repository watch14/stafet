/**
 * HERO SECTION - Main Banner Component
 * ====================================
 *
 * This is the first section visitors see - the main banner/hero area.
 * Features:
 * - Full screen height for maximum impact
 * - Customizable background (color or image)
 * - Large headline and subtitle text
 * - Call-to-action button
 * - Click-to-edit functionality for admins
 *
 * Content is managed through the Hero Editor when edit mode is enabled.
 * All styling (colors, text, background) can be customized through the editor.
 */

"use client";
import React from "react";
import HeroEditor from "./HeroEditor";
import { useEditorStore } from "../store/editorStore";
import { useSection } from "../hooks/useSection";

/**
 * Hero Section Component
 * Displays the main banner with headline, subtitle, and CTA button
 */
export default function HeroSection() {
  // Get hero content from store
  const hero = useEditorStore((s) => s.hero);
  
  // Register this section for editing
  const { sectionRef, sectionProps } = useSection("hero", {
    name: "Hero Section",
    description: "Main banner with headline, subtitle, and call-to-action button",
    icon: "🎯"
  });
  console.log(hero.button.href);

  return (
    <>
      {/* Main Hero Section */}
      <section
        ref={sectionRef}
        {...sectionProps}
        className={`min-h-screen w-full flex flex-col justify-center px-0 py-8 sm:py-12 md:py-16 transition-all ${sectionProps.className}`}
        style={{
          // Dynamic background based on user settings
          ...(hero.bgType === "color"
            ? { background: hero.bgColor }
            : hero.bgImage
            ? {
                backgroundImage: `url(${hero.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : { background: "#6366F1" }), // Fallback color
          ...sectionProps.style,
        }}
      >
        {/* Content Container */}
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 mt-auto">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1
              className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-regular mb-4 sm:mb-6 md:mb-8 "
              style={{
                color: hero.titleColor || "#000000", // Use custom color or default
              }}
            >
              {hero.title}
            </h1>
            <p
              className="text-black text-sm sm:text-base md:text-lg lg:text-1lg max-w-2xl mb-6 sm:mb-8 leading-tight"
              style={{
                color: hero.subtitleColor || "#000000",
              }}
            >
              {hero.subtitle}
            </p>

            <a href={hero.button.href || "#"}>
              <button
                className="rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base shadow-lg transition w-fit hover:shadow-xl cursor-pointer"
                style={{
                  color: hero.button.textColor || "#FFFFFF",
                  background: hero.button.bgColor || "#FFCEE5",
                }}
              >
                {hero.button.text}
              </button>
            </a>
          </div>
        </div>
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
      </section>
    </>
  );
}
