"use client";
import React, { useState, useRef, useEffect } from "react";
import { useEditorStore } from "../store/editorStore";

type InlineEditProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "p" | "div";
};

export default function InlineEdit({
  value,
  onChange,
  className = "",
  style = {},
  as = "span",
}: InlineEditProps) {
  const editMode = useEditorStore((s) => s.editMode);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    setShowPopup(false);
    if (draft !== value) onChange(draft);
  };

  if (!editMode) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  const Tag = as;
  return (
    <>
      <Tag
        className={
          className +
          " cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-blue-400 relative"
        }
        style={style}
        tabIndex={0}
        onClick={() => {
          setEditing(true);
          setShowPopup(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditing(true);
            setShowPopup(true);
          }
        }}
      >
        {value}
        {editMode && (
          <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-600 text-lg">
            ✎
          </span>
        )}
      </Tag>
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleBlur}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-lg"
              onClick={handleBlur}
            >
              &times;
            </button>
            <div className="mb-2 text-xs text-gray-500">Edit Text</div>
            <input
              ref={ref as any}
              className="border px-2 py-1 rounded w-full mb-2"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlur();
              }}
              autoFocus
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
              onClick={handleBlur}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
