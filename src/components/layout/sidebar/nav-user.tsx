"use client"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import UserLogged from "./nav-user-logged"
import LoggedOut from "./nav-user-logoff"

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
