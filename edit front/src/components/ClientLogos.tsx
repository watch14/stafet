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
        style={{ backgroundColor: clientLogos.bgColor }}
        onClick={handleSectionClick}
      >
        {editMode && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleSectionClick}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Edit Client Logos
            </button>
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
