export default function Dashboard () {
    return (
        <div className="flex w-full h-full flex-1 p-10 gap-4">
            <div className="w-7/12 h-full bg-opacity-70 border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg">
                
            </div>
            <div className="flex flex-col w-5/12 h-full gap-4">
                <div className="w-full h-1/2 bg-opacity-80 border border-zinc-400 bg-zinc-300  dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg"></div>
                <div className="w-full h-1/2 bg-opacity-80 border border-zinc-400 bg-zinc-300 dark:border-zinc-700 dark:opacity-80 dark:bg-zinc-900 rounded-lg"></div>
            </div>
        </div>
    )
}