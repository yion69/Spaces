import { Bot, DoorOpen, Hand, PawPrint } from "lucide-react";

export default function Welcomescreen () {

    const temp = [
        {
            content: "Hello Gemini",
            icon: <Hand color="rgb(30 64 175)" fill="white" size={15} />,
        },
        {
            content: "Explain about yourself",
            icon: <Bot color="rgb(153 27 27)" fill="white" size={15} />,
        },
        {
            content: "List a type of cat",
            icon: <PawPrint color="rgb(133 77 14)" fill="white" size={15} />,
        },
        {
            content: "Goodbye",
            icon: <DoorOpen color="rgb(22 101 52)" fill="white" size={15} />,
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-fit">
            <h1 className="text-4xl">What can I help with?</h1>
            <div className="flex flex-wrap items-center justify-center w-full mt-4 p-2 gap-2 box-border">
                { temp.map((e,i) => (
                    <button key={i} className="flex items-center justify-center w-fit h-8 px-3 gap-1 rounded-full border text-xs border-zinc-400 bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" title="" type="button">
                        {e.icon} {e.content}
                    </button>
                   ))
                }
            </div>
        </div> 
    )
}