"use client"

import { extensionsCustom } from "@/components/layout/notes/tiptap";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { use } from "react";
import { useEffect, useState } from "react";

import { NoteI } from "../page";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { Heading1 } from "@/components/toolbars/heading-1";
import { Heading2 } from "@/components/toolbars/heading-2";
import { Heading3 } from "@/components/toolbars/heading-3";
import { ColorRed } from "@/components/toolbars/color-red";
import { ColorWhite } from "@/components/toolbars/color-white";
import { ColorYellow } from "@/components/toolbars/color-yellow";
import { ColorPink } from "@/components/toolbars/color-pink";
import { ColorPurple } from "@/components/toolbars/color-purple";
import { ColorBlue } from "@/components/toolbars/color-blue";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FilePenLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Note ({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const router = useRouter();
    const [data, setData] = useState<NoteI>();

    useEffect(() => { handleFetch() }, []);

    useEffect(()=>{console.log(data?.note_content)},[data]);

    const handleFetch = async () => {
        console.log(id);
        try {
            const req = await fetch("/api/notes/details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: id 
                })
            })
            const res = await req.json();
            setData(prev => res.body);
        } catch (error) {
            console.error(error);
        }
    }

    const handleBack = () => { router.push("/home/notes") };
 
    const editor = useEditor({
		extensions: extensionsCustom,
		content: data?.note_content ? data.note_content : null,
        editable:true,
		immediatelyRender: true,
		editorProps: {
			attributes: {
				class: "h-screen w-full"
			}
		},
	},[data]);

    return (
            <div className="flex flex-col h-screen w-full">
                <div className="flex items-center justify-between w-full h-14 bg-background">
                    <Button variant={"ghost"} className="h-full rounded-none" size={"lg"} onClick={handleBack}>
                        <ChevronLeft/>Back
                    </Button>
                    <Button variant={"ghost"} size={"lg"} className="h-full rounded-none"><FilePenLine/>Update</Button>
                </div>
                <div className="border w-full h-5/6 flex-1 relative rounded-md rounded-t-none overflow-hidden overflow-y-scroll no-scrollbar">
                    <div className="flex w-full items-center py-2 px-2 justify-between border-b sticky top-0 left-0 bg-zinc-50 dark:bg-background z-20">
                        <ToolbarProvider editor={editor}>
                            <TooltipProvider>
                                <div className="flex flex-wrap items-center gap-2">
                                    <RedoToolbar />
                                    <Separator orientation="vertical" className="h-7" />
                                    <BoldToolbar />
                                    <ItalicToolbar />
                                    <StrikeThroughToolbar />
                                    <BulletListToolbar />
                                    <OrderedListToolbar />
                                    <CodeToolbar />
                                    <CodeBlockToolbar />
                                    <HorizontalRuleToolbar />
                                    <BlockquoteToolbar />
                                    <HardBreakToolbar />
                                    <Separator orientation="vertical" className="h-7" />
                                    <Heading1 />
                                    <Heading2 />
                                    <Heading3 />
                                    <Separator orientation="vertical" className="h-7" />
                                    <ColorWhite />
                                    <ColorYellow />
                                    <ColorRed />
                                    <ColorPink />
                                    <ColorPurple />
                                    <ColorBlue />
                                </div>
                            </TooltipProvider>
                        </ToolbarProvider>
                    </div>
                    <div
                        onClick={() => {
                            editor?.chain().focus().run();
                        }}
                        className="cursor-text min-h-[18rem] bg-zinc-100 dark:bg-background"
                    >
                        <EditorContent className="outline-none" editor={editor} />
                    </div>
                </div>
            </div>
        )
}