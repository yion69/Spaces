"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import UserLogged from "./nav-user-logged"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserLogged user={user} /> 
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
