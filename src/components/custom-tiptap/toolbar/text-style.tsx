import * as React from "react"
import type { Editor } from "@tiptap/react"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {getShortcutKey} from "@/components/custom-tiptap/editor-utils";

type TextStyleAction =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"

interface TextStyle extends EditorFormatAction {
  value: TextStyleAction
}

const formatActions: TextStyle[] = [
  {
    value: "bold",
    label: "Bold",
    icon: <FontBoldIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBold().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "B"],
  },
  {
    value: "italic",
    label: "Italic",
    icon: <FontItalicIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleItalic().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "I"],
  },
  {
    value: "underline",
    label: "Underline",
    icon: <UnderlineIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleUnderline().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "U"],
  },
  {
    value: "strikethrough",
    label: "Strikethrough",
    icon: <StrikethroughIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleStrike().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "shift", "S"],
  },
  {
    value: "code",
    label: "Code",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive("code"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCode().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "E"],
  }
]

interface TextStyleProps {
  editor: Editor
  activeActions?: TextStyleAction[]
  className?: string
}

export default function TextStyle (props : TextStyleProps)  {
  const {editor, className,activeActions = formatActions.map((action) => action.value)} = props
  const renderToolbarButton = React.useCallback(
    (actionValue: TextStyleAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <ToolbarButton
          key={action.label}
          onClick={() => action.action(editor)}
          disabled={!action.canExecute(editor)}
          isActive={action.isActive(editor)}
          tooltip={`${action.label} ${action.shortcuts.map((s) => getShortcutKey(s).symbol).join(" ")}`}
          aria-label={action.label}
          className={className}
        >
          {action.icon}
        </ToolbarButton>
      )
    },
    [editor]
  )

  return (
    <>
      {activeActions.map(renderToolbarButton)}
    </>
  )
}