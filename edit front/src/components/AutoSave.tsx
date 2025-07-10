"use client";

import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import apiClient from "../lib/api";

export default function AutoSave() {
  const {
    hero,
    navbar,
    process,
    footer,
    valueProposition,
    testimonials,
    clientLogos,
    about,
  } = useEditorStore();

  useEffect(() => {
    // Temporarily disable auto-save to prevent API validation errors
    // TODO: Re-enable once backend supports the new data structure
    return;

    const saveCurrentConfiguration = async () => {
      try {
        // Only auto-save if we have complete data
        if (!hero || !navbar) {
          console.log("Skipping auto-save: incomplete data");
          return;
        }

        await apiClient.saveCurrentConfiguration({
          hero,
          navbar,
          process,
          footer,
          valueProposition,
          testimonials,
          clientLogos,
          about,
        });
        console.log("Configuration auto-saved");
      } catch (error) {
        console.error("Auto-save failed:", error);
        // Don't throw the error to prevent UI breaks
      }
    };

    // Debounce auto-save by 2 seconds
    const timeoutId = setTimeout(saveCurrentConfiguration, 2000);

    return () => clearTimeout(timeoutId);
  }, [
    hero,
    navbar,
    process,
    footer,
    valueProposition,
    testimonials,
    clientLogos,
    about,
  ]);

  return null; // This component doesn't render anything
}
