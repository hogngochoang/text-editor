import * as React from "react"
import type { Editor } from "@tiptap/react"
import {CodeIcon, QuoteIcon,} from "@radix-ui/react-icons"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {LinkEditPopover} from "@/components/custom-tiptap/link/link-edit-popover";

type InsertElementAction = "codeBlock" | "blockquote" | "horizontalRule"
interface InsertElement extends Omit<EditorFormatAction, 'shortcuts'> {
  value: InsertElementAction
}

const formatActions: InsertElement[] = [
  {
    value: "codeBlock",
    label: "Code block",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCodeBlock().run(),
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: <QuoteIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBlockquote().run(),
  },
]

interface TextInsertElementProps {
  editor: Editor
  activeActions?: InsertElementAction[]
}

export const TextInsertElement = (props: TextInsertElementProps) => {
  const {editor, activeActions = formatActions.map((action) => action.value)} = props
  const renderToolbarButton = React.useCallback(
    (actionValue: InsertElementAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <ToolbarButton
          key={action.label}
          onClick={() => action.action(editor)}
          isActive={action.isActive(editor)}
          tooltip={`${action.label}`}
          aria-label={action.label}
        >
          {action.icon}
        </ToolbarButton>
      )
    },
    [editor]
  )
  return (
    <>
      <LinkEditPopover editor={editor} />
      {activeActions.map(renderToolbarButton)}
    </>
  )
}
