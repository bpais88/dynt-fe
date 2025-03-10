"use client";

import { THEMES } from "@/constants";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";
type Props = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  isDark: boolean;
};

const LocalStateContext = createContext({} as Props);

const LocalStateProvider = LocalStateContext.Provider;

const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const localTheme = (localStorage.getItem("@theme") as Theme) || "dark";
    document.documentElement.setAttribute("data-theme", THEMES[localTheme]);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", THEMES[theme]);
    localStorage.setItem("@theme", theme);
  }, [theme]);

  return (
    <LocalStateProvider value={{ theme, setTheme, isDark: theme === "dark" }}>
      {children}
    </LocalStateProvider>
  );
};

const useTheme = () => useContext(LocalStateContext);

export { ThemeContextProvider, useTheme };
