import * as React from "react"
import type { Editor } from "@tiptap/react"
import { Separator } from "@/components/ui/separator"
import TextStyle from "@/components/custom-tiptap/toolbar/text-style";
import {TextColor} from "@/components/custom-tiptap/toolbar/text-color";
import {TextHeading} from "@/components/custom-tiptap/toolbar/text-heading";
import {TextList} from "@/components/custom-tiptap/toolbar/text-list";
import {TextInsertElement} from "@/components/custom-tiptap/toolbar/text-insert-elements";
import {TextAlignment} from "@/components/custom-tiptap/toolbar/text-alignment";

export const EditorToolbar = ({ editor }: { editor: Editor }) => (
  <div className="p-2 flex flex-wrap gap-1 items-center border-b">
    <div className="flex w-max items-center">
      <TextStyle
        editor={editor}
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
        ]}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />
      <TextAlignment editor={editor} />
      <TextHeading editor={editor} activeLevels={[1, 2, 3, 4]}/>
      <TextList editor={editor} />
      <TextColor editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <TextInsertElement editor={editor} />

    </div>
  </div>
)
