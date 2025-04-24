import {ReactNode} from 'react';
import {lexendDeca} from "@/app/font";
import "./globals.css";

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={lexendDeca.className}>
      {children}
    </body>
    </html>
  );
}
