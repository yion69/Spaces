"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { SidebarMenuItem, SidebarMenuButton } from "./sidebar"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <SidebarMenuButton tooltip={"hi"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <div className="w-fit h-fit">
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="hidden h-4 w-4 dark:block" />
      </div>
      <span>Toggle Theme</span>
    </SidebarMenuButton>
  )
}
