import { NoteI } from "@/app/home/notes/page";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { EditorContent, Extension, extensions, useEditor } from "@tiptap/react";
import { CircleUser, EllipsisVertical, FilePenLine, Trash2, UserRound } from "lucide-react";
import { extensionsCustom } from "./tiptap";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useToast } from "@/hooks/use-toast";
import next from "next";

export default function NoteItem ({ _id, note_author, note_name, createdAt, updatedAt, note_content, __v }:NoteI) 
{
    const router = useRouter();
    const { toast } = useToast();

    const handleClick = async () => {
        router.push(`/home/notes/${_id}`);
    }
    
    const handleDelete = async () => {
        try {
 
            const req = await fetch("/api/notes/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: _id
                })
            })

            const res = await req.json();

            console.log(res);
            if(res.action_completed) {
                toast({ 
                    variant: "default",
                    title: "Note Deleted Successfully",
                    description: "Your note has been successfully deleted."
                })
            }

        } catch (error) {
            console.error(error);
        }
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
        <div className="grid grid-cols-2 grid-rows-5 h-80 lg:h-96 w-full px-4 lg:px-4 py-4 bg-opacity-80 border border-zinc-400 bg-zinc-300  dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg">
            <div className="col-span-2 row-span-3 border-2 border-zinc-400 dark:border-zinc-800 rounded-md overflow-hidden">
                <div className="h-full w-full blur-0 lg:blur-sm hover:blur-none transition-all cursor-pointer duration-300">
                    <EditorContent editor={editor} className="bg-zinc-200 dark:bg-inherit" />
                </div>
            </div>
            <div className="flex flex-wrap col-span-2 items-start justify-between py-4">
                <h1 className="flex items-start text-2xl font-semibold ">{note_name}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleDelete}>
                            <Trash2/>Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <span className="w-full text-nowrap text-xs">Note ID - {_id}</span>
            </div>
            <div className="col-span-2 flex items-end justify-center h-full w-full gap-2">
                <Avatar className="flex items-center justify-center w-9 h-9 p-1 border border-zinc-700">
                    <AvatarImage src="#" />
                    <AvatarFallback><UserRound/></AvatarFallback>
                </Avatar>
                <div className="w-fit h-fit">
                    <h3 className="text-base">{note_author}</h3>
                    <p className="text-xs">{new Date(createdAt).toLocaleString()}</p>
                </div>
                <Button className="ms-auto w-20 lg:w-28" variant={"default"} onClick={handleClick}>
                    <FilePenLine/>View
                </Button>
            </div>
        </div>
    )
}