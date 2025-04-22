import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { Level } from "@tiptap/extension-heading"
import { cn } from "@/lib/utils"
import { CaretDownIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {EditorFormatAction} from "@/components/custom-tiptap/editor-format-action";
import ToolbarButton from "@/components/custom-tiptap/toolbar-button";

interface TextHeading extends Omit<EditorFormatAction, "value" | "icon" | "action" | "isActive" | "canExecute" | "shortcuts"> {
  element: keyof React.JSX.IntrinsicElements
  level?: Level
  className: string
}

const formatActions: TextHeading[] = [
  {
    label: "Normal Text",
    element: "span",
    className: "grow",
  },
  {
    label: "Heading 1",
    element: "h1",
    level: 1,
    className: "m-0 grow text-3xl font-extrabold",
  },
  {
    label: "Heading 2",
    element: "h2",
    level: 2,
    className: "m-0 grow text-xl font-bold",
  },
  {
    label: "Heading 3",
    element: "h3",
    level: 3,
    className: "m-0 grow text-lg font-semibold",
  },
  {
    label: "Heading 4",
    element: "h4",
    level: 4,
    className: "m-0 grow text-base font-semibold",
  },
  {
    label: "Heading 5",
    element: "h5",
    level: 5,
    className: "m-0 grow text-sm font-normal",
  },
  {
    label: "Heading 6",
    element: "h6",
    level: 6,
    className: "m-0 grow text-sm font-normal",
  },
]

interface TextHeadingProps {
  editor: Editor
  activeLevels?: Level[]
}

export const TextHeading = React.memo(
  ({ editor, activeLevels = [1, 2, 3, 4, 5, 6] } : TextHeadingProps) => {
    const filteredActions = React.useMemo(
      () =>
        formatActions.filter(
          (action) => !action.level || activeLevels.includes(action.level)
        ),
      [activeLevels]
    )

    const handleStyleChange = React.useCallback(
      (level?: Level) => {
        if (level) {
          editor.chain().focus().toggleHeading({ level }).run()
        } else {
          editor.chain().focus().setParagraph().run()
        }
      },
      [editor]
    )

    const renderMenuItem = React.useCallback(
      ({ label, element: Element, level, className }: TextHeading) => (
        <DropdownMenuItem
          key={label}
          onClick={() => handleStyleChange(level)}
          className={cn("flex flex-row items-center justify-between gap-4", {
            "bg-accent": level
              ? editor.isActive("heading", { level })
              : editor.isActive("paragraph"),
          })}
          aria-label={label}
        >
          <Element className={className}>{label}</Element>
        </DropdownMenuItem>
      ),
      [editor, handleStyleChange]
    )

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            isActive={editor.isActive("heading")}
            tooltip="Heading"
            aria-label="Text styles"
            pressed={editor.isActive("heading")}
            className="w-12"
            disabled={editor.isActive("codeBlock")}
          >
            <LetterCaseCapitalizeIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {filteredActions.map(renderMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
