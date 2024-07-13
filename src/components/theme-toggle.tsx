"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "~/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-12 rounded-full",
      )}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
