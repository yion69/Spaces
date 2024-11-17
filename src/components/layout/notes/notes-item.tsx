import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";

export interface NoteItemI {
    note_id: string,
    note_name: string,
    note_description: string,
    note_created: string,
}

interface PropsI { note_data: NoteItemI }

export default function NoteItem ({ note_data }:PropsI) {
    return (
        <div className="grid grid-cols-2 grid-rows-4 h-72 w-full px-10 py-6 bg-opacity-80 border border-zinc-400 bg-zinc-300  dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg">
            <div className="flex col-span-2 items-start justify-between">
                <h1 className="flex items-start text-2xl underline underline-offset-4">{note_data.note_name}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Trash2/>Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="col-span-2 row-span-2">{note_data.note_description}</p>
            <div className="flex flex-col w-fit h-fit mt-auto text-xs">
                <span>ID: {note_data.note_id}</span>
                <span>Created in {note_data.note_created}</span>
            </div>
            <div className="flex w-fit h-fit ms-auto mt-auto">
                <Button className="w-28" variant={"default"}><FilePenLine/>View</Button>
            </div>
        </div>
    )
}