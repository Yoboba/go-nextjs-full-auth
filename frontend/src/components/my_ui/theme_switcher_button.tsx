"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
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

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-full h-full cursor-pointer px-[2px] py-[2px] text-g2   flex items-center justify-center"
    >
      {theme === "light" ? (
        <div className=" inline-flex items-center gap-2">
          <IconMoonFilled size={20} />
          <h2 className="font-semibold">Dark</h2>
        </div>

      ) : (
        <div className=" inline-flex items-center gap-2">
          <IconSunFilled size={20} />
          <h2 className="font-semibold">Light</h2>
        </div>
      )}
    </div>
  );
}
