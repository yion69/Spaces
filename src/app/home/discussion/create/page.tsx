"use client"

import Tiptap from "@/components/layout/notes/tiptap";
import { JSONContent } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { TagI, TagInput, TagInputProps } from "@/components/layout/discussion/tags";
import { Code, Dices, Drama, HandHelping, Info, Laugh, NotebookText, Plus, TriangleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function CreateBlog () {

    const router = useRouter();
    const { data: session, status} = useSession()   ;
    
    const [document, setDocument] = useState<JSONContent>();
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const tagData: TagInputProps<TagI> = {
        name: "post_tag",
        state: tags,
        setState: setTags,
        tag_list: [
            { title: "Drama", icon: <Drama size={15} /> },
            { title: "Random", icon: <Dices size={15} /> },
            { title: "Help", icon: <HandHelping size={15} /> },
            { title: "Serious", icon: <TriangleAlert size={15} /> },
            { title: "Funny", icon: <Laugh size={15} /> },  
            { title: "Assignment", icon: <NotebookText size={15} /> },
            { title: "Programming", icon: <Code size={15} />},
        ]
    }

    const [blogData, setBlogData] = useState({
        req_author: "",
        req_title: "",
        req_content: {},
        req_tag: "",
        req_upvotes: 1,
        req_comments: [],
    });

    useEffect(() => {
        setBlogData((prev) => ({
            ...prev,
            req_author: session?.user.name || "user_undefined",
            req_title: title,
            req_content: document || "error 404",
            req_tag: tags,
        }))
    },[ title, tags, document])

    const handleFormSubmit = async (e:FormEvent) => {
        e.preventDefault();
 
        if(tags.trim() === "" || title.trim() === "") {
            toast({
                title: "Post title or tags cannot left empty",
            })
        }

        try {
            const request = await fetch("/api/discussions",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    blog_data: blogData
                })
            })
    
            const response = await request.json();
            
            if(response.action_complete) {
                router.push('/home/discussion')
            }

            console.log(response);

       } catch (error) {
        console.log(error);
       }
    }

    return(
        <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
            <form method="post" className="flex flex-col w-6/12 h-5/6 gap-4 " onSubmit={handleFormSubmit}>
                <h1 className="text-3xl">Create Post</h1>
                <div className="flex flex-col gap-2 w-full h-fit">
                    <label htmlFor="title">Post Title</label>
                    <Input onChange={(e)=>setTitle(prev => prev = e.currentTarget.value)} />
                </div>
                <div className="flex flex-col gap-3 w-full h-fit">
                    <div className="flex items-center gap-3">
                        <label htmlFor="title">Post Tags</label>
                        <Tooltip>
                            <TooltipTrigger><Info size={20} /></TooltipTrigger>
                            <TooltipContent>
                                <div className="flex flex-col gap-2">
                                    <p>Tag Types</p>
                                    <ul className="list-none">
                                        <li className="flex gap-2"><Drama size={15}/>Drama</li>
                                        <li className="flex gap-2"><Dices size={15}/>Random Topic</li>
                                        <li className="flex gap-2"><HandHelping size={15}/>Help Needed</li>
                                        <li className="flex gap-2"><TriangleAlert size={15}/>Serious Topic</li>
                                        <li className="flex gap-2"><Code size={15}/>Programming Language</li>
                                    </ul>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger className="flex gap-2">
                                <div className="flex items-center justify-center w-fit h-10 px-4 gap-2 text-sm bg-zinc-900 rounded-md hover:bg-zinc-800">
                                    <Plus /> Add Tag
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Select Tag</DialogTitle>
                                <DialogDescription className="flex flex-col p-2 box-border">
                                    <TagInput 
                                        state={tagData.state} 
                                        setState={tagData.setState} 
                                        name={tagData.name} 
                                        tag_list={tagData.tag_list} />
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        { tags !== "" &&
                            <div className="flex items-center justify-center w-fit min-w-28 h-10 px-4 rounded-full text-zinc-200 bg-zinc-900">
                                {tags}
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full h-1/3 rounded-lg">
                    <Tiptap setDocument={setDocument} />
                </div>           
                <div className="grid grid-cols-2 self-end w-2/6 gap-2">
                    <Button className="text-red-600" variant={"ghost"} onClick={()=>router.push('/home/discussion')}>Cancel</Button>         
                    <Button variant={"secondary"}>Create</Button>
                </div>
            </form>
        </div>
    )
}