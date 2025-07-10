"use client";
import { useEditorStore } from "../store/editorStore";
import React from "react";
import Link from "next/link";
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
        className={`w-full flex items-center justify-center px-0 py-2 border-b border-black/10 sticky top-0 bg-white z-50 text-xs font-semibold tracking-wide`}
        style={{
          outline: canEdit ? "2px dashed #2563eb" : undefined,
        }}
        tabIndex={canEdit ? 0 : -1}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between px-6 relative">
          <div className="flex items-center ">
            <Link
              href="/"
              className="font-black text-lg tracking-tight hover:opacity-80 transition"
              style={{
                color: navbar.logoColor,
              }}
            >
              {navbar.logo}
            </Link>
          </div>
          <div className="hidden md:flex gap-8 mx-auto">
            {navbar.links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="hover:underline "
                style={{
                  color: navbar.linkColor,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={navbar.cta.href}
              className="hover:underline underline-offset-4 text-black px-3 py-1 rounded "
              style={{
                color: navbar.cta.textColor,
                background: navbar.cta.bgColor,
              }}
            >
              {navbar.cta.label}
            </Link>

            {/* Edit button - small circular pen icon */}
            {canEdit && (
              <button
                className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition cursor-pointer"
                onClick={() => openEditor("navbar")}
                title="Edit navbar"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            )}
          </div>
        </div>
      </nav>
      <NavBarEditor open={isEditorActive("navbar")} onClose={() => {}} />
    </>
  );
}
