import * as React from "react"
import { Editor, BubbleMenu } from "@tiptap/react"
import TextStyle from "@/components/custom-tiptap/toolbar/text-style";
import {TextAlignment} from "@/components/custom-tiptap/toolbar/text-alignment";
import {TextHeading} from "@/components/custom-tiptap/toolbar/text-heading";
import {TextList} from "@/components/custom-tiptap/toolbar/text-list";
import {TextColor} from "@/components/custom-tiptap/toolbar/text-color";
import {TextInsertElement} from "@/components/custom-tiptap/toolbar/text-insert-elements";
import {Separator} from "@/components/ui/separator";

interface InlineToolbarProps {
  editor: Editor
}

export const InlineToolbar = ({ editor }: InlineToolbarProps) => {
  const shouldShow = React.useCallback(({ editor }: { editor: Editor }) => {
    return editor.isFocused
  }, [])

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 100,
        placement: "top",
        interactive: true,
        hideOnClick: false,
      }}
    >
      <div className="flex items-center gap-1 rounded-md border bg-muted p-1 shadow-md ">
        <TextStyle
          editor={editor}
          activeActions={["bold", "italic", "underline", "strikethrough"]}
          className="text-secondary-foreground"
          mode="inline"
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <TextAlignment editor={editor} className="text-secondary-foreground" mode="inline"/>
        <TextHeading editor={editor} activeLevels={[1, 2, 3]} className="text-secondary-foreground" mode="inline"/>
        <TextList editor={editor} className="text-secondary-foreground" mode='inline'/>
        <TextColor editor={editor} className="text-secondary-foreground"/>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <TextInsertElement editor={editor} className="text-secondary-foreground" mode="inline"/>
      </div>
    </BubbleMenu>
  )
}