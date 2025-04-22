import {TooltipProvider} from "@/components/ui/tooltip";
import {RichTextEditor} from "@/components/text-editor";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Rich Text Editor Demo</h1>
      <div className="mb-6">
        <p className="text-muted-foreground">
          This is a demo of a rich text editor built with TipTap. Try out the formatting options in the toolbar below.
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <TooltipProvider>
          <RichTextEditor />
        </TooltipProvider>
      </div>
    </div>
  )
}