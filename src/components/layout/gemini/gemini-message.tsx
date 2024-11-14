
interface MessageI { content:string | any }
export default function Message ({content}:MessageI) {
    return(
        <div className="flex flex-col w-fit h-fit px-6 py-3 rounded-xl box-border border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="mb-1 text-xs">Gemini</span>
            {content}
        </div>
    )
}