"use client"

import Tiptap from "@/components/layout/notes/tiptap";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { JSONContent } from "@tiptap/react";
import { FilePlus2, Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { setTimeout } from "timers";

export default function Create () {
    
    const searchParams = useSearchParams();
    const paramsName = searchParams.get("notename");
    const noteAuthor = searchParams.get("noteAuthor");
    const [noteName, setNoteName] = useState("");
    const [newName, setNewName] = useState("");
    const [document, setDocument] = useState<JSONContent>();
    const { toast } = useToast(); 
    const router = useRouter();

    useEffect(() => {
        setNoteName(paramsName!);
    },[])

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => { setNewName(prev => e.target.value) };

    const handleNameChangeClick = () => { setNoteName(prev => newName) };

    const handleCreate = async (e:React.FormEvent) => {
        e.preventDefault();

        if(document === undefined || document === null) { 
            toast({ 
                variant: "destructive",
                title: "Uh oh something went wrong",
                description: "You cannot save a default document. Please make some changes to save the note."
            })
        }

        try {
            const request = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note_author: "John Doe",
                    note_name: noteName,
                    note_content: document
                }),
            })
            const response = await request.json();
 
            if(response.action_complete === true) {
                toast({ 
                    variant: "default",
                    title: "Note Created Successfully",
                    description: "Your note has been successfully created. Redirecting you to the notes page shortly."
                })
                setTimeout(() => {
                    router.push("/home/notes");
                }, 5000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="z-0 flex items-center justify-between flex-1 w-full px-4 border border-b-0 rounded-t-md bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center w-fit h-full gap-2">
                    <h1 className="text-3xl">
                        {noteName? noteName : "Untitled"}
                    </h1>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={"icon"} variant="ghost"><Pencil /></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Edit Note Name</DialogTitle>
                                <DialogDescription>
                                    Make changes to your note name here. Click save when you're done.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex flex-col items-start justify-center gap-4">
                                        <Input
                                        id="name"
                                        placeholder="e.g. Science Note"
                                        className="col-span-3"
                                        onChange={handleNameChange}
                                        />
                                    </div>
                                    <Button type="button" onClick={handleNameChangeClick}>Save changes</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <form method="post" onSubmit={handleCreate}>
                    <div className="grid grid-cols-2 items-center w-fit h-full gap-2">
                        <Button variant={"destructive"}><FilePlus2 />Cancel</Button>
                        <Button><FilePlus2 />Create Note</Button>
                    </div>
                </form>
            </div>
            <div className="w-full h-[90%] z-10">
                <Tiptap setDocument={setDocument} />
            </div>
        </div>
    )
}