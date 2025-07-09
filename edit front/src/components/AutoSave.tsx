"use client";

import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";
import apiClient from "../lib/api";

export default function AutoSave() {
  const { hero, navbar } = useEditorStore();

  useEffect(() => {
    const saveCurrentConfiguration = async () => {
      try {
        await apiClient.saveCurrentConfiguration({
          hero,
          navbar,
        });
        console.log("Configuration auto-saved");
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    };

    // Debounce auto-save by 2 seconds
    const timeoutId = setTimeout(saveCurrentConfiguration, 2000);

    return () => clearTimeout(timeoutId);
  }, [hero, navbar]);

  return null; // This component doesn't render anything
}
