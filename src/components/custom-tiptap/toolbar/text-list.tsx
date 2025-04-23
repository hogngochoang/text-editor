import * as React from "react"
import type { Editor } from "@tiptap/react"
import {CaretDownIcon, ListBulletIcon} from "@radix-ui/react-icons"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

type ListItemAction = "orderedList" | "bulletList"
interface ListItem extends Omit<EditorFormatAction, 'shortcuts'> {
  value: ListItemAction
}

const formatActions: ListItem[] = [
  {
    value: "orderedList",
    label: "Numbered list",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="15px"
        fill="currentColor"
      >
        <path d="M144-144v-48h96v-24h-48v-48h48v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9 10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9H144Zm0-240v-96q0-10.2 6.9-17.1 6.9-6.9 17.1-6.9h72v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v72q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9h-72v24h96v48H144Zm48-240v-144h-48v-48h96v192h-48Zm168 384v-72h456v72H360Zm0-204v-72h456v72H360Zm0-204v-72h456v72H360Z" />
      </svg>
    ),
    isActive: (editor) => editor.isActive("orderedList"),
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    canExecute: (editor) => editor.can().chain().focus().toggleOrderedList().run(),
  },
  {
    value: "bulletList",
    label: "Bullet list",
    icon: <ListBulletIcon className="size-5" />,
    isActive: (editor) => editor.isActive("bulletList"),
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    canExecute: (editor) => editor.can().chain().focus().toggleBulletList().run(),
  },
]

interface TextListProps {
  editor: Editor
  activeActions?: ListItemAction[]
  className?: string
}

export const TextList = (props: TextListProps) => {
  const {editor, className, activeActions = formatActions.map((action) => action.value)} = props
  const renderToolbarButton = React.useCallback(
    (actionValue: ListItemAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <ToolbarButton
          key={action.label}
          onClick={() => action.action(editor)}
          isActive={action.isActive(editor)}
          tooltip={`${action.label}`}
          aria-label={action.label}
          className={cn('hidden md:flex', className)}
        >
          {action.icon}
        </ToolbarButton>
      )
    },
    [editor, className]
  )

  const renderDropdownItems = React.useCallback(
    (actionValue: ListItemAction) => {
      const action = formatActions.find((a) => a.value === actionValue)
      if (!action) return null

      return (
        <DropdownMenuItem
          key={action.label}
          onClick={() => action.action(editor)}
          className={cn('flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-accent', action.isActive(editor) ? 'bg-accent' : '')}
        >
          {action.icon}
          <span>{action.label}</span>
        </DropdownMenuItem>
      )
    },
    [editor]
  )

  return (
    <>
      <div className="hidden md:flex">
        {activeActions.map(renderToolbarButton)}
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton
              className="w-12"
              aria-label="List options"
            >
              <ListBulletIcon className="size-5" />
              <CaretDownIcon className="size-5" />
            </ToolbarButton>
          </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-full"
              sideOffset={5}
            >
              {activeActions.map(renderDropdownItems)}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
