"use client"

import { EditorContent, Content} from "@tiptap/react"
import {LinkBubbleMenu} from "@/components/custom-tiptap/bubble-menu/link-bubble-menu";
import {LinkEditPopover} from "@/components/custom-tiptap/link/link-edit-popover";
import {EditorToolbar} from "@/components/custom-tiptap/toolbar";
import useTiptapEditor, { UseTiptapEditorProps } from "@/lib/hooks/useEditor";
import {forwardRef, Ref} from "react";

export interface TiptapProps extends Omit<UseTiptapEditorProps, "onUpdate"> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

export const RichTextEditor = forwardRef((props: TiptapProps, ref: Ref<any>) => {
  const {value, onChange, className, editorContentClassName} = props

  const editor = useTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      <EditorToolbar editor={editor} />

      <EditorContent editor={editor} className="min-h-[300px]" />
      <LinkBubbleMenu editor={editor} />
    </div>
  )
})
