"use client";
import React from "react";
import { useEditorStore } from "../store/editorStore";

interface EditorLayoutWrapperProps {
  children: React.ReactNode;
}

export default function EditorLayoutWrapper({
  children,
}: EditorLayoutWrapperProps) {
  const isEditorOpen = useEditorStore((state) => state.isEditorOpen);

  return (
    <div className="min-h-screen">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isEditorOpen ? "ml-[400px]" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
