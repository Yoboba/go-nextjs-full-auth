"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "./button";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // TODO: replace color code with color from design system
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" border-g2 px-[8px] text-g2 hover:bg-g2 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-g2"
    >
      {theme === "light" ? (
        <IconMoonFilled size={20} />
      ) : (
        <IconSunFilled size={20} />
      )}
    </Button>
  );
}
