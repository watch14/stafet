"use client";
import React, { useRef } from "react";
import HeroEditor from "./HeroEditor";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import { useAuth } from "../contexts/AuthContext";

export default function HeroSection() {
  const hero = useEditorStore((s) => s.hero);
  const editMode = useEditorStore((s) => s.editMode);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive } = useEditorManager();

  // Only allow edit interactions if authenticated
  const canEdit = editMode && isAuthenticated;
  return (
    <>
      <section
        className="min-h-screen w-full flex flex-col justify-center px-0 py-16 transition-all cursor-pointer"
        style={
          hero.bgType === "color"
            ? {
                background: hero.bgColor,
                outline: canEdit ? "2px dashed #2563eb" : undefined,
              }
            : hero.bgImage
            ? {
                backgroundImage: `url(${hero.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                outline: canEdit ? "2px dashed #2563eb" : undefined,
              }
            : {
                background: "#6366F1",
                outline: canEdit ? "2px dashed #2563eb" : undefined,
              }
        }
        onClick={() => canEdit && openEditor("hero")}
        tabIndex={canEdit ? 0 : -1}
      >
        <div className="max-w-[1440px] mx-auto w-full px-8 mt-auto">
          <div className="max-w-2xl">
            <h1
              className="text-black text-xl md:text-9xl lg:text-6xl font-regular mb-8 leading-14"
              style={{
                color: hero.titleColor || "#000000",
              }}
            >
              {hero.title}
            </h1>
            <p
              className="text-black text-sg md:text-x1 max-w-2xl mb-8 leading-5"
              style={{
                color: hero.subtitleColor || "#000000",
              }}
            >
              {hero.subtitle}
            </p>
            <button
              className="rounded-full px-6 py-2 text-sm shadow-lg transition w-fit hover:shadow-xl"
              style={{
                color: hero.button.textColor || "#FFFFFF",
                background: hero.button.bgColor || "#FFCEE5",
              }}
            >
              {hero.button.text}
            </button>
          </div>
        </div>
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
      </section>
      <HeroEditor open={isEditorActive("hero")} onClose={() => {}} />
    </>
  );
}
