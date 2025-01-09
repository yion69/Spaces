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

    const [notes, setNotes] = useState<NoteI[]>([]);
    const [noteAuthor, setNoteAuthor] = useState("JohnDoe");
    const [createNoteName, setCreateNoteName] = useState("");
    const [loading, setLoading] = useState(false);
    const noteRef = useRef<HTMLInputElement>(null);

    useEffect(() => { handleFetch() },[]);

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
    
    const handleFetch = async () => {
        const req = await fetch("/api/notes", {
            method: "GET",
        })
        const res = await req.json();
        setNotes(prev => res.body);       
        console.log(res.body);
    }

    return (
        <div className="flex flex-col h-screen w-full">
            {/* <div className="flex flex-wrap justify-center items-center w-full h-fit px-4 py-4 lg:py-4 lg:px-10 gap-2 border-b bg-zinc-50 dark:bg-zinc-900">
                <form action="get" className="flex items-center w-full lg:w-10/12 h-fit lg:h-full gap-2">
                    <Input className="w-8/12 lg:w-10/12" />
                    <Button className="w-4/12 lg:w-2/12" variant={"default"}>
                        <Search /> Search
                    </Button>
                </form>
                <Dialog>
                    <DialogTrigger className="flex flex-1 items-center justify-center gap-2 border py-[10px] px-4 rounded-lg
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
            </div> */}

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