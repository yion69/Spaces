"use client"

import { Button } from "@/components/ui/button";
import { Search, PlusCircle, FilePlus, Ban } from "lucide-react";
import { Input } from "@/components/ui/input";
import NoteItem from "@/components/layout/notes/notes-item";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { useSession } from "next-auth/react";

export interface NoteI {
  _id: string;
  note_author: string;
  note_name: string;
  note_content: JSONContent;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Notes () {

    const { data: session, status} = useSession();
    const [notes, setNotes] = useState<NoteI[]>([]); 
    const [noteAuthor, setNoteAuthor] = useState(session?.user.name);
    const [createNoteName, setCreateNoteName] = useState("");
    const [loading, setLoading] = useState(false);
    const noteRef = useRef<HTMLInputElement>(null);

    useEffect(() => { handleFetch() },[]);

    const handleNoteInput = () => {
        if(noteRef.current) {
            setCreateNoteName(prev => noteRef.current!.value)
        }
    }

    const handleFetch = async () => {
        
        const req = await fetch(`/api/notes?author=${session?.user.name}`, {
            method: "GET",
        })
        const res = await req.json();
        setNotes(prev => res.body);       
        console.log(res.body);
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex-1 grid grid-flow-row gird-cols-1 lg:grid-cols-3 h-fit max-h-dvh w-full px-4 lg:px-2 pt-2 pb-6 gap-2 overflow-y-scroll">
                <div className="flex flex-col h-80 lg:h-96 w-full px-4 lg:px-4 py-4 bg-opacity-80 border border-zinc-400 bg-zinc-300  dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-sm">
                    <Dialog>
                        <DialogTrigger className="w-full h-full flex flex-col items-center justify-center gap-2 py-[10px] px-4 rounded-lg text-xl">
                            <PlusCircle size={50} strokeWidth={1.5} />
                            <h1>Create new note</h1>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="text-2xl">Create Note</DialogTitle>
                            <DialogDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, quos?
                            </DialogDescription>
                            </DialogHeader>
                            <form action={"post"} className="flex flex-col gap-2">
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
                { 
                    notes.map((e,i) => (
                        <NoteItem 
                            key={i}
                            _id={e._id} 
                            note_author={e.note_author} 
                            note_name={e.note_name} 
                            note_content={e.note_content} 
                            createdAt={e.createdAt} 
                            updatedAt={e.updatedAt} 
                            __v={e.__v} />
                    ))
                }
            </div>
        </div>
    )
}