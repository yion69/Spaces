"use client"

import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ArrowBigDown, ArrowBigDownDash, ArrowBigUp, ArrowBigUpDash, Ellipsis, MessageSquare, Share2 } from "lucide-react"
import { useEffect, useState } from "react"

export interface PostI {
    user_photo: string | null,
    username: string,
    timestamp: string,
    post_title: string,
    post_content: string,
    post_reactions: number,
    post_comment: number
}

export interface PostProps { post_data:PostI };

export default function Item ({ post_data }:PostProps) {
 
    const [reaction,setReaction] = useState(false);
    const [bg, setBg] = useState("none");

    useEffect(() => {
        setBg(reaction ? prev => "white" : prev => "none");
    }, [reaction])
    
    return(
        <div className="h-52 w-full bg-inherit border-b">
            <div className="flex items-center h-1/4 w-full px-4 gap-2">
                <Avatar className="flex items-center justify-center size-6 bg-blue-400 rounded-sm">
                    <AvatarImage />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <h1 className="text-sm font-semibold">{post_data.username}</h1>
                <span className="text-xs">{post_data.timestamp}</span>
                <button type="button" title="more" className="ms-auto me-2"><Ellipsis /></button>
            </div>
            <div className="flex flex-col items-start h-2/4 w-full px-4">
                <h1 className="text-lg font-semibold">{post_data.post_title}</h1>
                <p className="text-sm">{post_data.post_content}</p>
            </div>
            <div className="flex items-center h-1/4 w-full px-4 gap-2">
                <div className="flex items-center justify-evenly w-fit h-4/6 px-4 gap-2 rounded-full bg-zinc-900">
                    <button type="button" title="like-button" className="" onClick={() => {setReaction(!reaction)}}>
                        <ArrowBigUp strokeWidth={1.5} fill={bg} />
                    </button>
                    <span>{post_data.post_reactions}</span>
                    <button type="button" title="like-button" className=""><ArrowBigDown strokeWidth={1.5} /></button>
                </div>
                <button type="button" className="flex items-center justify-center w-fit h-4/6 px-4 gap-2 rounded-full bg-zinc-900">
                    <MessageSquare strokeWidth={1.5} size={20} />
                    <span>{post_data.post_comment}</span>
                </button>
                <button type="button" className="flex items-center justify-center w-fit h-4/6 px-4 gap-2 rounded-full bg-zinc-900">
                    <Share2 strokeWidth={1.5} size={20} />
                    <span className="text-xs">Share</span>
                </button>
            </div>
        </div>
    )
}