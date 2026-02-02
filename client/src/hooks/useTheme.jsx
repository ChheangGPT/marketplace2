import { useEffect } from "react";

const themes = {
  light: { bg: "#ffffff", text: "#222222" },
  dark: { bg: "#121212", text: "#ffffff" },
  matcha: { bg: "#d4edda", text: "#155724" },
  strawberry: { bg: "#f8d7da", text: "#721c24" },
  "blue-sky": { bg: "#cce7ff", text: "#004085" },
};

export function useTheme(themeName) {
  useEffect(() => {
    const html = document.documentElement;
    const theme = themes[themeName] || themes.light;

    html.setAttribute("data-theme", themeName);
    html.style.setProperty("--bg-color", theme.bg);
    html.style.setProperty("--text-color", theme.text);

    localStorage.setItem("theme", themeName);
  }, [themeName]);
}
