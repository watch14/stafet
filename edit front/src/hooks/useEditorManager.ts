import { useEditorStore } from "../store/editorStore";

export const useEditorManager = () => {
  const { activeEditor, setActiveEditor, setIsEditorOpen } = useEditorStore();

  const openEditor = (editorName: string) => {
    setActiveEditor(editorName);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setActiveEditor(null);
    setIsEditorOpen(false);
  };

  const isEditorActive = (editorName: string) => {
    return activeEditor === editorName;
  };

  return {
    activeEditor,
    openEditor,
    closeEditor,
    isEditorActive,
  };
};
