"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, SidebarProps } from "./sidebar"

export default function Sidebarwrapper ({user}:SidebarProps) {
    return (
        <SidebarProvider className="w-fit">
            <AppSidebar user={{
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
            }}  />
        </SidebarProvider>
    )
}