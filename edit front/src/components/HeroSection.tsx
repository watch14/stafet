"use client";
import React, { useRef } from "react";
import HeroEditor from "./HeroEditor";
import { useEditorStore } from "../store/editorStore";
import { useAuth } from "../contexts/AuthContext";

export default function HeroSection() {
  const hero = useEditorStore((s) => s.hero);
  const editMode = useEditorStore((s) => s.editMode);
  const { isAuthenticated } = useAuth();
  const [editorOpen, setEditorOpen] = React.useState(false);

  // Only allow edit interactions if authenticated
  const canEdit = editMode && isAuthenticated;
  return (
    <>
      <section
        className="min-h-screen w-full flex flex-col justify-center px-0 py-16 transition-all"
        style={
          hero.bgType === "color"
            ? { background: hero.bgColor }
            : hero.bgImage
            ? {
                backgroundImage: `url(${hero.bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : { background: "#6366F1" } // Default purple background like in design
        }
      >
        <div className="max-w-[1440px] mx-auto w-full px-8">
          <div className="max-w-4xl">
            <h1
              className="text-black text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 cursor-pointer relative"
              style={{
                color: hero.titleColor || "#000000",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={() => canEdit && setEditorOpen(true)}
              tabIndex={canEdit ? 0 : -1}
            >
              {hero.title}
              {canEdit && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                  ✎
                </span>
              )}
            </h1>
            <p
              className="text-black text-lg md:text-xl max-w-2xl mb-8 leading-relaxed cursor-pointer relative"
              style={{
                color: hero.subtitleColor || "#000000",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={() => canEdit && setEditorOpen(true)}
              tabIndex={canEdit ? 0 : -1}
            >
              {hero.subtitle}
              {canEdit && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                  ✎
                </span>
              )}
            </p>
            <button
              className="rounded-full px-8 py-3 text-base font-medium shadow-lg transition w-fit cursor-pointer relative hover:shadow-xl"
              style={{
                color: hero.button.textColor || "#FFFFFF",
                background: hero.button.bgColor || "#000000",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={(e) => {
                if (canEdit) {
                  e.preventDefault();
                  setEditorOpen(true);
                }
              }}
              tabIndex={canEdit ? 0 : -1}
            >
              {hero.button.text}
              {canEdit && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                  ✎
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
      <HeroEditor open={editorOpen} onClose={() => setEditorOpen(false)} />
    </>
  );
}
