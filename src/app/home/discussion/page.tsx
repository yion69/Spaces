"use client"

import Item, { Post } from "@/components/layout/discussion/item";
import { Info, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
    
export default function Chat () {
 
    const [blogs, setBlogs] = useState<Post[] | null>(null);
    const tempData = {
        user_photo: null,
        username: "User000001",
        timestamp: "3 days ago",
        post_title: "Where can I read more about C+++?",
        post_content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, deleniti vitae! Eius sequi numquam quidem voluptatum in ipsa quos ratione recusandae vel quia, impedit consequuntur necessitatibus, debitis, odit quas. Totam.",
        post_reactions: 22,
        post_comment: 4
    }

    const fetchBlogs = async () => {
        const request = await fetch("/api/discussions",{
            method: "GET",
        });
        const response = await request.json();
        setBlogs(prev => response.body);
        console.log(blogs);
    }

    useEffect(() => {
        fetchBlogs();
    },[])

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-col flex-grow h-[90%] w-full box-border">
                <div className="flex items-center justify-between h-20 w-full px-4 py-4 gap-4 border-l bg-zinc-100 dark:bg-zinc-900">
                    <h1 className="w-full text-3xl">Discussion Board</h1>
                    {/* <div className="relative flex items-center w-full border-2 border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden bg-zinc-950">
                        <Search className="absolute left-3" size={20} />
                        <input className="w-full h-full ps-10 bg-zinc-50 dark:bg-zinc-950" type="text" title="input" placeholder="Search" />
                    </div> */}
                    <Link href="/home/discussion/create" className="flex items-center w-fit h-full">
                        <button className="flex items-center justify-start h-full px-4 gap-1 border-2 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-md " type="button" title="button">
                            <Plus /> Create
                        </button>
                    </Link>
                </div>
                <div className="flex-grow w-full p-0 box-border bg-zinc-100 dark:bg-zinc-950 overflow-scroll">
                    { blogs &&
                        blogs?.map((e,i) => (
                            <Item post_data={e} key={i} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}