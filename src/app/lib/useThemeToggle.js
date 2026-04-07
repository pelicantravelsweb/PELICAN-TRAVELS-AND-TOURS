"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "pelican_theme";

export default function useThemeToggle() {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light";
  });

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add("light_theme");
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
      return;
    }

    document.body.classList.remove("light_theme");
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
  }, [isLightTheme]);

  const handleThemeToggle = () => {
    setIsLightTheme((prev) => !prev);
  };

  return { isLightTheme, handleThemeToggle };
}