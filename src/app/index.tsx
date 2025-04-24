import {TooltipProvider} from "@/components/ui/tooltip";
import {RichTextEditor} from "@/components/text-editor";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {ThemeMode, useTheme} from "@/components/providers/theme-provider";

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

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
  }
  return (
      <div className='flex flex-col gap-6 w-full '>
        <div className="flex justify-end">
          <Button variant="outline" size="icon" onClick={toggleTheme} suppressHydrationWarning>
            {theme === "dark" ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
          </Button>
        </div>
        <Tabs defaultValue="fixed">
          <TabsList className='w-full mb-1'>
            <TabsTrigger value="fixed" className="w-full">Fixed Toolbar</TabsTrigger>
            <TabsTrigger value="inline" className="w-full">Inline Toolbar</TabsTrigger>
          </TabsList>
          <TabsContent value="fixed">
            <TooltipProvider>
              <RichTextEditor value={demoContent} mode="fixed"/>
            </TooltipProvider>
          </TabsContent>
          <TabsContent value="inline">
            <TooltipProvider>
              <RichTextEditor value={demoContent} mode="inline"/>
            </TooltipProvider>
          </TabsContent>
        </Tabs>
      </div>
  )
}