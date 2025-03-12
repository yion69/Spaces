"use client"

import { ChevronDown, ListPlus, Plus, Trash, User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

interface TeamMember {
  member_name: string,
  member_email: string,
}

export function CardsTeamMembers() {

  const { data: session, status} = useSession();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<Record<string,string>[]>([{
    member_name: session?.user.name || "user_undefined",
    member_email: session?.user.email || "@gmail.com"
  }]);


  const handleNameInput = (e:React.ChangeEvent<HTMLInputElement>) => { setName(prev => e.target.value) };
  const handleEmailInput = (e:React.ChangeEvent<HTMLInputElement>) => { setEmail(prev => e.target.value) };
  const handleMemberAdd = () => {
    if(members.length === 4) { return };

    setMembers(prev => [...prev, {
      member_name: name,
      member_email: email,
    }]);
  }
  const handleRemove = (memberName: string) => {
    if(memberName == session?.user.name) { 
        toast({
          title: "Cannot Delete Yourself",
        })
        return;
    };
    setMembers((prev) => prev.filter((member) => member.member_name !== memberName));
  };

  return (
    <Card className="relative w-full h-full bg-transparent">
      <Dialog>
          <DialogTrigger className="absolute right-4 top-6 flex gap-2 p-2 items-center justify-center text-zinc-100"><Plus size={20} />Add member</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="task" className="w-fit text-nowrap">Member Name</label>
                  <Input onChange={handleNameInput} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="task" className="w-fit text-nowrap">Member Email</label>
                  <Input onChange={handleEmailInput} />
                </div>
                <Button className="w-fit px-4 ms-auto mt-2" onClick={handleMemberAdd}><Plus />Add</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {
          members.map((e,i) => (
            <div key={i} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8 rounded-none">
                  <AvatarFallback className="text-xs"><User size={20} /></AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{e.member_name}</p>
                  <p className="text-sm text-muted-foreground">{e.member_email}</p>
                </div>
              </div>
              <Button variant={"ghost"} className="size-fit ms-auto" onClick={()=>handleRemove(e.member_name)}><Trash size={20} /> </Button>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}
