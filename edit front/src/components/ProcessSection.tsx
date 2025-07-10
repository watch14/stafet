"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import ProcessEditor from "./ProcessEditor";

export default function ProcessSection() {
  const editMode = useEditorStore((s) => s.editMode);
  const processData = useEditorStore((s) => s.process);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("process");
    }
  };

  return (
    <>
      <ProcessEditor open={isEditorActive("process")} onClose={() => {}} />
      <section
        className="w-full relative"
        style={{
          outline: editMode ? "2px dashed #2563eb" : undefined,
        }}
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
        {processData.processes.map((process, index) => (
          <div
            key={index}
            className={`w-full ${editMode ? "cursor-pointer" : ""}`}
            style={{ backgroundColor: process.bgColor }}
            onClick={handleSectionClick}
            tabIndex={editMode ? 0 : -1}
          >
            <div className="w-full max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                {/* Text Content */}
                <div
                  className={`flex items-start justify-between px-8 lg:px-16 py-16 lg:py-16 h-[100%] relative ${
                    index % 2 === 1
                      ? "order-2 lg:order-2"
                      : "order-2 lg:order-1"
                  }`}
                >
                  <div className="max-w-lg w-full">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-5xl lg:text-[50px] font-medium leading-tight"
                        style={{ color: process.textColor }}
                      >
                        {process.number}
                      </span>
                      <span
                        className="px-3 py-1 lg:text-[50px] lg:text-5xl font-medium leading-tight text-black"
                        style={{ backgroundColor: process.titleBgColor }}
                      >
                        {process.title}
                      </span>
                    </div>
                    <h3
                      className="text-5xl lg:text-[50px] font-light leading-tight max-w-md mb-80"
                      style={{ color: process.textColor }}
                    >
                      {process.subtitle}
                    </h3>
                    <p
                      className="text-sm lg:text-base leading-relaxed max-w-md opacity-80"
                      style={{ color: process.textColor }}
                    >
                      {process.description}
                    </p>
                  </div>
                </div>

                {/* Image Content */}
                <div
                  className={`relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden ${
                    index % 2 === 1
                      ? "order-1 lg:order-1"
                      : "order-1 lg:order-2"
                  }`}
                >
                  <Image
                    src={process.image}
                    alt={`${process.title} - ${process.subtitle}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                    priority={index < 2}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
