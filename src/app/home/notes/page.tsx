"use client"

import { NoteItemI } from "@/components/layout/notes/notes-item";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, FilePlus, Ban } from "lucide-react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import NoteItem from "@/components/layout/notes/notes-item";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useRef, useState } from "react";
import Link from "next/link";

export default function Notes () {

    const { id } = useParams();
    const [noteAuthor, setNoteAuthor] = useState("JohnDoe");
    const [createNoteName, setCreateNoteName] = useState("");
    const [loading, setLoading] = useState(false);
    const noteRef = useRef<HTMLInputElement>(null);

    const handleNoteInput = () => {
        if(noteRef.current) {
            setCreateNoteName(prev => noteRef.current!.value)
        }
    }

    const handleCreate = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(prev => true);
            const request = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    noteName: {createNoteName}
                })
            })
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(prev => false);
        }
    }

    const note_data:NoteItemI = {
        note_id: "23942813",
        note_name: "The Water Cycle",
        note_description: "The continuous process by which water moves through the atmosphere, land, and oceans, involving evaporation, condensation, and precipitation.",
        note_created: "2024-11-15 2:30:45",
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-wrap justify-center items-center w-full h-fit py-4 px-10 gap-2 border-b bg-zinc-50 dark:bg-zinc-900">
                <form action="post" className="flex items-center w-10/12 h-full gap-2">
                    <Input className="w-10/12" />
                    <Button className="w-2/12" variant={"default"}>
                        <Search /> Search
                    </Button>
                </form>
                <Dialog>
                    <DialogTrigger className="flex items-center justify-center gap-2 border py-[10px] px-4 rounded-lg
                        border-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 box-border text-sm">
                        <PlusCircle size={20} strokeWidth={1.5} /> Create Note
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle className="text-4xl">Create Note</DialogTitle>
                        <DialogDescription>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, quos?
                        </DialogDescription>
                        </DialogHeader>
                        <form action={"post"} className="flex flex-col gap-2" onSubmit={handleCreate}>
                            <Label className="text-md">Name of the note</Label>
                            <div className="flex gap-2">
                                <Input ref={noteRef} onChange={handleNoteInput} />
                                <Link href={`/home/notes/create?notename=${createNoteName}&noteauthor=${noteAuthor}`}>
                                    { loading ? 
                                        <Button disabled className="flex items-center justify-center rounded-lg">
                                            <Ban />
                                        </Button> :
                                        <Button type="submit" className="flex items-center justify-center rounded-lg">
                                            <FilePlus />
                                        </Button> 
                                    }
                                </Link>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex-1 grid grid-flow-row grid-cols-2 h-fit max-h-[90vh] w-full px-10 py-6 gap-4 overflow-y-scroll">
                { 
                    [...Array(3)].map((_,i) => (
                        <NoteItem key={i} note_data={note_data} />
                    ))
                }
            </div>
        </div>
    )
}