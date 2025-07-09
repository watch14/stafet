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
      <nav className="w-full flex items-center justify-center px-0 py-2 border-b border-black/10 sticky top-0 bg-white z-50 text-xs font-semibold tracking-wide">
        <div className="w-full max-w-[1440px] flex items-center justify-between px-6">
          <div className="flex items-center">
            <span
              className="font-black text-lg tracking-tight relative"
              style={{
                color: navbar.logoColor,
                cursor: canEdit ? "pointer" : "default",
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={() => canEdit && openEditor("navbar")}
              tabIndex={canEdit ? 0 : -1}
            >
              {navbar.logo}
              {canEdit && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                  ✎
                </span>
              )}
            </span>
          </div>
          <div className="hidden md:flex gap-8 mx-auto">
            {navbar.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:underline relative"
                style={{
                  color: navbar.linkColor,
                  cursor: canEdit ? "pointer" : "default",
                  outline: canEdit ? "1px dashed #2563eb" : undefined,
                }}
                onClick={(e) => {
                  if (canEdit) {
                    e.preventDefault();
                    openEditor("navbar");
                  }
                }}
                tabIndex={canEdit ? 0 : -1}
              >
                {link.label}
                {canEdit && (
                  <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                    ✎
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center">
            <a
              href={navbar.cta.href}
              className="hover:underline underline-offset-4 text-black relative px-3 py-1 rounded"
              style={{
                color: navbar.cta.textColor,
                background: navbar.cta.bgColor,
                cursor: canEdit ? "pointer" : undefined,
                outline: canEdit ? "1px dashed #2563eb" : undefined,
              }}
              onClick={(e) => {
                if (canEdit) {
                  e.preventDefault();
                  openEditor("navbar");
                }
              }}
              tabIndex={canEdit ? 0 : -1}
            >
              {navbar.cta.label}
              {canEdit && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
                  ✎
                </span>
              )}
            </a>
          </div>
        </div>
      </nav>
      <NavBarEditor open={isEditorActive("navbar")} onClose={() => {}} />
    </>
  );
}
