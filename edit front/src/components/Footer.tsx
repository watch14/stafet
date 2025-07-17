"use client";
import Image from "next/image";
import { useEditorStore } from "../store/editorStore";
import { useSection } from "../hooks/useSection";
import FooterEditor from "./FooterEditor";

export default function Footer() {
  const footerData = useEditorStore((s) => s.footer);
  
  // Register this section for editing
  const { sectionRef, sectionProps } = useSection("footer", {
    name: "Footer",
    description: "Bottom section with links and contact information",
    icon: "🦶"
  });

  return (
    <>
      <footer
        ref={sectionRef}
        {...sectionProps}
        className={`w-full pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 relative ${sectionProps.className}`}
        style={{
          backgroundColor: footerData.bgColor,
          ...sectionProps.style,
        }}
      >
        {sectionProps['data-editable'] && (
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 max-w-50">
              <Image
                src="/images/logo-2.png"
                alt="STAFF Logo"
                width={160}
                height={50}
                className="object-contain w-32 sm:w-40 md:w-160 h-auto"
                priority
              />
            </div>

            {/* Customer Links */}
            <div className="max-w-[200px] md:mr-16">
              <h3
                className="font-bold mb-3 sm:mb-4 text-sm"
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
            <div className="md:text-right">
              <h3
                className="font-bold mb-3 sm:mb-4 text-sm"
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
