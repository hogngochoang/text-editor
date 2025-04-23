import * as React from "react"
import type { Editor } from "@tiptap/react"
import {CaretDownIcon, CodeIcon, PlusIcon, QuoteIcon,} from "@radix-ui/react-icons"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {LinkEditPopover} from "@/components/custom-tiptap/link/link-edit-popover";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

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

const mainActions: InsertElementAction[] = ["codeBlock"]
const dropdownActions: InsertElementAction[] = ["blockquote", "horizontalRule"]

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

  const renderDropdownItems = React.useCallback(
    (actionValue: InsertElementAction) => {
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
        </DropdownMenuItem>
      )
    },
    [editor]
  )
  const filteredMainActions = activeActions.filter(action => mainActions.includes(action))
  const filteredDropdownActions = activeActions.filter(action => dropdownActions.includes(action))
  return (
    <>
      <LinkEditPopover editor={editor} />
      <div className="hidden md:flex items-center gap-1">
        {activeActions.map(renderToolbarButton)}
      </div>
      <div className="flex md:hidden items-center gap-1">
        {filteredMainActions.map(renderToolbarButton)}
        {filteredDropdownActions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ToolbarButton
                aria-label="More elements"
                className="w-12"
              >
                <PlusIcon className="size-5" />
                <CaretDownIcon className="size-5" />
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

    </>
  )
}
