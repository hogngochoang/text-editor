"use client"

import { EditorContent, Content} from "@tiptap/react"
import {LinkBubbleMenu} from "@/components/custom-tiptap/bubble-menu/link-bubble-menu";
import {EditorToolbar} from "@/components/custom-tiptap/toolbar";
import useTiptapEditor, { UseTiptapEditorProps } from "@/lib/hooks/useEditor";
import {forwardRef, Ref} from "react";
import {FormatBubbleMenu} from "@/components/custom-tiptap/bubble-menu/format-bubble-menu";
import {InlineToolbar} from "@/components/custom-tiptap/toolbar/inline-toolbar";

export interface TiptapProps extends Omit<UseTiptapEditorProps, "onUpdate"> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
  mode?: "fixed" | "inline"
}

export const RichTextEditor = forwardRef((props: TiptapProps, ref: Ref<any>) => {
  const {value, onChange, className, editorContentClassName, mode} = props

  const editor = useTiptapEditor({
    value,
    onUpdate: onChange,
    editable: true,
    immediatelyRender: false,
    ...props,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full  border rounded-lg overflow-hidden">
      {mode === "fixed" && <EditorToolbar editor={editor}/>}
      <EditorContent editor={editor} className="tiptap-editor min-h-[300px] p-4"/>
      <LinkBubbleMenu editor={editor}/>
      {mode === "fixed" && <FormatBubbleMenu editor={editor}/>}
      {mode === "inline" && <InlineToolbar editor={editor}/>}
    </div>
  )
})
