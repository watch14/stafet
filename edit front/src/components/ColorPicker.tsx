"use client";
import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  label?: string;
};

export default function ColorPicker({
  color,
  onChange,
  label,
}: ColorPickerProps) {
  const [show, setShow] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

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
      {label && <span className="mr-2 text-xs">{label}</span>}
      <button
        className="w-6 h-6 rounded-full border border-gray-300 inline-block align-middle"
        style={{ background: color }}
        onClick={() => setShow((v) => !v)}
        aria-label="Pick color"
      />
      {show && (
        <div
          ref={pickerRef}
          className="fixed z-[9999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-0"
          style={{ minWidth: 220 }}
        >
          <SketchPicker
            color={color}
            onChange={(c) => onChange(c.hex)}
            disableAlpha
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
