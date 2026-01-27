"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative p-2 rounded-full",
          "bg-secondary/50",
          "border border-border/50",
          "w-8 h-8",
          className,
        )}
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-colors",
        "bg-secondary/50 hover:bg-secondary",
        "border border-border/50 hover:border-border",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" aria-hidden="true" />
        )}
      </motion.div>
    </motion.button>
  );
}
