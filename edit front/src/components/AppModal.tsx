"use client";
import React from "react";

export default function AppModal({
  open,
  onClose,
  children,
  className = "",
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      style={{ overflow: "auto" }}
      onClick={onClose}
    >
      <div
        className={
          "bg-white text-black rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative max-h-[90vh] overflow-y-auto " +
          className
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && (
          <div className="text-lg sm:text-xl font-bold mb-4 pr-8 text-black">
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
