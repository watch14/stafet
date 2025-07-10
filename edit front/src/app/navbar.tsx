"use client";
import { useEditorStore } from "../store/editorStore";
import React from "react";
import NavBarEditor from "../components/NavBarEditor";
import { useEditorManager } from "../hooks/useEditorManager";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navbar = useEditorStore((s) => s.navbar);
  const editMode = useEditorStore((s) => s.editMode);
  const { isAuthenticated } = useAuth();
  const { openEditor, isEditorActive } = useEditorManager();

  // Only allow edit interactions if authenticated
  const canEdit = editMode && isAuthenticated;
  return (
    <>
      <nav
        className={`w-full flex items-center justify-center px-0 py-2 border-b border-black/10 sticky top-0 bg-white z-50 text-xs font-semibold tracking-wide ${
          canEdit ? "cursor-pointer" : ""
        }`}
        style={{
          outline: canEdit ? "2px dashed #2563eb" : undefined,
        }}
        onClick={() => canEdit && openEditor("navbar")}
        tabIndex={canEdit ? 0 : -1}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between px-6">
          <div className="flex items-center">
            <span
              className="font-black text-lg tracking-tight"
              style={{
                color: navbar.logoColor,
              }}
            >
              {navbar.logo}
            </span>
          </div>
          <div className="hidden md:flex gap-8 mx-auto">
            {navbar.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:underline"
                style={{
                  color: navbar.linkColor,
                }}
                onClick={(e) => {
                  if (canEdit) {
                    e.preventDefault();
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center">
            <a
              href={navbar.cta.href}
              className="hover:underline underline-offset-4 text-black px-3 py-1 rounded"
              style={{
                color: navbar.cta.textColor,
                background: navbar.cta.bgColor,
              }}
              onClick={(e) => {
                if (canEdit) {
                  e.preventDefault();
                }
              }}
            >
              {navbar.cta.label}
            </a>
          </div>
        </div>
        {canEdit && (
          <div className="absolute top-full right-4 mt-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
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
      </nav>
      <NavBarEditor open={isEditorActive("navbar")} onClose={() => {}} />
    </>
  );
}
