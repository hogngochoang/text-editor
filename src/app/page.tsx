"use client"
import HomePage from "@/app/index";
import {ThemeProvider} from "@/components/providers/theme-provider";

export default function App() {

  return (
    <ThemeProvider>
      <div className="container mx-auto py-10 px-4 space-y-6">
        <h1 className="text-3xl font-bold">Rich Text Editor Demo</h1>
        <div className="">
          <p className="text-muted-foreground">
            This is a demo of a rich text editor built with TipTap. Try out the formatting options in the toolbar below.
          </p>
        </div>
        <HomePage/>
      </div>
    </ThemeProvider>

  )
}