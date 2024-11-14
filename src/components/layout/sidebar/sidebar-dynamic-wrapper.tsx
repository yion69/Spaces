"use client"

import dynamic from 'next/dynamic'
import { SidebarProps } from './sidebar'

const Sidebarwrapper = dynamic(() => import("./sidebar-wrapper"), { 
ssr: false 
})

export default function SidebarDynamicWrapper({ user }: SidebarProps) {
  return <Sidebarwrapper user={user} />
}
