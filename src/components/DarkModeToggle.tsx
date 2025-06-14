
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // If theme is "black" set to "light", otherwise set to "black"
  const toggleTheme = () => {
    setTheme(theme === "black" ? "light" : "black");
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
