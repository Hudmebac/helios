
"use client"

import { Moon, Sun, Contrast, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes: {value: string, label: string, icon: React.ReactNode}[] = [
    { value: "light", label: "Light", icon: <Sun className="mr-2 h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="mr-2 h-4 w-4" /> },
    { value: "hc-light", label: "High Contrast Light", icon: <Contrast className="mr-2 h-4 w-4" /> },
    { value: "hc-dark", label: "High Contrast Dark", icon: <Contrast className="mr-2 h-4 w-4" /> },
    { value: "system", label: "System", icon: <Laptop className="mr-2 h-4 w-4" /> },
  ];

  const currentThemeIcon = () => {
    // When theme is "system", resolvedTheme gives the actual theme applied
    const displayTheme = theme === "system" ? resolvedTheme : theme;
    switch(displayTheme) {
      case 'light': return <Sun className="h-5 w-5" />;
      case 'dark': return <Moon className="h-5 w-5" />;
      case 'hc-light':
      case 'hc-dark': return <Contrast className="h-5 w-5" />;
      default: return <Laptop className="h-5 w-5" />;
    }
  }

  if (!mounted) {
    return (
        <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
            <Laptop className="h-5 w-5" />
        </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {currentThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)} className="cursor-pointer">
            {t.icon}
            <span>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
