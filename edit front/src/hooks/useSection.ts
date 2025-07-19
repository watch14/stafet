"use client";
import { useRef, useEffect } from "react";
import { EditorType } from "../contexts/EditContext";
import { useAuth } from "../contexts/AuthContext";

interface SectionInfo {
  name: string;
  description: string;
  icon: string;
}

interface UseSectionReturn {
  sectionRef: React.RefObject<HTMLElement | null>;
  sectionProps: {
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    'data-section-id'?: EditorType;
    'data-editable'?: boolean;
  };
  isSelected: boolean;
  canEdit: boolean;
}

/**
 * Section hook for easy registration and interaction
 * Optimized to not register sections when no admin is logged in
 */
export function useSection(sectionId: EditorType, info: SectionInfo): UseSectionReturn {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { isAuthenticated } = useAuth();
  
  // Only try to use edit context if authenticated
  let editContext = null;
  if (isAuthenticated) {
    try {
      // Direct import instead of dynamic import to avoid issues
      const EditContextModule = require("../contexts/EditContext");
      if (EditContextModule && EditContextModule.useEditContext) {
        editContext = EditContextModule.useEditContext();
      }
    } catch (error) {
      console.warn("Could not import EditContext:", error);
      editContext = null;
    }
  }
  
  // Register section only once when component mounts
  useEffect(() => {
    if (isAuthenticated && editContext?.registerSection) {
      try {
        editContext.registerSection(sectionId, sectionRef, info);
        
        return () => {
          if (editContext?.unregisterSection) {
            editContext.unregisterSection(sectionId);
          }
        };
      } catch (error) {
        console.warn("Error registering section:", error);
      }
    }
  }, []); // Empty dependencies - register only once
  
  // Get current edit state
  const isSelected = editContext?.selectedSection === sectionId && editContext?.isLeftPanelOpen;
  const canEdit = editContext?.canEdit || false;
  
  // Create click handler for section selection
  const handleClick = () => {
    if (isAuthenticated && editContext?.handleSectionClick) {
      editContext.handleSectionClick(sectionId);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isAuthenticated && editContext?.handleSectionClick) {
        editContext.handleSectionClick(sectionId);
      }
    }
  };
  
  // Build section props with full functionality
  const sectionProps = {
    onClick: isAuthenticated && canEdit ? handleClick : undefined,
    onKeyDown: isAuthenticated && canEdit ? handleKeyDown : undefined,
    tabIndex: canEdit ? 0 : -1,
    className: isSelected ? "ring-2 ring-blue-500 ring-opacity-50" : "",
    'data-section-id': sectionId,
    'data-editable': isAuthenticated && editContext ? true : false,
  };
  
  return {
    sectionRef,
    sectionProps,
    isSelected: isSelected || false,
    canEdit: canEdit,
  };
}
