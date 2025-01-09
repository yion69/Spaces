"use client"

import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ArrowBigDown, ArrowBigDownDash, ArrowBigUp, ArrowBigUpDash, Ellipsis, Heart, MessageSquare, Share2 } from "lucide-react"
import { SetStateAction, useEffect, useState } from "react"
import Tiptap, { extensionsCustom } from "../notes/tiptap"
import { Extension, JSONContent } from "@tiptap/core"
import { EditorContent, useEditor } from "@tiptap/react"
import RichTextEditor from "./text-editor"
import { useRouter } from "next/navigation"

export interface Post {
    _v: number,
    _id: string,
    blog_author: string,
    blog_comments: [],
    blog_content: {},
    blog_tag: string,
    blog_title: string,
    blog_upvotes: number,
    createdAt: string,
    updatedAt: string,
}

export interface PostProps { post_data:Post };

export default function Item ({ post_data }:PostProps) {
 
    const [reaction,setReaction] = useState(false);
    const [reactionCount, setReactionCount] = useState(0);
    const [bg, setBg] = useState("none");

    const router = useRouter();
    
    useEffect(() => {
        setReactionCount(prev => prev = post_data.blog_upvotes);
    }, [])
    
    useEffect(() => {
        setBg(reaction ? prev => "white" : prev => "none");
    }, [reaction])
 

    const handleReaction = () => {
        setReaction(prev => !prev);
        if(reaction) { setReactionCount(prev => prev - 1); return};
        setReactionCount(prev => prev + 1);
    }

    const handleRoute = () => {
        router.push(`/home/discussion/${post_data._id}`);
    }

    return(
        <div className="h-44 w-full bg-zinc-100 dark:bg-zinc-950 border-b text-zinc-950 dark:text-zinc-100">
            <div className="flex items-center h-1/3 w-full px-4 gap-2">
                <Avatar className="flex items-center justify-center size-6 bg-blue-400 rounded-sm">
                    <AvatarImage />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <h1 className="text-sm font-semibold">{post_data.blog_author}</h1>
                <span className="text-xs">{new Date(post_data.createdAt).toLocaleString()}</span>
                <button type="button" title="more" className="ms-auto me-2"><Ellipsis /></button>
            </div>
            <div className="flex flex-col justify-center h-1/3 w-full px-4 cursor-pointer" onClick={handleRoute}>
                <h1 className="text-2xl font-extralight">{post_data.blog_title}</h1>
            </div>
            <div className="flex items-center h-1/3 w-full px-3 gap-2">
                <div className="flex items-center justify-evenly w-20 h-4/6 px-4 gap-1 rounded-full bg-zinc-100  dark:bg-zinc-900">
                    <button type="button" title="like-button" onClick={handleReaction}>
                        { 
                            reaction ?  <Heart strokeWidth={1.5} size={20} className="fill-zinc-950 dark:fill-zinc-100" /> : 
                                        <Heart strokeWidth={1.5} size={20} className="fill-none" />
                        }
                        
                    </button>
                    <span>{reactionCount}</span>
                </div>
                <button type="button" className="flex items-center justify-center w-fit h-4/6 px-4 gap-2 rounded-full bg-zinc-100  dark:bg-zinc-900">
                    <MessageSquare strokeWidth={1.5} size={20} />
                    <span>{post_data.blog_comments.length}</span>
                </button>
                <button type="button" className="flex items-center justify-center w-fit h-4/6 px-4 gap-2 rounded-full bg-zinc-100  dark:bg-zinc-900">
                    <Share2 strokeWidth={1.5} size={20} />
                    <span className="text-xs">Share</span>
                </button>
                <span className="self-end w-fit ms-auto mb-2 text-xs text-zinc-600">Blog ID:{post_data._id}</span>
            </div>
        </div>
    )
}