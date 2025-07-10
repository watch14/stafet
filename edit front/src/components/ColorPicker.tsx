/**
 * COLOR PICKER - Universal Color Selection Component
 * ==================================================
 *
 * This is a reusable color picker component used throughout all editors.
 * It provides:
 *
 * - Color preview button showing current color
 * - Click to open full color picker interface
 * - Support for hex color codes
 * - Click outside to close functionality
 * - Optional label for accessibility
 *
 * Used in all section editors for:
 * - Text colors (headlines, paragraphs, links)
 * - Background colors (sections, buttons, cards)
 * - Border colors
 * - Any other color customization needs
 */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";

type ColorPickerProps = {
  color: string; // Current color value (hex format)
  onChange: (color: string) => void; // Function called when color changes
  label?: string; // Optional label for the color picker
};

/**
 * Color Picker Component
 * Universal color selection interface for all editors
 */
export default function ColorPicker({
  color,
  onChange,
  label,
}: ColorPickerProps) {
  // State to control picker visibility
  const [show, setShow] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    if (!show) return;
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [show]);

  return (
    <div className="relative inline-block">
      {/* Optional Label */}
      {label && <span className="mr-2 text-xs">{label}</span>}

      {/* Color Preview Button */}
      <button
        className="w-6 h-6 rounded-full border border-gray-300 inline-block align-middle"
        style={{ background: color }} // Shows current color
        onClick={() => setShow((v) => !v)}
        aria-label="Pick color"
        title={`Current color: ${color}`}
      />

      {/* Color Picker Interface */}
      {show && (
        <div
          ref={pickerRef}
          className="fixed z-[9999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-0"
          style={{ minWidth: 220 }}
        >
          <SketchPicker
            color={color}
            onChange={(c) => onChange(c.hex)} // Update color when changed
            disableAlpha // Don't allow transparency
          />
          <button
            className="mt-2 text-xs underline"
            onClick={() => setShow(false)}
          ></button>
        </div>
      )}
    </div>
  );
}
