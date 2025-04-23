import * as React from "react"
import type { Editor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react"
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon
} from "@radix-ui/react-icons"
import ToolbarButton from "@/components/custom-tiptap/toolbar-button"
import TextStyle from "@/components/custom-tiptap/toolbar/text-style";
import {TextList} from "@/components/custom-tiptap/toolbar/text-list";

interface FormatBubbleMenuProps {
  editor: Editor
}

export const FormatBubbleMenu = ({ editor }: FormatBubbleMenuProps) => {
  const shouldShow = React.useCallback(
    ({ editor }: { editor: Editor }) => {
      const { from, to } = editor.state.selection
      if (from === to) {
        return false
      }
      return !editor.isActive('link');
    },
    []
  )
  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 100,
        placement: "top"
      }}
    >
      <div className="flex items-center gap-1 rounded-md bg-muted p-1 shadow-md">
        <TextStyle
          editor={editor}
          activeActions={[
            "bold",
            "italic",
          ]}
          className="text-secondary-foreground"
        />
        <TextList editor={editor} className="text-secondary-foreground"/>
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({textAlign: 'left'})}
            tooltip="Align Left"
          >
            <TextAlignLeftIcon className="size-4 text-secondary-foreground" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({textAlign: 'center'})}
            tooltip="Align Center"
          >
            <TextAlignCenterIcon className="size-4 text-secondary-foreground" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({textAlign: 'right'})}
            tooltip="Align Right"
          >
            <TextAlignRightIcon className="size-4 text-secondary-foreground" />
          </ToolbarButton>
        </div>
      </div>
    </BubbleMenu>
  )
}