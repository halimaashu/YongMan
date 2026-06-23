"use client";

import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>The current theme is: {theme}</p>

      <button onClick={() => setTheme("light")}>
        Light Mode
      </button>

      <button onClick={() => setTheme("dark")}>
        Dark Mode
      </button>
    </div>
  );
};

export default ThemeChanger;