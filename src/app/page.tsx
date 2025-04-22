"use client"

import {TooltipProvider} from "@/components/ui/tooltip";
import {RichTextEditor} from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {useTheme} from "next-themes";

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

export default function Home() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Rich Text Editor Demo</h1>
      <div className="">
        <p className="text-muted-foreground">
          This is a demo of a rich text editor built with TipTap. Try out the formatting options in the toolbar below.
        </p>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <TooltipProvider>
          <RichTextEditor value={demoContent}/>
        </TooltipProvider>
      </div>
    </div>
  )
}