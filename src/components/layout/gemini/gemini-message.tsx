
interface MessageI { content:string | any }
export function MessageGemini ({content}:MessageI) {
    return(
        <div className="flex flex-col w-fit h-fit px-6 py-2 rounded-xl box-border border border-blue-200 bg-blue-100 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-1 text-xs">Gemini</span>
            {content}
        </div>
    )
}

export function MessageUser ({content}:MessageI) {
    return (
        <div className="flex flex-col w-fit h-fit ms-auto px-4 py-2 rounded-xl box-border border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-1 text-xs">User</span>
            {content}
        </div>
    )
}