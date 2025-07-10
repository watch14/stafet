"use client";
import React from "react";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ClientLogosEditor from "./ClientLogosEditor";

export default function ClientLogos() {
  const editMode = useEditorStore((s) => s.editMode);
  const clientLogos = useEditorStore((s) => s.clientLogos);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("clientLogos");
    }
  };

  return (
    <>
      <ClientLogosEditor
        open={isEditorActive("clientLogos")}
        onClose={() => {}}
      />
      <section
        className={`w-full pt-12 relative ${editMode ? "cursor-pointer" : ""}`}
        style={{
          backgroundColor: clientLogos.bgColor,
          outline: editMode ? "2px dashed #2563eb" : undefined,
        }}
        onClick={handleSectionClick}
        tabIndex={editMode ? 0 : -1}
      >
        {editMode && (
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
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
            {clientLogos.logos.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-12"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={120}
                  height={48}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.nextSibling) {
                      (target.nextSibling as HTMLElement).style.display =
                        "block";
                    }
                  }}
                />
                <span
                  className="hidden font-medium text-sm md:text-base"
                  style={{ color: clientLogos.textColor }}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
