import { NoteI } from "@/app/home/notes/page";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EditorContent, Extension, extensions, useEditor } from "@tiptap/react";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
import { extensionsCustom } from "./tiptap";
import { useRouter } from "next/navigation";

export default function NoteItem ({ _id, note_author, note_name, createdAt, updatedAt, note_content, __v }:NoteI) 
{
    const router = useRouter();

    const handleClick = async () => {
        router.push(`/home/notes/${_id}`);
    }
    
	const editor = useEditor({
		extensions: extensionsCustom,
		content: note_content,
        editable:false,
		immediatelyRender: true,
		editorProps: {
			attributes: {
				class: "h-screen w-full"
			}
		},
	});

    return (
        <div className="grid grid-cols-2 grid-rows-4 h-72 w-full px-10 py-6 bg-opacity-80 border border-zinc-400 bg-zinc-300  dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg">
            <div className="flex col-span-2 items-start justify-between">
                <h1 className="flex items-start text-2xl underline underline-offset-4">{note_name}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Trash2/>Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="col-span-2 row-span-2 border border-zinc-400 dark:border-zinc-800 rounded-md overflow-hidden">
                <EditorContent editor={editor} className="bg-zinc-200 dark:bg-inherit" />
            </div>
            <div className="flex flex-col w-fit h-fit mt-auto text-xs">
                <span>ID: {_id}</span>
                <span>Created in {createdAt}</span>
            </div>
            <div className="flex w-fit h-fit ms-auto mt-auto">
                <Button className="w-28" variant={"default"} onClick={handleClick}><FilePenLine/>View</Button>
            </div>
        </div>
    )
}