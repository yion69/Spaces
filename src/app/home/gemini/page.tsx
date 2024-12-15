"use client"

import { MessageGemini, MessageUser } from "@/components/layout/gemini/gemini-message";
import Textarea from "@/components/layout/gemini/gemini-textarea";
import Welcomescreen from "@/components/layout/gemini/gemini-welcome";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CirclePause, Info, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface UserRequestI { type: "user", message: string };

interface GeminiResponseI { type:"gemini", session: string, message: string, metadata: Record<string,any>}

type MessageT = UserRequestI | GeminiResponseI;

export default function Chatapp () {

    const router = useRouter();
    const [message, setMessage] = useState("");
    const [chat, setChats] = useState<MessageT[]>([]);
    const [loading, setLoading] = useState(false);

    const handlePost = async (e:React.FormEvent) => {
        e.preventDefault();
        
        const prompt = message;

        console.log(prompt);

        setChats(prev => [...prev, {
            type: "user",
            message: message
        }]);

        setMessage("");

        try {
            setLoading(prev => true)
            const request = await fetch("/api/chat-stream",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt,
                    session_id: "one"
                })
            });
            const data  = await request.json();
            
            setChats(prev => [...prev, data]);

            console.log(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(prev => false)
        }
    }

    const handleBack = () => { router.push("/home/dashboard") };

    return(
        <div className="h-full w-full">
            <div className="relative h-full w-full box-border overflow-hidden border border-y-0 border-zinc-400 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-950">
                <div className="z-20 absolute flex items-center justify-between w-full h-14 bg-background border-b border-zinc-400 dark:border-zinc-800">
                    <Button variant={"ghost"} className="h-full rounded-none" size={"lg"} onClick={handleBack}>
                        <ChevronLeft/>Back
                    </Button>
                    <h2 className="mx-auto text-xl">Gemini 1.5 Flash</h2>
                    <Button variant={"ghost"} className="hidden lg:flex h-full rounded-none" size={"lg"}>
                        <Info />Info
                    </Button>
                </div>
                <div className="relative h-full flex flex-col flex-1 items-center justify-end p-4 ">
                    <div className="absolute bottom-1/2 w-full lg:w-6/12 h-fit px-2 lg:px-0">
                        { chat.length === 0 && <Welcomescreen /> }
                    </div>

                    <div className="flex flex-col w-1/2 max-h-[75dvh] gap-4 pt-10 overflow-y-auto box-border no-scrollbar">
                        { 
                            chat.map((e,i) => (
                                e.type === "user" ? 
                                <MessageUser key={i} content={e.message} /> :
                                <MessageGemini key={i} content={e.message} />
                            ))
                        }
                    </div>
                    <div className="h-1/6 max-h-[16vh] w-full lg:w-1/2 mx-auto box-border">
                        <form action="post" className="relative flex flex-col items-center justify-end w-full h-full" onSubmit={handlePost}>
                            <Textarea message={message} setMessage={setMessage} />
                            { loading ? 
                                <div className="absolute right-4 bottom-2">
                                    <CirclePause />
                                </div> :
                                <button className="absolute right-4 bottom-2" title="send" type="submit">
                                    <Send />
                                </button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}