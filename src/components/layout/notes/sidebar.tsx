import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideIcon, Plus } from "lucide-react";
import React, { ReactNode } from "react";

interface ItemI {
    notes: {
        name: string
        url: string
        emoji: ReactNode
    }[]
}

export default function NoteSidebar ({ ...props }:React.ComponentProps<typeof Sidebar>) {
    const data:ItemI = {
        notes: [
            {
                name: "Project Management & Task Tracking",
                url: "#",
                emoji: "📊",
            },
            {
                name: "Family Recipe Collection & Meal Planning",
                url: "#",
                emoji: "🍳",
            },
        ]
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Notes</SidebarGroupLabel>
                <SidebarGroupAction>
                    <Plus /> <span className="sr-only">Add Project</span>
                </SidebarGroupAction>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {data.notes.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                            <a href={item.url} title={item.name}>
                                <span>{item.emoji}</span>
                                <span>{item.name}</span>
                            </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}