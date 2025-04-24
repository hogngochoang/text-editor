'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system"
}

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  // Delay setting theme until after mount (to access localStorage safely)
  useEffect(() => {
    const storedTheme = localStorage.getItem("gungnix:theme") as ThemeMode | null;
    setTheme(storedTheme || ThemeMode.SYSTEM);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    const removeThemes = () => {
      root.classList.remove(ThemeMode.LIGHT, ThemeMode.DARK);
    };

    if (theme === ThemeMode.SYSTEM) {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

      const applySystemTheme = () => {
        removeThemes();
        const newTheme = systemDark.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
        root.classList.add(newTheme);
      };

      applySystemTheme();
      systemDark.addEventListener("change", applySystemTheme);

      return () => {
        systemDark.removeEventListener("change", applySystemTheme);
      };
    }

    removeThemes();
    root.classList.add(theme);
    localStorage.setItem("gungnix:theme", theme);
  }, [theme]);

  // Avoid rendering until theme is determined (prevents hydration issues)
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
