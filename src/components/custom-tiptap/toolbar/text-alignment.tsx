import * as React from "react"
import type { Editor } from "@tiptap/react"
import {
  CaretDownIcon,
  TextAlignCenterIcon, TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon
} from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {cn} from "@/lib/utils";

type TextAlignmentAction = "left" | "center" | "right" | "justify"

interface TextAlignment extends Omit<EditorFormatAction,  "canExecute" | "shortcuts"> {
  value: TextAlignmentAction
}

const formatActions: TextAlignment[] = [
  {
    label: "Left",
    value: "left",
    icon: <TextAlignLeftIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor) => editor.isActive({textAlign: 'left'}),
  },
  {
    label: "Center",
    value: "center",
    icon: <TextAlignCenterIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor) => editor.isActive({textAlign: 'center'}),
  },
  {
    label: "Right",
    value: "right",
    icon: <TextAlignRightIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor) => editor.isActive({textAlign: 'right'}),
  },
  {
    label: "Justify",
    value: "justify",
    icon: <TextAlignJustifyIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setTextAlign("justify").run(),
    isActive: (editor) => editor.isActive({textAlign: 'justify'}),
  }
]

interface TextAlignmentProps {
  editor: Editor
  activeActions?: TextAlignmentAction[]
}

export const TextAlignment = (props: TextAlignmentProps) => {
  const {editor, activeActions = formatActions.map((action) => action.value)} = props
  const renderMenuItem = React.useCallback(
    (actionValue: TextAlignmentAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <DropdownMenuItem
          key={action.value}
          onClick={() => action.action(editor)}
          className={cn("flex items-center gap-2", {
            "bg-accent": action.isActive(editor)
          })}
        >
          {action.icon}
          {action.label}
        </DropdownMenuItem>
      )
    },
    [editor]
  )

  const currentAlignment = formatActions.find(action => action.isActive(editor))
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive("textAlign")}
          tooltip="Alignment"
          aria-label="Text alignment"
          pressed={editor.isActive("textAlign")}
          className="w-12"
          disabled={editor.isActive("codeBlock")}
        >
          {currentAlignment?.icon || <TextAlignLeftIcon className="size-5" />}
          <CaretDownIcon className="size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full">
        {activeActions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
