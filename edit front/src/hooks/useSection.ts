/**
 * USE SECTION HOOK - Easy Section Registration and Interaction
 * ===========================================================
 *
 * This hook provides a simple way for section components to:
 * - Register themselves for editing and scrolling
 * - Get click handlers and edit indicators
 * - Manage their edit state consistently
 * - Handle hover effects and visual feedback
 *
 * Usage in section components:
 * ```tsx
 * const { sectionRef, sectionProps } = useSection("hero", {
 *   name: "Hero Section",
 *   description: "Main banner with headline and CTA",
 *   icon: "🎯"
 * });
 * 
 * return (
 *   <section ref={sectionRef} {...sectionProps}>
 *     // Section content
 *   </section>
 * );
 * ```
 */

"use client";
import { useRef, useEffect, useMemo } from "react";
import { useEditContext, EditorType } from "../contexts/EditContext";

interface SectionInfo {
  name: string;
  description: string;
  icon: string;
}

interface UseSectionReturn {
  sectionRef: React.RefObject<HTMLElement | null>;
  sectionProps: {
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    tabIndex: number;
    className: string;
    style: React.CSSProperties;
    'data-section-id': EditorType;
    'data-editable': boolean;
  };
  isSelected: boolean;
  canEdit: boolean;
}

/**
 * Section hook for easy registration and interaction
 */
export function useSection(sectionId: EditorType, info: SectionInfo): UseSectionReturn {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { 
    registerSection, 
    unregisterSection, 
    handleSectionClick, 
    selectedSection, 
    canEdit,
    isLeftPanelOpen 
  } = useEditContext();
  
  // Register the section on mount, unregister on unmount
  useEffect(() => {
    registerSection(sectionId, sectionRef, info);
    
    return () => {
      unregisterSection(sectionId);
    };
  }, [sectionId, info.name, info.description, info.icon, registerSection, unregisterSection]);
  
  // Check if this section is currently selected
  const isSelected = selectedSection === sectionId && isLeftPanelOpen;
  
  // Memoized section props for performance
  const sectionProps = useMemo(() => {
    const baseClassName = "transition-all duration-200";
    
    const editClassName = canEdit 
      ? `${baseClassName} cursor-pointer hover:shadow-lg` 
      : baseClassName;
    
    const selectedClassName = isSelected 
      ? `${editClassName} ring-2 ring-blue-500 ring-opacity-50` 
      : editClassName;
    
    const handleClick = () => {
      handleSectionClick(sectionId);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSectionClick(sectionId);
      }
    };
    
    return {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      tabIndex: canEdit ? 0 : -1,
      className: selectedClassName,
      style: {
        outline: canEdit ? "2px dashed transparent" : undefined,
        outlineColor: isSelected ? "#2563eb" : canEdit ? "#94a3b8" : undefined,
        outlineOffset: "2px",
      } as React.CSSProperties,
      'data-section-id': sectionId,
      'data-editable': canEdit,
    };
  }, [canEdit, isSelected, sectionId, handleSectionClick]);
  
  return {
    sectionRef,
    sectionProps,
    isSelected,
    canEdit,
  };
}
