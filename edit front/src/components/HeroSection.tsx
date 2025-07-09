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
        className="min-h-screen w-full flex flex-col justify-center px-0 py-16 transition-all "
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
            : { background: "#6366F1" }
        }
      >
        <div className="max-w-[1440px] mx-auto w-full px-8 mt-auto">
          <div className="max-w-2xl">
            <h1
              className="text-black text-xl md:text-9xl lg:text-6xl font-regular  mb-8  relative leading-14"
              style={{
                color: hero.titleColor || "#000000",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={() => canEdit && openEditor("hero")}
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
              className="text-black text-sg md:text-x1 max-w-2xl mb-8   relative leading-5"
              style={{
                color: hero.subtitleColor || "#000000",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={() => canEdit && openEditor("hero")}
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
              className="rounded-full px-6 py-2 text-sm shadow-lg transition w-fit cursor-pointer relative hover:shadow-xl"
              style={{
                color: hero.button.textColor || "#FFFFFF",
                background: hero.button.bgColor || "#FFCEE5",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={(e) => {
                if (canEdit) {
                  e.preventDefault();
                  openEditor("hero");
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
      <HeroEditor open={isEditorActive("hero")} onClose={() => {}} />
    </>
  );
}
