/**
 * NAVIGATION BAR - Main Website Navigation
 * ========================================
 *
 * This is the main navigation bar that appears at the top of every page.
 * It contains:
 *
 * - Logo/brand name (left side)
 * - Navigation menu links (center)
 * - Call-to-action button (right side)
 * - Edit button for admins (small pen icon, right side)
 *
 * The navbar is sticky (stays at top when scrolling) and has a subtle
 * border at the bottom. All content is editable when admin is in edit mode.
 *
 * The edit button appears as a small circular pen icon next to the CTA button
 * when an admin is logged in and in edit mode.
 */

"use client";
import { useEditorStore } from "../store/editorStore";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBarEditor from "../components/NavBarEditor";
import { useSection } from "../hooks/useSection";

/**
 * Navbar Component
 * Main navigation bar with logo, links, CTA, and edit controls
 */
export default function Navbar() {
  // Get navbar content from store
  const navbar = useEditorStore((s) => s.navbar);
  
  // Register this section for editing
  const { sectionRef, sectionProps } = useSection("navbar", {
    name: "Navigation Bar",
    description: "Top navigation with logo, menu links, and CTA button",
    icon: "🧭"
  });

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders mobile menu after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        ref={sectionRef}
        {...sectionProps}
        className={`w-full flex items-center justify-center px-0 py-2 border-b border-black/10 sticky top-0 bg-white z-50 text-xs font-semibold tracking-wide ${sectionProps.className}`}
        style={{
          ...sectionProps.style,
        }}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between px-4 sm:px-6 relative">
          {/* Logo Section (Left) */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-black text-base sm:text-lg tracking-tight hover:opacity-80 transition"
              style={{
                color: navbar.logoColor, // Custom logo color
              }}
            >
              {navbar.logo}
            </Link>
          </div>

          {/* Navigation Links (Center on Desktop) */}
          <div className="hidden md:flex gap-4 lg:gap-8 mx-auto">
            {navbar.links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="hover:underline text-xs lg:text-sm"
                style={{
                  color: navbar.linkColor, // Custom link color
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - CTA Button, Mobile Menu Button, Edit Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu Button (Hamburger) - Hidden on Desktop */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: navbar.linkColor }}
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when menu is closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link
              href={navbar.cta.href}
              className="hover:underline underline-offset-4 text-black px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
              style={{
                color: navbar.cta.textColor,
                background: navbar.cta.bgColor,
              }}
            >
              {navbar.cta.label}
            </Link>

            {/* Edit button - small circular pen icon */}
            {sectionProps['data-editable'] && (
              <button
                className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition cursor-pointer"
                title="Edit navbar"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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

        {/* Mobile Full-Screen Menu */}
        {isClient && isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-top-full duration-300">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link
                href="/"
                className="font-black text-lg tracking-tight"
                style={{
                  color: navbar.logoColor,
                }}
                onClick={closeMobileMenu}
              >
                {navbar.logo}
              </Link>
              <button
                onClick={closeMobileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: navbar.linkColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <nav className="space-y-8">
                {navbar.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="block text-2xl font-medium hover:opacity-70 transition-opacity text-center py-2"
                    style={{
                      color: navbar.linkColor,
                    }}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* CTA Button at Bottom */}
            <div className="p-8 border-t border-gray-200">
              <Link
                href={navbar.cta.href}
                className="block w-full text-center py-4 px-6 rounded-full text-lg font-medium transition-transform hover:scale-105 underline"
                style={{
                  color: navbar.cta.textColor,
                  background: navbar.cta.bgColor,
                }}
                onClick={closeMobileMenu}
              >
                {navbar.cta.label}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
