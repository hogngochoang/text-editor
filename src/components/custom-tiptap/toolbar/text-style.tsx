import * as React from "react"
import type { Editor } from "@tiptap/react"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  DotsHorizontalIcon
} from "@radix-ui/react-icons"
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {getShortcutKey} from "@/components/custom-tiptap/editor-utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

type TextStyleAction =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"

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
]

interface TextStyleProps {
  editor: Editor
  activeActions?: TextStyleAction[]
  className?: string
}

const mainActions: TextStyleAction[] = ["bold", "italic"]
const dropdownActions: TextStyleAction[] = ["underline", "strikethrough"]

export default function TextStyle(props: TextStyleProps) {
  const {editor, className, activeActions = formatActions.map((action) => action.value)} = props

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
    [editor, className]
  )

  const renderDropdownItems = React.useCallback(
    (actionValue: TextStyleAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <DropdownMenuItem
          key={action.label}
          onClick={() => action.action(editor)}
          disabled={!action.canExecute(editor)}
          className={cn(
            'flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-accent',
            action.isActive(editor) ? 'bg-accent' : '',
            !action.canExecute(editor) ? 'opacity-50' : ''
          )}
        >
          {action.icon}
          <span>{action.label}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {action.shortcuts.map((s) => getShortcutKey(s).symbol).join(" ")}
          </span>
        </DropdownMenuItem>
      )
    },
    [editor]
  )

  const filteredMainActions = activeActions.filter(action => mainActions.includes(action))
  const filteredDropdownActions = activeActions.filter(action => dropdownActions.includes(action))

  return (
    <div className="flex items-center gap-1">
      <div className="hidden md:flex items-center gap-1">
        {activeActions.map(renderToolbarButton)}
      </div>
      <div className="flex md:hidden items-center gap-1">
        {filteredMainActions.map(renderToolbarButton)}
        {filteredDropdownActions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ToolbarButton
                aria-label="More text styles"
              >
                <DotsHorizontalIcon className="size-5" />
              </ToolbarButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start"
              className="w-full"
            >
              {filteredDropdownActions.map(renderDropdownItems)}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}