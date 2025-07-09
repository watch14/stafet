import InlineEdit from "./InlineEdit";
import ColorPicker from "./ColorPicker";
import { useEditorStore } from "../store/editorStore";

type ButtonEditorProps = {
  text: string;
  href: string;
  textColor: string;
  bgColor: string;
  onChange: (v: {
    text?: string;
    href?: string;
    textColor?: string;
    bgColor?: string;
  }) => void;
};

export default function ButtonEditor({
  text,
  href,
  textColor,
  bgColor,
  onChange,
}: ButtonEditorProps) {
  const editMode = useEditorStore((s) => s.editMode);
  return (
    <div className="inline-block relative">
      <a
        href={href}
        className="rounded-full px-6 py-2 text-sm font-medium shadow transition w-fit"
        style={{
          color: textColor,
          background: bgColor,
          cursor: editMode ? "pointer" : undefined,
        }}
        tabIndex={editMode ? -1 : 0}
      >
        <InlineEdit
          value={text}
          onChange={(t) => onChange({ text: t })}
          className="inline"
        />
      </a>
      {editMode && (
        <div className="flex gap-2 mt-2 items-center">
          <label className="text-xs">Link:</label>
          <input
            className="border px-1 py-0.5 rounded text-xs w-32"
            value={href}
            onChange={(e) => onChange({ href: e.target.value })}
          />
          <ColorPicker
            color={textColor}
            onChange={(c) => onChange({ textColor: c })}
            label="Text"
          />
          <ColorPicker
            color={bgColor}
            onChange={(c) => onChange({ bgColor: c })}
            label="BG"
          />
        </div>
      )}
    </div>
  );
}
