"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookCopy,
  BookOpen,
  Bot,
  BotMessageSquare,
  Command,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  MessageCircleMore,
  NotebookTabs,
  Settings2,
  Slack,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-project"
import { NavUser } from "./nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/toggle"

// This is sample 
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/home/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Gemini AI",
      url: "/home/gemini",
      icon: BotMessageSquare,
    },
    {
      name: "Notes",
      url: "/home/notes",
      icon: NotebookTabs,
    },
    {
      name: "Resources",
      url: "/home/resource",
      icon: BookCopy,
    },
    {
      name: "Discussion",
      url: "/home/discussion",
      icon: MessageCircleMore,
    },
  ],
}

export interface SidebarProps extends React.ComponentProps<typeof Sidebar> { user:{ name: string, email: string, avatar: string} }

export function AppSidebar({ user, ...props }:SidebarProps) {
  const { state } = useSidebar();

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {state == "collapsed" &&
            <SidebarGroup>
              <Slack size={20} />
            </SidebarGroup>
          }
          <SidebarGroup>
            <div className="flex items-center justify-between">
              {state == "expanded" && <h1 className="text-2xl">Spaces</h1>}
              <SidebarTrigger />
            </div>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <NavProjects projects={data.projects} />
          <NavMain items={data.navMain} />
          <SidebarGroup>
            <SidebarMenuItem>
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
