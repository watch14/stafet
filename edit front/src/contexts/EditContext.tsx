/**
 * EDIT CONTEXT - Global Visual Editor State Management
 * ===================================================
 *
 * This context provides Webflow-style visual editing capabilities:
 * - Global edit mode state management
 * - Section registration and ref management for scrolling
 * - Left panel editor state control
 * - Smooth scrolling to selected sections
 * - Section highlight and selection management
 *
 * Features:
 * - Only interactive when edit mode is enabled and user is authenticated
 * - Manages section refs for automatic scrolling
 * - Controls left-hand editor panel state
 * - Provides smooth UX for section selection and editing
 */

"use client";
import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import { useEditorStore } from "../store/editorStore";
import { useAuth } from "./AuthContext";

// Define available editor types for sections
export type EditorType = 
  | "hero" 
  | "navbar" 
  | "clientLogos" 
  | "testimonials" 
  | "valueProposition" 
  | "process" 
  | "about" 
  | "contact" 
  | "footer";

// Section registration info
interface SectionInfo {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  description: string;
  icon: string;
}

interface EditContextType {
  // Edit mode state
  isEditMode: boolean;
  canEdit: boolean; // Computed: editMode && isAuthenticated
  
  // Left panel editor state
  isLeftPanelOpen: boolean;
  selectedSection: EditorType | null;
  
  // Main editor overview state
  isMainEditorOpen: boolean;
  
  // Section management
  registerSection: (sectionId: EditorType, ref: React.RefObject<HTMLElement | null>, info: { name: string; description: string; icon: string }) => void;
  unregisterSection: (sectionId: EditorType) => void;
  getSectionRef: (sectionId: EditorType) => React.RefObject<HTMLElement | null> | null;
  
  // Editor actions
  openEditor: (sectionId: EditorType) => void;
  closeEditor: () => void;
  openMainEditor: () => void;
  closeMainEditor: () => void;
  scrollToSection: (sectionId: EditorType) => void;
  
  // Section interaction
  handleSectionClick: (sectionId: EditorType) => void;
  
  // Get all registered sections
  getRegisteredSections: () => Array<{ id: EditorType; info: SectionInfo }>;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

/**
 * Edit Provider Component
 * Provides global edit state and section management
 */
export function EditProvider({ children }: { children: React.ReactNode }) {
  const editMode = useEditorStore((s) => s.editMode);
  const { isAuthenticated } = useAuth();
  
  // Left panel state
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<EditorType | null>(null);
  
  // Main editor overview state
  const [isMainEditorOpen, setIsMainEditorOpen] = useState(false);
  
  // Section registry - use state for reactive updates
  const [registeredSections, setRegisteredSections] = useState<Map<EditorType, SectionInfo>>(new Map());
  
  // Computed edit capability
  const canEdit = editMode && isAuthenticated;
  
  /**
   * Register a section for editing and scrolling
   */
  const registerSection = useCallback((
    sectionId: EditorType, 
    ref: React.RefObject<HTMLElement | null>, 
    info: { name: string; description: string; icon: string }
  ) => {
    console.log(`📝 Registering section: ${sectionId}`, info);
    setRegisteredSections(prevSections => {
      const newSections = new Map(prevSections);
      newSections.set(sectionId, {
        ref,
        name: info.name,
        description: info.description,
        icon: info.icon
      });
      console.log(`📝 Total registered sections: ${newSections.size}`);
      return newSections;
    });
  }, []);
  
  /**
   * Unregister a section (cleanup)
   */
  const unregisterSection = useCallback((sectionId: EditorType) => {
    setRegisteredSections(prevSections => {
      const newSections = new Map(prevSections);
      newSections.delete(sectionId);
      console.log(`🗑️ Unregistered section: ${sectionId}, remaining: ${newSections.size}`);
      return newSections;
    });
  }, []);
  
  /**
   * Get the ref for a specific section
   */
  const getSectionRef = useCallback((sectionId: EditorType) => {
    const sectionInfo = registeredSections.get(sectionId);
    return sectionInfo?.ref || null;
  }, [registeredSections]);
  
  /**
   * Get all registered sections for the main editor overview
   */
  const getRegisteredSections = useCallback(() => {
    const sections: Array<{ id: EditorType; info: SectionInfo }> = [];
    registeredSections.forEach((info: SectionInfo, id: EditorType) => {
      sections.push({ id, info });
    });
    return sections;
  }, [registeredSections]);
  
  /**
   * Smooth scroll to a section
   */
  const scrollToSection = useCallback((sectionId: EditorType) => {
    const sectionInfo = registeredSections.get(sectionId);
    if (sectionInfo?.ref.current) {
      sectionInfo.ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [registeredSections]);
  
  /**
   * Open the left editor panel for a section
   */
  const openEditor = useCallback((sectionId: EditorType) => {
    if (!canEdit) return;
    
    setSelectedSection(sectionId);
    setIsLeftPanelOpen(true);
    
    // Auto-scroll to the section after a brief delay for better UX
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  }, [canEdit, scrollToSection]);
  
  /**
   * Close the left editor panel
   */
  const closeEditor = useCallback(() => {
    setIsLeftPanelOpen(false);
    setSelectedSection(null);
  }, []);
  
  /**
   * Open the main editor overview
   */
  const openMainEditor = useCallback(() => {
    if (!isAuthenticated) {
      return;
    }
    
    // Close any specific editor first
    setIsLeftPanelOpen(false);
    setSelectedSection(null);
    
    // Open main editor overview
    setIsMainEditorOpen(true);
  }, [isAuthenticated, editMode]);
  
  /**
   * Close the main editor overview
   */
  const closeMainEditor = useCallback(() => {
    setIsMainEditorOpen(false);
  }, []);
  
  /**
   * Handle section click - unified interaction handler
   */
  const handleSectionClick = useCallback((sectionId: EditorType) => {
    if (!canEdit) return;
    
    // If clicking the same section that's already open, scroll to it
    if (selectedSection === sectionId && isLeftPanelOpen) {
      scrollToSection(sectionId);
    } else {
      // Open the editor for this section
      openEditor(sectionId);
    }
  }, [canEdit, selectedSection, isLeftPanelOpen, scrollToSection, openEditor]);
  
  // Close panels when edit mode is disabled
  React.useEffect(() => {
    if (!editMode) {
      closeEditor();
      closeMainEditor();
    }
  }, [editMode, closeEditor, closeMainEditor]);
  
  // Debug effect to monitor section registration
  React.useEffect(() => {
    console.log(`🔍 EditContext: registeredSections changed, count: ${registeredSections.size}`, Array.from(registeredSections.keys()));
  }, [registeredSections]);
  
  const value: EditContextType = {
    isEditMode: editMode,
    canEdit,
    isLeftPanelOpen,
    selectedSection,
    isMainEditorOpen,
    registerSection,
    unregisterSection,
    getSectionRef,
    openEditor,
    closeEditor,
    openMainEditor,
    closeMainEditor,
    scrollToSection,
    handleSectionClick,
    getRegisteredSections,
  };
  
  return (
    <EditContext.Provider value={value}>
      {children}
    </EditContext.Provider>
  );
}

/**
 * Hook to use the Edit Context
 */
export function useEditContext() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEditContext must be used within an EditProvider');
  }
  return context;
}
