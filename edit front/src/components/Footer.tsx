"use client";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useEditorManager } from "../hooks/useEditorManager";
import FooterEditor from "./FooterEditor";

export default function Footer() {
  const editMode = useEditorStore((s) => s.editMode);
  const footerData = useEditorStore((s) => s.footer);
  const { openEditor, isEditorActive } = useEditorManager();

  const handleSectionClick = () => {
    if (editMode) {
      openEditor("footer");
    }
  };

  return (
    <>
      <FooterEditor open={isEditorActive("footer")} onClose={() => {}} />
      <footer
        className={`w-full pt-24 pb-8 relative ${
          editMode ? "cursor-pointer" : ""
        }`}
        style={{
          backgroundColor: footerData.bgColor,
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
          <div className="flex items-start justify-between">
            {/* Logo */}
            <div className="">
              <Image
                src="/images/logo-2.png"
                alt="STAFF Logo"
                width={160}
                height={50}
                className="object-contain"
                priority
              />
            </div>

            {/* Customer Links */}
            <div className="max-w-[200px] mr-16">
              <h3
                className="font-bold mb-4 text-sm"
                style={{ color: footerData.textColor }}
              >
                {footerData.customerTitle}
              </h3>
              <ul className="space-y-1 text-sm">
                {footerData.customerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:underline"
                      style={{ color: footerData.textColor }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-right">
              <h3
                className="font-bold mb-4 text-sm"
                style={{ color: footerData.textColor }}
              >
                {footerData.contactTitle}
              </h3>
              <div className="text-sm">
                <div className="mb-0" style={{ color: footerData.textColor }}>
                  {footerData.contactText}
                </div>
                <a
                  href={`mailto:${footerData.contactEmail}`}
                  className="underline"
                  style={{ color: footerData.textColor }}
                >
                  {footerData.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
