import {TooltipProvider} from "@/components/ui/tooltip";
import {RichTextEditor} from "@/components/text-editor";

export default function Home() {
  const demoContent = `
    <h1>Welcome to the Rich Text Editor</h1>
    <p>This is a <strong>rich text editor</strong> built with <em>TipTap</em>.</p>
    <p>Try out the formatting options in the toolbar above!</p>
    <ul>
      <li>Create lists</li>
      <li>Format text</li>
      <li>Add links</li>
    </ul>
    <blockquote>You can even add blockquotes like this one.</blockquote>
    <p>Have fun exploring!</p>
  `
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
          <RichTextEditor value={demoContent}/>
        </TooltipProvider>
      </div>
    </div>
  )
}