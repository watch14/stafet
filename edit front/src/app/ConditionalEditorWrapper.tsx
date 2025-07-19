/**
 * CONDITIONAL EDITOR WRAPPER - Performance Optimized Editor Loading
 * ==================================================================
 *
 * This component conditionally loads editor components only when an admin
 * is authenticated. This improves performance for regular users by:
 * - Not loading editor JavaScript bundles
 * - Not initializing editor contexts and state
 * - Reducing initial page load time
 * - Minimizing memory usage
 *
 * When admin is logged in, it provides full editor functionality.
 * When no admin is logged in, it provides a clean user experience.
 */

"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { EditProvider } from "../contexts/EditContext";
import EditorLayoutWrapper from "./EditorLayoutWrapper";
import LeftEditorSlider from "../components/LeftEditorSlider";
import EditorOverviewWrapper from "../components/EditorOverviewWrapper";

interface ConditionalEditorWrapperProps {
  children: React.ReactNode;
}

/**
 * Simple Layout Wrapper for Non-Admin Users
 * No editor functionality, just clean layout with minimal EditProvider for compatibility
 */
function SimpleLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EditProvider>
      <div className="min-h-screen">
        {children}
      </div>
    </EditProvider>
  );
}

/**
 * Full Editor Layout for Admin Users
 * Includes all editor functionality
 */
function AdminEditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <EditProvider>
      <EditorLayoutWrapper>
        {children}
        <LeftEditorSlider />
        <EditorOverviewWrapper />
      </EditorLayoutWrapper>
    </EditProvider>
  );
}

/**
 * Conditional Editor Wrapper Component
 * Decides whether to load editor features based on authentication
 */
export default function ConditionalEditorWrapper({
  children,
}: ConditionalEditorWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking authentication, use simple layout
  if (isLoading) {
    return <SimpleLayoutWrapper>{children}</SimpleLayoutWrapper>;
  }

  // If admin is authenticated, load full editor functionality
  if (isAuthenticated) {
    return <AdminEditorLayout>{children}</AdminEditorLayout>;
  }

  // For regular users, use lightweight layout
  return <SimpleLayoutWrapper>{children}</SimpleLayoutWrapper>;
}
