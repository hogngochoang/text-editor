'use client';

import {ReactNode, useEffect} from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({children}: ThemeProviderProps) {
  let theme = 'light';
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return <>
    {children}
  </>
}
