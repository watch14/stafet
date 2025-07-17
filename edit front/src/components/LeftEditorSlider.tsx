/**
 * LEFT EDITOR SLIDER - Main Visual Editor Panel
 * ============================================
 *
 * This is the main left-hand editor panel that provides Webflow-style editing.
 * Features:
 * - Slides in from the left when a section is selected
 * - Dynamically loads the appropriate editor component
 * - Smooth animations and transitions
 * - Responsive design that works on all screen sizes
 * - Integrates with the global EditContext for state management
 *
 * The panel automatically:
 * - Opens when a section is clicked in edit mode
 * - Loads the correct editor (HeroEditor, ProcessEditor, etc.)
 * - Provides section navigation and controls
 * - Closes when edit mode is disabled
 */

"use client";
import React, { Suspense, lazy } from "react";
import { useEditContext, EditorType } from "../contexts/EditContext";
import { useEditorStore } from "../store/editorStore";

// Lazy load editor components for better performance
const HeroEditor = lazy(() => import("./HeroEditor"));
const NavBarEditor = lazy(() => import("./NavBarEditor"));
const ClientLogosEditor = lazy(() => import("./ClientLogosEditor"));
const TestimonialsEditor = lazy(() => import("./TestimonialsEditor"));
const ValuePropositionEditor = lazy(() => import("./ValuePropositionEditor"));
const ProcessEditor = lazy(() => import("./ProcessEditor"));
const AboutEditor = lazy(() => import("./AboutEditor"));
const ContactEditor = lazy(() => import("./ContactEditor"));
const FooterEditor = lazy(() => import("./FooterEditor"));

// Loading component for lazy-loaded editors
const EditorLoading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading editor...</span>
  </div>
);

/**
 * Get the appropriate editor component for a section
 */
function getEditorComponent(sectionType: EditorType, onClose: () => void) {
  const editorProps = { open: true, onClose };
  
  switch (sectionType) {
    case "hero":
      return <HeroEditor {...editorProps} />;
    case "navbar":
      return <NavBarEditor {...editorProps} />;
    case "clientLogos":
      return <ClientLogosEditor {...editorProps} />;
    case "testimonials":
      return <TestimonialsEditor {...editorProps} />;
    case "valueProposition":
      return <ValuePropositionEditor {...editorProps} />;
    case "process":
      return <ProcessEditor {...editorProps} />;
    case "about":
      return <AboutEditor {...editorProps} />;
    case "contact":
      return <ContactEditor {...editorProps} />;
    case "footer":
      return <FooterEditor {...editorProps} />;
    default:
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500">Editor not found for: {sectionType}</p>
        </div>
      );
  }
}

/**
 * Section Navigation Component
 * Shows navigation between sections and current selection
 */
function SectionNavigation() {
  const { selectedSection, getRegisteredSections, openEditor, scrollToSection } = useEditContext();
  const registeredSections = getRegisteredSections();
  
  if (registeredSections.length === 0) return null;
  
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Jump to Section</h4>
      <div className="flex flex-wrap gap-2">
        {registeredSections.map(({ id, info }) => (
          <button
            key={id}
            onClick={() => {
              openEditor(id);
              scrollToSection(id);
            }}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedSection === id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
            title={`Edit ${info.name}`}
          >
            <span className="mr-1">{info.icon}</span>
            {info.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Left Editor Slider Component
 * Main sliding panel that contains section editors
 */
export default function LeftEditorSlider() {
  const { isLeftPanelOpen, selectedSection, closeEditor } = useEditContext();
  const setIsEditorOpen = useEditorStore((state) => state.setIsEditorOpen);
  
  // Update global editor state for layout adjustments
  React.useEffect(() => {
    setIsEditorOpen(isLeftPanelOpen);
  }, [isLeftPanelOpen, setIsEditorOpen]);
  
  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLeftPanelOpen) {
        closeEditor();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLeftPanelOpen, closeEditor]);
  
  if (!isLeftPanelOpen || !selectedSection) {
    return null;
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
        onClick={closeEditor}
      />
      
      {/* Slider Panel */}
      <div className={`
        fixed top-0 left-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isLeftPanelOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}>
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Section
            </h2>
            {selectedSection && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {selectedSection}
              </span>
            )}
          </div>
          <button
            onClick={closeEditor}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close editor (Esc)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Section Navigation */}
            <SectionNavigation />
            
            {/* Editor Content */}
            <Suspense fallback={<EditorLoading />}>
              {getEditorComponent(selectedSection, closeEditor)}
            </Suspense>
          </div>
        </div>
        
        {/* Panel Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Press ESC to close</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Real-time editing</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
