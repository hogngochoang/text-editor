import {ReactNode} from 'react';
import {lexendDeca} from "@/app/font";
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';
import "./globals.css";

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={lexendDeca.className}>
      {children}
    </body>
    </html>
  );
}
