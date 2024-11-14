import { Button } from "@/components/ui/button";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";

export default function UserLogged ({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
    const { state } = useSidebar();
    return (
      <div className="flex">
        <Avatar className="h-8 w-8 m-auto rounded-lg border flex items-center justify-center overflow-hidden">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>CN</AvatarFallback> 
        </Avatar>
        {state == "expanded" && 
          <div className="px-4 grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        }
        {state == "expanded" && 
          <Button size={"icon"} variant={"outline"} className="bg-transparent">
            <LogOut />
          </Button>
        }
      </div>
    )
}