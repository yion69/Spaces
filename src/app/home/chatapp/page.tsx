import Message from "@/components/layout/gemini/gemini-message";
import Textarea from "@/components/layout/gemini/gemini-textarea";
import { Send } from "lucide-react";

export default function Chatapp () {
    return(
        <div className="h-full w-full p-4">
            <div className="relative h-full w-full box-border overflow-hidden bg-opacity-70 border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg">
                <div className="absolute flex items-center justify-center w-full h-14 bg-inherit border-b">
                    <h2 className="text-xl font-semibold">Gemini 1.5 Flash</h2>
                </div>
                <div className="h-full flex flex-col items-center justify-end p-4">
                    <div className="flex flex-col w-1/2 max-h-[75dvh] gap-4 pt-10 overflow-y-auto box-border no-scrollbar">
                        { [...Array(10)].map((_,i) => (
                            <Message key={i} content="Lorem ipsum dolor sit.Lorem ipsum dolor sit.Lorem ipsum dolor sit.Lorem ipsum dolor sit." />
                        ))
                        }
                    </div>
                    <div className="h-1/6 max-h-[16vh] w-1/2 mx-auto box-border">
                    <form action="post" className="relative flex flex-col items-center justify-end w-full h-full">
                        <Textarea />
                        <button className="absolute right-5 bottom-3" title="send" type="submit">
                            <Send />
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}