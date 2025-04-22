import {ReactNode} from 'react';
import {lexendDeca} from "@/app/font";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/theme-provider";

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={lexendDeca.className}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
    </html>
  );
}
