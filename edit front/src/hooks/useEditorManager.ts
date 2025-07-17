import { useEditorStore } from "../store/editorStore";
import { useEditContext } from "../contexts/EditContext";

export const useEditorManager = () => {
  const { activeEditor, setActiveEditor, setIsEditorOpen } = useEditorStore();
  const { openMainEditor: openMainEditorContext } = useEditContext();

  const openEditor = (editorName: string) => {
    setActiveEditor(editorName);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setActiveEditor(null);
    setIsEditorOpen(false);
  };

  const openMainEditor = () => {
    // Use the new EditContext main editor functionality
    openMainEditorContext();
    
    // Also update the legacy store for backward compatibility
    setActiveEditor("main");
    setIsEditorOpen(true);
  };

  const isEditorActive = (editorName: string) => {
    return activeEditor === editorName;
  };

  return {
    activeEditor,
    openEditor,
    closeEditor,
    openMainEditor,
    isEditorActive,
  };
};
