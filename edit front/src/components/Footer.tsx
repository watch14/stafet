"use client";
import Image from "next/image";
import { useState } from "react";
import { useEditorStore } from "../store/editorStore";
import FooterEditor from "./FooterEditor";

export default function Footer() {
  const editMode = useEditorStore((s) => s.editMode);
  const footerData = useEditorStore((s) => s.footer);
  const [showEditor, setShowEditor] = useState(false);

  const handleSectionClick = () => {
    if (editMode) {
      setShowEditor(true);
    }
  };

  return (
    <>
      <FooterEditor open={showEditor} onClose={() => setShowEditor(false)} />
      <footer
        className={`w-full pt-24 pb-8 relative ${
          editMode ? "cursor-pointer" : ""
        }`}
        style={{ backgroundColor: footerData.bgColor }}
        onClick={handleSectionClick}
      >
        {editMode && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleSectionClick}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Edit Footer
            </button>
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
