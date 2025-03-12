"use client"

import Comment from "@/components/layout/discussion/comment";
import { Post } from "@/components/layout/discussion/item";
import moment from "moment";
import { extensionsCustom } from "@/components/layout/notes/tiptap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EditorContent, useEditor } from "@tiptap/react";
import { EllipsisVertical, Heart, MessageCircleMore, Send, Share2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";


interface CommentType {
    comment_author: string,
    comment_content: string,
    comment_time: string,
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const { data: session, status} = useSession();
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [post, setPost] = useState<Post>();

    const handleFetch = async () => {
        const request = await fetch(`/api/discussions/posts?id=${id}`,{
            method: "GET",
        });
        const response = await request.json();
        // console.log(response);

        setPost(response.body);

    }

    const handleUpdate = async () => {
        const req = await fetch(`/api/discussions/posts?id=${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment_author: session?.user.name || "user_undefined",
                comment_content: comment,
                comment_time: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        })
        const res = await req.json();
        console.log(res);
    }

    const handleLikeUpdate = async () => {
        const req = await fetch(`/api/discussions/posts?id=${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await req.json();
        console.log(res);
    }

    const handleLike = () => { setLiked(prev => !prev); handleLikeUpdate() }
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => { setComment(prev => e.target.value)}
    const handleCommentPush = () => { 
        handleUpdate();
        handleFetch();
        setComment(prev => "");
    };

    useEffect(() => {
        handleFetch();
    }, [])
    
    const editor = useEditor({
        extensions: extensionsCustom,
        content: post?.blog_content ? post.blog_content : null,
        editable:false,
        immediatelyRender: true,
        editorProps: {
            attributes: {
                class: "h-full w-full bg-zinc-100 dark:bg-zinc-950"
            }
        },
    },[post]);

    const data = [
        {
            comment_author: "yion69",
            comment_content: "Use chagpt or claude lmao"
        },
        {
            comment_author: "thutanai",
            comment_content: "I can help you with that just DM me my discord is @not_thutanai"
        }
    ]
    return(
        <div className="flex items-center justify-center w-full h-screen p-6 bg-zinc-200 dark:bg-zinc-950">
            <div className="flex flex-col w-9/12 h-full border rounded-xl overflow-hidden border-zinc-400 dark:border-zinc-800">
                <div className="flex items-center w-full h-20 px-4 gap-2 bg-zinc-300 dark:bg-zinc-900 border-b border-zinc-400 dark:border-zinc-800">
                    <Avatar className="size-11">
                        <AvatarImage src="#" />
                        <AvatarFallback>TN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-fit h-fit">
                        <h1 className="text-base">{post?.blog_author}</h1>
                        { post?.createdAt &&
                            <span className="text-xs">{new Date(post.createdAt).toLocaleString()}</span>
                        }
                    </div>
                </div>             
                <div className="flex w-full flex-grow">
                    <div className="w-1/2 h-full border-r border-zinc-400 dark:border-zinc-800">
                        <EditorContent className="w-full h-full" editor={editor} />
                    </div>
                    <div className="flex flex-col w-1/2 h-full">
                        <div className="w-full h-4/5 max-h-[31rem] overflow-y-scroll">
                            { 
                                post?.blog_comments.map((e: CommentType, i: number) => (
                                    <Comment key={i} comment_author={e.comment_author} comment_content={e.comment_content} comment_time={e.comment_time} />
                                ))
                                
                            }
                        </div>
                        <div className="flex flex-col w-full h-1/5">
                            <div className="flex w-full h-14 px-2 gap-2 border-t border-zinc-400 dark:border-zinc-800">
                                <div className="flex items-center justify-center w-fit h-full px-2 gap-2">
                                    <button title="like" type="button" className="h-full w-fit" onClick={handleLike}>
                                        {
                                            liked ? <Heart className="fill-white" /> : <Heart fill="none" />
                                        }
                                    </button>
                                    <span>{ liked ? (post?.blog_upvotes ?? 0) + 1 : (post?.blog_upvotes ?? 0)}</span>
                                </div>
                                <div className="flex items-center justify-center w-fit h-full px-2 gap-2">
                                    <span className="flex items-center justify-center w-fit h-full"><MessageCircleMore /></span>
                                    <span>{post?.blog_comments.length}</span>
                                </div>
                                <div className="flex items-center justify-center w-fit h-full ms-auto px-2 gap-2">
                                    <span className="flex items-center justify-center w-fit h-full">
                                        <Share2 size={20} />
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Trash2/>Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="flex items-center justify-center w-full h-20 px-2 py-4 border-t bg-zinc-200 dark:bg-zinc-950 border-zinc-400 dark:border-zinc-800">
                                <Input title="input" type="text" className="w-full h-full outline-0 rounded-xl border-zinc-400 dark:border-zinc-800" onChange={handleInput} value={comment}/>
                                <button className="flex items-center justify-center h-full w-14" type="button" title="btn" onClick={handleCommentPush}>
                                    <Send />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}