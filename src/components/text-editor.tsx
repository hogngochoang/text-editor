"use client"

import { EditorContent, Content} from "@tiptap/react"
import {LinkBubbleMenu} from "@/components/custom-tiptap/bubble-menu/link-bubble-menu";
import {EditorToolbar} from "@/components/custom-tiptap/toolbar";
import useTiptapEditor, { UseTiptapEditorProps } from "@/lib/hooks/useEditor";
import {forwardRef, Ref} from "react";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import {FormatBubbleMenu} from "@/components/custom-tiptap/bubble-menu/format-bubble-menu";

export interface TiptapProps extends Omit<UseTiptapEditorProps, "onUpdate"> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

export const RichTextEditor = forwardRef((props: TiptapProps, ref: Ref<any>) => {
  const {value, onChange, className, editorContentClassName} = props
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

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
    <div className='flex flex-col gap-6 w-full '>
      <div className="flex justify-end">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
        </Button>
      </div>
      <div className="w-full  border rounded-lg overflow-hidden">
        <EditorToolbar editor={editor}/>
        <EditorContent editor={editor} className="tiptap-editor min-h-[300px] p-4"/>
        <LinkBubbleMenu editor={editor}/>
        <FormatBubbleMenu editor={editor}/>
      </div>
    </div>
  )
})
