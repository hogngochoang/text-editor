import * as React from "react"
import type { Editor } from "@tiptap/react"
import { Separator } from "@/components/ui/separator"
import TextStyle from "@/components/custom-tiptap/toolbar/text-style";
import {TextColor} from "@/components/custom-tiptap/toolbar/text-color";

export const EditorToolbar = ({ editor }: { editor: Editor }) => (
  <div className="bg-muted/50 p-2 flex flex-wrap gap-1 items-center border-b">
    <div className="flex w-max items-center">
      <TextStyle
        editor={editor}
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "clearFormatting",
        ]}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <TextColor editor={editor} />

      {/*<Separator orientation="vertical" className="mx-2 h-7" />*/}

      {/*<SectionFour*/}
      {/*  editor={editor}*/}
      {/*  activeActions={["orderedList", "bulletList"]}*/}
      {/*  mainActionCount={0}*/}
      {/*/>*/}

      {/*<Separator orientation="vertical" className="mx-2 h-7" />*/}

      {/*<SectionFive*/}
      {/*  editor={editor}*/}
      {/*  activeActions={["codeBlock", "blockquote", "horizontalRule"]}*/}
      {/*  mainActionCount={0}*/}
      {/*/>*/}
    </div>
  </div>
)
