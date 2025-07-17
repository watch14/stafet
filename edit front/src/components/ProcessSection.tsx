"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import { useAuth } from "../contexts/AuthContext";
import ProcessEditor from "./ProcessEditor";

export default function ProcessSection() {
  const editMode = useEditorStore((s) => s.editMode);
  const processData = useEditorStore((s) => s.process);
  const setProcess = useEditorStore((s) => s.setProcess);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive, closeEditor } = useEditorManager();

  // Only allow edit interactions if user is authenticated
  const canEdit = editMode && isAuthenticated;

  const handleSectionClick = () => {
    if (canEdit) {
      openEditor("process");
    }
  };

  const addNewProcess = () => {
    if (!canEdit) return;

    const newProcessNumber = (processData.processes.length + 1)
      .toString()
      .padStart(2, "0")
      .concat(".");
    const newProcess = {
      number: newProcessNumber,
      title: "NEW",
      subtitle: "Enter your process subtitle",
      description:
        "Enter your process description here. This should explain what happens in this step of your process.",
      titleBgColor: "#E5E7EB",
      bgColor: "#ffffff",
      textColor: "#000000",
      image: "/images/WHAT.png", // Default image
    };

    setProcess({
      processes: [...processData.processes, newProcess],
    });
  };

  return (
    <>
      <ProcessEditor
        open={isEditorActive("process")}
        onClose={() => closeEditor()}
      />
      <section
        className="w-full relative"
        style={{
          outline: canEdit ? "2px dashed #2563eb" : undefined,
        }}
      >
        {canEdit && (
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

        {/* Existing processes */}
        {processData.processes.map((process, index) => (
          <div
            key={index}
            className={`w-full ${canEdit ? "cursor-pointer" : ""}`}
            style={{ backgroundColor: process.bgColor }}
            onClick={handleSectionClick}
            tabIndex={canEdit ? 0 : -1}
          >
            <div className="w-full max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] sm:min-h-[400px]">
                {/* Text Content */}
                <div
                  className={`flex items-start justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-16 h-[100%] relative ${
                    index % 2 === 1
                      ? "order-2 lg:order-2"
                      : "order-2 lg:order-1"
                  }`}
                >
                  <div className="max-w-lg w-full">
                    <div className="flex items-baseline gap-1 sm:gap-2 mb-4 sm:mb-6">
                      <span
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-medium leading-tight"
                        style={{ color: process.textColor }}
                      >
                        {process.number}
                      </span>
                      <span
                        className="px-2 sm:px-3 py-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-medium leading-tight text-black"
                        style={{ backgroundColor: process.titleBgColor }}
                      >
                        {process.title}
                      </span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-light leading-tight max-w-md mb-4 sm:mb-6 md:mb-8 lg:mb-80"
                      style={{ color: process.textColor }}
                    >
                      {process.subtitle}
                    </h3>
                    <p
                      className="text-xs sm:text-sm lg:text-base leading-relaxed max-w-md opacity-80"
                      style={{ color: process.textColor }}
                    >
                      {process.description}
                    </p>
                  </div>
                </div>

                {/* Image Content */}
                <div
                  className={`relative w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[600px] overflow-hidden ${
                    index % 2 === 1
                      ? "order-1 lg:order-1"
                      : "order-1 lg:order-2"
                  }`}
                >
                  {process.image && process.image.trim() !== "" ? (
                    <Image
                      src={process.image}
                      alt={`${process.title} - ${process.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                      priority={index < 2}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg
                          className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-4"
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
                        <p className="font-medium text-sm sm:text-base">
                          Process Image
                        </p>
                        <p className="text-xs sm:text-sm">
                          Upload an image to display here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
