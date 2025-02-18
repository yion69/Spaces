"use client"

import { useEffect, useRef, useState } from "react"

interface TextareaI { message: string, setMessage: (newMessage:string) => void }
export default function Textarea ({ message, setMessage }:TextareaI) {

    const textareaRef = useRef<HTMLTextAreaElement>(null); 

    useEffect(() => {
        if(textareaRef.current) { 
            textareaRef.current.style.height = "auto"; 
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        };
    },[message])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    
    return(
        <textarea className="h-4 flex w-full border border-zinc-700 px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[20px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-zinc-100 dark:bg-zinc-900" placeholder="Send a message..." value={message} rows={2} autoFocus={undefined} ref={textareaRef} onChange={handleChange} name="prompt"></textarea>
    )
}