"use client";

import { useEffect } from "react";
import { useEditorStore } from "../store/editorStore";

export default function PersistenceDebug() {
  const { hero, navbar } = useEditorStore();

  useEffect(() => {
    console.log("Current store state:", { hero, navbar });
    console.log(
      "LocalStorage webflow-editor-storage:",
      localStorage.getItem("webflow-editor-storage")
    );
  }, [hero, navbar]);

  return null;
}
