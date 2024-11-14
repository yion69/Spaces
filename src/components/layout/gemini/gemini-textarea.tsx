"use client"

import { useEffect, useRef, useState } from "react"

export default function Textarea () {

    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null); 

    useEffect(() => {
        if(textareaRef.current) { 
            textareaRef.current.style.height = "auto"; 
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        };
    },[value])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }
    
    return(
        <textarea className="h-auto flex w-full border border-zinc-700 px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[20px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted" placeholder="Send a message..." rows={2} autoFocus={undefined} ref={textareaRef} onChange={handleChange} name="prompt"></textarea>
    )
}