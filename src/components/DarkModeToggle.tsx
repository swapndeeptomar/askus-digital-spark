
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

// Helper to sync theme class with <body>
const syncBodyClass = (theme: string) => {
  document.body.classList.remove("black", "dark");
  if (theme === "black") {
    document.body.classList.add("black");
  } else if (theme === "dark") {
    document.body.classList.add("dark");
  }
};

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Sync current theme to body class on every theme change
  useEffect(() => {
    if (theme) syncBodyClass(theme);
  }, [theme]);

  // Toggle between "light" and "black"
  const toggleTheme = () => {
    const target = theme === "black" ? "light" : "black";
    setTheme(target);
    syncBodyClass(target); // Immediate effect
  };

  const isBlack = theme === "black";

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed z-[200] bottom-6 right-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 hover:bg-gray-100 transition-all dark:border-gray-800"
      aria-label="Toggle dark mode"
    >
      {isBlack ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
